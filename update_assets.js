import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalCss = `

/* --- Mega Menu & Layout Updates --- */

/* Marquee */
.marquee-container { overflow: hidden; white-space: nowrap; width: 100%; position: relative; padding: 1rem 0; }
.marquee-wrapper { display: inline-flex; animation: marquee 40s linear infinite; gap: 4rem; }
.marquee-wrapper:hover { animation-play-state: paused; }
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.partner-marquee-item { font-weight: 800; font-size: 1.25rem; color: #64748b; opacity: 0.6; filter: grayscale(1); transition: var(--transition); }
.partner-marquee-item:hover { opacity: 1; filter: grayscale(0); }

/* Mega Menu Desktop */
.has-dropdown { position: relative; display: flex; align-items: center; padding: 1.5rem 0; }
.mega-menu { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: white; border: 1px solid var(--border); box-shadow: var(--shadow-xl); border-radius: 1rem; padding: 1.5rem; width: max-content; min-width: 250px; z-index: 1100; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; }
.has-dropdown:hover .mega-menu { display: grid; grid-template-columns: 1fr; gap: 0.25rem; opacity: 1; visibility: visible; }
.mega-title { font-weight: 800; color: var(--accent); margin-bottom: 0.5rem; padding-left: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
.mega-menu a { display: block; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }
.mega-menu a:hover { background: var(--surface-hover); color: var(--accent); }

/* Hamburger */
.mobile-menu-btn { display: none; background: none; border: none; font-size: 1.75rem; cursor: pointer; color: var(--text-main); }
@media (max-width: 1023px) { .mobile-menu-btn { display: block; } }

/* Mobile Menu Overlay */
.mobile-menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; background: var(--background); z-index: 2000; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow-y: auto; padding: 1.5rem; }
.mobile-menu-overlay.active { transform: translateX(0); }
.mobile-menu-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
.mobile-close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-main); }
.mobile-nav-group { margin-bottom: 1.5rem; background: white; padding: 1rem; border-radius: 1rem; border: 1px solid var(--border); }
.mobile-nav-title { font-weight: 800; color: var(--accent); margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; }
.mobile-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; color: var(--text-main); font-size: 1rem; border-bottom: 1px solid var(--surface-hover); font-weight: 500; }
.mobile-nav-link:last-child { border-bottom: none; }

/* Enhanced Footer Styling */
footer { padding-top: var(--space-2xl) !important; background: linear-gradient(180deg, var(--primary-light) 0%, var(--surface-hover) 100%) !important; }
.footer-title { color: var(--accent); font-size: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--accent); display: inline-block; margin-bottom: 1.5rem; }
.footer-link { padding: 0.25rem 0; font-size: 0.9375rem; }
.footer-link:hover { padding-left: 0.5rem; color: var(--accent); }
`;

if (!cssContent.includes('.marquee-container')) {
    fs.writeFileSync(cssPath, cssContent + additionalCss, 'utf8');
}

// Update main.js
const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const mobileJs = `
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
`;

if (!jsContent.includes('mobileBtn')) {
    jsContent = jsContent.replace('// Form logic', mobileJs + '\n    // Form logic');
    fs.writeFileSync(jsPath, jsContent, 'utf8');
}
console.log('CSS and JS core files updated.');
