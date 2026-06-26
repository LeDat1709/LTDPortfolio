// ===== PORTFOLIO SCRIPT =====

// Navbar active link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        }
    });
});

// Typing effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = ['Software Engineer', 'Full-Stack Developer', 'Mobile Developer', 'AI Enthusiast'];
    let i = 0, j = 0, deleting = false;

    const type = () => {
        const current = texts[i];
        typingText.textContent = deleting
            ? current.substring(0, j--)
            : current.substring(0, j++);

        if (!deleting && j === current.length + 1) {
            setTimeout(() => deleting = true, 1800);
        } else if (deleting && j === 0) {
            deleting = false;
            i = (i + 1) % texts.length;
        }

        setTimeout(type, deleting ? 45 : 90);
    };

    type();
}

// Contact form
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    const subject = encodeURIComponent(`Portfolio Contact: ${data.subject || 'Message'}`);
    const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:letandat1709@gmail.com?subject=${subject}&body=${body}`;

    showNotification('Opening email client...', 'success');
    form.reset();
});

function showNotification(message, type = 'success') {
    const n = document.createElement('div');
    n.className = `notification ${type}`;
    n.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
}
