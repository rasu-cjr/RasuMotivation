# Rasu Motivation - Official Web Platform 🔥

Official digital hub for **Rasu Motivation** ([@Rasu_Motivation](https://www.youtube.com/@Rasu_Motivation/featured)) curated by **MGCJ Ravihansa** (BSc. Applied Sciences in RUSL - UG).

Built with high-performance Vanilla HTML5, CSS3, JavaScript, Vercel Serverless Functions, and MongoDB.

---

## 🚀 Features

- **Live Subscriber Counter & Telemetry**: Dynamic live odometer with real-time updates and milestone tracker towards 50,000 subscribers.
- **New Videos Showcase**: Searchable and filterable video gallery with custom playback modals.
- **Motivational Shorts Reel**: Vertical 9:16 aspect ratio video cards mimicking YouTube Shorts.
- **Daily Inspiration Engine**: Bilingual (Sinhala & English) motivational quotes with category filters, audio chimes, clipboard copying, and favorites storage.
- **About MGCJ Ravihansa**: Profile, academic qualifications from the Faculty of Applied Sciences, Rajarata University of Sri Lanka (RUSL), core values, and channel roadmap.
- **Contact & Social Hub**: Direct links to YouTube, Instagram, Facebook, TikTok, Telegram, and LinkedIn, plus an interactive contact form backed by MongoDB.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Glassmorphism & animations), Vanilla JS (Web Audio API, Canvas particles).
- **Backend**: Vercel Serverless Functions (`/api/contact.js`, `/api/newsletter.js`).
- **Database**: MongoDB Atlas (stores contact messages & newsletter subscribers).
- **Hosting & CI/CD**: Vercel connected to GitHub.

---

## 📦 Local Development

1. Clone or open this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rasu-motivation-web.git
   cd rasu-motivation-web
   ```

2. Start the local development server:
   ```bash
   python -m http.server 8080
   # Or with Vercel CLI:
   npx vercel dev
   ```

3. Open in browser: `http://localhost:8080`

---

## 🌐 Deploy to Vercel with MongoDB Atlas

### 1. MongoDB Atlas Setup (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free shared cluster (M0).
2. Create a Database User with username & password.
3. In **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere for Vercel Serverless Functions).
4. Click **Connect** -> **Drivers (Node.js)** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial release of Rasu Motivation website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rasu-motivation-web.git
git push -u origin main
```

### 3. Deploy on Vercel
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New...** -> **Project**.
3. Import your `rasu-motivation-web` repository.
4. Under **Environment Variables**, add:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string.
5. Click **Deploy**!
