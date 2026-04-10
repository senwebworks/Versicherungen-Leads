import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Copy images
const brainDir = path.join('C:', 'Users', 'senka', '.gemini', 'antigravity', 'brain', '22ff11c7-a936-46f9-ab3e-becd6fea12c1');
const publicImagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Find the generated images
let healthImage = '';
let propertyImage = '';
let financeImage = '';

if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    const healthFile = files.find(f => f.startsWith('health_insurance_advantages') && f.endsWith('.png'));
    const propFile = files.find(f => f.startsWith('property_insurance_advantages') && f.endsWith('.png'));
    const finFile = files.find(f => f.startsWith('finance_insurance_advantages') && f.endsWith('.png'));

    if (healthFile) {
        fs.copyFileSync(path.join(brainDir, healthFile), path.join(publicImagesDir, 'health.png'));
        healthImage = '/images/health.png';
    }
    if (propFile) {
        fs.copyFileSync(path.join(brainDir, propFile), path.join(publicImagesDir, 'property.png'));
        propertyImage = '/images/property.png';
    }
    if (finFile) {
        fs.copyFileSync(path.join(brainDir, finFile), path.join(publicImagesDir, 'finance.png'));
        financeImage = '/images/finance.png';
    }
}

// Ensure fallbacks if any are missing
if (!healthImage) healthImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80';
if (!propertyImage) propertyImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
if (!financeImage) financeImage = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80';

const categories = {
    'pkv': { type: 'health', title: 'Ihre Gesundheit in besten Händen' },
    'gkv': { type: 'health', title: 'Solider Schutz für den Alltag' },
    'zahnzusatz': { type: 'health', title: 'Für ein strahlendes Lächeln' },
    'krankenhaus': { type: 'health', title: 'Erstklassige Klinikbehandlung' },
    'brillen': { type: 'health', title: 'Volle Sehkraft, null Kostenrisiko' },
    'wohngebaeude': { type: 'property', title: 'Rundumschutz für Ihre Immobilie' },
    'hausrat': { type: 'property', title: 'Schutz für Ihr wertvolles Zuhause' },
    'haftpflicht': { type: 'property', title: 'Umfassender Schutz bei jedem Fehltritt' },
    'rechtsschutz': { type: 'property', title: 'Ihr gutes Recht sicher durchsetzen' },
    'altersvorsorge': { type: 'finance', title: 'Sorgenfrei den Ruhestand genießen' },
    'rente': { type: 'finance', title: 'Passives Einkommen im Alter' },
    'basisrente': { type: 'finance', title: 'Steuerlich gefördert vorsorgen' },
    'riester': { type: 'finance', title: 'Staatliche Zuschüsse clever nutzen' },
    'bu': { type: 'finance', title: 'Einkommen nachhaltig absichern' },
    'vl': { type: 'finance', title: 'Vermögen durch den Arbeitgeber aufbauen' },
    'kfz': { type: 'property', title: 'Sicher auf allen Straßen unterwegs' }, // fallback to property
    'reise': { type: 'property', title: 'Sorgenfrei die Welt entdecken' },    // fallback to property
    'strom': { type: 'finance', title: 'Grüne Energie & volle Kostenkontrolle' }, // fallback to finance
    'gas': { type: 'finance', title: 'Zuverlässig heizen & Geld sparen' }     // fallback to finance
};

const getImageUrl = (type) => {
    if (type === 'health') return healthImage;
    if (type === 'property') return propertyImage;
    if (type === 'finance') return financeImage;
    return financeImage;
}

const versicherungenDir = path.join(__dirname, 'versicherungen');

if (fs.existsSync(versicherungenDir)) {
    fs.readdirSync(versicherungenDir).forEach(dir => {
        const indexPath = path.join(versicherungenDir, dir, 'index.html');
        if (fs.existsSync(indexPath)) {
            let content = fs.readFileSync(indexPath, 'utf8');
            let initialContent = content;

            // Check if we already injected the detailed content block
            if (!content.includes('<!-- Detailed Advantages Content -->')) {
                const config = categories[dir];
                if (config) {
                    const imgUrl = getImageUrl(config.type);

                    const contentBlock = `
        <!-- Detailed Advantages Content -->
        <section class="section-padding" style="background: var(--surface);">
            <div class="container">
                <div class="hero-split">
                    <div style="padding-right: var(--space-md);">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">${config.title}</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Die richtige Absicherung ist mehr als nur ein Vertrag – sie bedeutet pure Lebensqualität und Sicherheit für Sie und Ihre Liebsten. Wenn das Unerwartete eintritt, schützt Sie unser transparentes und leistungsstarkes Modell vor enormen finanziellen Risiken.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem;">
                            Durch einen unabhängigen und kostenlosen Vergleich finden wir das Angebot, das perfekt auf Ihre aktuelle Lebenssituation zugeschnitten ist. So profitieren Sie von maximalen Leistungen bei gleichzeitig fairen Beiträgen, ohne sich durch den Tarifdschungel kämpfen zu müssen.
                        </p>
                        <div class="benefit-list">
                            <span class="benefit-tag">✓ Maßgeschneiderte Analyse Ihrer Situation</span>
                            <span class="benefit-tag">✓ Unabhängiger Vergleich aus hunderten Tarifen</span>
                            <span class="benefit-tag">✓ Persönliche und digitale Betreuung</span>
                        </div>
                    </div>
                    <div>
                        <div style="border-radius: 1.5rem; overflow: hidden; box-shadow: var(--shadow-xl); position: relative;">
                            <img src="${imgUrl}" alt="${config.title}" style="width: 100%; height: auto; display: block; filter: brightness(1.05);">
                            <div style="position: absolute; top: 1.5rem; left: 1.5rem; background: var(--success); color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">Premium Schutz</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Detailed Advantages Content -->
                    `;

                    // We want to insert this directly before the universal CTA.
                    // The universal CTA is a section ending right before </main>
                    // To do this reliably, we can replace "        <!-- Universal CTA -->"
                    content = content.replace('        <!-- Universal CTA -->', contentBlock + '\n        <!-- Universal CTA -->');
                }
            }

            if (content !== initialContent) {
                fs.writeFileSync(indexPath, content, 'utf8');
            }
        }
    });

    console.log('Injected detailed structural content block into all insurance pages.');
}
