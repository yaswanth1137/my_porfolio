document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a');

    function highlightActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Call once on load

    // Logo and nav-links color change based on scroll position
    const logo = document.querySelector('.logo');
    const navLinksContainer = document.querySelector('.nav-links');

    function updateNavbarColors() {
        const scrollY = window.pageYOffset;
        const contactSection = document.querySelector('.contact');
        const contactTop = contactSection.offsetTop;
        const contactHeight = contactSection.offsetHeight;

        if (scrollY >= contactTop - 100 && scrollY < contactTop + contactHeight) {
            logo.classList.add('white');
            navLinksContainer.classList.add('black');
        } else {
            logo.classList.remove('white');
            navLinksContainer.classList.remove('black');
        }
    }

    window.addEventListener('scroll', updateNavbarColors);
    updateNavbarColors(); // Call once on load

    const cursorGlow = document.getElementById('cursor-glow');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = `${currentX - 250}px`;
        cursorGlow.style.top = `${currentY - 250}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let isScrollingDown = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            if (!isScrollingDown) {
                navbar.style.transform = 'translateY(-100%)';
                isScrollingDown = true;
            }
        } else {
            // Scrolling up
            if (isScrollingDown) {
                navbar.style.transform = 'translateY(0)';
                isScrollingDown = false;
            }
        }

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(123, 63, 97, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .highlight-card').forEach(card => {
        observer.observe(card);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.btn, .contact-card, .project-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'scale(1.2)';
            cursorGlow.style.opacity = '0.15';
        });

        element.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'scale(1)';
            cursorGlow.style.opacity = '0.08';
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            let isValid = true;

            // Validate name
            if (!name) {
                showError('name', 'Name is required');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            if (!subject) {
                showError('subject', 'Subject is required');
                isValid = false;
            }

            // Validate message
            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
});
