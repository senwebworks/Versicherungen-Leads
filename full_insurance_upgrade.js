import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = path.join('C:', 'Users', 'senka', '.gemini', 'antigravity', 'brain', '22ff11c7-a936-46f9-ab3e-becd6fea12c1');
const publicImagesDir = path.join(__dirname, 'public', 'images');

// Helper to copy and get image path
function prepImage(brainName, publicName) {
    if (fs.existsSync(brainDir)) {
        const files = fs.readdirSync(brainDir);
        const match = files.find(f => f.startsWith(brainName) && f.endsWith('.png'));
        if (match) {
            fs.copyFileSync(path.join(brainDir, match), path.join(publicImagesDir, publicName + '.png'));
            return '/images/' + publicName + '.png';
        }
    }
    return '';
}

const images = {
    dental: prepImage('insurance_dental_care', 'dental'),
    house: prepImage('insurance_residential_home', 'house'),
    car: prepImage('insurance_car_safe', 'car'),
    finance: prepImage('insurance_investment_gold', 'finance_new'),
    energy: prepImage('insurance_energy_electricity', 'energy_new'),
    travel: prepImage('insurance_travel_suitcase', 'travel'),
    liability: prepImage('insurance_liability_broken', 'liability'),
    legal: prepImage('insurance_legal_scales', 'legal'),
    health_card: prepImage('insurance_health_card', 'health_card'),
};

// Fallbacks
if (!images.dental) images.dental = '/images/health.png';
if (!images.house) images.house = '/images/property.png';
if (!images.car) images.car = '/images/property.png';
if (!images.finance) images.finance = '/images/finance.png';
if (!images.energy) images.energy = '/images/finance.png';
if (!images.travel) images.travel = '/images/property.png';
if (!images.liability) images.liability = '/images/property.png';
if (!images.legal) images.legal = '/images/property.png';
if (!images.health_card) images.health_card = '/images/health.png';

