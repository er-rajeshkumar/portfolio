/* =========================
   SMOOTH FADE-IN ON SCROLL
   ========================= */

const observerOptions = {
    threshold: 0.15
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .skill-card, .project-card, .timeline-item')
    .forEach(element => {
        element.classList.add('fade-in');
        revealOnScroll.observe(element);
    });


/* =========================
   ACTIVE NAV LINK HIGHLIGHT
   ========================= */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});


/* =========================
   NAVBAR SCROLL SHADOW
   ========================= */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* =========================
   THEME TOGGLE (DARK / LIGHT)
   ========================= */

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀';
    }
});


/* =========================
   SCROLL PROGRESS INDICATOR
   ========================= */

const progressBar = document.getElementById('scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${scrollPercent}%`;
});


/* =========================
   MAGIC CURSOR + SPARKLES (SAFE)
   ========================= */

const cursor = document.getElementById('magic-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

/* =========================
   MAGIC CURSOR – FINAL
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('magic-cursor');

    if (!cursor || window.innerWidth <= 768) return;

    document.body.classList.add('magic-cursor-enabled');

    let sparkleCooldown = false;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        if (!sparkleCooldown) {
            sparkleCooldown = true;

            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';

            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 700);
            setTimeout(() => sparkleCooldown = false, 35);
        }
    });
});
