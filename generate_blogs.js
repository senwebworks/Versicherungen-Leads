import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insurances = [
    { id: 'altersvorsorge', title: 'Altersvorsorge', icon: '👴', desc: 'Die besten Strategien für einen sorgenfreien Ruhestand.', benefits: ['Schließt die Rentenlücke', 'Steuerliche Vorteile nutzen', 'Flexible Auszahlungsmodelle'] },
    { id: 'basisrente', title: 'Basisrente', icon: '🏦', desc: 'Attraktive Lösung besonders für Selbstständige und Besserverdienende.', benefits: ['Hohe steuerliche Absetzbarkeit', 'Pfändungssicher in der Ansparphase', 'Lebenslange Rente'] },
    { id: 'brillen', title: 'Brillenversicherung', icon: '👓', desc: 'Klare Sicht ohne hohe Zuzahlungen für Sehhilfen.', benefits: ['Zuschüsse für Brillen und Kontaktlinsen', 'Regelmäßige Erstattungen', 'Keine hohen Einmalkosten'] },
    { id: 'bu', title: 'Berufsunfähigkeitsversicherung (BU)', icon: '🛡️', desc: 'Sichern Sie Ihr wertvollstes Gut: Ihre Arbeitskraft.', benefits: ['Erhalt des Lebensstandards', 'Psychische Erkrankungen oft abgedeckt', 'Schutz vor sozialem Abstieg'] },
    { id: 'gkv', title: 'GKV (Gesetzliche Krankenversicherung)', icon: '🏥', desc: 'Solide Basisabsicherung für Gesundheit und Familie.', benefits: ['Familienversicherung ohne Aufpreis', 'Keine Gesundheitsprüfung zur Aufnahme', 'Sachleistungsprinzip ohne Vorkasse'] },
    { id: 'haftpflicht', title: 'Privathaftpflichtversicherung', icon: '⚖️', desc: 'Ein absolutes Muss zum Schutz vor millionenschweren Forderungen.', benefits: ['Abwehr unberechtigter Ansprüche', 'Schutz bei Personen- und Sachschäden', 'Sehr günstiges Preis-Leistungs-Verhältnis'] },
    { id: 'hausrat', title: 'Hausratversicherung', icon: '🛋️', desc: 'Schutz für Ihr bewegliches Hab und Gut bei Feuer, Wasser oder Diebstahl.', benefits: ['Neuwertentschädigung', 'Absicherung gegen Einbruchdiebstahl', 'Optionale Naturgefahren-Deckung'] },
    { id: 'kfz', title: 'KFZ-Versicherung', icon: '🚗', desc: 'Obligatorisch und trotzdem mit großem Sparpotenzial.', benefits: ['Gesetzlich vorgeschrieben (Haftpflicht)', 'Schutz des eigenen Wagens (Kasko)', 'Zusatzbausteine wie Schutzbrief'] },
    { id: 'krankenhaus', title: 'Krankenhauszusatzversicherung', icon: '🛏️', desc: 'Privatpatienten-Status im entscheidenden Moment.', benefits: ['Chefarztbehandlung', 'Ein- oder Zweibettzimmer', 'Freie Krankenhauswahl'] },
    { id: 'pkv', title: 'Private Krankenversicherung (PKV)', icon: '🩺', desc: 'Premium-Gesundheitsschutz für Besserverdienende und Selbstständige.', benefits: ['Kürzere Wartezeiten bei Fachärzten', 'Individuell wählbare Leistungen', 'Oft Beitragsrückerstattungen möglich'] },
    { id: 'rechtsschutz', title: 'Rechtsschutzversicherung', icon: '👨‍⚖️', desc: 'Setzen Sie Ihr Recht ohne finanzielles Risiko durch.', benefits: ['Übernahme von Anwalts- und Gerichtskosten', 'Kostenlose Erstberatung (Hotline)', 'Schutz im Verkehr, Beruf und Privat'] },
    { id: 'rente', title: 'Private Rentenversicherung', icon: '📈', desc: 'Flexibler und planbarer Vermögensaufbau für später.', benefits: ['Kapitalwahlrecht am Ende', 'Renditechancen durch Fonds', 'Absicherung der Hinterbliebenen'] },
    { id: 'riester', title: 'Riester-Rente', icon: '💰', desc: 'Staatlich gefördert vorsorgen mit Zulagen und Steuervorteilen.', benefits: ['Staatliche Grund- und Kinderzulagen', 'Steuerliche Absetzbarkeit', 'Garantierter Kapitalerhalt'] },
    { id: 'vl', title: 'Vermögenswirksame Leistungen (VL)', icon: '🪙', desc: 'Geld geschenkt vom Arbeitgeber für Ihren Vermögensaufbau.', benefits: ['Zusätzliches Geld vom Chef', 'Staatliche Sparzulage (einkommensabhängig)', 'Verschiedene Anlageformen wählbar'] },
    { id: 'wohngebaeude', title: 'Wohngebäudeversicherung', icon: '🏠', desc: 'Unverzichtbarer Schutz für Immobilienbesitzer.', benefits: ['Absicherung bei Feuer-, Leitungswasser-, Sturmschäden', 'Übernahme von Aufräumkosten', 'Elementarschaden-Zusatz möglich'] },
    { id: 'zahnzusatz', title: 'Zahnzusatzversicherung', icon: '🦷', desc: 'Ein strahlendes Lächeln ohne Angst vor der Zahnarztrechnung.', benefits: ['Hohe Erstattungen für Zahnersatz (Implantate, Inlays)', 'Professionelle Zahnreinigung', 'Auch Kieferorthopädie für Kinder'] }
];