const insuranceConfigs = {
    'pkv': { 
        title: 'Private Krankenversicherung (PKV)', 
        subtitle: 'Premium-Schutz für anspruchsvolle Kunden.',
        img: images.health_card,
        cat: 'Gesundheit',
        fields: [
            { label: 'Aktueller Status', type: 'select', opts: ['Angestellt', 'Selbstständig', 'Beamter', 'Student'] },
            { label: 'Geburtsdatum', type: 'date' },
            { label: 'Bruttoeinkommen p.a.', type: 'text', placeholder: 'z.B. 75.000 €' }
        ]
    },
    'gkv': { 
        title: 'GKV Kassenwechsel', 
        subtitle: 'Optimieren Sie Ihre gesetzliche Versorgung.',
        img: images.health_card,
        cat: 'Gesundheit',
        fields: [
            { label: 'Aktuelle Krankenkasse', type: 'text' },
            { label: 'Berufliche Situation', type: 'select', opts: ['Angestellt', 'Selbstständig', 'Auszubildender'] }
        ]
    },
    'zahnzusatz': { 
        title: 'Zahnzusatzversicherung', 
        subtitle: 'Keine Angst mehr vor hohen Zahnarztrechnungen.',
        img: images.dental,
        cat: 'Gesundheit',
        fields: [
            { label: 'Anzahl fehlender Zähne', type: 'select', opts: ['0', '1-3', '4+'] },
            { label: 'Ist eine Behandlung geplant?', type: 'select', opts: ['Nein', 'Ja, bereits in Beratung'] }
        ]
    },
    'krankenhaus': { 
        title: 'Krankenhaus-Zusatzversicherung', 
        subtitle: 'Einbettzimmer und Chefarzt wie ein Privatpatient.',
        img: images.health_card,
        cat: 'Gesundheit',
        fields: [
            { label: 'Gewünschte Leistung', type: 'select', opts: ['1-Bett Zimmer', '2-Bett Zimmer', 'Nur Chefarzt'] }
        ]
    },
    'brillen': { 
        title: 'Brillen- & Heilpraktiker', 
        subtitle: 'Zuschüsse für Sehhilfen und alternative Medizin.',
        img: images.health_card,
        cat: 'Gesundheit',
        fields: [
            { label: 'Tragen Sie aktuell eine Brille?', type: 'select', opts: ['Ja', 'Nein'] }
        ]
    },
    'wohngebaeude': { 
        title: 'Wohngebäudeversicherung', 
        subtitle: 'Schutz für Ihr wertvollstes Investment.',
        img: images.house,
        cat: 'Haus',
        fields: [
            { label: 'Baujahr der Immobilie', type: 'text' },
            { label: 'Wohnfläche in m²', type: 'text' },
            { label: 'Art des Hauses', type: 'select', opts: ['Einfamilienhaus', 'Mehrfamilienhaus', 'Reihenhaus'] }
        ]
    },
    'hausrat': { 
        title: 'Hausratversicherung', 
        subtitle: 'Sicherheit für alles, was Ihnen lieb ist.',
        img: images.house,
        cat: 'Haus',
        fields: [
            { label: 'Wohnfläche in m²', type: 'text' },
            { label: 'Fahrraddiebstahl einschließen?', type: 'select', opts: ['Ja', 'Nein'] }
        ]
    },
    'haftpflicht': { 
        title: 'Privathaftpflicht', 
        subtitle: 'Der wichtigste Schutz für jeden Haushalt.',
        img: images.liability,
        cat: 'Haftpflicht',
        fields: [
            { label: 'Familienstatus', type: 'select', opts: ['Single', 'Familie mit Kindern', 'Paar ohne Kinder'] }
        ]
    },
    'rechtsschutz': { 
        title: 'Rechtsschutzversicherung', 
        subtitle: 'Ihr gutes Recht sicher und ohne Kostenrisiko.',
        img: images.legal,
        cat: 'Rechtsschutz',
        fields: [
            { label: 'Gewünschte Bereiche', type: 'select', opts: ['Privat, Beruf, Verkehr', 'Privat & Wohnen', 'Komplettschutz'] }
        ]
    },
    'altersvorsorge': { 
        title: 'Private Altersvorsorge', 
        subtitle: 'Legen Sie heute den Grundstein für später.',
        img: images.finance,
        cat: 'Vorsorge',
        fields: [
            { label: 'Monatlicher Sparbetrag', type: 'text', placeholder: 'z.B. 100 €' },
            { label: 'Geplanter Rentenbeginn', type: 'select', opts: ['In 10 Jahren', 'In 20 Jahren', 'In 30+ Jahren'] }
        ]
    },
    'rente': { 
        title: 'Private Rentenversicherung', 
        subtitle: 'Sichere Rente ein Leben lang.',
        img: images.finance,
        cat: 'Vorsorge',
        fields: [
            { label: 'Geldeinlage', type: 'select', opts: ['Einmalzahlung', 'Monatlich sparen'] }
        ]
    },
    'basisrente': { 
        title: 'Basisrente (Rürup)', 
        subtitle: 'Steuerliche Vorteile für Selbstständige.',
        img: images.finance,
        cat: 'Vorsorge',
        fields: [
            { label: 'Jahreseinkommen ca.', type: 'text' }
        ]
    },
    'riester': { 
        title: 'Riester Rente', 
        subtitle: 'Staatliche Zulagen für Ihre Vorsorge.',
        img: images.finance,
        cat: 'Vorsorge',
        fields: [
            { label: 'Anzahl Kinder (Zulagen)', type: 'select', opts: ['0', '1', '2', '3+'] }
        ]
    },
    'bu': { 
        title: 'Berufsunfähigkeit (BU)', 
        subtitle: 'Sichern Sie Ihr wichtigstes Gut: Ihre Arbeitskraft.',
        img: images.finance, // or briefcase if we had one
        cat: 'Vorsorge',
        fields: [
            { label: 'Aktueller Beruf', type: 'text' },
            { label: 'Gewünschte monatl. Rente', type: 'text', placeholder: 'z.B. 1.500 €' }
        ]
    },
    'vl': { 
        title: 'VL-Sparen', 
        subtitle: 'Geschenktes Geld vom Arbeitgeber nutzen.',
        img: images.finance,
        cat: 'Vorsorge',
        fields: [
            { label: 'Arbeitgeberanteil bekannt?', type: 'text', placeholder: 'z.B. 40 €' }
        ]
    },
    'kfz': { 
        title: 'KFZ-Versicherung', 
        subtitle: 'Günstiger fahren bei vollem Schutz.',
        img: images.car,
        cat: 'KFZ',
        fields: [
            { label: 'Fahrzeugmodell', type: 'text' },
            { label: 'Jährliche Fahrleistung', type: 'text', placeholder: 'km/Jahr' },
            { label: 'Schadenfreiheitsklasse (SF)', type: 'text' }
        ]
    },
    'reise': { 
        title: 'Reiseversicherung', 
        subtitle: 'Weltweiter Schutz für Ihren Urlaub.',
        img: images.travel,
        cat: 'Reise',
        fields: [
            { label: 'Reiseziel', type: 'select', opts: ['Europa', 'Weltweit'] },
            { label: 'Reisedauer', type: 'select', opts: ['Einzelreise', 'Jahresschutz'] }
        ]
    },
    'strom': { 
        title: 'Stromtarif-Check', 
        subtitle: 'Senken Sie Ihre Stromkosten dauerhaft.',
        img: images.energy,
        cat: 'Energie',
        fields: [
            { label: 'Jahresverbrauch (kWh)', type: 'text' },
            { label: 'Personen im Haushalt', type: 'select', opts: ['1', '2', '3', '4+'] },
            { label: 'PLZ', type: 'text' }
        ]
    },
    'gas': { 
        title: 'Gastarif-Wechsel', 
        subtitle: 'Günstig heizen ohne Qualitätsverlust.',
        img: images.energy,
        cat: 'Energie',
        fields: [
            { label: 'Jahresverbrauch (kWh)', type: 'text' },
            { label: 'Wohnfläche ca. (m²)', type: 'text' },
            { label: 'PLZ', type: 'text' }
        ]
    }
};

