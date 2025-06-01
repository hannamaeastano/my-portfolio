document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Create FormData object
            const formData = new FormData(this);
            
            // Send form data using Fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show thank you modal
                    const modal = new bootstrap.Modal(document.getElementById('thankYouModal'), {
                        backdrop: true, // Enable backdrop
                        keyboard: true  // Allow closing with ESC key
                    });
                    modal.show();
                    
                    // Reset form
                    this.reset();
                    
                    // Close modal after 5 seconds if not closed manually
                    setTimeout(() => {
                        if (document.body.classList.contains('modal-open')) {
                            modal.hide();
                        }
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem submitting your form. Please try again later.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }

    // Make sure modal can be closed by clicking backdrop
    document.getElementById('thankYouModal').addEventListener('click', function(e) {
        if (e.target === this) {
            const modal = bootstrap.Modal.getInstance(this);
            modal.hide();
        }
    });

    const okButton = document.querySelector('#thankYouModal .btn-primary');
    if (okButton) {
        okButton.addEventListener('click', function() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('thankYouModal'));
            modal.hide();
        });
    }
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add loaded class to body to trigger animations
    document.body.classList.add('loaded');
    
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    // Initialize animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    animateOnScroll();
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-lg, .hero-section .btn');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-animation');
    });
    
    // Add gradient border to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('gradient-border');
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
});