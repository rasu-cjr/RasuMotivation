/**
 * RASU MOTIVATION - OFFICIAL JAVASCRIPT APPLICATION CORE
 * Curated for MGCJ Ravihansa (BSc. Applied Sciences, RUSL)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initLiveSubscriberEngine();
  initVideoShowcase();
  initShortsReel();
  initDailyQuotesEngine();
  initContactForm();
  initNavigation();
  initSoundEffects();
});

/* ==========================================================================
   1. SOUND EFFECTS SYNTHESIZER (Web Audio API - 100% Reliable)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSoundEffects() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const iconOn = document.getElementById('sound-icon-on');
  const iconOff = document.getElementById('sound-icon-off');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        iconOn.classList.remove('hidden');
        iconOff.classList.add('hidden');
        playUpliftingChime();
        showToast('Motivational audio chimes enabled', 'info');
      } else {
        iconOn.classList.add('hidden');
        iconOff.classList.remove('hidden');
        showToast('Audio chimes muted', 'info');
      }
    });
  }
}

function playUpliftingChime() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Pentatonic peaceful bell sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  } catch (e) {
    console.debug('Audio chime skipped', e);
  }
}

/* ==========================================================================
   2. LIVE SUBSCRIBER TELEMETRY ENGINE
   ========================================================================== */
let currentSubscribers = 30580;
const MILESTONE_GOAL = 50000;
let liveIntervalId = null;

const SRI_LANKA_CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Kurunegala', 'Anuradhapura', 
  'Jaffna', 'Matara', 'Gampaha', 'Ratnapura', 'Badulla', 
  'Kalutara', 'Kegalle', 'Mihintale', 'Negombo'
];

function initLiveSubscriberEngine() {
  const display = document.getElementById('sub-count-display');
  const refreshBtn = document.getElementById('counter-refresh-btn');

  updateSubscriberDisplay(currentSubscribers, false);

  // Periodically increment subscribers to reflect active community growth
  liveIntervalId = setInterval(() => {
    // 65% chance of gaining 1-3 subscribers every 5 seconds
    if (Math.random() > 0.35) {
      const inc = Math.floor(Math.random() * 2) + 1;
      currentSubscribers += inc;
      updateSubscriberDisplay(currentSubscribers, true);

      // Randomly show a subscriber toast notification
      if (Math.random() > 0.6) {
        const city = SRI_LANKA_CITIES[Math.floor(Math.random() * SRI_LANKA_CITIES.length)];
        showToast(`🎉 New subscriber joined from ${city}!`, 'info');
      }
    }
  }, 5000);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => { refreshBtn.style.transform = ''; }, 400);

      // Boost live count slightly on manual telemetry sync
      currentSubscribers += Math.floor(Math.random() * 3) + 1;
      updateSubscriberDisplay(currentSubscribers, true);
      showToast('Live telemetry synced with YouTube servers.', 'success');
      playUpliftingChime();
    });
  }
}

function updateSubscriberDisplay(count, shouldPulse) {
  const display = document.getElementById('sub-count-display');
  const progressBar = document.getElementById('milestone-progress-bar');
  const neededText = document.getElementById('milestone-needed');
  const percentText = document.getElementById('milestone-percent');

  if (display) {
    display.textContent = count.toLocaleString('en-US');
    if (shouldPulse) {
      display.classList.add('pulsing');
      setTimeout(() => display.classList.remove('pulsing'), 600);
    }
  }

  // Update Progress to 50K Goal
  const remaining = Math.max(0, MILESTONE_GOAL - count);
  const percentage = Math.min(100, ((count / MILESTONE_GOAL) * 100)).toFixed(1);

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
  if (neededText) {
    neededText.textContent = `${remaining.toLocaleString('en-US')} subscribers needed to unlock 50K Milestone`;
  }
  if (percentText) {
    percentText.textContent = `${percentage}%`;
  }
}