const templatePath = path.join(__dirname, 'blog', 'sinnvolle-versicherungen', 'index.html');
const templateStr = fs.readFileSync(templatePath, 'utf8');

const targetHtml = templateStr; 
// We'll replace the title, h1, descriptions inside targetHtml

insurances.forEach(ins => {
    let blogPath = path.join(__dirname, 'blog', ins.id);
    if (!fs.existsSync(blogPath)) {
        fs.mkdirSync(blogPath, { recursive: true });
    }

    let pageHtml = targetHtml;
    // Replace Meta Data
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>Vorteile der ${ins.title} - Neutraler Marktvergleich | Sicher Versicherung</title>`);
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="Informieren Sie sich neutral über die Vorteile und Einsatzwecke der ${ins.title}. Unser Ratgeber unterstützt Sie beim Vergleich.">`);
    
    // Replace Header
    pageHtml = pageHtml.replace(/<h1.*?>.*?<\/h1>/, `<h1 style="font-size: 2.5rem; margin-top: 1rem;">Alles Wichtige zur ${ins.title}</h1>`);
    pageHtml = pageHtml.replace(/<p style="color: var\(--text-muted\);">.*?<\/p>/, `<p style="color: var(--text-muted);">${ins.desc}</p>`);

    // Replace Article Content
    let contentStart = pageHtml.indexOf('<div class="article-content">') + '<div class="article-content">'.length;
    let ctaStart = pageHtml.indexOf('<div class="upsell-box"');
    
    let articleContent = `
                <p>Die <strong>${ins.title}</strong> ist ein wichtiger Baustein in der persönlichen Absicherung. In diesem neutralen Ratgeber beleuchten wir objektiv, für wen sich diese Absicherung eignet und welche generellen Vorteile sie mit sich bringt.</p>
                
                <h2>Warum eine ${ins.title}?</h2>
                <p>Oftmals reicht die Basisabsicherung durch den Staat oder die gesetzlichen Kassen nicht aus, um im Ernstfall alle Kosten abzudecken. Genau hier setzt die ${ins.title} an, indem sie finanzielle Risiken minimiert und Ihnen Planungssicherheit bietet.</p>

                <h2>Ihre Vorteile im Überblick</h2>
                <ul>
                    ${ins.benefits.map(b => `<li style="margin-bottom: 0.5rem; list-style-type: disc; margin-left: 2rem;">${b}</li>`).join('')}
                </ul>

                <h2>Für wen ist dieser Schutz sinnvoll?</h2>
                <p>Die Entscheidung für oder gegen eine Versicherung sollte immer individuell getroffen werden. Ob sich die ${ins.title} für Sie lohnt, hängt von Ihrer persönlichen Lebenssituation, Ihrem Sicherheitsbedürfnis und Ihren finanziellen Möglichkeiten ab. Ein unverbindlicher und unabhängiger Vergleich hilft dabei, den passenden Tarif am Markt zu identifizieren.</p>
                `;

    pageHtml = pageHtml.substring(0, contentStart) + articleContent + pageHtml.substring(ctaStart);

    fs.writeFileSync(path.join(blogPath, 'index.html'), pageHtml, 'utf8');
});

// Update blog/index.html to include new links
const blogIndex = path.join(__dirname, 'blog', 'index.html');
let indexHtml = fs.readFileSync(blogIndex, 'utf8');

// Find insertion point before </div></a></div></div>
// Find insertion point before end of container
let insertPos = indexHtml.lastIndexOf('<div class="blog-row-container"');
if (insertPos === -1) insertPos = indexHtml.lastIndexOf('<div class="grid"'); // Fallback
let insertPosEnd = indexHtml.indexOf('</div>', insertPos); 

let gridRegex = /(<div class="(blog-row-container|grid)"[\s\S]*?)(<\/div>\s*<\/a>\s*<\/div>\s*<\/div>\s*<\/section>|<\/div>\s*<\/div>\s*<\/section>)/;
let match = indexHtml.match(gridRegex);

if (match) {
    let gridContent = match[1];
    // Clean up rogue </a>
    gridContent = gridContent.replace(/<\/div>\s*<\/a>$/, '</div>');
    
    let newCards = insurances.map(ins => `
                    <!-- New Blog -->
                    <a href="/blog/${ins.id}/" class="blog-row-card">
                        <div class="blog-row-img" style="background: #F8FAFC;">${ins.icon}</div>
                        <div class="blog-row-content">
                            <div class="flex" style="justify-content: flex-start; margin-bottom: 0.5rem;">
                               <span class="badge-direct">Versicherungswissen</span>
                            </div>
                            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${ins.title}</h3>
                            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">${ins.desc}</p>
                            <div style="margin-top: 1rem; color: var(--accent); font-weight: 700; font-size: 0.9rem;">Vollständigen Artikel lesen →</div>
                        </div>
                    </a>`).join('\n');

    let finalGrid = gridContent + newCards + '\n                </div>\n            </div>\n        </section>';
    indexHtml = indexHtml.replace(gridRegex, finalGrid);
    fs.writeFileSync(blogIndex, indexHtml, 'utf8');
    console.log('Blog index updated.');
} else {
    console.log('Could not find grid in blog index.');
}

console.log('Blogs generated.');
