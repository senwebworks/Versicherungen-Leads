import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. Form Content ---
const newMainContent = `
    <main class="section-padding" style="background: linear-gradient(180deg, var(--background) 0%, white 100%);">
        <div class="container">
            <div class="hero-split" style="grid-template-columns: 1fr 1.2fr; align-items: flex-start; gap: var(--space-2xl);">
                <!-- Left: Trust & Benefits -->
                <div class="animate-fade-in" style="position: sticky; top: 120px;">
                    <span class="badge-direct" style="background: var(--success); color: white; padding: 0.5rem 1rem; font-size: 0.9rem; margin-bottom: 1rem; display: inline-block;">✓ 100% Gebührenfrei</span>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.2;">Fordern Sie Ihr<br><span style="color: var(--accent);">kostenloses Angebot</span> an.</h1>
                    
                    <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">Unser unabhängiger Vergleich dauert nur wenige Sekunden. Sie erhalten maßgeschneiderte, transparente Vorschläge.</p>

                    <div style="margin-bottom: 2.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--text-main);">Ihre Vorteile der Absicherung:</h3>
                        <div class="benefit-list" style="gap: 0.5rem;">
                            <span class="benefit-tag" style="font-size: 0.95rem;">Schutz vor unvorhersehbaren finanziellen Risiken</span>
                            <span class="benefit-tag" style="font-size: 0.95rem;">Top Leistungen im Schadensfall</span>
                            <span class="benefit-tag" style="font-size: 0.95rem;">Absolute Sicherheit für Sie und Ihre Familie</span>
                        </div>
                    </div>

                    <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: rgba(59, 130, 246, 0.05); border-radius: 1rem; border: 1px solid rgba(59, 130, 246, 0.1);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent);">Warum mit uns?</h3>
                        <div class="benefit-list" style="gap: 0.5rem;">
                            <span class="benefit-tag" style="font-size: 0.95rem;">Unabhängiger Verlgeich aus > 280 Tarifen</span>
                            <span class="benefit-tag" style="font-size: 0.95rem;">Kostenloser & objektiver Marktvergleich</span>
                            <span class="benefit-tag" style="font-size: 0.95rem;">Wir übernehmen den gesamten Papierkram</span>
                        </div>
                    </div>

                    <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                        <span class="trust-badge" style="background: white;">🏆 Geprüfte Tarife</span>
                        <span class="trust-badge" style="background: white;">🤝 Unabhängig</span>
                        <span class="trust-badge" style="background: white;">🔒 SSL Gesichert</span>
                        <span class="trust-badge" style="background: white;">⭐ 10.000+ Kunden</span>
                    </div>
                </div>

                <!-- Right: The Form Card -->
                <div>
                    <div class="card animate-fade-in" style="padding: var(--space-xl); background: white; box-shadow: var(--shadow-xl); border: 1px solid var(--border); position: relative; border-top: 4px solid var(--accent);">
                        <div style="text-align: center; margin-bottom: var(--space-lg);">
                            <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Ihre Daten eingeben</h2>
                            <p style="color: var(--text-muted); font-size: 0.95rem;">In 2 Minuten zum perfekten Vergleich</p>
                        </div>

                        <form id="leadForm" action="/anfrage/danke.html" method="GET">
                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                                <div class="form-group">
                                    <label class="form-label">Welche Versicherung? *</label>
                                    <select id="insuranceType" name="type" class="input-field" required>
                                        <option value="">Bitte wählen...</option>
                                        <option value="wohngebaeude">Wohngebäudeversicherung</option>
                                        <option value="hausrat">Hausratversicherung</option>
                                        <option value="haftpflicht">Haftpflichtversicherung</option>
                                        <option value="rechtsschutz">Rechtsschutzversicherung</option>
                                        <option value="kfz">KFZ-Versicherung</option>
                                        <option value="basisrente">Basisrente</option>
                                        <option value="pkv">Private Krankenversicherung (PKV Voll)</option>
                                        <option value="riester">Riester Rente</option>
                                        <option value="vl">Vermögenswirksame Leistungen</option>
                                        <option value="rente">Private Rentenversicherung</option>
                                        <option value="altersvorsorge">Altersvorsorge</option>
                                        <option value="bu">Berufsunfähigkeit</option>
                                        <option value="zahnzusatz">Zahnzusatz</option>
                                        <option value="krankenhaus">Klinik / Krankenhaus</option>
                                        <option value="brillen">Brillenversicherung</option>
                                        <option value="reise">Reiseversicherung</option>
                                        <option value="strom">Stromtarif</option>
                                        <option value="gas">Gastarif</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Ihr Vor- & Zuname *</label>
                                    <input type="text" name="name" class="input-field" placeholder="Max Mustermann" required>
                                </div>
                            </div>

                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                                <div class="form-group">
                                    <label class="form-label">Telefonnummer *</label>
                                    <input type="tel" name="phone" class="input-field" placeholder="Optional" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">E-Mail Adresse *</label>
                                    <input type="email" name="email" class="input-field" placeholder="Für Ihre Unterlagen" required>
                                </div>
                            </div>

                            <div style="width: 100%; height: 1px; background: var(--glass-border); margin: var(--space-lg) 0;"></div>

                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                                <div class="form-group">
                                    <label class="form-label">Aktueller Berufsstatus</label>
                                    <select name="status" class="input-field">
                                        <option value="">(Optional)</option>
                                        <option value="angestellt">Angestellt</option>
                                        <option value="selbstaendig">Selbständig</option>
                                        <option value="beamter">Beamter</option>
                                        <option value="student">Student / Azubi</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Brutto Einkommen ca.</label>
                                    <input type="text" name="income" class="input-field" placeholder="(Optional) p.A.">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Ihre Spezialwünsche</label>
                                <textarea name="info" class="input-field" rows="2" placeholder="Was ist Ihnen besonders wichtig? (Optional)"></textarea>
                            </div>

                            <div class="checkbox-group" style="background: rgba(16, 185, 129, 0.05); padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                                <input type="checkbox" id="dsgvo" required style="margin-top: 4px;">
                                <label for="dsgvo" style="color: var(--text-main); font-size: 0.9rem;">
                                    <strong>Datenschutz:</strong> Ich stimme der vertraulichen Verarbeitung meiner Daten zur kostenlosen Angebotserstellung zu. (<a href="/rechtliches/datenschutz.html" style="color: var(--accent); text-decoration: underline;">Datenschutzerklärung</a>)
                                </label>
                            </div>

                            <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1.5rem; padding: 1.25rem; font-size: 1.25rem; box-shadow: 0 10px 25px rgba(5, 150, 105, 0.3);">
                                Jetzt kostenfreies Angebot sichern
                            </button>
                            
                            <div style="text-align: center; margin-top: 1.5rem;">
                                <p style="font-size: 0.8rem; color: var(--text-muted);">🔒 Ihre Daten werden 256-Bit SSL-verschlüsselt übertragen und niemals an unbefugte Dritte weitergegeben.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `;

