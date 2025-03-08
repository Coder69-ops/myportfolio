document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Project filtering with animations
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectFilters.length > 0 && projectCards.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update ARIA states
                projectFilters.forEach(item => {
                    item.setAttribute('aria-pressed', 'false');
                    item.classList.remove('bg-primary', 'text-white');
                    item.classList.add('hover:bg-primary/10');
                });
                
                this.setAttribute('aria-pressed', 'true');
                this.classList.add('bg-primary', 'text-white');
                this.classList.remove('hover:bg-primary/10');
                
                // Animate cards out
                projectCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                });
                
                // Show/hide projects after fade out
                setTimeout(() => {
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            // Trigger reflow
                            void card.offsetWidth;
                            // Animate back in
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }, 300);
            });
        });
    }
    
    // Initialize skill bars animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach(bar => {
        skillObserver.observe(bar);
    });

    // Tech icons stagger animation
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
    });

    // Profile card background animation
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        window.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            profileCard.style.setProperty('--mouse-x', `${x}px`);
            profileCard.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // Education and Experience cards animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('.education-card, .experience-card').forEach(card => {
        cardObserver.observe(card);
    });
    
    // Lazy loading images with loading animation
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.addEventListener('load', function() {
            // Remove loading animation class when image loads
            this.closest('.image-wrapper')?.classList.remove('shimmer');
        });
    });
    
    // Contact form handling (on contact page)
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real-world scenario, you'd handle the form submission with AJAX
            // For this demo, we'll just show the success message
            
            // Clear form fields
            contactForm.reset();
            
            // Show success message
            formSuccess.classList.remove('hidden');
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.classList.add('hidden');
            }, 5000);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Scroll indicator interaction
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Scroll to the next section
            const nextSection = document.querySelector('.hero').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Parallax effect for the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = heroSection.offsetHeight;
            
            // Only apply parallax when the hero is in view
            if (scrollTop <= heroHeight) {
                // Parallax for floating shapes
                const shapes = document.querySelectorAll('.floating-shape');
                shapes.forEach((shape, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = -(scrollTop * speed);
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                
                // Fade out the hero content as user scrolls down
                const heroContent = document.querySelector('.hero .container');
                if (heroContent) {
                    const opacity = 1 - (scrollTop / heroHeight * 1.5);
                    heroContent.style.opacity = Math.max(opacity, 0);
                }
            }
        });
    }
    
    // Optional: Add dark/light mode toggle functionality
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // You could add a toggle button and additional CSS classes to implement this feature
    
    // Initialize Intersection Observer for project cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe all project cards for scroll-based animation
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        projectObserver.observe(card);
    });
});

// Add a simple animation when the page loads
window.addEventListener('load', function() {
    // Animate fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100 * index);
    });
    
    // Initialize scroll reveal for services section
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Create an intersection observer to animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get any delay attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Add visible class after the specified delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Unobserve the element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each service card
    document.querySelectorAll('.service-card, .fade-in').forEach(card => {
        observer.observe(card);
    });
});