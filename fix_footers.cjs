const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\senka\\.gemini\\antigravity\\scratch\\Versicherungen Leads', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// The footers start at the first <footer and end at the last </footer>
const firstFooterStart = content.indexOf('<footer');
const lastFooterEnd = content.lastIndexOf('</footer>') + '</footer>'.length;

if (firstFooterStart !== -1 && lastFooterEnd !== -1) {
    const newFooter = `    <footer style="margin-top: 0; padding-top: var(--space-xl); border-top: 1px solid var(--border); background: var(--primary-light);">
        <div class="container">
            <div class="footer-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-lg);">
                <div style="grid-column: span 1.5;">
                    <div class="footer-logo">JETZT <span>TARIF</span> SPAREN</div>
                    <p class="footer-text" style="margin-bottom: 2rem;">Ihr unabhängiges Vergleichsportal für intelligente Versicherungen, Finanzen und Energie. Wir vergleichen über 280 Anbieter für Ihren optimalen Schutz.</p>
                    <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                        <span class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Unabhängig</span>
                        <span class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg> SSL-Safe</span>
                        <span class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> IHK-Geprüft</span>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Haus & Energie</h4>
                    <a href="/versicherungen/solar/" class="footer-link">Solaranlage</a>
                    <a href="/versicherungen/strom/" class="footer-link">Strom</a>
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
                    <a href="/versicherungen/kredit/" class="footer-link">Kredit</a>
                    <a href="/versicherungen/kreditkarte/" class="footer-link">Kreditkarte</a>
                    <a href="/versicherungen/reise/" class="footer-link">Reise</a>
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
                    <span class="trust-badge" style="background: white; border-color: var(--success); color: var(--success);">✓ 100% Kostenfrei</span>
                    <span class="trust-badge" style="background: white;">🔒 Datenschutz Garantie</span>
                    <span class="trust-badge" style="background: white;">🏆 Geprüfte Tarife</span>
                    <span class="trust-badge" style="background: white;">🏢 IHK Vermittler</span>
                    <span class="trust-badge" style="background: white;">⭐ 10.000+ Kunden</span>
                    <span class="trust-badge" style="background: white;">🛡️ DSGVO Konform</span>
                    <span class="trust-badge" style="background: white;">⭐ Kunden-Rating: 4,9/5.0</span>
                </div>
                <p>&copy; 2026 JETZT TARIF SPAREN. Ihr unabhängiges Vergleichsportal für Versicherungen und Energie.</p>
                <p style="font-size: 0.7rem; margin-top: 1rem; opacity: 0.6;">Website erstellt durch <a href="https://sen-webworks.de" target="_blank" style="text-decoration: underline;">Sen Webworks</a></p>
            </div>
        </div>
    </footer>`;

    content = content.substring(0, firstFooterStart) + newFooter + content.substring(lastFooterEnd);
    fs.writeFileSync(filePath, content);
    console.log('Successfully de-duplicated footers in index.html');
} else {
    console.log('Could not find footers in index.html');
}
