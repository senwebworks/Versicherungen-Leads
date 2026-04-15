// Global JS for the insurance portal

document.addEventListener('DOMContentLoaded', () => {
    // Global Conversion Tracking
    window.trackLeadConversion = function() {
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-18082578300/UcwYCOCvupwcEPz-uK5D',
                'value': 1.0,
                'currency': 'EUR'
            });
            console.log('Conversion tracked successfully');
        } else {
            console.warn('gtag not found, conversion not tracked');
        }
    };

    // Global Form Submission Listener
    document.addEventListener('submit', (e) => {
        if (e.target.tagName === 'FORM') {
            window.trackLeadConversion();
        }
    });
    // Mobile Navigation logic (if needed in the future)
    // Animation for elements on scroll
    
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetId = href.startsWith('/#') ? href.substring(1) : href;
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                        mobileOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });

    
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileClose = document.getElementById('mobile-close');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (mobileBtn && mobileClose && mobileOverlay) {
        mobileBtn.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        mobileClose.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Form logic, calculators, etc. will be in separate files or handled here
});
