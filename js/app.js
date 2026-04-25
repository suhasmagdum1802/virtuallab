/* app.js — Router, Theme, Initialization */

(function () {
    'use strict';

    const PAGES = ['home', 'aim', 'theory', 'simulation', 'test', 'references', 'contributors', 'feedback', 'contact'];

    /* ---- Theme ---- */
    function initTheme() {
        const saved = localStorage.getItem('vlab-theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);

        const checkbox = document.getElementById('themeCheckbox');
        if (checkbox) {
            checkbox.checked = saved === 'dark';
            checkbox.addEventListener('change', (e) => {
                const next = e.target.checked ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('vlab-theme', next);
            });
        }
    }

    /* ---- Mobile menu ---- */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const links = document.getElementById('navLinks');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            links.classList.toggle('open');
        });

        // Close on link click
        links.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                links.classList.remove('open');
            });
        });
    }

    /* ---- Navbar scroll ---- */
    function initNavScroll() {
        const nav = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    /* ---- Router ---- */
    function navigate(page) {
        if (!PAGES.includes(page)) page = 'home';

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show target page
        const target = document.getElementById(`page-${page}`);
        if (target) {
            target.classList.add('active');
        }

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Scroll to top
        window.scrollTo({ top: 0 });

        // Initialize page-specific stuff
        initPage(page);
    }

    function initPage(page) {
        const container = document.getElementById(`page-${page}`);
        if (!container) return;

        // Inject content if empty
        if (!container.dataset.loaded) {
            if (Pages[page]) {
                container.innerHTML = Pages[page]();
                container.dataset.loaded = 'true';
            }

            // Render KaTeX
            setTimeout(() => {
                if (typeof renderMathInElement === 'function') {
                    renderMathInElement(container, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '\\(', right: '\\)', display: false }
                        ],
                        throwOnError: false
                    });
                }
            }, 50);
        }

        // Page-specific init
        switch (page) {
            case 'simulation':
                setTimeout(() => Simulation.init(), 100);
                break;
            case 'test':
                setTimeout(() => Quiz.init(), 100);
                break;
            case 'feedback':
                setTimeout(() => initFeedbackForm(), 100);
                break;
            case 'contact':
                setTimeout(() => initContactForm(), 100);
                break;
        }
    }

    /* ---- Feedback Form ---- */
    function initFeedbackForm() {
        let rating = 0;
        document.querySelectorAll('#starRating .star').forEach(star => {
            star.addEventListener('click', () => {
                rating = parseInt(star.dataset.v);
                document.querySelectorAll('#starRating .star').forEach((s, i) => {
                    s.classList.toggle('active', i < rating);
                });
            });
        });

        document.getElementById('feedbackForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            showSuccessModal('Thank You! 🎉', 'Your feedback has been submitted successfully. We appreciate your time and input.');
            e.target.reset();
            rating = 0;
            document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('active'));
        });
    }

    /* ---- Contact Form ---- */
    function initContactForm() {
        document.getElementById('contactForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            showSuccessModal('Message Sent! ✉️', 'We have received your message and will get back to you shortly.');
            e.target.reset();
        });
    }

    /* ---- Success Modal ---- */
    function showSuccessModal(title, msg) {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `<div class="success-modal">
            <div class="success-icon">✅</div>
            <h3>${title}</h3>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">${msg}</p>
            <button class="btn btn-primary" onclick="this.closest('.success-overlay').remove()">Close</button>
        </div>`;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    }

    /* ---- Scroll animations ---- */
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    /* ---- Hash routing ---- */
    function handleHash() {
        const hash = window.location.hash.replace('#', '') || 'home';
        navigate(hash);
    }

    /* ---- Init ---- */
    function init() {
        initTheme();
        initMobileMenu();
        initNavScroll();

        // Handle hash changes
        window.addEventListener('hashchange', handleHash);

        // Initial navigation
        handleHash();

        // Scroll animations
        setTimeout(initScrollAnimations, 500);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