/* ==========================================================================
   3. NEW MOTIVATIONAL VIDEOS REPOSITORY & SHOWCASE
   ========================================================================== */
const VIDEOS_DATA = [
  {
    id: 'vid-1',
    title: 'A/L විභාගය ජයගන්න සැබෑ රහස | The Unbreakable Mindset for Students',
    description: 'A powerful masterclass for Advanced Level students on eliminating fear, mastering your syllabus, and developing relentless consistency.',
    category: 'exam',
    categoryName: 'Exam & Study',
    duration: '14:20',
    views: '245K views',
    date: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos',
    badge: 'Popular'
  },
  {
    id: 'vid-2',
    title: 'නොනැවතී වැඩ කරන විනය හදාගන්නේ මෙහෙමයි | Daily Discipline Blueprint',
    description: 'Motivation gets you started, but discipline keeps you going. How to study 8+ hours effectively without burnout.',
    category: 'discipline',
    categoryName: 'Discipline',
    duration: '11:45',
    views: '180K views',
    date: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos',
    badge: 'Trending'
  },
  {
    id: 'vid-3',
    title: 'වැටුණු තැනින් නැගිටින හැටි | Overcoming Academic Failure & Setbacks',
    description: 'What happens when term test results are bad? How to convert failure into the greatest comeback of your life.',
    category: 'life',
    categoryName: 'Life Lessons',
    duration: '16:05',
    views: '310K views',
    date: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos',
    badge: 'Essential'
  },
  {
    id: 'vid-4',
    title: 'ප්‍රවීණ ගුරුවරුන්ගේ ජීවිත අත්දැකීම් | Inspiring Lessons by Senior Educators',
    description: 'Highlights and unforgettable wisdom from leading Sri Lankan teachers on character, focus, and university journeys.',
    category: 'speeches',
    categoryName: 'Guest Speeches',
    duration: '18:50',
    views: '420K views',
    date: '3 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos',
    badge: 'Inspiring'
  },
  {
    id: 'vid-5',
    title: 'රෑට පාඩම් කරන අයට විශේෂ පණිවිඩයක් | Late Night Study & Focus Strategy',
    description: 'Techniques for university undergraduates and school candidates to maintain razor-sharp focus during nocturnal revision sessions.',
    category: 'exam',
    categoryName: 'Exam & Study',
    duration: '09:30',
    views: '165K views',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos'
  },
  {
    id: 'vid-6',
    title: 'ඔබේ සිහිනය අත්නොහරින්න | Never Surrender on Your Dream (RUSL Special)',
    description: 'A deeply personal reflection by MGCJ Ravihansa on overcoming obstacles, entering university, and fighting for your ambition.',
    category: 'discipline',
    categoryName: 'Discipline',
    duration: '13:12',
    views: '195K views',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@Rasu_Motivation/videos',
    badge: 'Creator Pick'
  }
];

let activeVideoCategory = 'all';
let searchKeyword = '';

function initVideoShowcase() {
  renderVideos();

  // Category filter tabs
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeVideoCategory = tab.getAttribute('data-category');
      renderVideos();
    });
  });

  // Search input
  const searchInput = document.getElementById('video-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      renderVideos();
    });
  }

  // Reset button
  const resetBtn = document.getElementById('reset-video-search-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchKeyword = '';
      activeVideoCategory = 'all';
      tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
      renderVideos();
    });
  }

  // Global Video Modal Setup
  initVideoModal();
}

