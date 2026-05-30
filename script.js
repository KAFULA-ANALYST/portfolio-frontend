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
    'Python',
    'JavaScript',
    'Cloud Computing (Vercel & Render)',
    'Networking (Cisco Packet Tracer)',
    'Machine Learning',
    'Data Science',
    'Data Analysis',
];

const PROJECTS = [
    {
        name: 'Crop Disease Detection',
        description: 'AI-powered system for detecting cassava and maize diseases offline using machine learning image classification models.',
        tech: ['Python', 'Machine Learning', 'AI'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Office Network Design',
        description: 'Professional office network design and simulation using Cisco Packet Tracer, covering routing, switching and IP addressing.',
        tech: ['Networking', 'Cisco Packet Tracer'],
        link: 'https://github.com/KAFULA-ANALYST',
    },
    {
        name: 'Portfolio Website',
        description: 'Full-stack personal portfolio with a JavaScript frontend deployed on Vercel and a Node.js/Express backend deployed on Render.',
        tech: ['JavaScript', 'Vercel', 'Render'],
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

// ── Show loading spinners first, then fetch from backend ──
// This makes it VISIBLE that data is coming from the backend

function showLoading() {
    document.getElementById('skills-grid').innerHTML = `
        <div class="loading-row">
            <div class="spin"></div>
            <span>Loading from backend...</span>
        </div>`;
    document.getElementById('projects-grid').innerHTML = `
        <div class="loading-row">
            <div class="spin"></div>
            <span>Loading from backend...</span>
        </div>`;
}

// Show loading state first
showLoading();

// Then fetch from backend
fetch('https://portfolio-backend-8hsl.onrender.com/api/profile')
    .then(r => { if (!r.ok) throw new Error('Backend error'); return r.json(); })
    .then(data => {
        console.log('%c✅ Backend connected! Data received:', 'color: green; font-weight: bold;', data);

        // Render skills from backend
        const skills = (data.skills && data.skills.length > 0) ? data.skills : SKILLS;
        renderSkills(skills);

        // Render projects from backend
        if (data.projects && data.projects.length > 0) {
            const mapped = data.projects.map(p => ({
                name: p.name,
                description: p.description,
                tech: p.tech || inferTech(p.name + ' ' + p.description),
                link: (data.social && data.social.github) ? data.social.github : 'https://github.com/KAFULA-ANALYST',
            }));
            renderProjects(mapped);
        } else {
            renderProjects(PROJECTS);
        }
    })
    .catch(() => {
        // Backend offline — fall back to hardcoded data
        console.warn('%c⚠️ Backend offline — showing local data', 'color: orange; font-weight: bold;');
        renderSkills(SKILLS);
        renderProjects(PROJECTS);
    });

// Infer tech tags from project text
function inferTech(text) {
    const t = text.toLowerCase();
    const tags = [];
    if (t.includes('python'))     tags.push('Python');
    if (t.includes('machine learning') || t.includes('ai') || t.includes('disease')) tags.push('Machine Learning');
    if (t.includes('network') || t.includes('cisco')) tags.push('Networking');
    if (t.includes('cloud') || t.includes('vercel') || t.includes('render')) tags.push('Cloud');
    if (t.includes('javascript') || t.includes('portfolio')) tags.push('JavaScript');
    return tags.length > 0 ? tags : ['Development'];
}