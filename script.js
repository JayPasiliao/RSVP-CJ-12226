// ==========================================
// INITIALIZE ALL FUNCTIONALITY AFTER DOM IS READY
// ==========================================
'use strict';

// Google Apps Script Web App URL - Connected to your Google Sheet
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtCS_qnXGzgESHs7JxovpnaVHZuDWr4LoXRiW3ePQRNk_Iqn56lxEAL4QfWyF_30HH/exec';
// Target Sheet: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit

// Prevent FOUC (Flash of Unstyled Content) by ensuring body is visible
if (document.readyState === 'loading' && document.body) {
    document.body.style.opacity = '1';
}

// Wait for DOM to be fully loaded
function init() {
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initNavigationScroll();
    initParallaxEffect();
    initCardEffects();
    initCountdownTimer();
    initGlitterEffect();
    initActiveNavigation();
    initGlassCardTilt();
    initMobileMenu();
    initPreloadImages();
    initLazyMaps();
    initGalleryFiltering();
    initGalleryAlbumTabs();
    initVideoLightbox();
    initRSVPForm();
    initPhotoClickHandlers();
    initRevealOnScroll();
    
    // Initialize delayed features
    setTimeout(initFolderTiles, 1000);
    setTimeout(initMovingGalleries, 1500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded
    init();
}

// ==========================================
// THEME TOGGLE - LIGHT/DARK MODE
// ==========================================
function initThemeToggle() {
const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
const body = document.body;
const icon = themeToggle.querySelector('i');
    if (!icon) return;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});
}

// ==========================================
// NAVIGATION BACKGROUND ON SCROLL
// ==========================================
function initNavigationScroll() {
const nav = document.querySelector('.nav-glass');
    if (!nav) return;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
function initParallaxEffect() {
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const glitters = document.querySelectorAll('.glitter');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
    
    glitters.forEach((glitter, index) => {
        glitter.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
    });
});
}

// ==========================================
// CARD FLIP EFFECT ON HOVER
// ==========================================
function initCardEffects() {
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});
}

// ==========================================
// VIDEO PLAYBACK FUNCTIONALITY
// ==========================================
function playVideo() {
    const video = document.getElementById('sampleVideo');
    const playButton = document.querySelector('.video-play-button');
    
    if (video && playButton) {
        // Enable controls and play video
        video.controls = true;
        video.play().catch(error => {
            console.log('Video autoplay prevented:', error);
            // If autoplay fails, show controls for manual play
            video.controls = true;
        });
        
        // Hide play button overlay
        playButton.classList.add('hidden');
    }
}

// Auto-play hero video background
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    
    if (video) {
        // Set video properties for autoplay
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        
        // Force play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Hero video is playing automatically');
            }).catch(error => {
                console.log('Hero video autoplay failed:', error);
                // Retry after a short delay
                setTimeout(() => {
                    video.play().catch(() => {});
                }, 1000);
            });
        }
    }
}

// ==========================================
// COUNTDOWN TIMER
// ==========================================
function initCountdownTimer() {
function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
        
    const weddingDate = new Date('2026-01-22T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        // Wedding day has passed
            daysEl.textContent = '000';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        
        // Update countdown title
        const countdownTitle = document.querySelector('.countdown-title');
        if (countdownTitle) {
            countdownTitle.textContent = 'Just Married! 💕';
        }
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update countdown display with proper formatting
        daysEl.textContent = days.toString().padStart(3, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    
    // Add animation effect when numbers change
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.style.transform = 'scale(1.1)';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 200);
    });
}

    // Initialize countdown
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);
}