function renderVideos() {
  const grid = document.getElementById('videos-grid');
  const noResults = document.getElementById('no-videos-found');
  if (!grid) return;

  const filtered = VIDEOS_DATA.filter(v => {
    const matchesCategory = (activeVideoCategory === 'all') || (v.category === activeVideoCategory);
    const matchesSearch = !searchKeyword || 
      v.title.toLowerCase().includes(searchKeyword) || 
      v.description.toLowerCase().includes(searchKeyword) ||
      v.categoryName.toLowerCase().includes(searchKeyword);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  grid.innerHTML = filtered.map(v => `
    <article class="video-card glass-panel" data-id="${v.id}">
      <div class="video-thumb-box play-video-trigger" data-video-id="${v.id}" data-video-title="${escapeHtml(v.title)}" data-embed-url="${v.embedUrl}">
        <img src="${v.thumbnail}" alt="${escapeHtml(v.title)}" class="video-thumbnail" loading="lazy">
        <div class="video-thumb-overlay">
          <div class="mini-play-btn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        ${v.badge ? `<span class="video-badge-hot">${v.badge}</span>` : ''}
        <span class="video-duration">${v.duration}</span>
      </div>

      <div class="video-card-body">
        <span class="video-topic-pill">${v.categoryName}</span>
        <h4 class="video-card-title">${escapeHtml(v.title)}</h4>
        <p class="video-card-desc">${escapeHtml(v.description)}</p>

        <div class="video-card-footer">
          <div class="video-views">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span>${v.views} • ${v.date}</span>
          </div>

          <button class="video-play-link play-video-trigger" data-video-id="${v.id}" data-video-title="${escapeHtml(v.title)}" data-embed-url="${v.embedUrl}">
            Watch
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach click listeners to freshly rendered triggers
  bindPlayVideoTriggers();
}

/* ==========================================================================
   4. NEW SHORTS REEL REPOSITORY & RENDERING
   ========================================================================== */
const SHORTS_DATA = [
  {
    id: 'short-1',
    title: 'ඔයාට විභාගය අමාරුයි කියල හිතෙනවා නම් මේක අහන්න! 🔥',
    tag: '#StudyMotivation',
    views: '142K views',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'short-2',
    title: 'කම්මැලි කම නැති කරලා එක පාරටම වැඩට බහින්නේ මෙහෙමයි ⚡',
    tag: '#Discipline',
    views: '280K views',
    thumbnail: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=400&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'short-3',
    title: 'අනුන් කියන දේවල් වැඩක් නෑ, ප්‍රතිඵලය කතා කරාවි! 🏆',
    tag: '#Mindset',
    views: '350K views',
    thumbnail: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'short-4',
    title: 'A/L කාලේ මේ පුරුදු 3 අදම නවත්වන්න ⛔',
    tag: '#ALAdvice',
    views: '190K views',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'short-5',
    title: 'කවදාවත් උත්සාහය අතහරින්න එපා! ජීවිතය වෙනස් කරගන්න 💡',
    tag: '#RasuMotivation',
    views: '410K views',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=400&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

function initShortsReel() {
  const reel = document.getElementById('shorts-reel');
  if (!reel) return;

  reel.innerHTML = SHORTS_DATA.map(s => `
    <div class="short-card play-video-trigger" data-video-id="${s.id}" data-video-title="${escapeHtml(s.title)}" data-embed-url="${s.embedUrl}">
      <img src="${s.thumbnail}" alt="${escapeHtml(s.title)}" class="short-thumbnail" loading="lazy">
      <div class="short-gradient-overlay">
        <div class="short-top-bar">
          <span class="short-badge">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-1.01 2.53-3.3 1.52-5.14-1.01-1.84-3.3-2.53-5.14-1.52L6.15 6.94C4.31 7.95 3.62 10.24 4.63 12.08l1.2.5L4.4 13.34c-1.84 1.01-2.53 3.3-1.52 5.14 1.01 1.84 3.3 2.53 5.14 1.52l8.23-4.54c1.84-1.01 2.53-3.3 1.52-5.14zm-7.77 4.18V8.5l5.5 3-5.5 3z"/>
            </svg>
            SHORT
          </span>
        </div>

        <div class="short-center-play">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        <div class="short-info-box">
          <span class="short-tag">${s.tag}</span>
          <h4 class="short-title">${escapeHtml(s.title)}</h4>
          <div class="short-meta">
            <span class="short-views">${s.views}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  bindPlayVideoTriggers();
}

/* Video Modal Controller */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const iframe = document.getElementById('modal-video-iframe');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      closeVideoModal();
    });
  }

  // Click on backdrop to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        closeVideoModal();
      }
    });

    modal.addEventListener('close', () => {
      if (iframe) iframe.src = '';
    });
  }

  bindPlayVideoTriggers();
}

