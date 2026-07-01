/**
 * Netflix Landing Page UI Clone - Core Logic & Interactions
 * Author: Antigravity AI Coding Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initFAQAccordion();
    initFormValidation();
    initScrollReveal();
    simulatePhoneDownload();
});

/**
 * 1. Sticky Navigation Header
 * Adds solid background and box-shadow when the user scrolls down.
 */
function initStickyHeader() {
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();
}

/**
 * 2. FAQ Accordion Panels
 * Expands panels smoothly and rotates the '+' icon to 'x'.
 * Automatically collapses other panels for a clean UI experience.
 */
function initFAQAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isCurrentlyExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // 1. Collapse all other accordion items first
            headers.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherBody = otherHeader.nextElementSibling;
                    otherBody.classList.remove('open');
                    otherBody.setAttribute('aria-hidden', 'true');
                }
            });
            
            // 2. Toggle active state on current item
            if (isCurrentlyExpanded) {
                header.setAttribute('aria-expanded', 'false');
                body.classList.remove('open');
                body.setAttribute('aria-hidden', 'true');
            } else {
                header.setAttribute('aria-expanded', 'true');
                body.classList.add('open');
                body.setAttribute('aria-hidden', 'false');
            }
        });
    });
}

/**
 * 3. Floating Label Email Signup Form Validation
 * Performs regex format checking and alerts.
 */
function initFormValidation() {
    const forms = [
        {
            formId: 'hero-email-form',
            inputId: 'hero-email',
            errorId: 'hero-email-error'
        },
        {
            formId: 'faq-email-form',
            inputId: 'faq-email',
            errorId: 'faq-email-error'
        }
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    forms.forEach(({ formId, inputId, errorId }) => {
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);
        const errorEl = document.getElementById(errorId);

        if (!form || !input || !errorEl) return;

        // Custom validation logic
        const validateEmail = () => {
            const value = input.value.trim();
            
            if (value === '') {
                errorEl.textContent = 'Email is required.';
                errorEl.classList.add('visible');
                input.classList.add('invalid');
                return false;
            } else if (!emailRegex.test(value)) {
                errorEl.textContent = 'Please enter a valid email address.';
                errorEl.classList.add('visible');
                input.classList.add('invalid');
                return false;
            } else {
                errorEl.classList.remove('visible');
                input.classList.remove('invalid');
                return true;
            }
        };

        // Validate on submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = validateEmail();
            
            if (isValid) {
                // Clear any input status
                errorEl.classList.remove('visible');
                input.classList.remove('invalid');
                
                // Show a modern custom alert instead of native alert
                showSuccessToast(`Welcome! A verification link has been sent to: ${input.value.trim()}`);
                input.value = '';
                // Trigger label return to normal state
                input.blur();
            }
        });

        // Live validation clearing on keyup/typing
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateEmail();
            }
        });
    });
}

/**
 * 4. Section Scroll-Reveal Animations
 * Uses IntersectionObserver for high performance scroll animation triggers.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observerOptions = {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px' // Offset triggers slightly for nicer visual flow
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * 5. Simulation of Downloading Status Widget in Feature 2
 * Shows spinning animation for a few seconds on page load, then completes the download.
 */
function simulatePhoneDownload() {
    const spinner = document.querySelector('.spinner');
    const checkIcon = document.querySelector('.check-icon');
    const statusText = document.querySelector('.widget-status');
    const widget = document.querySelector('.download-widget');

    if (!spinner || !checkIcon || !statusText || !widget) return;

    // Simulate downloading progress
    setTimeout(() => {
        // Transition download status to complete
        spinner.style.display = 'none';
        checkIcon.style.display = 'block';
        statusText.textContent = 'Downloading complete';
        statusText.style.color = '#2ecc71'; // Success Green
        
        // Brief pulse animation on the check badge
        checkIcon.style.transform = 'scale(1.2)';
        checkIcon.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            checkIcon.style.transform = 'scale(1)';
        }, 300);

    }, 4500); // 4.5 seconds simulation
}

/**
 * Helper: Custom Toast Notification for Success Form Submission
 */
function showSuccessToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        // Add styling elements directly to clean up CSS
        Object.assign(toastContainer.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            pointerEvents: 'none'
        });
        document.body.appendChild(toastContainer);
    }

    // Create Toast Element
    const toast = document.createElement('div');
    Object.assign(toast.style, {
        backgroundColor: '#1f1f1f',
        color: '#ffffff',
        borderLeft: '4px solid #2ecc71',
        padding: '16px 24px',
        borderRadius: '4px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        fontWeight: '500',
        minWidth: '300px',
        maxWidth: '450px',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        pointerEvents: 'auto'
    });
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Trigger reveal transition
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}
