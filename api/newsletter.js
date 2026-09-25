// Serverless API endpoint for Vercel: /api/newsletter
const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined in Vercel settings.');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'rasu_motivation');

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { email } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('newsletter_subscribers');

    const cleanEmail = email.trim().toLowerCase();

    // Upsert to prevent duplicate entries
    await collection.updateOne(
      { email: cleanEmail },
      { 
        $set: { updatedAt: new Date(), active: true },
        $setOnInsert: { email: cleanEmail, subscribedAt: new Date() }
      },
      { upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to Rasu Motivation Weekly Digest!'
    });
  } catch (error) {
    console.error('MongoDB Newsletter Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not complete newsletter subscription.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