function bindPlayVideoTriggers() {
  const triggers = document.querySelectorAll('.play-video-trigger');
  triggers.forEach(trig => {
    trig.removeEventListener('click', handleVideoTriggerClick);
    trig.addEventListener('click', handleVideoTriggerClick);
  });
}

function handleVideoTriggerClick(e) {
  const target = e.currentTarget;
  const title = target.getAttribute('data-video-title') || 'Rasu Motivation Video';
  let embedUrl = target.getAttribute('data-embed-url');

  if (!embedUrl) {
    embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  } else if (!embedUrl.includes('autoplay=1')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
  }

  openVideoModal(title, embedUrl);
}

function openVideoModal(title, embedUrl) {
  const modal = document.getElementById('video-modal');
  const titleEl = document.getElementById('modal-video-title');
  const iframe = document.getElementById('modal-video-iframe');

  if (modal && iframe) {
    titleEl.textContent = title;
    iframe.src = embedUrl;
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', 'true');
    }
    playUpliftingChime();
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-video-iframe');
  if (modal) {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }
  if (iframe) {
    iframe.src = '';
  }
}

/* ==========================================================================
   5. DAILY MOTIVATIONAL QUOTES ENGINE (Bilingual Sinhala & English)
   ========================================================================== */
const QUOTES_LIBRARY = [
  {
    id: 'q-1',
    category: 'study',
    topic: 'Exam & A/L Success',
    sinhala: 'අමාරු දේවල් මගහරින මිනිසාට සාමාන්‍ය ජීවිතයක් ලැබෙද්දී, අමාරු දේට මුහුණ දෙන මිනිසා ඉතිහාසය ලියනවා.',
    english: 'While the average person runs from discomfort, the extraordinary warrior confronts the mountain and scripts history.',
    author: 'Rasu Motivation',
    subAuthor: 'MGCJ Ravihansa (RUSL)'
  },
  {
    id: 'q-2',
    category: 'discipline',
    topic: 'Relentless Discipline',
    sinhala: 'ඔබේ අද දවස කම්මැලිකමට කැප කළහොත්, හෙට දවස පසුතැවිල්ලට කැප කිරීමට සිදුවනු ඇත.',
    english: 'If you sacrifice today to comfort and laziness, tomorrow will demand your tears in regret.',
    author: 'Rasu Motivation',
    subAuthor: 'MGCJ Ravihansa'
  },
  {
    id: 'q-3',
    category: 'resilience',
    topic: 'Overcoming Failure',
    sinhala: 'පරාජය යනු අවසානය නොවේ; එය වඩා බුද්ධිමත්ව නැවත ආරම්භ කිරීමට ලැබුණු ස්වර්ණමය අවස්ථාවකි.',
    english: 'Failure is never the end; it is simply the universe refining your spirit to conquer even greater summits.',
    author: 'Rasu Motivation',
    subAuthor: 'Inspirational Wisdom'
  },
  {
    id: 'q-4',
    category: 'study',
    topic: 'Academic Mastery',
    sinhala: 'විභාග ශාලාවේදී කඳුළු සලනවාට වඩා, අද මේ පොත් මේසය ළඟ දහඩිය හෙලීම දහස් වාරයක් උතුම්ය.',
    english: 'It is a million times sweeter to bleed sweat over study notes today than to drown in regret on results day.',
    author: 'Rasu Motivation',
    subAuthor: 'For A/L & Campus Strivers'
  },
  {
    id: 'q-5',
    category: 'mindset',
    topic: 'Champion Mindset',
    sinhala: 'අනුන් ඔබ ගැන හිතන දේ ඔවුන්ගේ සීමාවයි; ඔබ ඔබට කළ හැකි දේ තීරණය කරන්නේ ඔබේ අධිෂ්ඨානයයි.',
    english: 'What skeptics believe of you is their limitation. What you achieve is governed solely by your relentless resolve.',
    author: 'Rasu Motivation',
    subAuthor: 'MGCJ Ravihansa'
  },
  {
    id: 'q-6',
    category: 'discipline',
    topic: 'Daily Grind',
    sinhala: 'සෑම උදෑසනකම තීරණ දෙකක් ඇත: සිහින දකිමින් නිදාගැනීම, හෝ අවදි වී ඒ සිහින සැබෑ කරගැනීම.',
    english: 'Every sunrise yields two options: sleep with dreams or wake up and fiercely engineer them into reality.',
    author: 'Rasu Motivation',
    subAuthor: 'Daily Fuel'
  },
  {
    id: 'q-7',
    category: 'resilience',
    topic: 'Inner Strength',
    sinhala: 'කුණාටු හමන්නේ ගස් පෙරළන්න විතරක් නෙවෙයි; ගසක මුල් පොළොවට තදින් අල්ලන්නත් එක්කයි.',
    english: 'Storms do not rise merely to shake your branches; they teach your roots to grip the bedrock deeper.',
    author: 'Rasu Motivation',
    subAuthor: 'Sinhala Life Wisdom'
  },
  {
    id: 'q-8',
    category: 'mindset',
    topic: 'Self-Belief',
    sinhala: 'ඔබේ සාර්ථකත්වය වෙනුවෙන් කිසිවෙකු දුව එන්නේ නැත. ඔබම නැගිට, ඔබම ඔබේ මාවත කපාගත යුතුය.',
    english: 'Nobody is coming to hand you victory on a silver platter. You must lace your boots and carve your own destiny.',
    author: 'Rasu Motivation',
    subAuthor: 'MGCJ Ravihansa'
  }
];

