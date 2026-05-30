/* ================================================
   KWANGU M. KAFULA — Portfolio Script
   All data is hardcoded so it ALWAYS shows on
   Vercel. API is fetched as a bonus if available.
================================================ */

/* ── Navbar ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── Mobile menu ── */
const burger   = document.getElementById('burger');
const mobMenu  = document.getElementById('mob-menu');
const mobClose = document.getElementById('mob-close');
burger.addEventListener('click',  () => { mobMenu.classList.add('open');    document.body.style.overflow = 'hidden'; });
mobClose.addEventListener('click',() => { mobMenu.classList.remove('open'); document.body.style.overflow = '';       });
document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => { mobMenu.classList.remove('open'); document.body.style.overflow = ''; });
});

/* ── Typing animation ── */
const typingEl = document.getElementById('typing-text');
const phrases  = [
    'Data Science Student',
    'Machine Learning Enthusiast',
    'Cloud Computing Explorer',
    'AI Developer',
    'Network Engineer',
];
let pi = 0, ci = 0, deleting = false;
function type() {
    const cur = phrases[pi];
    typingEl.textContent = deleting ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 2000); return; }
    if (deleting && ci === 0)           { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, deleting ? 45 : 85);
}
type();

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.08 });
document.querySelectorAll('.sec-tag, .sec-title, .about-text, .stats-row, .contact-lead, .contact-list').forEach(el => {
    el.classList.add('reveal');
    revealObs.observe(el);
});

/* ── Stat counters ── */
let statsDone = false;
const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting && !statsDone) {
            statsDone = true;
            document.querySelectorAll('.stat-n').forEach(el => {
                const target = +el.dataset.to, dur = 1400, start = performance.now();
                function step(now) {
                    const p = Math.min((now - start) / dur, 1);
                    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
                    if (p < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            });
        }
    });
}, { threshold: 0.3 });
const statsRow = document.querySelector('.stats-row');
if (statsRow) statObs.observe(statsRow);

/* ── Emoji map ── */
const emojiMap = {
    'python': '🐍', 'machine learning': '🤖', 'deep learning': '⚡',
    'data science': '📊', 'data analysis': '📈', 'data visualization': '📉',
    'cloud computing': '☁️', 'cloud': '☁️', 'networking': '🌐',
    'artificial intelligence': '🧠', 'ai': '🧠', 'sql': '🗄️',
    'mysql': '🗄️', 'linux': '🐧', 'docker': '🐳', 'git': '🔧',
    'github': '🔧', 'aws': '☁️', 'azure': '💎', 'pandas': '🐼',
    'numpy': '🔢', 'javascript': '🌐', 'html': '🌍', 'css': '🎨',
    'tensorflow': '🔥', 'pytorch': '🎯', 'flask': '🧪',
    'fastapi': '⚙️', 'cybersecurity': '🔐', 'iot': '📡',
    'tableau': '📊', 'power bi': '📊', 'r language': '📐',
    'statistics': '📐', 'excel': '📋', 'web scraping': '🕷️',
};
function getEmoji(name) {
    const lower = name.toLowerCase();
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (lower.includes(key)) return emoji;
    }
    return '⚙️';
}

/* ── HARDCODED DATA (always visible, no API needed) ── */
const SKILLS = [
    'Python', 'Machine Learning', 'Data Science',
    'Artificial Intelligence', 'Cloud Computing', 'Networking', 'SQL',
];

const PROJECTS = [
    {
        name: 'AI Disease Predictor',
        description: 'A machine learning model that predicts diseases based on patient symptoms using Random Forest and SVM classifiers, achieving 94% accuracy on test data.',
        tech: ['Python', 'Machine Learning', 'Flask'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Network Traffic Analyzer',
        description: 'A real-time tool for monitoring and analyzing network packets to identify anomalies and potential security threats using packet-capture techniques.',
        tech: ['Python', 'Networking', 'Linux'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Cloud Cost Dashboard',
        description: 'An interactive dashboard that tracks and optimizes cloud infrastructure costs across AWS and Azure environments with automated alerts.',
        tech: ['Cloud Computing', 'AWS', 'Tableau'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Student Performance Predictor',
        description: 'A data science project that uses student academic data to predict final exam results, helping lecturers identify students who need extra support.',
        tech: ['Python', 'Pandas', 'Data Science'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Sales Data Analysis',
        description: 'End-to-end data analysis pipeline that processes raw sales CSV data, cleans it, and produces visual insights using Python and Power BI.',
        tech: ['Python', 'Pandas', 'Power BI'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Portfolio Backend API',
        description: 'A RESTful API built with Flask and deployed on Render that serves dynamic skills and project data for this portfolio website.',
        tech: ['Python', 'Flask', 'Render'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
];

/* ── Render Skills ── */
function renderSkills(skills) {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
    skills.forEach((skill, i) => {
        const name = typeof skill === 'string' ? skill : (skill.name || 'Skill');
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.innerHTML = `
            <span class="skill-emoji">${getEmoji(name)}</span>
            <div class="skill-name">${name}</div>
        `;
        grid.appendChild(card);
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 40);
    });
}

/* ── Render Projects ── */
function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    projects.forEach((proj, i) => {
        const name  = proj.name        || 'Project';
        const desc  = proj.description || '';
        const tech  = proj.tech        || [];
        const link  = proj.link        || '#';
        const num   = String(i + 1).padStart(2, '0');

        const techHTML = tech.map(t => `<span class="proj-tech">${t}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.innerHTML = `
            <div class="proj-top">
                <span class="project-num">Project ${num}</span>
                <i class="fa-solid fa-code proj-icon"></i>
            </div>
            <h3 class="project-name">${name}</h3>
            <p class="project-desc">${desc}</p>
            <div class="proj-techs">${techHTML}</div>
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">
                View on GitHub <i class="fa-solid fa-arrow-up-right"></i>
            </a>
        `;
        grid.appendChild(card);
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 80);
    });
}

// Render immediately from hardcoded data
renderSkills(SKILLS);
renderProjects(PROJECTS);

// Hardcoded data is the single source of truth — no API override.

