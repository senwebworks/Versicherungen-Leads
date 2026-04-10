
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogServices = [
    { id: 'solar', title: 'Solaranlage', icon: '☀️', desc: 'Lohnt sich Photovoltaik 2026? Unser neutraler Check für Hausbesitzer.', benefits: ['Unabhängigkeit vom Strompreis', 'Nachhaltige Wertsteigerung der Immobilie', 'Staatliche Förderung & Einspeisevergütung'] },
    { id: 'kfz', title: 'Kfz-Versicherung', icon: '🚗', desc: 'Mehr als nur Haftpflicht: So optimieren Sie Ihren Autoschutz.', benefits: ['Günstige Kasko-Tarife im Vergleich', 'Schutzbrief & Rabattschutz sinnvoll nutzen', 'Jedes Jahr hunderte Euro sparen'] },
    { id: 'motorrad', title: 'Motorradversicherung', icon: '🏍️', desc: 'Sicher auf zwei Rädern: Tipps für die perfekte Bike-Police.', benefits: ['Saisonkennzeichen optimal versichern', 'Schutz für Schutzkleidung & Helm', 'Günstige Teil- und Vollkasko'] },
    { id: 'rente', title: 'Private Rente', icon: '📈', desc: 'Sorgenfrei im Alter: Strategien gegen die Rentenlücke.', benefits: ['Flexibler Kapitalaufbau', 'Steuervorteile in der Auszahlphase', 'Zusätzliches Standbein zur gesetzlichen Rente'] },
    { id: 'bu', title: 'Berufsunfähigkeit', icon: '🛡️', desc: 'Ihre Arbeitskraft ist Ihr wertvollstes Gut. So schützen Sie sie.', benefits: ['Einkommensschutz bei Krankheit', 'Frühzeitiger Abschluss lohnt sich', 'Weltweiter Versicherungsschutz'] },
    { id: 'lebensversicherung', title: 'Lebensversicherung', desc: 'Sicherheit für die Familie und Kapitalaufbau kombiniert.', benefits: ['Finanzielle Absicherung der Hinterbliebenen', 'Sicherer Vermögensaufbau', 'Optionaler Berufsunfähigkeitsschutz'] },
    { id: 'unfallversicherung', title: 'Unfallversicherung', desc: 'Wenn Sekunden das Leben verändern: Der richtige Schutz.', benefits: ['Einmalzahlung bei Invalidität', 'Umfangreiche Assistenzleistungen', 'Schutz auch in der Freizeit & beim Sport'] },
    { id: 'riester', title: 'Riester-Rente', icon: '💰', desc: 'Zulagen vom Staat clever nutzen für die eigene Vorsorge.', benefits: ['Grund- und Kinderzulagen sichern', 'Steuerliche Absetzbarkeit der Beiträge', 'Beitragsgarantie zum Rentenbeginn'] },
    { id: 'risikoleben', title: 'Risikolebensversicherung', desc: 'Der günstigste Schutz für Ihre Familie und Kredite.', benefits: ['Hohe Versicherungssummen bei kleinem Beitrag', 'Sicherung der Baufinanzierung', 'Schnelle Auszahlung im Ernstfall'] },
    { id: 'ruerup', title: 'Rürup-Rente', desc: 'Basisrente: Die steuerlich geförderte Vorsorge für Selbstständige.', benefits: ['Maximale steuerliche Absetzbarkeit', 'Pfändungs- und insolvenzsicher', 'Lebenslange, garantierte Rente'] },
    { id: 'pflegezusatz', title: 'Pflegezusatzversicherung', desc: 'Würde bewahren: So decken Sie die hohen Kosten im Pflegefall.', benefits: ['Schutz vor dem Zugriff auf das Erbe', 'Zusatzgeld für häusliche oder stationäre Pflege', 'Individuelle Tagessatz-Wahl'] },
    { id: 'pkv', title: 'PKV Vollversicherung', icon: '🩺', desc: 'Premium-Medizin für Selbstständige und Angestellte.', benefits: ['Kürzere Wartezeiten bei Fachärzten', 'Individuelle Leistungsbausteine', 'Oft Beitragsrückerstattungen'] },
    { id: 'pkv-beamte', title: 'PKV für Beamte', desc: 'Beihilfe-Ergänzung: Der maßgeschneiderte Schutz für Staatsdiener.', benefits: ['Abgestimmt auf die Beihilfe-Sätze', 'Günstige Tarife durch hohe Beihilfe', 'Leistungen auf Privatpatienten-Niveau'] },
    { id: 'krankenzusatz', title: 'Krankenzusatz', desc: 'Mehr Leistung für GKV-Versicherte: Vom Zahn bis zum Einbettzimmer.', benefits: ['Chefarztbehandlung im Krankenhaus', 'Heilpraktiker & alternative Medizin', 'Zuschüsse für Sehhilfen & Vorsorge'] },
    { id: 'pkv-studenten', title: 'PKV für Studenten', desc: 'Günstiger Einstieg in die private Krankenversicherung.', benefits: ['Speziell kalkulierte Studententarife', 'Hervorragende medizinische Versorgung', 'Oft günstiger als der GKV-Pflichtbeitrag'] },
    { id: 'pkv-ue55', title: 'PKV für Ü55', desc: 'Beiträge im Griff: Optimierungsstrategien für erfahrene Versicherte.', benefits: ['Beitragsentlastung im Alter', 'Tarifwechsel innerhalb des Anbieters', 'Basistarif als Sicherheitsanker'] },
    { id: 'hundekrankenversicherung', title: 'Hundekrankenversicherung', desc: 'Operationen & Tierarztbesuche sorgenfrei finanzieren.', benefits: ['Übernahme von hohen OP-Kosten', 'Freie Tierarzt- & Klinikwahl', 'Schutz auch im Urlaub im Ausland'] },
    { id: 'haftpflicht', title: 'Haftpflichtversicherung', icon: '⚖️', desc: 'Der wichtigste Basisschutz gegen Missgeschicke im Alltag.', benefits: ['Schadenersatz bei Sach- & Personenschäden', 'Abwehr unberechtigter Forderungen', 'Schutz für die ganze Familie'] },
    { id: 'hausrat', title: 'Hausratversicherung', icon: '🛋️', desc: 'Sicherheit für Ihre Wohnungseinrichtung und Besitztümer.', benefits: ['Schutz bei Einbruchdiebstahl & Raub', 'Entschädigung bei Feuer & Leitungswasser', 'Neuwert-Ersatz für kaputte Gegenstände'] },
    { id: 'tierhalter', title: 'Tierhalterversicherung', desc: 'Sicher mit Hund und Pferd: Haftpflichtschutz für Tierbesitzer.', benefits: ['Absicherung bei Schäden durch Ihr Tier', 'Mietsachschäden durch Haustiere inklusive', 'Weltweiter Versicherungsschutz'] },
    { id: 'wohngebaeude', title: 'Wohngebäude', icon: '🏠', desc: 'Unverzichtbarer Schutz für Ihre Immobilie gegen Elementarschäden.', benefits: ['Sicherung des Gebäudewertes', 'Schutz bei Sturm, Hagel & Feuer', 'Leitungswasserschäden abgedeckt'] },
    { id: 'haus-grundbesitz', title: 'Haus- und Grundbesitz', desc: 'Haftpflicht für Vermieter und Grundstückseigentümer.', benefits: ['Schutz bei Unfällen auf dem Grundstück', 'Abdeckung der Verkehrssicherungspflicht', 'Günstiger Beitrag für hohe Summen'] },
    { id: 'rechtsschutz', title: 'Rechtsschutz', icon: '👨‍⚖️', desc: 'Recht haben und Recht bekommen: Anwaltskosten kein Problem.', benefits: ['Übernahme von Anwalts- & Gerichtskosten', 'Rechtshotline für Sofort-Hilfe', 'Schutz im Beruf, Verkehr & Privatleben'] },
    { id: 'firmen', title: 'Firmen', desc: 'Gewerbliche Risiken clever absichern für Ihr Unternehmen.', benefits: ['Betriebshaftpflicht & Inhaltsversicherung', 'Schutz vor Ertragsausfall', 'Vermögensschaden-Haftpflicht'] },
    { id: 'girokonto', title: 'Girokonto', desc: 'Das beste Konto finden: Gebührenfrei und digital.', benefits: ['Kostenlose Kontoführung bei Geldeingang', 'Modernes Online-Banking & App', 'Oft inklusive Kreditkarte'] },
    { id: 'baufinanzierung', title: 'Baufinanzierung', desc: 'Konditions-Check: So sichern Sie sich die besten Zinsen.', benefits: ['Vergleich hunderter Banken & Vergabe-Stellen', 'Fördermittel-Check (KfW)', 'Lange Zinsbindung für Sicherheit'] },
    { id: 'kredit', title: 'Kredit', desc: 'Günstige Ratenkredite für Ihre Träume und Umschuldungen.', benefits: ['Schnelle Auszahlung & digitale Abwicklung', 'Niedrige Zinsen durch unabhängigen Vergleich', 'Sondertilgungen oft kostenlos möglich'] },
    { id: 'kreditkarte', title: 'Kreditkarte', desc: 'Weltweit flexibel bezahlen und von Vorteilen profitieren.', benefits: ['Dauerhaft grundgebührenfreie Karten', 'Versicherungen & Meilen inklusive', 'Kostenlose Bargeldabhebung weltweit'] },
    { id: 'strom', title: 'Strom', icon: '⚡', desc: 'Anbieterwechsel: So senken Sie Ihre Stromrechnung drastisch.', benefits: ['Direkter Preisvergleich lokaler Anbieter', 'Bonus-Zahlungen bei Wechsel', '100% Ökostrom-Optionen wählbar'] },
    { id: 'gas', title: 'Gas', desc: 'Heizkosten-Check: Günstige Gastarife für Ihr Zuhause.', benefits: ['Sofort-Sparpotenzial bei Wechsel', 'Preisgarantie für Planungssicherheit', 'Einfacher Wechsel ohne Versorgungslücke'] },
    { id: 'dsl', title: 'DSL & Internet', desc: 'Highspeed zum Sparpreis: Der große Internet-Check.', benefits: ['Verfügbarkeits-Check an Ihrer Adresse', 'Glasfaser- & Kabel-Optionen prüfen', 'Wechselbonus für Neukunden'] },
    { id: 'oekostrom', title: 'Ökostrom', icon: '🌿', desc: 'Grüner Strom für eine bessere Zukunft: Nachhaltig und günstig.', benefits: ['CO2-Neutralität für Ihr Zuhause', 'Unterstützung regionaler Erzeuger', 'Preisstabilität durch Unabhängigkeit'] },
    { id: 'mobilfunk', title: 'Mobilfunk', icon: '📱', desc: 'Der Tarif-Dschungel gelichtet: So finden Sie den besten Handytarif.', benefits: ['Alle Netze (D1, D2, O2) im Vergleich', 'Sim-Only oder mit Smartphone-Option', 'Sofort-Wechsel mit Rufnummernmitnahme'] },
    { id: 'reise', title: 'Pauschalreisen', icon: '✈️', desc: 'Traumurlaub planen: Worauf Sie bei der Buchung achten sollten.', benefits: ['Frühbucher- & Last-Minute-Vorteile', 'Inklusive Flug, Hotel & Transfer', 'Tiefpreisgarantie für Ihren Urlaub'] },
    { id: 'mietwagen', title: 'Mietwagen', icon: '🚗', desc: 'Weltweit mobil: Tipps für die günstige und sichere Buchung.', benefits: ['Rundum-Sorglos-Schutz ohne Selbstbeteiligung', 'Faire Tankregelung (Voll/Voll)', 'Große Fahrzeugauswahl an tausenden Stationen'] }
];

