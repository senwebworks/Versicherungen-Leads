import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// We need to adjust marquee speed since the text is much longer now.
if (cssContent.includes('animation: marquee 40s')) {
    cssContent = cssContent.replace('animation: marquee 40s', 'animation: marquee 70s');
    fs.writeFileSync(cssPath, cssContent, 'utf8');
}

const categories = [
    {
        name: "Gesundheit & Pflege",
        links: [
            { t: "PKV-Voll", u: "/versicherungen/pkv/" },
            { t: "GKV Wechsel", u: "/versicherungen/gkv/" },
            { t: "Zahnzusatz", u: "/versicherungen/zahnzusatz/" },
            { t: "Klinik / Krankenhaus", u: "/versicherungen/krankenhaus/" },
            { t: "Brillenversicherung", u: "/versicherungen/brillen/" }
        ]
    },
    {
        name: "Haus & Haftpflicht",
        links: [
            { t: "Wohngebäude", u: "/versicherungen/wohngebaeude/" },
            { t: "Hausrat", u: "/versicherungen/hausrat/" },
            { t: "Haftpflicht", u: "/versicherungen/haftpflicht/" },
            { t: "Rechtsschutz", u: "/versicherungen/rechtsschutz/" }
        ]
    },
    {
        name: "Vorsorge & Vermögen",
        links: [
            { t: "Altersvorsorge", u: "/versicherungen/altersvorsorge/" },
            { t: "Private Rente", u: "/versicherungen/rente/" },
            { t: "Basisrente", u: "/versicherungen/basisrente/" },
            { t: "Riester Rente", u: "/versicherungen/riester/" },
            { t: "Berufsunfähigkeit", u: "/versicherungen/bu/" },
            { t: "VL-Leistungen", u: "/versicherungen/vl/" }
        ]
    },
    {
        name: "KFZ & Reise",
        links: [
            { t: "KFZ-Versicherung", u: "/versicherungen/kfz/" },
            { t: "Reiseversicherung", u: "/versicherungen/reise/" }
        ]
    },
    {
        name: "Energie",
        links: [
            { t: "Strom", u: "/versicherungen/strom/" },
            { t: "Gas", u: "/versicherungen/gas/" }
        ]
    }
];

let footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-xl);">
                <div style="grid-column: span 1.5;">
                    <div class="footer-logo">SICHER<span>VERSICHERUNG</span></div>
                    <p class="footer-text" style="margin-bottom: 2rem;">Ihr unabhängiger und digitaler Partner für intelligente Absicherungen, Finanzen und Energie. Wir vergleichen transparente Tarife marktweit für Sie.</p>
                    <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                        <span class="trust-badge">Makler-Status</span>
                        <span class="trust-badge">SSL-Safe</span>
                        <span class="trust-badge">IHK-Geprüft</span>
                    </div>
                </div>
                
                ${categories.slice(0, 3).map(cat => `
                <div>
                    <h4 class="footer-title">${cat.name}</h4>
                    ${cat.links.map(l => `<a href="${l.u}" class="footer-link">${l.t}</a>`).join('')}
                </div>
                `).join('')}
                
                <div>
                    <h4 class="footer-title">KFZ, Reise & Energie</h4>
                    ${categories[3].links.map(l => `<a href="${l.u}" class="footer-link">${l.t}</a>`).join('')}
                    ${categories[4].links.map(l => `<a href="${l.u}" class="footer-link">${l.t}</a>`).join('')}
                </div>

                <div>
                    <h4 class="footer-title">Info & Service</h4>
                    <a href="/blog/" class="footer-link">Magazin (Blog)</a>
                    <a href="/faq/" class="footer-link">FAQ & Hilfe</a>
                    <a href="/kontakt/" class="footer-link">Kontaktformular</a>
                    <a href="/rechtliches/impressum.html" class="footer-link">Impressum</a>
                    <a href="/rechtliches/datenschutz.html" class="footer-link">Datenschutz</a>
                    <a href="/rechtliches/agb.html" class="footer-link">AGB</a>
                </div>
            </div>
            
            <div class="footer-bottom" style="flex-direction: column; text-align: center;">
                <div class="flex" style="gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem;">
                    <span class="trust-badge" style="background: white; border-color: var(--success); color: var(--success);">✓ 100% Kostenfrei</span>
                    <span class="trust-badge" style="background: white;">🔒 Datenschutz Garantie</span>
                    <span class="trust-badge" style="background: white;">🏆 Geprüfte Tarife</span>
                    <span class="trust-badge" style="background: white;">🏢 IHK Vermittler</span>
                    <span class="trust-badge" style="background: white;">⭐ 10.000+ Kunden</span>
                    <span class="trust-badge" style="background: white;">🛡️ DSGVO Konform</span>
                    <span class="trust-badge" style="background: white;">⭐ Kunden-Rating: 4,9/5.0</span>
                </div>
                <p>&copy; 2026 SICHER VERSICHERUNG. Unabhängiger Vermittler für Versicherungen und Energie.</p>
            </div>
        </div>
    </footer>
`;

const marqueeHTML = `
    <div class="marquee-container" style="background: white;">
        <div class="marquee-wrapper" style="align-items: center;">
            <!-- Set 1 -->
            <div class="partner-marquee-item" style="color: var(--accent); opacity: 1; min-width: max-content;">✦ Über 280 starke Partner</div>
            <div class="partner-marquee-item">ALLIANZ</div>
            <div class="partner-marquee-item">AXA</div>
            <div class="partner-marquee-item">BARMENIA</div>
            <div class="partner-marquee-item" style="color: var(--success); opacity: 1; min-width: max-content;">✓ Unabhängiger Vergleich der besten Tarife am Markt.</div>
            <div class="partner-marquee-item">DEVK</div>
            <div class="partner-marquee-item">ERGO</div>
            <div class="partner-marquee-item">HDI</div>
            <div class="partner-marquee-item">SIGNAL IDUNA</div>
            <!-- Set 2 -->
            <div class="partner-marquee-item" style="color: var(--accent); opacity: 1; min-width: max-content;">✦ Über 280 starke Partner</div>
            <div class="partner-marquee-item">ALLIANZ</div>
            <div class="partner-marquee-item">AXA</div>
            <div class="partner-marquee-item">BARMENIA</div>
            <div class="partner-marquee-item" style="color: var(--success); opacity: 1; min-width: max-content;">✓ Unabhängiger Vergleich der besten Tarife am Markt.</div>
            <div class="partner-marquee-item">DEVK</div>
            <div class="partner-marquee-item">ERGO</div>
            <div class="partner-marquee-item">HDI</div>
            <div class="partner-marquee-item">SIGNAL IDUNA</div>
        </div>
    </div>
`;


function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.git') {
            walkSync(filePath, callback);
        }
    });
}

walkSync(__dirname, function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;
        
        // Replace Footer
        const allFooters = /<footer[\s\S]*?<\/footer>/g;
        if (content.match(allFooters)) {
            content = content.replace(allFooters, '');
            content = content.replace(/<\/body>/, footerHTML.trim() + '\\n</body>');
        }

        // Replace partner grid / Marquee
        const marqueeContainerRegex = /<div class="marquee-container"[\s\S]*?<\/div>\s*<\/div>/;
        if (content.match(marqueeContainerRegex)) {
            content = content.replace(marqueeContainerRegex, marqueeHTML.trim());
            // Cleanup loose divs
            content = content.replace(/<div style="font-weight: 800; font-size: 1\.1rem; color: #64748b;">[A-Z\s]+<\/div>/g, '');
        }

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
console.log('Trust badges & Marquee updated.');
