// ================= DARK MODE TOGGLE =================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    // Update icons based on theme
    function updateIcons(theme) {
        if (moonIcon && sunIcon) {
            moonIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
            sunIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
        }
    }

    // Initialize
    updateIcons(savedTheme);

    // Toggle on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });
}

// ================= MOBILE MENU (100% WORKING FINISHED VERSION) =================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks') || 
                     document.querySelector('.nav-links') || 
                     document.querySelector('.nav-links-simple');

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Handle link clicks - IMPORTANT FIX
        const links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            // Click handler for desktop/mobile
            link.addEventListener('click', function(e) {
                // Allow default navigation (don't prevent it!)
                console.log('Navigating to:', this.href);
                
                // Close menu after a small delay to ensure navigation starts
                setTimeout(function() {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }, 50);
            });
            
            // Touch handler specifically for mobile
            link.addEventListener('touchend', function(e) {
                // Don't prevent default - let touch work naturally
                setTimeout(function() {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }, 50);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Handle touch outside (for mobile)
        document.addEventListener('touchstart', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// ================= CONTACT FORM (SAFE CHECK) =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Check if form uses mailto (no action attribute or action is #)
    const isMailtoForm = !contactForm.action || contactForm.action.includes(window.location.href);
    
    if (isMailtoForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('senderName')?.value || '';
            const email = document.getElementById('senderEmail')?.value || '';
            const message = document.getElementById('senderMessage')?.value || '';
            const successDiv = document.getElementById('formSuccess');

            if (!name || !email || !message) {
                alert('Please fill all fields');
                return;
            }

            // Mailto link structure
            const subject = `Message from ${name} via Portfolio Website`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            // Open email client
            window.location.href = `mailto:bablu.kumar7879626@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Show success message if exists
            if (successDiv) {
                successDiv.style.display = 'block';
                setTimeout(() => {
                    successDiv.style.display = 'none';
                }, 5000);
            }

            // Reset form
            this.reset();
        });
    }
}

// ================= UPCOMING VIDEO - COMING SOON LOGIC =================
document.addEventListener('DOMContentLoaded', () => {
    const upcomingCards = document.querySelectorAll('.video-card.upcoming');

    upcomingCards.forEach(card => {
        const playIcon = card.querySelector('.play-icon');

        // Disable click
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showComingSoonToast();
        });

        // Small hover animation
        card.addEventListener('mouseenter', () => {
            card.classList.add('pulse');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('pulse');
        });
    });

    // Toast message function
    function showComingSoonToast() {
        let toast = document.getElementById('comingSoonToast');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'comingSoonToast';
            toast.innerText = '🚀 Video coming soon! Stay tuned...';
            document.body.appendChild(toast);
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
});


// ================= HERO SLIDER (OPTIONAL) =================
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.hero-slider');

if (slides.length > 0 && sliderContainer) {
    let currentSlide = 0;
    let autoSlide;
    const slideInterval = 5000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    // Initialize
    showSlide(0);
    autoSlide = setInterval(nextSlide, slideInterval);

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    // Button controls (if exist)
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
            resetAutoSlide();
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    }
}