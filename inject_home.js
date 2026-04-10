import fs from 'fs';

const homePath = 'index.html';
let content = fs.readFileSync(homePath, 'utf8');

const competenciesSection = `
    <!-- High Trust Image Section -->
    <section class="section-padding" style="background: var(--surface-hover);">
        <div class="container">
            <div style="text-align: center; margin-bottom: 4rem;">
                <span class="badge-direct" style="background: var(--accent); margin-bottom: 1rem; display: inline-block;">Unsere Kernbereiche</span>
                <h2 style="font-size: clamp(2rem, 4vw, 3rem);">Höchste Expertise in <br>jeder Lebenslage</h2>
            </div>
            
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Card 1 -->
                <div class="card animate-fade-in" style="padding: 1rem; overflow: hidden; display: flex; flex-direction: column;">
                    <img src="/images/health.png" alt="Gesundheit & Vorsorge" style="width: 100%; height: 250px; object-fit: cover; border-radius: 1rem;">
                    <div style="padding: 1.5rem 1rem 0.5rem;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">Gesundheit & Pflege</h3>
                        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem;">Tarife, die im Ernstfall wirklich leisten. Von der Vollversicherung bis zum Zahnzusatz.</p>
                        <a href="/anfrage/?type=pkv" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a>
                    </div>
                </div>
                
                <!-- Card 2 -->
                <div class="card animate-fade-in" style="padding: 1rem; overflow: hidden; display: flex; flex-direction: column; animation-delay: 0.1s;">
                    <img src="/images/property.png" alt="Haus & Immobilien" style="width: 100%; height: 250px; object-fit: cover; border-radius: 1rem;">
                    <div style="padding: 1.5rem 1rem 0.5rem;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">Eigentum & Haftung</h3>
                        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem;">Absolut sicherer Schutz vor Existenziellen Risiken durch Immobilien- und Haftpflichtschäden.</p>
                        <a href="/anfrage/?type=haftpflicht" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="card animate-fade-in" style="padding: 1rem; overflow: hidden; display: flex; flex-direction: column; animation-delay: 0.2s;">
                    <img src="/images/finance.png" alt="Vermögen & Finanzen" style="width: 100%; height: 250px; object-fit: cover; border-radius: 1rem;">
                    <div style="padding: 1.5rem 1rem 0.5rem;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">Vermögen & Zukunft</h3>
                        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem;">Strategischer Aufbau und Sicherung von Rente, Berufsunfähigkeit und Einkommensquellen.</p>
                        <a href="/anfrage/?type=altersvorsorge" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 3rem;">
               <a href="/blog/" style="text-decoration: underline; color: var(--accent); font-weight: 600;">Lesen Sie tiefgreifende Artikel in unserem Ratgeber →</a>
            </div>
        </div>
    </section>
`;

if (!content.includes('Höchste Expertise in <br>jeder Lebenslage')) {
    content = content.replace('</main>', competenciesSection + '\\n</main>');
    fs.writeFileSync(homePath, content, 'utf8');
    console.log('Homepage Enhanced.');
}