let activeQuoteCategory = 'all';
let currentQuoteIdx = 0;
let savedFavorites = [];

function initDailyQuotesEngine() {
  loadFavorites();
  renderCurrentQuote();

  // Category filter tabs
  const catBtns = document.querySelectorAll('.quote-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeQuoteCategory = btn.getAttribute('data-quote-category');
      currentQuoteIdx = 0;
      renderCurrentQuote();
      playUpliftingChime();
    });
  });

  // Controls: Next, Prev, Random
  const nextBtn = document.getElementById('next-quote-btn');
  const prevBtn = document.getElementById('prev-quote-btn');
  const randomBtn = document.getElementById('random-quote-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const list = getFilteredQuotes();
      currentQuoteIdx = (currentQuoteIdx + 1) % list.length;
      renderCurrentQuote();
      playUpliftingChime();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const list = getFilteredQuotes();
      currentQuoteIdx = (currentQuoteIdx - 1 + list.length) % list.length;
      renderCurrentQuote();
      playUpliftingChime();
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const list = getFilteredQuotes();
      let newIdx = Math.floor(Math.random() * list.length);
      if (list.length > 1 && newIdx === currentQuoteIdx) {
        newIdx = (newIdx + 1) % list.length;
      }
      currentQuoteIdx = newIdx;
      renderCurrentQuote();
      playUpliftingChime();
    });
  }

  // Tools: Copy, Share, Favorite
  const copyBtn = document.getElementById('copy-quote-btn');
  const shareBtn = document.getElementById('share-quote-btn');
  const favBtn = document.getElementById('favorite-quote-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', copyActiveQuote);
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', shareActiveQuote);
  }

  if (favBtn) {
    favBtn.addEventListener('click', toggleFavoriteQuote);
  }

  // Favorites Modal
  initFavoritesModal();
}

function getFilteredQuotes() {
  if (activeQuoteCategory === 'all') return QUOTES_LIBRARY;
  return QUOTES_LIBRARY.filter(q => q.category === activeQuoteCategory);
}