// --- 1. Update Anfrage Form ---
const anfragePath = path.join(__dirname, 'anfrage', 'index.html');
if (fs.existsSync(anfragePath)) {
    let content = fs.readFileSync(anfragePath, 'utf8');

    // Replace the simple single column <div class="article-container"> to a split layout
    const oldContainerStart = '<div class="article-container">';
    const oldContainerRegex = /<div class="article-container">\s*<div class="card"/;
    
    // We'll wrap it in a grid. We need to find `main` and replace everything inside it.
    const mainRegex = /<main class="section-padding">([\s\S]*?)<\/main>/;
    
    content = content.replace(mainRegex, newMainContent);
    fs.writeFileSync(anfragePath, content, 'utf8');
    console.log('Anfrage Form Enhanced.');
}

const rechnerPath = path.join(__dirname, 'rechner', 'index.html');
if (fs.existsSync(rechnerPath)) {
    let content = fs.readFileSync(rechnerPath, 'utf8');
    const mainRegex = /<main class="section-padding">([\s\S]*?)<\/main>/;
    content = content.replace(mainRegex, newMainContent); // Reuse the same awesome form layout
    fs.writeFileSync(rechnerPath, content, 'utf8');
    console.log('Rechner Form Enhanced.');
}

// --- 2. Update Homepage ---
const homePath = path.join(__dirname, 'index.html');
if (fs.existsSync(homePath)) {
    let content = fs.readFileSync(homePath, 'utf8');

    const competenciesSection = `
        <!-- High Trust Image Section -->
        <section class="section-padding" style="background: var(--surface-hover);">
            <div class="container">
                <div style="text-align: center; margin-bottom: 4rem;">
                    <span class="badge-direct" style="background: var(--accent); margin-bottom: 1rem; display: inline-block;">Unsere Kernbereiche</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 3rem);">Bester Markt-Check in <br>jeder Lebenslage</h2>
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

    // Insert the section right after the Partner Grid/Marquee Section
    // The previous section ends with </section>. A safe way is to find the Marquee container's closing tags.
    // The previous section (partner grid) looks like: <section style="background: white; padding: 3rem 0; border-bottom: 1px solid var(--border);"> ... </section>
    // We can replace exactly that section block.
    
    // We'll just split by </main> and insert before it, since the home layout has `<main> <section>Hero</section> <section>Marquee</section> </main>`
    if (!content.includes('Bester Markt-Check in <br>jeder Lebenslage')) {
        content = content.replace('</main>', competenciesSection + '\n</main>');
        fs.writeFileSync(homePath, content, 'utf8');
        console.log('Homepage Enhanced with detailed image blocks.');
    }
}
