
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const footerHtml = `
    <footer style="margin-top: 0; padding-top: var(--space-xl); border-top: 1px solid var(--border); background: var(--primary-light);">
        <div class="container">
            <div class="footer-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-lg);">
                <div style="grid-column: span 1.5;">
                    <div class="footer-logo">v<span>Portal</span></div>
                    <p class="footer-text" style="margin-bottom: 2rem;">Ihr unabhängiger Partner für intelligente Versicherungs-Lösungen. Wir vergleichen über 280 Anbieter für Ihren optimalen Schutz.</p>
                    <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                        <span class="trust-badge">Makler-Status</span>
                        <span class="trust-badge">SSL-Safe</span>
                        <span class="trust-badge">IHK-Geprüft</span>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Direkt online</h4>
                    <a href="/versicherungen/zahnzusatz/" class="footer-link">Zahnzusatz</a>
                    <a href="/versicherungen/krankenhaus/" class="footer-link">Krankenhauszusatz</a>
                    <a href="/versicherungen/brillen/" class="footer-link">Brillenversicherung</a>
                    <a href="/versicherungen/gkv/" class="footer-link">GKV Wechsel</a>
                </div>
                <div>
                    <h4 class="footer-title">Sach-Anfrage</h4>
                    <a href="/versicherungen/wohngebaeude/" class="footer-link">Wohngebäude</a>
                    <a href="/versicherungen/hausrat/" class="footer-link">Hausrat</a>
                    <a href="/versicherungen/haftpflicht/" class="footer-link">Haftpflicht</a>
                    <a href="/versicherungen/rechtsschutz/" class="footer-link">Rechtsschutz</a>
                    <a href="/versicherungen/kfz/" class="footer-link">KFZ-Versicherung</a>
                </div>
                <div>
                    <h4 class="footer-title">Vorsorge / PKV</h4>
                    <a href="/versicherungen/pkv/" class="footer-link">PKV-Voll</a>
                    <a href="/versicherungen/basisrente/" class="footer-link">Basisrente</a>
                    <a href="/versicherungen/riester/" class="footer-link">Riester</a>
                    <a href="/versicherungen/vl/" class="footer-link">VL-Leistungen</a>
                    <a href="/versicherungen/rente/" class="footer-link">Private Rente</a>
                </div>
                <div>
                    <h4 class="footer-title">Info & Service</h4>
                    <a href="/blog/" class="footer-link">Magazin (Alle)</a>
                    <a href="/blog/sinnvolle-versicherungen/" class="footer-link">Sinnvolle Schutz</a>
                    <a href="/blog/pkv-vs-gkv/" class="footer-link">GKV vs PKV</a>
                    <a href="/kontakt/" class="footer-link">Kontaktformular</a>
                    <a href="/rechtliches/impressum.html" class="footer-link">Impressum</a>
                    <a href="/rechtliches/datenschutz.html" class="footer-link">Datenschutz</a>
                    <a href="/rechtliches/agb.html" class="footer-link">AGB</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 VersicherungsPortal. Unabhängiger Versicherungsmakler gemäß § 34d Abs. 1 GewO.</p>
                <div class="flex" style="gap: 1.5rem;">
                    <span class="trust-badge">DSGVO Konform</span>
                    <span class="trust-badge">TÜV-Kunden-Rating: 4.8/5.0</span>
                </div>
            </div>
        </div>
    </footer>
`;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(__dirname);
console.log(`Found ${files.length} HTML files.`);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<footer>')) {
        content = content.replace(/<footer[\s\S]*?<\/footer>/, footerHtml);
        console.log(`Updated footer in: ${file}`);
    } else if (content.includes('</body>')) {
        content = content.replace('</body>', footerHtml + '\n</body>');
        console.log(`Appended footer to: ${file}`);
    } else {
        console.log(`No footer or body tag found in: ${file}`);
    }
    fs.writeFileSync(file, content, 'utf8');
});

console.log("Footers updated successfully.");
