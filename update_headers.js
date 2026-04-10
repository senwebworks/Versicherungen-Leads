
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const headerHtml = `
    <header>
        <div class="container nav-container">
            <a href="/" class="logo">JETZT <span>TARIF</span> SPAREN</a>
            
            <nav class="nav-links">
                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Haus & Energie</span>
                    <div class="mega-menu">
                        <div class="mega-title">Haus & Energie</div>
                        <a href="/versicherungen/solar/">Solaranlage</a>
                        <a href="/versicherungen/strom/">Strom</a>
                        <a href="/versicherungen/oekostrom/">Ökostrom</a>
                        <a href="/versicherungen/gas/">Gas</a>
                        <a href="/versicherungen/dsl/">DSL & Internet</a>
                    </div>
                </div>

                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Vorsorge & Rente</span>
                    <div class="mega-menu">
                        <div class="mega-title">Vorsorge</div>
                        <a href="/versicherungen/rente/">Rente</a>
                        <a href="/versicherungen/bu/">Berufsunfähigkeit</a>
                        <a href="/versicherungen/lebensversicherung/">Lebensversicherung</a>
                        <a href="/versicherungen/unfallversicherung/">Unfallversicherung</a>
                        <a href="/versicherungen/riester/">Riester Rente</a>
                        <a href="/versicherungen/ruerup/">Rürup / Basis</a>
                    </div>
                </div>

                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Gesundheit & PKV</span>
                    <div class="mega-menu">
                        <div class="mega-title">Gesundheit</div>
                        <a href="/versicherungen/pkv/">PKV-Voll</a>
                        <a href="/versicherungen/pkv-beamte/">für Beamte</a>
                        <a href="/versicherungen/pkv-studenten/">für Studenten</a>
                        <a href="/versicherungen/pkv-ue55/">für Ü55</a>
                        <a href="/versicherungen/krankenhaus/">Krankenzusatz</a>
                        <a href="/versicherungen/pflegezusatz/">Pflegezusatz</a>
                        <a href="/versicherungen/hundekrankenversicherung/">Hundekranken</a>
                    </div>
                </div>

                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Eigentum & Haftung</span>
                    <div class="mega-menu">
                        <div class="mega-title">Haftung & Eigentum</div>
                        <a href="/versicherungen/haftpflicht/">Haftpflicht</a>
                        <a href="/versicherungen/hausrat/">Hausrat</a>
                        <a href="/versicherungen/wohngebaeude/">Wohngebäude</a>
                        <a href="/versicherungen/haus-grundbesitz/">Haus & Grundbesitz</a>
                        <a href="/versicherungen/tierhalter/">Tierhalter</a>
                        <a href="/versicherungen/rechtsschutz/">Rechtsschutz</a>
                    </div>
                </div>

                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Finanzen & KFZ</span>
                    <div class="mega-menu">
                        <div class="mega-title">Finanzen & KFZ</div>
                        <a href="/versicherungen/kfz/">KFZ-Versicherung</a>
                        <a href="/versicherungen/motorrad/">Motorrad</a>
                        <a href="/versicherungen/girokonto/">Girokonto</a>
                        <a href="/versicherungen/baufinanzierung/">Baufinanzierung</a>
                        <a href="/versicherungen/kredit/">Kredit & Karte</a>
                        <a href="/versicherungen/mobilfunk/">Mobilfunk-Tarife</a>
                    </div>
                </div>

                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Freizeit & Reise</span>
                    <div class="mega-menu">
                        <div class="mega-title">Freizeit & Reise</div>
                        <a href="/versicherungen/reise/">Pauschalreise</a>
                        <a href="/versicherungen/mietwagen/">Mietwagen</a>
                    </div>
                </div>

                <a href="/blog/" class="nav-link" style="display: flex; align-items: center;">Ratgeber</a>
            </nav>

            <div class="flex" style="gap: 1rem; align-items: center;">
                <a href="#angebote" class="btn btn-primary desktop-btn-only" style="padding: 0.75rem 1.5rem; display: none; @media(min-width: 1024px){display:inline-flex;}">Alle Services</a>
                <button type="button" class="mobile-menu-btn" id="mobile-btn">
                    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>

        <div class="mobile-menu-overlay" id="mobile-overlay">
            <div class="mobile-menu-header">
                <a href="/" class="logo">JETZT <span>TARIF</span> SPAREN</a>
                <button type="button" class="mobile-close-btn" id="mobile-close">&times;</button>
            </div>
            
            <div class="mobile-nav-group">
                <div class="mobile-nav-title">Haus & Energie</div>
                <a href="/versicherungen/solar/" class="mobile-nav-link">Solaranlage</a>
                <a href="/versicherungen/strom/" class="mobile-nav-link">Strom</a>
                <a href="/versicherungen/oekostrom/" class="mobile-nav-link">Ökostrom</a>
                <a href="/versicherungen/gas/" class="mobile-nav-link">Gas</a>
                <a href="/versicherungen/dsl/" class="mobile-nav-link">DSL & Internet</a>
            </div>
            
            <div class="mobile-nav-group">
                <div class="mobile-nav-title">Gesundheit & PKV</div>
                <a href="/versicherungen/pkv/" class="mobile-nav-link">PKV-Voll</a>
                <a href="/versicherungen/krankenhaus/" class="mobile-nav-link">Krankenzusatz</a>
                <a href="/versicherungen/pflegezusatz/" class="mobile-nav-link">Pflegezusatz</a>
            </div>

            <div class="mobile-nav-group">
                <div class="mobile-nav-title">Vorsorge & Rente</div>
                <a href="/versicherungen/rente/" class="mobile-nav-link">Rente</a>
                <a href="/versicherungen/bu/" class="mobile-nav-link">Berufsunfähigkeit</a>
                <a href="/versicherungen/riester/" class="mobile-nav-link">Riester</a>
            </div>

            <div class="mobile-nav-group">
                <div class="mobile-nav-title">Finanzen & Reise</div>
                <a href="/versicherungen/kfz/" class="mobile-nav-link">KFZ-Versicherung</a>
                <a href="/versicherungen/girokonto/" class="mobile-nav-link">Girokonto</a>
                <a href="/versicherungen/mobilfunk/" class="mobile-nav-link">Mobilfunk</a>
                <a href="/versicherungen/reise/" class="mobile-nav-link">Pauschalreise</a>
                <a href="/versicherungen/mietwagen/" class="mobile-nav-link">Mietwagen</a>
                <a href="/blog/" class="mobile-nav-link">Ratgeber (Alle Beiträge)</a>
                <a href="/kontakt/" class="mobile-nav-link">Kontakt</a>
            </div>

            <a href="/versicherungen/" class="btn btn-primary" style="width: 100%; margin-top: 1rem; justify-content: center; padding: 1.25rem;">Alle Tarife entdecken</a>
        </div>
    </header>
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
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<header>')) {
        content = content.replace(/<header[\s\S]*?<\/header>/, headerHtml);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated header in: ${path.relative(__dirname, file)}`);
    }
});