const blogTemplate = (ins) => `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ins.title}: Neutraler Ratgeber & Tipps | JETZT TARIF SPAREN</title>
    <meta name="description" content="${ins.desc} Informieren Sie sich objektiv über die Vorteile und Möglichkeiten.">
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <header>
        <div class="container nav-container">
            <a href="/" class="logo">Jetzt <span>Tarif</span> Sparen</a>
            
            <nav class="nav-links">
                <div class="has-dropdown">
                    <span class="nav-link" style="cursor: default;">Haus & Energie</span>
                    <div class="mega-menu">
                        <div class="mega-title">Haus & Energie</div>
                        <a href="/versicherungen/solar/">Solaranlage</a>
                        <a href="/versicherungen/strom/">Strom</a>
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
                    </div>
                </div>

                <a href="/blog/" class="nav-link" style="display: flex; align-items: center; padding: 1.5rem 0;">Ratgeber</a>
            </nav>

            <div class="flex" style="gap: 1rem; align-items: center;">
                <a href="#angebote" class="btn btn-primary desktop-btn-only" style="padding: 0.75rem 1.5rem; display: none; @media(min-width: 1024px){display:inline-flex;}">Alle Services</a>
                <button type="button" class="mobile-menu-btn" id="mobile-btn">
                    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Placeholder -->
        <div class="mobile-menu-overlay" id="mobile-overlay">
            <div class="mobile-menu-header">
                <a href="/" class="logo">Jetzt <span>Tarif</span> Sparen</a>
                <button type="button" class="mobile-close-btn" id="mobile-close">&times;</button>
            </div>
            
            <div class="mobile-nav-group">
                <div class="mobile-nav-title">Haus & Energie</div>
                <a href="/versicherungen/solar/" class="mobile-nav-link">Solaranlage</a>
                <a href="/versicherungen/strom/" class="mobile-nav-link">Strom</a>
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
                <div class="mobile-nav-title">Mehr Services</div>
                <a href="/versicherungen/kfz/" class="mobile-nav-link">KFZ-Versicherung</a>
                <a href="/versicherungen/haftpflicht/" class="mobile-nav-link">Haftpflicht</a>
                <a href="/versicherungen/girokonto/" class="mobile-nav-link">Girokonto</a>
                <a href="/blog/" class="mobile-nav-link">Ratgeber (Alle Beiträge)</a>
                <a href="/kontakt/" class="mobile-nav-link">Kontakt</a>
            </div>

            <a href="/versicherungen/" class="btn btn-primary" style="width: 100%; margin-top: 1rem; justify-content: center; padding: 1.25rem;">Alle Tarife entdecken</a>
        </div>
    </header>

    <main class="section-padding" style="padding-top: 150px;">
        <div class="container article-container">
            <div class="card" style="padding: 3rem; background: var(--surface);">
                <div class="speed-marker">Ratgeber • Unabhängiges Wissen</div>
                <h1 style="font-size: 2.5rem; margin-top: 1.5rem; margin-bottom: 1.5rem;">Was Sie über ${ins.title} wissen müssen</h1>
                <p style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 2rem;">${ins.desc}</p>

                <div class="article-content" style="line-height: 1.8;">
                    <p>Die Entscheidung für eine passende Lösung im Bereich <strong>${ins.title}</strong> ist oft komplex. Es gibt eine Vielzahl an Anbietern und Tarifen am Markt, die sich nicht nur im Preis, sondern vor allem im Kleingedruckten massiv unterscheiden. In diesem neutralen Ratgeber erfahren Sie, worauf es wirklich ankommt.</p>
                    
                    <h2 style="margin-top: 2.5rem; margin-bottom: 1.5rem;">Warum ein Vergleich sinnvoll ist</h2>
                    <p>Egal ob es um Vorsorge, Absicherung oder Fixkosten geht: Wer vergleicht, spart – und das oft dauerhaft. Bei ${ins.title} können die Preisunterschiede zwischen dem günstigsten und dem teuersten Anbieter bei identischer Leistung oft über 50% betragen.</p>
                    
                    <div class="upsell-box" style="background: var(--primary-light); border-left: 5px solid var(--accent); padding: 2rem; margin: 3rem 0; border-radius: 0 1rem 1rem 0;">
                        <h3 style="margin-bottom: 1rem;">⚡ Jetzt hunderte Euro sparen</h3>
                        <p style="margin-bottom: 1.5rem;">Nutzen Sie unseren kostenlosen und unabhängigen Tarif-Check, um das beste Angebot am Markt für Sie zu finden.</p>
                        <a href="/versicherungen/${ins.id}/" class="btn btn-primary">Zum ${ins.title}-Check<span class="affiliate-marker">*</span></a>
                    </div>

                    <h2 style="margin-bottom: 1.5rem;">Die wichtigsten Vorteile auf einen Blick</h2>
                    <ul style="padding-left: 1.5rem; margin-bottom: 2rem;">
                        ${ins.benefits.map(b => `<li style="margin-bottom: 1rem; list-style-type: disc;">${b}</li>`).join('')}
                    </ul>

                    <h2 style="margin-bottom: 1.5rem;">Lohnt sich der Abschluss für mich?</h2>
                    <p>Das hängt ganz von Ihrer individuellen Situation ab. Ein neutraler Check Ihrer bestehenden Verträge oder eine Neu-Anfrage hilft Ihnen, Licht ins Dunkel zu bringen. Wir von TARIF CHECK stehen Ihnen als unabhängiger Partner zur Seite, um Transparenz in den Tarifdschungel zu bringen.</p>
                    
                    <p style="margin-top: 2rem;">Warten Sie nicht länger und optimieren Sie Ihre Kosten noch heute. Ein kurzer Check dauert meist nicht länger als 2 Minuten.</p>
                </div>
            </div>
        </div>
    </main>

    <footer></footer>

    <script type="module" src="/main.js"></script>
</body>
</html>
`;

for (const ins of blogServices) {
    const blogPath = path.join(__dirname, 'blog', ins.id);
    if (!fs.existsSync(blogPath)) {
        fs.mkdirSync(blogPath, { recursive: true });
    }
    fs.writeFileSync(path.join(blogPath, 'index.html'), blogTemplate(ins), 'utf8');
    console.log(`Generated blog: blog/${ins.id}/index.html`);
}
console.log('All blogs generated.');
