// Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.initializeIcons();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupHero();
        this.setupSkillsAnimation();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupScrollToTop();
        this.setupIntersectionObserver();
    }

    // Initialize Lucide icons
    initializeIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Navigation functionality
    setupNavigation() {
        const nav = document.querySelector('.nav');
        
        // Handle scroll for navbar background
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Handle navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.scrollToSection(target);
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                const toggleBtn = document.getElementById('mobileMenuToggle');
                mobileMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
            });
        });
    }

    // Theme toggle functionality
    setupThemeToggle() {
        const themeToggles = document.querySelectorAll('.theme-toggle');
        
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const html = document.documentElement;
                const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.classList.remove(currentTheme);
                html.classList.add(newTheme);
                
                localStorage.setItem('theme', newTheme);
            });
        });

        // Apply saved theme on load
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.className = savedTheme;
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                mobileMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
            } else {
                mobileMenu.classList.add('show');
                mobileMenuToggle.classList.add('active');
            }
        });
    }

    // Hero section typing animation
    setupHero() {
        const typingText = document.getElementById('typingText');
        const typingCursor = document.getElementById('typingCursor');
        const fullText = "Full Stack Developer";
        let index = 0;

        const typeText = () => {
            if (index < fullText.length) {
                typingText.textContent = fullText.slice(0, index + 1);
                index++;
                setTimeout(typeText, 100);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeText, 1000);

        // Cursor blinking animation
        setInterval(() => {
            typingCursor.style.opacity = typingCursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Skills progress bars animation
    setupSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBar = (bar) => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        };

        // Animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target.querySelector('.skill-progress');
                    if (skillBar) {
                        setTimeout(() => animateSkillBar(skillBar), 200);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }

    // Project filters functionality
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update button styles
                filterButtons.forEach(btn => {
                    if (btn === button) {
                        btn.classList.remove('btn-outline');
                        btn.classList.add('btn-primary');
                    } else {
                        btn.classList.remove('btn-primary');
                        btn.classList.add('btn-outline');
                    }
                });

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact form functionality
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            console.log('Form submitted:', data);
            
            // Show success toast
            this.showToast('Message sent!', 'Thank you for your message. I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll to top functionality
    setupScrollToTop() {
        // This is handled by the global scrollToTop function
    }

    // Intersection observer for active nav links
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    navLinks.forEach(link => {
                        const linkSection = link.dataset.section;
                        if (linkSection === sectionId) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Utility function to scroll to section
    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Show toast notification
    showToast(title, message) {
        const toast = document.getElementById('toast');
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideToast();
        }, 5000);
    }

    // Hide toast notification
    hideToast() {
        const toast = document.getElementById('toast');
        toast.classList.remove('show');
    }
}

// Global functions (called by HTML elements)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadCV() {
    console.log('Download CV triggered');
    // TODO: Add actual CV download functionality
    // window.open('/path-to-cv.pdf', '_blank');
    portfolio.showToast('CV Download', 'CV download feature coming soon!');
}

function openProject(type, project) {
    console.log(`Opening ${type} for project: ${project}`);
    // TODO: Replace with actual URLs
    const urls = {
        github: {
            ecommerce: 'https://github.com/example/ecommerce',
            taskmanager: 'https://github.com/example/taskmanager',
            weather: 'https://github.com/example/weather',
            'api-gateway': 'https://github.com/example/api-gateway',
            'chat-app': 'https://github.com/example/chat-app',
            analytics: 'https://github.com/example/analytics'
        },
        demo: {
            ecommerce: 'https://demo-ecommerce.com',
            taskmanager: 'https://demo-taskmanager.com',
            weather: 'https://demo-weather.com',
            'chat-app': 'https://demo-chat.com'
        }
    };
    
    const url = urls[type] && urls[type][project];
    if (url) {
        // window.open(url, '_blank');
        portfolio.showToast('Project Link', `Would open: ${url}`);
    }
}

function viewAllProjects() {
    console.log('View all projects triggered');
    // window.open('https://github.com/your-username', '_blank');
    portfolio.showToast('GitHub Profile', 'Would open GitHub profile with all projects');
}

function contactAction(type) {
    console.log(`Contact action: ${type}`);
    const actions = {
        email: 'mailto:john.doe@example.com',
        phone: 'tel:+15551234567',
        location: 'https://maps.google.com?q=San Francisco, CA'
    };
    
    const action = actions[type];
    if (action) {
        // window.open(action, type === 'location' ? '_blank' : '_self');
        portfolio.showToast('Contact Action', `Would ${type === 'email' ? 'open email client' : type === 'phone' ? 'initiate call' : 'open maps'}`);
    }
}

function openSocial(platform) {
    console.log(`Opening ${platform}`);
    const urls = {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
    };
    
    const url = urls[platform];
    if (url) {
        // window.open(url, '_blank');
        portfolio.showToast('Social Link', `Would open: ${url}`);
    }
}

function hideToast() {
    if (window.portfolio) {
        portfolio.hideToast();
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});

// Reinitialize icons after any dynamic content changes
document.addEventListener('DOMContentLoaded', () => {
    // Reinitialize Lucide icons after a short delay to ensure all content is loaded
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});