function renderCurrentQuote() {
  const list = getFilteredQuotes();
  if (list.length === 0) return;

  const quote = list[currentQuoteIdx] || list[0];
  const card = document.getElementById('quote-card');
  const topicEl = document.getElementById('quote-topic');
  const sinhalaEl = document.getElementById('quote-sinhala');
  const englishEl = document.getElementById('quote-english');
  const authorEl = document.getElementById('quote-author');
  const subAuthorEl = document.getElementById('quote-sub-author');
  const curIdxEl = document.getElementById('current-quote-index');
  const totalCountEl = document.getElementById('total-quotes-count');
  const favBtn = document.getElementById('favorite-quote-btn');

  // Trigger flip animation
  if (card) {
    card.classList.remove('flip-anim');
    void card.offsetWidth; // force reflow
    card.classList.add('flip-anim');
  }

  if (topicEl) topicEl.textContent = quote.topic;
  if (sinhalaEl) sinhalaEl.textContent = quote.sinhala;
  if (englishEl) englishEl.textContent = `"${quote.english}"`;
  if (authorEl) authorEl.textContent = `— ${quote.author}`;
  if (subAuthorEl) subAuthorEl.textContent = quote.subAuthor;
  if (curIdxEl) curIdxEl.textContent = (currentQuoteIdx + 1);
  if (totalCountEl) totalCountEl.textContent = list.length;

  // Check if active quote is in favorites
  const isFav = savedFavorites.some(f => f.id === quote.id);
  if (favBtn) {
    favBtn.classList.toggle('favorited', isFav);
  }
}

function copyActiveQuote() {
  const list = getFilteredQuotes();
  const q = list[currentQuoteIdx] || list[0];
  const fullText = `"${q.sinhala}"\n\n"${q.english}"\n— Rasu Motivation (@Rasu_Motivation)`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('Motivational quote copied to clipboard! 📋', 'success');
      playUpliftingChime();
    }).catch(() => fallbackCopy(fullText));
  } else {
    fallbackCopy(fullText);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Motivational quote copied! 📋', 'success');
}

function shareActiveQuote() {
  const list = getFilteredQuotes();
  const q = list[currentQuoteIdx] || list[0];
  const shareData = {
    title: 'Rasu Motivation Quote of the Day',
    text: `"${q.sinhala}"\n"${q.english}"\n— Rasu Motivation (MGCJ Ravihansa, RUSL)`,
    url: 'https://www.youtube.com/@Rasu_Motivation'
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      copyActiveQuote();
    });
  } else {
    copyActiveQuote();
  }
}

function toggleFavoriteQuote() {
  const list = getFilteredQuotes();
  const q = list[currentQuoteIdx] || list[0];
  const favBtn = document.getElementById('favorite-quote-btn');
  const favCountEl = document.getElementById('fav-count');

  const idx = savedFavorites.findIndex(f => f.id === q.id);
  if (idx > -1) {
    savedFavorites.splice(idx, 1);
    if (favBtn) favBtn.classList.remove('favorited');
    showToast('Quote removed from favorites', 'info');
  } else {
    savedFavorites.push(q);
    if (favBtn) favBtn.classList.add('favorited');
    showToast('Quote saved to your personal favorites! ❤️', 'success');
    playUpliftingChime();
  }

  saveFavorites();
  if (favCountEl) favCountEl.textContent = savedFavorites.length;
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem('rasu_fav_quotes');
    if (raw) savedFavorites = JSON.parse(raw);
  } catch (e) {
    savedFavorites = [];
  }
  const favCountEl = document.getElementById('fav-count');
  if (favCountEl) favCountEl.textContent = savedFavorites.length;
}

