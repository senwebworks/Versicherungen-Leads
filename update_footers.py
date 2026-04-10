
import os
import re

footer_html = """
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
"""

def update_footers(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace existing footer or append if missing
                if '<footer>' in content:
                    content = re.sub(r'<footer.*?>.*?</footer>', footer_html, content, flags=re.DOTALL)
                elif '</body>' in content:
                    content = content.replace('</body>', footer_html + '\n</body>')
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)

update_footers('c:\\Users\\senka\\.gemini\\antigravity\\scratch\\Versicherungen Leads')
print("Footers updated successfully.")
