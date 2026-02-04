// ===== MODERN PORTFOLIO JAVASCRIPT =====

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTypingEffect();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupPortfolioFilter();
        this.setupScrollToTop();
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
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

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Typing effect for hero subtitle
    setupTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const texts = [
            'Fullstack Developer',
            'Web Designer', 
            'AI Developer',
            'Mobile Developer',
            'Game Developer',
            'Technical Consultant'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }

    // Scroll animations and effects
    setupScrollEffects() {
        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add stagger effect for service cards
                    if (entry.target.classList.contains('service-card')) {
                        const cards = document.querySelectorAll('.service-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const scrollElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-method, .about-text, .skills-grid');
        scrollElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });

        // Smooth parallax effect
        let ticking = false;
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // Add magnetic effect to buttons
        this.setupMagneticEffect();
    }

    // Magnetic hover effect
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .service-card, .portfolio-item');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // Setup various animations
    setupAnimations() {
        // Animate stats numbers
        this.animateStats();
        
        // Hover effects for service cards
        this.setupServiceCardEffects();
        
        // Skill tags animation
        this.setupSkillTagEffects();
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (numericValue) {
                        this.countUp(target, 0, numericValue, finalValue.includes('%') ? '%' : '+');
                    }
                    observer.unobserve(target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    countUp(element, start, end, suffix = '') {
        const duration = 2000;
        const increment = end / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    setupServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Add stagger class for initial animation
            card.classList.add('stagger-item');
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.classList.add('ripple-effect');
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
            });

            // Add floating animation
            card.classList.add(index % 2 === 0 ? 'floating' : 'floating-delayed');
        });
    }

    setupSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('fade-in-up');
            
            // Add hover glow effect
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
                tag.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Portfolio filtering functionality
    setupPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (!filterBtns.length || !portfolioItems.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach((item, index) => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px) scale(0.8)';
                        
                        // Staggered animation
                        setTimeout(() => {
                            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-30px) scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Add hover effects to portfolio items
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Scroll to top button
    setupScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(scrollBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.setupLazyLoading();
        this.optimizeScrollEvents();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        // Use throttled scroll events for better performance
        const throttledScroll = Utils.throttle(() => {
            // Scroll-dependent operations here
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }
}

// Contact form handler with SMTP.js
class ContactForm {
    constructor() {
        this.setupForm();
    }

    setupForm() {
        const form = document.querySelector('#contact-form');
        if (!form) return;

        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Check if SMTP.js is loaded
            if (typeof Email === 'undefined') {
                throw new Error('SMTP.js not loaded');
            }

            // Get SMTP config from config
            const smtpConfig = config.getEmailConfig().smtp;

            // Send email using SMTP.js with Elastic Email
            const response = await Email.send({
                SecureToken: "YOUR_ELASTIC_EMAIL_SECURE_TOKEN", // You'll get this from Elastic Email
                To: smtpConfig.to,
                From: smtpConfig.user,
                Subject: `New Contact from ${data.name} - ${data.service || 'General Inquiry'}`,
                Body: `
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(45deg, #1a1a1a, #333333); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
                            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
                            .label { font-weight: bold; color: #1a1a1a; }
                            .value { color: #4a4a4a; margin-top: 5px; }
                            .footer { text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>📧 New Contact Form Submission</h2>
                                <p>From: Le Tan Dat Portfolio Website</p>
                            </div>
                            <div class="content">
                                <div class="field">
                                    <div class="label">👤 Name:</div>
                                    <div class="value">${data.name}</div>
                                </div>
                                <div class="field">
                                    <div class="label">📧 Email:</div>
                                    <div class="value">${data.email}</div>
                                </div>
                                <div class="field">
                                    <div class="label">📱 Phone:</div>
                                    <div class="value">${data.phone || 'Not provided'}</div>
                                </div>
                                <div class="field">
                                    <div class="label">💼 Service:</div>
                                    <div class="value">${data.service || 'Not specified'}</div>
                                </div>
                                <div class="field">
                                    <div class="label">💰 Budget:</div>
                                    <div class="value">${data.budget || 'Not specified'}</div>
                                </div>
                                <div class="field">
                                    <div class="label">💬 Message:</div>
                                    <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
                                </div>
                            </div>
                            <div class="footer">
                                <p>This email was sent from your portfolio contact form</p>
                                <p>Reply directly to: ${data.email}</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            });

            console.log('Email sent successfully:', response);
            
            if (response === 'OK') {
                this.showSuccess('Thank you for contacting! I will respond as soon as possible.');
                form.reset();
            } else {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error('Email sending error:', error);
            
            // Fallback: Open email client
            const subject = encodeURIComponent(`Portfolio Contact: ${data.service || 'General Inquiry'}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'N/A'}\n` +
                `Service: ${data.service || 'N/A'}\n` +
                `Budget: ${data.budget || 'N/A'}\n\n` +
                `Message:\n${data.message}`
            );
            
            window.location.href = `mailto:letandat1709@gmail.com?subject=${subject}&body=${body}`;
            
            this.showSuccess('Opening your email client... Please send the email to complete your inquiry.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    // Initialize contact form
    new ContactForm();
    
    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 1000);
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification.success {
        background: linear-gradient(45deg, #10b981, #059669);
    }
    
    .notification.error {
        background: linear-gradient(45deg, #ef4444, #dc2626);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    /* Enhanced ripple effect */
    .ripple-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    /* Smooth page transitions */
    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #2563eb, #7c3aed);
        z-index: 10000;
        transform: translateX(-100%);
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page-transition.active {
        transform: translateX(0);
    }

    /* Enhanced loading spinner */
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(37, 99, 235, 0.3);
        border-top: 3px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Glowing text effect */
    .glow-text {
        text-shadow: 
            0 0 5px rgba(37, 99, 235, 0.5),
            0 0 10px rgba(37, 99, 235, 0.3),
            0 0 15px rgba(37, 99, 235, 0.2);
        animation: textGlow 2s ease-in-out infinite alternate;
    }

    @keyframes textGlow {
        from {
            text-shadow: 
                0 0 5px rgba(37, 99, 235, 0.5),
                0 0 10px rgba(37, 99, 235, 0.3),
                0 0 15px rgba(37, 99, 235, 0.2);
        }
        to {
            text-shadow: 
                0 0 10px rgba(37, 99, 235, 0.8),
                0 0 20px rgba(37, 99, 235, 0.6),
                0 0 30px rgba(37, 99, 235, 0.4);
        }
    }
`;

document.head.appendChild(style);
