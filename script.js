/* === Navbar scroll === */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* === Mobile menu === */
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
const mobClose = document.getElementById('mob-close');

burger.addEventListener('click', () => mobMenu.classList.add('open'));
mobClose.addEventListener('click', () => mobMenu.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => mobMenu.classList.remove('open'));
});

/* === Typing animation === */
const el = document.getElementById('typing-text');
const phrases = [
    'Data Scientist',
    'Machine Learning Enthusiast',
    'Cloud Computing Explorer',
    'Web Developer',
    'GIS Technician',
];
let pi = 0, ci = 0, del = false;

function type() {
    const cur = phrases[pi];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; setTimeout(type, 1800); return; }
    if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, del ? 45 : 85);
}
type();

/* === Scroll reveal === */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = (i * 0.05) + 's';
            e.target.classList.add('on');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.sec-tag, .sec-title, .about-text, .stats-row, .contact-lead, .contact-list, footer').forEach(el => {
    el.classList.add('reveal');
    revealObs.observe(el);
});

/* === Stat counters === */
function countUp(el) {
    const target = +el.dataset.to;
    const dur = 1200;
    const start = performance.now();
    function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.stat-n').forEach(n => countUp(n));
            statObs.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statObs.observe(statsRow);

/* === Skill emoji map === */
const emojiMap = {
    python: '🐍', 'machine learning': '🤖', 'data science': '📊',
    cloud: '☁️', networking: '🌐', 'artificial intelligence': '🧠',
    ai: '🧠', sql: '🗄️', linux: '🐧', docker: '🐳',
    git: '🔧', aws: '☁️', azure: '💎', pandas: '🐼',
    numpy: '🔢', javascript: '🌐', tensorflow: '🔥', pytorch: '🎯',
    cybersecurity: '🔐', iot: '📡', deep: '⚡',
};

function getEmoji(name) {
    const lower = name.toLowerCase();
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (lower.includes(key)) return emoji;
    }
    return '⚙️';
}

/* === Render helpers === */
function renderSkills(skills) {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
    skills.forEach((skill, i) => {
        const name = typeof skill === 'string' ? skill : skill.name || 'Skill';
        const card = document.createElement('div');
        card.className = 'skill-card reveal';
        card.innerHTML = `
            <span class="skill-emoji">${getEmoji(name)}</span>
            <div class="skill-name">${name}</div>
            <div class="skill-sub">Skill</div>
        `;
        card.style.transitionDelay = (i * 0.05) + 's';
        grid.appendChild(card);
        requestAnimationFrame(() => card.classList.add('on'));
    });
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    projects.forEach((proj, i) => {
        const name = proj.name || 'Project';
        const desc = proj.description || '';
        const num = String(i + 1).padStart(2, '0');
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.innerHTML = `
            <div class="project-num">Project ${num}</div>
            <div class="project-name">${name}</div>
            <p class="project-desc">${desc}</p>
            <a href="#" class="project-link">View Project <i class="fa-solid fa-arrow-right"></i></a>
        `;
        card.style.transitionDelay = (i * 0.08) + 's';
        grid.appendChild(card);
        requestAnimationFrame(() => card.classList.add('on'));
    });
}

/* === Fallback data === */
const fallback = {
    skills: ['Python', 'Machine Learning', 'Data Science', 'Cloud Computing', 'Networking', 'Artificial Intelligence', 'SQL', 'Linux', 'Git'],
    projects: [
        { name: 'AI Disease Predictor', description: 'A machine learning model that predicts diseases from patient symptoms using Random Forest and SVM classifiers with 94% accuracy.' },
        { name: 'Network Traffic Analyzer', description: 'Real-time tool for monitoring and analyzing network packets to identify anomalies and potential security threats.' },
        { name: 'Cloud Cost Dashboard', description: 'A visual dashboard that tracks and optimizes cloud infrastructure costs across AWS and Azure environments.' },
    ],
};

/* === Fetch API === */
fetch('https://portfolio-backend-8hsl.onrender.com/api/profile')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(data => { renderSkills(data.skills); renderProjects(data.projects); })
    .catch(() => { renderSkills(fallback.skills); renderProjects(fallback.projects); });
