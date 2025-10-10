document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('-translate-x-full');
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('#desktop-menu a[href^="#"], #mobile-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu on link click
            if (!mobileMenu.classList.contains('-translate-x-full')) {
                mobileMenu.classList.add('-translate-x-full');
            }
        });
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#desktop-menu a, #mobile-menu a');

    // --- Observer for Nav Link Highlighting ---
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    // --- Observer for Reveal Animations ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.target.classList.contains('reveal') && entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-5');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    // Observe all sections and reveal elements with their respective observers
    sections.forEach(section => navObserver.observe(section));
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- tsParticles Animation for Hero Section ---
    if (document.getElementById('tsparticles')) {
        tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "transparent" // Hero section already has a gradient
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: false, // No click interaction
                        mode: "push"
                    },
                    onHover: {
                        enable: true, // Enable hover interaction
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: "#4f46e5" // Indigo-600 particles
                },
                links: {
                    enable: false, // Disable links for a cleaner, more subtle effect
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "out" },
                    random: true,
                    speed: 0.5, // Slow movement
                    straight: false
                },
                number: { density: { enable: true, area: 800 }, value: 30 }, // Fewer particles
                opacity: { value: { min: 0.1, max: 0.3 }, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } }, // Very low opacity
                shape: { type: "circle" },
                size: { value: { min: 0.5, max: 1.5 }, random: true, anim: { enable: true, speed: 0.5, size_min: 0.1, sync: false } } // Very small particles
            },
            detectRetina: true
        });
    }
    // --- Typed.js Animation for Hero Section ---
    if (document.getElementById('typed-text')) {
        const typedOptions = {
            strings: [
                'Full Stack Developer.',
                'Generative AI Enthusiast.',
                'Creative Problem Solver.',
                'Lifelong Learner.'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        };

        new Typed('#typed-text', typedOptions);
    }

    // --- Carousel Navigation (Projects & Certifications) ---
    function setupCarouselNavigation(containerId, prevBtnId, nextBtnId) {
        const swipeContainer = document.getElementById(containerId);
        const prevButton = document.getElementById(prevBtnId);
        const nextButton = document.getElementById(nextBtnId);

        if (!swipeContainer || !prevButton || !nextButton) return;

        const scrollItem = () => {
            // Calculate scroll amount based on the first child's width + gap
            const firstChild = swipeContainer.firstElementChild;
            if (!firstChild) return 0;
            const itemWidth = firstChild.offsetWidth;
            const gap = parseInt(window.getComputedStyle(swipeContainer).gap);
            return itemWidth + gap;
        };

        nextButton.addEventListener('click', () => {
            swipeContainer.scrollBy({ left: scrollItem(), behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            swipeContainer.scrollBy({ left: -scrollItem(), behavior: 'smooth' });
        });

        // Optional: Hide/show buttons if at start/end (more complex, but good for UX)
        // For simplicity, we'll just enable them always for now.
    }

    // --- Click vs. Swipe detection for Project Cards ---
    const projectCards = document.querySelectorAll('[data-project-link]');
    projectCards.forEach(card => {
        let isDragging = false;
        let startX, startY;

        card.addEventListener('mousedown', (e) => {
            isDragging = false;
            startX = e.pageX;
            startY = e.pageY;
        });

        card.addEventListener('mousemove', (e) => {
            // If the mouse moves more than a few pixels, assume it's a drag/swipe
            if (Math.abs(e.pageX - startX) > 10 || Math.abs(e.pageY - startY) > 10) {
                isDragging = true;
            }
        });

        card.addEventListener('click', (e) => {
            // If the mouse was dragged, prevent the click from navigating
            if (isDragging) {
                e.preventDefault();
            } else {
                // This was a true click, let the browser navigate
                // The default behavior of the <a> tag will handle the navigation
            }
        });
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupCarouselNavigation('projects-swipe-container', 'projects-prev', 'projects-next');
    setupCarouselNavigation('certifications-swipe-container', 'certs-prev', 'certs-next');
});