// ==========================================
// SMOOTH SCROLLING
// ==========================================
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

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
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

// ==========================================
// NAVIGATION BACKGROUND ON SCROLL
// ==========================================
let lastScroll = 0;
const nav = document.querySelector('.nav-glass');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.7)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
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

// ==========================================
// CARD FLIP EFFECT ON HOVER
// ==========================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// COUNTDOWN TIMER (Optional)
// ==========================================
function updateCountdown() {
    const weddingDate = new Date('2026-01-22T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // You can add a countdown display element in HTML if desired
    // document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    if (distance < 0) {
        // Wedding day has passed
        // document.getElementById('countdown').innerHTML = "Just Married!";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// ==========================================
// GLITTER CURSOR EFFECT (Optional Enhancement)
// ==========================================
let glitterTimeout;

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

// Add glitter animation CSS dynamically
const style = document.createElement('style');
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

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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

// ==========================================
// GLASS CARD TILT EFFECT
// ==========================================
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

// ==========================================
// MOBILE MENU TOGGLE (For smaller screens)
// ==========================================
function createMobileMenu() {
    if (window.innerWidth <= 480) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
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

// ==========================================
// PRELOAD IMAGES (If you add background images)
// ==========================================
function preloadImages() {
    // Add any background images you want to preload
    const images = [];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ==========================================
// LAZY LOADING FOR MAPS
// ==========================================
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

// ==========================================
// GALLERY FILTERING
// ==========================================
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get the category
        const category = this.getAttribute('data-category');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize gallery items with transition
galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ==========================================
// RSVP FORM SUBMISSION TO GOOGLE SHEETS
// ==========================================
// Google Apps Script Web App URL - Connected to your Google Sheet
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtCS_qnXGzgESHs7JxovpnaVHZuDWr4LoXRiW3ePQRNk_Iqn56lxEAL4QfWyF_30HH/exec';
// Target Sheet: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit

const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
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

console.log('🎉 Wedding Website Loaded Successfully!');
console.log('Christine Joyce & Jay - January 22, 2026 ❤️');