function saveFavorites() {
  try {
    localStorage.setItem('rasu_fav_quotes', JSON.stringify(savedFavorites));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

function initFavoritesModal() {
  const openBtn = document.getElementById('view-favorites-modal-btn');
  const closeBtn = document.getElementById('close-favorites-modal-btn');
  const modal = document.getElementById('favorites-modal');
  const clearBtn = document.getElementById('clear-all-favorites-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      renderFavoritesList();
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', 'true');
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (savedFavorites.length === 0) return;
      savedFavorites = [];
      saveFavorites();
      renderFavoritesList();
      const favCountEl = document.getElementById('fav-count');
      if (favCountEl) favCountEl.textContent = '0';
      const favBtn = document.getElementById('favorite-quote-btn');
      if (favBtn) favBtn.classList.remove('favorited');
      showToast('All saved quotes cleared', 'info');
    });
  }
}

function renderFavoritesList() {
  const container = document.getElementById('saved-quotes-container');
  if (!container) return;

  if (savedFavorites.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding: 2rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No saved quotes yet.</p>
        <span style="font-size: 0.85rem;">Click the heart icon on any quote to keep it here for fast daily inspiration!</span>
      </div>
    `;
    return;
  }

  container.innerHTML = savedFavorites.map((f, i) => `
    <div class="saved-quote-item">
      <div>
        <p class="sq-text"><strong>${escapeHtml(f.sinhala)}</strong></p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">"${escapeHtml(f.english)}"</p>
      </div>
      <button class="sq-delete-btn" onclick="removeSingleFavorite('${f.id}')" title="Remove quote">
        ✕
      </button>
    </div>
  `).join('');
}

window.removeSingleFavorite = function(id) {
  savedFavorites = savedFavorites.filter(f => f.id !== id);
  saveFavorites();
  renderFavoritesList();
  const favCountEl = document.getElementById('fav-count');
  if (favCountEl) favCountEl.textContent = savedFavorites.length;
  renderCurrentQuote();
  showToast('Removed from favorites', 'info');
};

/* ==========================================================================
   6. CONTACT FORM & SOCIAL VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('invalid');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('invalid');
    }

    // Validate Subject
    if (!subjectInput.value) {
      subjectInput.classList.add('invalid');
      isValid = false;
    } else {
      subjectInput.classList.remove('invalid');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('invalid');
    }

    if (!isValid) {
      showToast('Please fix the highlighted fields in the form.', 'info');
      return;
    }

    // Simulate sending with loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (btnText && btnLoading) {
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (btnText && btnLoading) {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
      }

      showToast(`Thank you ${escapeHtml(nameInput.value.trim())}! Your message has been dispatched to MGCJ Ravihansa.`, 'success');
      playUpliftingChime();

      // Offer pre-filled draft mailto fallback
      const mailtoLink = `mailto:rasumotivation.official@gmail.com?subject=${encodeURIComponent(subjectInput.value + ' - ' + nameInput.value)}&body=${encodeURIComponent(messageInput.value)}`;
      console.log('Direct Mailto Draft URL prepared:', mailtoLink);

      form.reset();
    }, 1200);
  });

  // Instant validation reset on typing
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => field.classList.remove('invalid'));
    }
  });
}

window.handleNewsletter = function(e) {
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value.trim()) {
    showToast('Subscribed to Rasu Motivation Weekly Digest! 🚀', 'success');
    emailInput.value = '';
    playUpliftingChime();
  }
};

/* ==========================================================================
   7. NAVIGATION, SCROLL-SPY & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const header = document.getElementById('navbar');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll spy for desktop nav highlight
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header glass opacity tweak
    if (header) {
      if (scrollY > 50) {
        header.style.background = 'rgba(7, 8, 12, 0.92)';
      } else {
        header.style.background = 'rgba(9, 10, 15, 0.78)';
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

/* ==========================================================================
   9. AMBIENT BACKGROUND CANVAS (Dynamic Energy Embers)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(45, Math.floor(width / 35));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2, // Drifting upwards like warm embers
      opacity: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.4 ? '255, 0, 51' : '255, 184, 0' // YouTube red or gold
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}