const pkvContent = fs.readFileSync(path.join(__dirname, 'versicherungen', 'pkv', 'index.html'), 'utf8');
const headerTemplate = pkvContent.split(/<header.*?>/)[0] + pkvContent.match(/<header.*?>/)[0] + pkvContent.split(/<header.*?>/)[1].split('</header>')[0] + '</header>';
const footerTemplate = pkvContent.split(/<footer.*?>/)[1].split('</footer>')[0];

function generateAnfrageHTML(type, config) {
    const fieldsHTML = config.fields.map(f => {
        if (f.type === 'select') {
            return `
                <div class="form-group">
                    <label class="form-label">${f.label} *</label>
                    <select name="${f.label.toLowerCase().replace(/[^a-z]/g, '')}" class="input-field" required>
                        <option value="">Bitte wählen...</option>
                        ${f.opts.map(o => `<option value="${o}">${o}</option>`).join('')}
                    </select>
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <label class="form-label">${f.label} *</label>
                    <input type="${f.type}" name="${f.label.toLowerCase().replace(/[^a-z]/g, '')}" class="input-field" placeholder="${f.placeholder || ''}" required>
                </div>
            `;
        }
    }).join('');

    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anfrage: ${config.title} - SICHER VERSICHERUNG</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body style="background: var(--background);">
    ${headerTemplate}

    <main class="section-padding">
        <div class="container">
            <div class="hero-split" style="grid-template-columns: 1fr 1.2fr; align-items: flex-start; gap: var(--space-2xl);">
                <!-- Left -->
                <div class="animate-fade-in" style="position: sticky; top: 120px;">
                    <span class="badge-direct" style="background: var(--success); color: white; padding: 0.5rem 1rem; font-size: 0.9rem; margin-bottom: 1rem; display: inline-block;">✓ Direkt & Unverbindlich</span>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.2;">Analyse für Ihre<br><span style="color: var(--accent);">${config.title}</span></h1>
                    
                    <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">Wir benötigen nur wenige Details, um für Sie den perfekten Tarif am Markt zu identifizieren.</p>

                    <div style="margin-bottom: 2rem;">
                        <img src="${config.img}" style="width: 100%; border-radius: 1rem; box-shadow: var(--shadow-lg);">
                    </div>

                    <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                        <span class="trust-badge" style="background: white;">🏆 Geprüfte Tarife</span>
                        <span class="trust-badge" style="background: white;">🤝 Unabhängig</span>
                        <span class="trust-badge" style="background: white;">🔒 SSL Safe</span>
                    </div>
                </div>

                <!-- Right -->
                <div>
                    <div class="card animate-fade-in" style="padding: var(--space-xl); background: white; box-shadow: var(--shadow-xl); border-top: 4px solid var(--accent);">
                        <div style="text-align: center; margin-bottom: var(--space-lg);">
                            <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Schritt 1: Angaben</h2>
                            <p style="color: var(--text-muted);">Spezifische Fragen zur ${config.title}</p>
                        </div>

                        <form id="leadForm" action="/anfrage/danke.html" method="GET">
                            <input type="hidden" name="insurance_type" value="${type}">
                            
                            <div class="grid" style="grid-template-columns: 1fr; gap: var(--space-md); margin-bottom: 2rem;">
                                ${fieldsHTML}
                            </div>

                            <div style="text-align: center; margin-bottom: 2rem;">
                                <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Schritt 2: Kontakt</h3>
                            </div>

                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                                <div class="form-group">
                                    <label class="form-label">Vor- & Zuname *</label>
                                    <input type="text" name="name" class="input-field" placeholder="Max Mustermann" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">E-Mail Adresse *</label>
                                    <input type="email" name="email" class="input-field" placeholder="beispiel@mail.de" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Telefonnummer *</label>
                                <input type="tel" name="phone" class="input-field" placeholder="Optional" required>
                            </div>

                            <div class="checkbox-group" style="margin-top: 2rem; background: rgba(5, 150, 105, 0.05); padding: 1rem; border-radius: 0.75rem;">
                                <input type="checkbox" id="dsgvo" required>
                                <label for="dsgvo" style="font-size: 0.85rem;">
                                    <strong>Datenschutz:</strong> Ich stimme der vertraulichen Verarbeitung zu. (<a href="/rechtliches/datenschutz.html" style="color: var(--accent);">Details</a>)
                                </label>
                            </div>

                            <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1.5rem; padding: 1.25rem; font-size: 1.25rem;">
                                Kostenloses Angebot anfordern
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer>${footerTemplate}</footer>
</body>
</html>`;
}

// Global update loop
Object.keys(insuranceConfigs).forEach(type => {
    const config = insuranceConfigs[type];
    const dir = path.join(__dirname, 'versicherungen', type);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Generate anfrage.html
    const anfrageHTML = generateAnfrageHTML(type, config);
    fs.writeFileSync(path.join(dir, 'anfrage.html'), anfrageHTML, 'utf8');

    // 2. Update index.html
    const indexPath = path.join(dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf8');

        // Replace content section text and image
        // We look for <!-- Detailed Advantages Content --> block
        if (indexContent.includes('<!-- Detailed Advantages Content -->')) {
            const startTag = '<!-- Detailed Advantages Content -->';
            const endTag = '<!-- End Detailed Advantages Content -->';
            
            const newDetailHTML = `
        <!-- Detailed Advantages Content -->
        <section class="section-padding" style="background: var(--surface);">
            <div class="container">
                <div class="hero-split">
                    <div style="padding-right: var(--space-md);">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">${config.title}: Mehr als nur Schutz</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Die Wahl der richtigen ${config.title} ist eine Entscheidung für Ihre finanzielle Sicherheit und mentale Entlastung. Wir helfen Ihnen dabei, die feinen Unterschiede im Kleingedruckten der Anbieter zu verstehen und den Tarif zu finden, der wirklich liefert, wenn es darauf ankommt.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem;">
                            Ob für Privatpersonen, Familien oder Freiberufler – unsere Marktanalyse umfasst über 280 Tarife und wird täglich aktualisiert. So garantieren wir Ihnen nicht nur faire Beiträge, sondern vor allem ein Leistungsniveau, das exakt auf Ihren Lebensstil passt.
                        </p>
                        <div class="benefit-list">
                            <span class="benefit-tag">✓ 100% Unabhängiger Vergleich</span>
                            <span class="benefit-tag">✓ Täglicher Abgleich aller Markttarife</span>
                            <span class="benefit-tag">✓ Schnelle & digitale Abwicklung</span>
                        </div>
                    </div>
                    <div>
                        <div style="border-radius: 1.5rem; overflow: hidden; box-shadow: var(--shadow-xl); position: relative;">
                            <img src="${config.img}" alt="${config.title}" style="width: 100%; height: auto; display: block; filter: brightness(1.05);">
                            <div style="position: absolute; top: 1.5rem; left: 1.5rem; background: var(--accent); color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">Top Empfehlung</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Detailed Advantages Content -->`;

            const parts = indexContent.split(startTag);
            if (parts.length > 1) {
                const subParts = parts[1].split(endTag);
                indexContent = parts[0] + newDetailHTML + subParts[1];
            }
        }

        // Update CTA links to the new anfrage.html
        indexContent = indexContent.replace(new RegExp(`/anfrage/\\?type=${type}`, 'g'), `./anfrage.html`);
        // Also update regular /anfrage/ links in the page context if any
        indexContent = indexContent.replace(/href="\/anfrage\/"/g, `href="./anfrage.html"`);

        fs.writeFileSync(indexPath, indexContent, 'utf8');
    }
});

console.log('19 Insurance pages and Sub-Forms upgraded.');
