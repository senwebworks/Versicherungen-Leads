
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const footerHtml = `
    <footer style="margin-top: 0; padding-top: var(--space-xl); border-top: 1px solid var(--border); background: var(--primary-light);">
        <div class="container">
            <div class="footer-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-lg);">
                <div style="grid-column: span 1.5;">
                    <div class="footer-logo">JETZT <span>TARIF</span> SPAREN</div>
                    <p class="footer-text" style="margin-bottom: 2rem;">Ihr unabhängiges Vergleichsportal für intelligente Versicherungen, Finanzen und Energie. Wir vergleichen über 280 Anbieter für Ihren optimalen Schutz.</p>
                </div>
                <div>
                    <h4 class="footer-title">Haus & Energie</h4>
                    <a href="/versicherungen/solar/" class="footer-link">Solaranlage</a>
                    <a href="/versicherungen/strom/" class="footer-link">Strom</a>
                    <a href="/versicherungen/oekostrom/" class="footer-link">Ökostrom</a>
                    <a href="/versicherungen/gas/" class="footer-link">Gas</a>
                    <a href="/versicherungen/dsl/" class="footer-link">DSL & Internet</a>
                </div>
                <div>
                    <h4 class="footer-title">Vorsorge & Rente</h4>
                    <a href="/versicherungen/rente/" class="footer-link">Rente</a>
                    <a href="/versicherungen/bu/" class="footer-link">Berufsunfähigkeit</a>
                    <a href="/versicherungen/lebensversicherung/" class="footer-link">Lebensversicherung</a>
                    <a href="/versicherungen/riester/" class="footer-link">Riester</a>
                    <a href="/versicherungen/ruerup/" class="footer-link">Rürup / Basis</a>
                    <a href="/versicherungen/unfallversicherung/" class="footer-link">Unfallschutz</a>
                </div>
                <div>
                    <h4 class="footer-title">Gesundheit & PKV</h4>
                    <a href="/versicherungen/pkv/" class="footer-link">PKV Voll</a>
                    <a href="/versicherungen/pkv-beamte/" class="footer-link">für Beamte</a>
                    <a href="/versicherungen/pkv-studenten/" class="footer-link">für Studenten</a>
                    <a href="/versicherungen/pkv-ue55/" class="footer-link">für Ü55</a>
                    <a href="/versicherungen/krankenhaus/" class="footer-link">Krankenzusatz</a>
                    <a href="/versicherungen/pflegezusatz/" class="footer-link">Pflegezusatz</a>
                    <a href="/versicherungen/hundekrankenversicherung/" class="footer-link">Hundekranken</a>
                </div>
                <div>
                    <h4 class="footer-title">Eigentum & Haftung</h4>
                    <a href="/versicherungen/haftpflicht/" class="footer-link">Haftpflicht</a>
                    <a href="/versicherungen/hausrat/" class="footer-link">Hausrat</a>
                    <a href="/versicherungen/wohngebaeude/" class="footer-link">Wohngebäude</a>
                    <a href="/versicherungen/haus-grundbesitz/" class="footer-link">Haus & Grundbesitz</a>
                    <a href="/versicherungen/tierhalter/" class="footer-link">Tierhalter</a>
                    <a href="/versicherungen/rechtsschutz/" class="footer-link">Rechtsschutz</a>
                </div>
                <div>
                    <h4 class="footer-title">KFZ & Finanzen</h4>
                    <a href="/versicherungen/kfz/" class="footer-link">KFZ-Versicherung</a>
                    <a href="/versicherungen/motorrad/" class="footer-link">Motorrad</a>
                    <a href="/versicherungen/girokonto/" class="footer-link">Girokonto</a>
                    <a href="/versicherungen/baufinanzierung/" class="footer-link">Baufinanzierung</a>
                    <a href="/versicherungen/kredit/" class="footer-link">Kredit & Karte</a>
                    <a href="/versicherungen/mobilfunk/" class="footer-link">Mobilfunk</a>
                </div>
                <div>
                    <h4 class="footer-title">Freizeit & Reise</h4>
                    <a href="/versicherungen/reise/" class="footer-link">Pauschalreise</a>
                    <a href="/versicherungen/mietwagen/" class="footer-link">Mietwagen</a>
                </div>
                <div>
                    <h4 class="footer-title">Info & Service</h4>
                    <a href="/blog/" class="footer-link">Ratgeber (Alle)</a>
                    <a href="/kontakt/" class="footer-link">Kontakt</a>
                    <a href="/faq/" class="footer-link">Häufige Fragen</a>
                    <a href="/rechtliches/impressum.html" class="footer-link">Impressum</a>
                    <a href="/rechtliches/datenschutz.html" class="footer-link">Datenschutz</a>
                    <a href="/rechtliches/agb.html" class="footer-link">AGB</a>
                </div>
            </div>
            
            <div class="footer-bottom" style="flex-direction: column; text-align: center; margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 2rem;">
                <div class="flex" style="gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem;">
                    <div class="trust-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 100% Kostenlos</div>
                    <div class="trust-badge">🔒 SSL-Sicher</div>
                    <div class="trust-badge">🏆 TÜV-Geprüft</div>
                    <div class="trust-badge">🤝 Unabhängig</div>
                    <div class="trust-badge">⚡ 280+ Anbieter</div>
                    <div class="trust-badge">⭐ 4,9/5.0 Rating</div>
                </div>
                <p>&copy; 2026 JETZT TARIF SPAREN. Ihr unabhängiges Vergleichsportal für Versicherungen und Energie.</p>
                <p style="font-size: 0.7rem; margin-top: 1rem; opacity: 0.6;">Website erstellt durch <a href="https://sen-webworks.de" target="_blank" style="text-decoration: underline;">Sen Webworks</a></p>
                <div class="affiliate-disclaimer" style="margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.03); border-radius: 0.5rem; font-size: 0.75rem; line-height: 1.4; color: var(--text-muted); text-align: left;">
                    <strong>Hinweis:</strong> Bei den Links und Bannern, welche mit einem Stern (*) gekennzeichnet sind, handelt es sich um Affiliate-Links-/Banner. Verwenden Sie nun diesen Link/Banner und schließen dann z. B. einen Vertrag ab oder führen einen Kauf durch, so erhalten wir eine Provision vom Anbieter. Für Sie entstehen keine Nachteile beim Kauf, Vertrag oder Preis.
                </div>
            </div>
        </div>
    </footer>
`;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.resolve(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(fullPath));
            }
        } else {
            if (file.endsWith('.html')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk(__dirname);
console.log(`Unifying footer in ${files.length} HTML files...`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Remove ALL existing footer tags and their content
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    
    // 2. Insert the single standard footer before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', footerHtml + '\n</body>');
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log("Footer unification complete.");