// ==========================================
// GLITTER CURSOR EFFECT (Optional Enhancement)
// ==========================================
function initGlitterEffect() {
let glitterTimeout;
    
    // Add glitter animation CSS dynamically
    if (!document.getElementById('glitter-styles')) {
        const style = document.createElement('style');
        style.id = 'glitter-styles';
        style.textContent = `
            @keyframes glitterFade {
                0% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

document.addEventListener('mousemove', (e) => {
    clearTimeout(glitterTimeout);
    
    glitterTimeout = setTimeout(() => {
        const glitter = document.createElement('div');
        glitter.className = 'cursor-glitter';
        glitter.style.left = e.pageX + 'px';
        glitter.style.top = e.pageY + 'px';
        
        const colors = ['#e8b4b8', '#d4af37', '#f4d03f'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        glitter.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            background: ${randomColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: glitterFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(glitter);
        
        setTimeout(() => {
            glitter.remove();
        }, 1000);
    }, 50);
});
}

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================
function initActiveNavigation() {
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
}

// ==========================================
// GLASS CARD TILT EFFECT
// ==========================================
function initGlassCardTilt() {
document.querySelectorAll('.glass-card').forEach(card => {
    // Skip tilt effect for RSVP form
    if (card.classList.contains('rsvp-form')) {
        return;
    }
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
}

// ==========================================
// MOBILE MENU TOGGLE (For smaller screens)
// ==========================================
function initMobileMenu() {
function createMobileMenu() {
    if (window.innerWidth <= 480) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
            
            if (!navContainer || !navMenu) return;
        
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.style.cssText = `
                background: linear-gradient(135deg, var(--rose-gold), var(--gold));
                border: none;
                color: white;
                font-size: 1.5rem;
                padding: 0.5rem 1rem;
                border-radius: 10px;
                cursor: pointer;
            `;
            
            menuToggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                if (navMenu.style.display === 'flex') {
                    navMenu.style.cssText = `
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(255, 255, 255, 0.95);
                        flex-direction: column;
                        padding: 1rem;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    `;
                }
            });
            
            navContainer.appendChild(menuToggle);
        }
    }
}

window.addEventListener('resize', createMobileMenu);
createMobileMenu();
}

// ==========================================
// PRELOAD IMAGES (If you add background images)
// ==========================================
function initPreloadImages() {
    // Add any background images you want to preload
    const images = [];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==========================================
// LAZY LOADING FOR MAPS
// ==========================================
function initLazyMaps() {
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
            }
        }
    });
});

document.querySelectorAll('.map-container').forEach(map => {
    mapObserver.observe(map);
});
}

// ==========================================
// REVEAL ON SCROLL ANIMATION
// ==========================================
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                const delayMs = parseInt(delay);
                // Apply CSS custom property for transition delay
                if (delayMs > 0) {
                    entry.target.style.setProperty('--delay', delayMs);
                }
                // Apply delay for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delayMs);
                // Unobserve after revealing to prevent re-triggering
                observer.unobserve(entry.target);
            }
    });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
});
}

// ==========================================
// GALLERY FILTERING - PILL TABS
// ==========================================
function initGalleryFiltering() {
    const filterPills = document.querySelectorAll('.filter-pill-modern, .filter-pill');
    const movingGalleries = document.querySelectorAll('.story-panel-modern, .moving-gallery-section');
    const galleryGridViews = document.querySelectorAll('.gallery-grid-view');
    
    if (filterPills.length === 0) return;
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
                
            // Get the category
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                // Show all moving galleries, hide grid views
                movingGalleries.forEach(gallery => {
                    gallery.style.display = 'block';
                    gallery.style.opacity = '0';
                setTimeout(() => {
                        gallery.style.transition = 'opacity 0.6s ease';
                        gallery.style.opacity = '1';
                    }, 50);
            });
            
                galleryGridViews.forEach(grid => {
                    grid.style.display = 'none';
                });
            } else {
                // Hide all moving galleries
                movingGalleries.forEach(gallery => {
                    gallery.style.transition = 'opacity 0.4s ease';
                    gallery.style.opacity = '0';
                    setTimeout(() => {
                        gallery.style.display = 'none';
                    }, 400);
        });
        
                // Show the corresponding grid view
                galleryGridViews.forEach(grid => {
                    const gridCategory = grid.getAttribute('data-category');
                    if (gridCategory === category) {
                        grid.style.display = 'block';
                        grid.style.opacity = '0';
            setTimeout(() => {
                            grid.style.transition = 'opacity 0.6s ease';
                            grid.style.opacity = '1';
                        }, 50);
                    } else {
                        grid.style.display = 'none';
                    }
    });
}
        });
    });
    
    // Add click handlers to gallery grid items
    const galleryGridItems = document.querySelectorAll('.gallery-grid-item');
    galleryGridItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openPhotoModalFromGrid(img.src, img.alt);
            }
        });
    });
}

// Function to open photo modal from grid view
function openPhotoModalFromGrid(imageSrc, imageAlt) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        if (modalTitle) modalTitle.textContent = imageAlt || 'Photo';
        if (modalDescription) modalDescription.textContent = '';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}


function openFolder(folderTile) {
    // Remove active class from all folders
    document.querySelectorAll('.folder-tile').forEach(tile => {
        tile.classList.remove('active');
        tile.style.animationPlayState = 'running';
    });
    
    // Add active class to clicked folder
    folderTile.classList.add('active');
    folderTile.style.animationPlayState = 'paused';
    
    // Get photo data
    const photoNumber = folderTile.getAttribute('data-photo');
    const image = folderTile.querySelector('.folder-image');
    const label = folderTile.querySelector('.folder-label');
    
    // Create photo data for modal
    const photoData = {
        src: image.src,
        alt: image.alt,
        title: label.textContent,
        description: `Proposal Photo ${photoNumber} - ${label.textContent}`
    };
    
    // Open photo modal
    openPhotoModal(photoData);
    
    // Add ripple effect
    createRippleEffect(folderTile);
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// PHOTO MODAL FUNCTIONALITY
// ==========================================
let currentPhotoIndex = 0;
let currentPhotos = [];

// Photo data for each album
const photoData = {
    proposal: [
        { src: 'proposal-1.jpg', title: 'The Proposal', description: 'A magical moment when Jay asked Christine to be his forever' },
        { src: 'proposal-2.jpg', title: 'Ring Exchange', description: 'The beautiful ring that sealed their promise' },
        { src: 'proposal-3.jpg', title: 'Joyful Tears', description: 'Tears of happiness and love' },
        { src: 'proposal-4.jpg', title: 'First Kiss as Engaged', description: 'Their first kiss as an engaged couple' },
        { src: 'proposal-5.jpg', title: 'Celebration', description: 'Celebrating with family and friends' },
        { src: 'proposal-6.jpg', title: 'Together Forever', description: 'The beginning of their forever journey' },
        { src: 'proposal-7.jpg', title: 'Love Story', description: 'A new chapter in their love story' }
    ],
    prenup: [
        { src: 'prenup-1.jpg', title: 'Pre-Nuptial Session', description: 'Capturing their love before the big day' },
        { src: 'prenup-2.jpg', title: 'Romantic Moments', description: 'Sweet moments between the couple' },
        { src: 'prenup-3.jpg', title: 'Elegant Poses', description: 'Beautiful poses showcasing their love' },
        { src: 'prenup-4.jpg', title: 'Natural Beauty', description: 'Natural and candid moments' },
        { src: 'prenup-5.jpg', title: 'Love in Motion', description: 'Dynamic shots of their relationship' },
        { src: 'prenup-6.jpg', title: 'Perfect Match', description: 'Two souls perfectly matched' }
    ],
    highlights: [
        { src: 'highlight-1.jpg', title: 'Special Moments', description: 'Cherished memories from their journey' },
        { src: 'highlight-2.jpg', title: 'Love Story', description: 'The beautiful story of Christine and Jay' },
        { src: 'highlight-3.jpg', title: 'Forever Together', description: 'Moments that will last forever' }
    ]
};


function openPhotoModal(category, photoIndex) {
    currentPhotos = photoData[category] || [];
    currentPhotoIndex = photoIndex;
    
    if (currentPhotos.length === 0) return;
    
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const photo = currentPhotos[currentPhotoIndex];
    modalImage.src = photo.src;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function nextPhoto() {
    if (currentPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    updateModalPhoto();
}

function previousPhoto() {
    if (currentPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    updateModalPhoto();
}

function updateModalPhoto() {
    const photo = currentPhotos[currentPhotoIndex];
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = photo.src;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('photoModal');
    if (!modal.classList.contains('show')) return;
    
    switch(e.key) {
        case 'Escape':
            closePhotoModal();
            break;
        case 'ArrowLeft':
            previousPhoto();
            break;
        case 'ArrowRight':
            nextPhoto();
            break;
    }
});

// ==========================================
// RSVP FORM SUBMISSION TO GOOGLE SHEETS
// ==========================================
// Google Apps Script Web App URL - Connected to your Google Sheet
// ==========================================
// RSVP FORM INITIALIZATION
// ==========================================
function initRSVPForm() {
const rsvpForm = document.getElementById('rsvpForm');
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearFormMessages();
        
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID_HERE')) {
            showFormMessage('error', '⚠️ RSVP form is not yet connected to Google Sheets. Please follow the setup instructions in QUICK_START_RSVP.md');
            console.error('Google Apps Script URL not configured. Please update GOOGLE_SCRIPT_URL in script.js');
            return;
        }
        
        console.log('Form submission started');
        console.log('Target URL:', GOOGLE_SCRIPT_URL);
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value.trim());
        formData.append('address', document.getElementById('address').value.trim());
        formData.append('contactNumber', document.getElementById('contactNumber').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('facebook', document.getElementById('facebook').value.trim());
        formData.append('confirmation', document.getElementById('confirmation').value);
        formData.append('message', document.getElementById('message').value.trim() || '');
        formData.append('numGuests', document.getElementById('numGuests').value);
        formData.append('relationship', document.getElementById('relationship').value);
        
        // Log submission attempt
        console.log('Submitting RSVP to:', GOOGLE_SCRIPT_URL);
        console.log('Form data:', {
            name: document.getElementById('name').value.trim(),
            address: document.getElementById('address').value.trim(),
            contactNumber: document.getElementById('contactNumber').value.trim(),
            email: document.getElementById('email').value.trim(),
            confirmation: document.getElementById('confirmation').value,
            numGuests: document.getElementById('numGuests').value
        });
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Submit to Google Sheets using FormData
            console.log('📤 Sending request to Google Apps Script...');
            console.log('📋 FormData contents:');
            for (let pair of formData.entries()) {
                console.log('  ' + pair[0] + ': ' + pair[1]);
            }
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });
            
            console.log('📥 Response received!');
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            console.log('Response type:', response.type);
            
            // Try to parse response
            const result = await response.text();
            console.log('Response text:', result);
            
            // Check if submission was successful
            if (response.ok || result.includes('success') || result.includes('Success')) {
                console.log('✅ RSVP submitted successfully!');
                showFormMessage('success', '✓ Thank you! Your RSVP has been received. We look forward to celebrating with you! 🎉');
                rsvpForm.reset();
                
                // Scroll to success message
                setTimeout(() => {
                    document.getElementById('formMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } else {
                console.warn('Response not OK, trying no-cors mode...');
                throw new Error('Submission response not OK');
            }
            
        } catch (error) {
            console.error('Error submitting RSVP (first attempt):', error);
            
            // Try alternative submission method with no-cors
            // This is needed due to CORS restrictions from Google Apps Script
            try {
                console.log('Attempting submission with no-cors mode...');
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
                
                console.log('✅ RSVP submitted (no-cors mode)');
                // With no-cors we can't verify success, but if no error thrown, assume success
                showFormMessage('success', '✓ Thank you! Your RSVP has been received. We look forward to celebrating with you! 🎉');
                rsvpForm.reset();
                
                setTimeout(() => {
                    document.getElementById('formMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } catch (finalError) {
                console.error('❌ Final error submitting RSVP:', finalError);
                showFormMessage('error', '✗ Sorry, there was an error submitting your RSVP. Please contact us directly: Jay (0917 153 9062) or Christine (0917 122 9492)');
            }
        } finally {
            setLoadingState(false);
        }
    });
}

function validateForm() {
    let isValid = true;
    
    // Validate Name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        name.classList.add('error');
        isValid = false;
    } else {
        nameError.textContent = '';
        name.classList.remove('error');
    }
    
    // Validate Address
    const address = document.getElementById('address');
    const addressError = document.getElementById('addressError');
    if (!address.value.trim()) {
        addressError.textContent = 'Address is required';
        address.classList.add('error');
        isValid = false;
    } else {
        addressError.textContent = '';
        address.classList.remove('error');
    }
    
    // Validate Contact Number
    const contactNumber = document.getElementById('contactNumber');
    const contactNumberError = document.getElementById('contactNumberError');
    if (!contactNumber.value.trim()) {
        contactNumberError.textContent = 'Contact number is required';
        contactNumber.classList.add('error');
        isValid = false;
    } else {
        contactNumberError.textContent = '';
        contactNumber.classList.remove('error');
    }
    
    // Validate Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        email.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.remove('error');
    }
    
    // Validate Facebook
    const facebook = document.getElementById('facebook');
    const facebookError = document.getElementById('facebookError');
    if (!facebook.value.trim()) {
        facebookError.textContent = 'Facebook profile is required';
        facebook.classList.add('error');
        isValid = false;
    } else {
        facebookError.textContent = '';
        facebook.classList.remove('error');
    }
    
    // Validate Confirmation
    const confirmation = document.getElementById('confirmation');
    const confirmationError = document.getElementById('confirmationError');
    if (!confirmation.value) {
        confirmationError.textContent = 'Please select your confirmation';
        confirmation.classList.add('error');
        isValid = false;
    } else {
        confirmationError.textContent = '';
        confirmation.classList.remove('error');
    }
    
    // Validate Number of Guests
    const numGuests = document.getElementById('numGuests');
    const numGuestsError = document.getElementById('numGuestsError');
    if (!numGuests.value) {
        numGuestsError.textContent = 'Please select number of guests';
        numGuests.classList.add('error');
        isValid = false;
    } else {
        numGuestsError.textContent = '';
        numGuests.classList.remove('error');
    }
    
    // Validate Relationship
    const relationship = document.getElementById('relationship');
    const relationshipError = document.getElementById('relationshipError');
    if (!relationship.value) {
        relationshipError.textContent = 'Please select your relationship';
        relationship.classList.add('error');
        isValid = false;
    } else {
        relationshipError.textContent = '';
        relationship.classList.remove('error');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setLoadingState(loading) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

function clearFormMessages() {
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
}

// ==========================================
// VIDEO LIGHTBOX FUNCTIONALITY
// ==========================================
function openVideoLightbox(videoType, videoSrc, videoId) {
    const lightbox = document.getElementById('videoLightbox');
    const videoEmbed = document.getElementById('videoEmbed');
    
    if (!lightbox || !videoEmbed) {
        console.error('Video lightbox elements not found');
        return;
    }
    
    // Clear previous content
    videoEmbed.innerHTML = '';
    
    let videoElement;
    
    if (videoType === 'mp4') {
        // Create video element for MP4
        videoElement = document.createElement('video');
        videoElement.src = videoSrc;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.background = '#000';
        videoEmbed.appendChild(videoElement);
    } else if (videoType === 'youtube') {
        // Create iframe for YouTube
        videoElement = document.createElement('iframe');
        videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        videoElement.allowFullscreen = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.border = 'none';
        videoEmbed.appendChild(videoElement);
    } else if (videoType === 'vimeo') {
        // Create iframe for Vimeo
        videoElement = document.createElement('iframe');
        videoElement.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
        videoElement.allow = 'autoplay; fullscreen; picture-in-picture';
        videoElement.allowFullscreen = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.border = 'none';
        videoEmbed.appendChild(videoElement);
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoLightbox() {
    const lightbox = document.getElementById('videoLightbox');
    const videoEmbed = document.getElementById('videoEmbed');
    
    if (!lightbox) return;
    
    // Stop video playback
    const video = videoEmbed.querySelector('video');
    const iframe = videoEmbed.querySelector('iframe');
    
    if (video) {
        video.pause();
        video.src = '';
    }
    
    if (iframe) {
        iframe.src = '';
    }
    
    // Clear content
    videoEmbed.innerHTML = '';
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// VIDEO LIGHTBOX INITIALIZATION
// ==========================================
function initVideoLightbox() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoType = this.getAttribute('data-video-type');
            const videoSrc = this.getAttribute('data-video-src');
            const videoId = this.getAttribute('data-video-id');
            
            if (videoType && (videoSrc || videoId)) {
                openVideoLightbox(videoType, videoSrc, videoId);
            }
        });
    });
    
    // Close lightbox handlers
    const lightbox = document.getElementById('videoLightbox');
    if (lightbox) {
        const backdrop = lightbox.querySelector('.video-lightbox-backdrop');
        const closeBtn = lightbox.querySelector('.video-lightbox-close');
        
        if (backdrop) {
            backdrop.addEventListener('click', closeVideoLightbox);
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeVideoLightbox);
        }
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeVideoLightbox();
            }
        });
    }
}

// ==========================================
// MOVING GALLERY INTERACTIONS
// ==========================================
function initMovingGalleries() {
    const galleryTracks = document.querySelectorAll('.moving-gallery-track');
    
    galleryTracks.forEach(track => {
        // Add click events to photo cards
        const photoCards = track.querySelectorAll('.photo-card');
        photoCards.forEach(card => {
            card.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('.photo-title');
                
                // Create photo data for modal
                const photoData = {
                    src: img.src,
                    alt: img.alt,
                    title: title ? title.textContent : '',
                    description: `${title ? title.textContent : ''} - Wedding Photo`
                };
                
                // Open photo modal
                openPhotoModalFromGrid(photoData.src, photoData.alt);
                
                // Add click animation
                this.style.transform = 'translateY(-10px) scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Add hover pause effect
            card.addEventListener('mouseenter', function() {
                track.style.animationPlayState = 'paused';
            });
            
            card.addEventListener('mouseleave', function() {
                track.style.animationPlayState = 'running';
            });
        });
        
        // Add touch support for mobile
        track.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.animationPlayState = 'running';
            }, 1000);
        });
    });
}

// ==========================================
// FOLDER TILE INTERACTIONS
// ==========================================
function initFolderTiles() {
    const folderTiles = document.querySelectorAll('.folder-tile');
    
    folderTiles.forEach((tile, index) => {
        // Add staggered animation delay
        tile.style.animationDelay = `${index * 0.1}s`;
        
        // Add click event for folder opening
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            openFolder(this);
        });
        
        // Add hover effects
        tile.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tile.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.animationPlayState = 'running';
            }
        });
    });
}

// ==========================================
// GALLERY FILTERING - ALBUM STYLE
// ==========================================
function initGalleryAlbumTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryAlbums = document.querySelectorAll('.gallery-album');
    
    if (galleryTabs.length === 0 || galleryAlbums.length === 0) return;
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the category
            const category = this.getAttribute('data-category');
            
            // Filter gallery albums with smooth animation
            galleryAlbums.forEach(album => {
                const albumCategory = album.getAttribute('data-category');
                
                if (category === 'all' || albumCategory === category) {
                    // Show album
                    album.style.display = 'block';
                    album.style.opacity = '0';
                    album.style.transform = 'translateY(30px) scale(0.9)';
                    
                    setTimeout(() => {
                        album.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        album.style.opacity = '1';
                        album.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    // Hide album with animation
                    album.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    album.style.opacity = '0';
                    album.style.transform = 'translateY(-20px) scale(0.95)';
                    
                    setTimeout(() => {
                        album.style.display = 'none';
                    }, 400);
                }
            });
            
            // Add a subtle animation to the tab itself
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize gallery albums with transition
    galleryAlbums.forEach(album => {
        album.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add click animation to tabs
    galleryTabs.forEach(tab => {
        tab.style.transition = 'transform 0.2s ease';
    });
}

// ==========================================
// PHOTO CLICK HANDLERS
// ==========================================
function initPhotoClickHandlers() {
    // Add click events to main images
    document.querySelectorAll('.main-image').forEach((img, index) => {
        img.addEventListener('click', function() {
            const album = this.closest('.gallery-album');
            const category = album ? album.getAttribute('data-category') : null;
            if (category) {
                openPhotoModal(category, 0);
            }
        });
    });

    // Add click events to thumbnails
    document.querySelectorAll('.thumbnail').forEach((img, index) => {
        img.addEventListener('click', function() {
            const album = this.closest('.gallery-album');
            const category = album ? album.getAttribute('data-category') : null;
            if (category) {
                const thumbnailIndex = Array.from(this.parentNode.children).indexOf(this);
                openPhotoModal(category, thumbnailIndex + 1);
            }
        });
    });

    // Add click events to "more photos" indicators
    document.querySelectorAll('.more-photos').forEach((element, index) => {
        element.addEventListener('click', function() {
            const album = this.closest('.gallery-album');
            const category = album ? album.getAttribute('data-category') : null;
            if (category) {
                openPhotoModal(category, 3); // Start from the 4th photo
            }
        });
    });
}

console.log('🎉 Wedding Website Loaded Successfully!');
console.log('Christine Joyce & Jay - January 22, 2026 ❤️');


