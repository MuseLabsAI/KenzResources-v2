// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .leader-card, .highlight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Statistics
const counters = document.querySelectorAll('.stat h3, .opp-stat h3');
const speed = 200;

const animateCounter = (counter) => {
    const target = counter.innerText;
    const isPercentage = target.includes('%');
    const isKm = target.includes('km²');
    const isDollar = target.includes('$');
    
    let finalNumber;
    if (isPercentage) {
        finalNumber = parseInt(target.replace('%', ''));
    } else if (isKm) {
        finalNumber = parseInt(target.replace(' km²', ''));
    } else if (isDollar) {
        finalNumber = parseFloat(target.replace('$', '').replace(' Trillion', '')) * 10;
    } else if (target === '2nd Largest') {
        counter.innerText = '2nd Largest';
        return;
    } else {
        finalNumber = parseInt(target);
    }
    
    const increment = finalNumber / speed;
    let currentNumber = 0;
    
    const updateCounter = () => {
        currentNumber += increment;
        if (currentNumber < finalNumber) {
            if (isDollar) {
                counter.innerText = `$${(currentNumber / 10).toFixed(1)} Trillion`;
            } else if (isPercentage) {
                counter.innerText = Math.ceil(currentNumber) + '%';
            } else if (isKm) {
                counter.innerText = Math.ceil(currentNumber) + ' km²';
            } else {
                counter.innerText = Math.ceil(currentNumber);
            }
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
};

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = -scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Kenz Global Resources Ltd. All rights reserved.`;
}

// Password Protection System
const PASSWORD = "KENZ@123";
let isAuthenticated = false;

// Check if user is already authenticated (stored in session)
window.addEventListener('load', () => {
    const storedAuth = sessionStorage.getItem('kenzAuthenticated');
    if (storedAuth === 'true') {
        isAuthenticated = true;
        hidePasswordOverlay();
    } else {
        showPasswordOverlay();
    }
});

// Show password overlay
function showPasswordOverlay() {
    document.body.classList.add('password-protected');
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
    
    // Focus on password input
    setTimeout(() => {
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.focus();
        }
    }, 100);
}

// Hide password overlay
function hidePasswordOverlay() {
    document.body.classList.remove('password-protected');
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

// Check password function
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const container = document.querySelector('.password-container');
    
    if (!passwordInput || !passwordError || !container) return;
    
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === PASSWORD) {
        // Success animation
        container.classList.add('success');
        passwordError.style.display = 'none';
        
        // Store authentication in session
        sessionStorage.setItem('kenzAuthenticated', 'true');
        isAuthenticated = true;
        
        // Hide overlay after animation
        setTimeout(() => {
            hidePasswordOverlay();
        }, 500);
        
    } else {
        // Show error message
        passwordError.style.display = 'block';
        passwordError.textContent = 'Incorrect password. Please try again.';
        
        // Shake animation
        container.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
        
        // Clear input and focus
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Handle Enter key press in password input
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// Add shake animation to CSS (done via JavaScript to avoid CSS conflicts)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Prevent access to other pages without authentication
window.addEventListener('beforeunload', () => {
    // Keep session alive during page navigation
    if (isAuthenticated) {
        sessionStorage.setItem('kenzAuthenticated', 'true');
    }
});

// Clear authentication on browser close (optional - remove if you want longer persistence)
window.addEventListener('beforeunload', () => {
    // Uncomment the line below if you want to clear authentication on browser close
    // sessionStorage.removeItem('kenzAuthenticated');
}); 