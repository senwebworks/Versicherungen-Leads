import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const searchDirs = [
    path.join(__dirname, '..'), // Include root
    path.join(__dirname, '..', 'versicherungen'),
    path.join(__dirname, '..', 'blog'),
    path.join(__dirname, '..', 'vorsorge'),
    path.join(__dirname, '..', 'ueber-uns'),
    path.join(__dirname, '..', 'kontakt'),
    path.join(__dirname, '..', 'faq'),
    path.join(__dirname, '..', 'anfrage')
];

const replacements = [
    { from: /Best-Preis Garantie/gi, to: 'Top Konditionen' },
    { from: /Bestpreis/gi, to: 'Top Preis' },
    { from: /Best-Preis/gi, to: 'Top-Preis' },
    { from: /Experten-Support/gi, to: 'Markt-Check' },
    { from: /Experten-Ratgeber/gi, to: 'Vergleichs-Ratgeber' },
    { from: /Experten-Wissen/gi, to: 'Fach-Wissen' },
    { from: /Experten-Check/gi, to: 'Markt-Check' },
    { from: /Experten-Unterstützung/gi, to: 'Markt-Analysen' },
    { from: /Experten-Analyse/gi, to: 'Markt-Analyse' },
    { from: /Experten/gi, to: 'Spezialisten' },
    { from: /Beratungstermin/gi, to: 'Vergleich starten' },
    { from: /Beratungsgebühren/gi, to: 'Kosten' },
    { from: /Beitragsgarantie-Analyse/gi, to: 'Beitrags-Analyse' },
    { from: /Datenschutz-Garantie/gi, to: 'Datenschutz' },
    { from: /IHK Registriert/gi, to: '100% Unabhängig' },
    { from: /IHK-Registrierter/gi, to: 'Unabhängiger' },
    { from: /ihk vermittler/gi, to: 'Vergleichsportal' },
    { from: /unabhängig beraten/gi, to: 'unabhängig vergleichen' },
    { from: /persönliche beratung/gi, to: 'digitaler vergleich' },
    { from: /kostenlose beratung/gi, to: 'kostenloser vergleich' },
    { from: /beraten lassen/gi, to: 'vergleichen lassen' },
    { from: /telefonischer support/gi, to: 'E-Mail Support' },
    { from: /beratung/gi, to: 'vergleich' },
    { from: /telefonnummer/gi, to: 'e-mail' }, // Be careful here, maybe too broad? Let's check.
];

// Re-evaluating the 'telefonnummer' replacement. Better to only replace placeholders or explicit support claims.
const safeReplacements = [
    { from: /Best-Preis Garantie/gi, to: 'Top Konditionen' },
    { from: /Best-Preis-Garantie/gi, to: 'Top Konditionen' },
    { from: /Bestpreis/gi, to: 'Top Preis' },
    { from: /Best-Preis/gi, to: 'Top-Preis' },
    { from: /Experten-Support/gi, to: 'Markt-Check' },
    { from: /Experten-Unterstützung/gi, to: 'Markt-Analyse' },
    { from: /Kostenlose Experten-Unterstützung/gi, to: 'Marktweiter Vergleich' },
    { from: /Experten-Analyse/gi, to: 'Markt-Analyse' },
    { from: /Experten-Analysen/gi, to: 'Markt-Analysen' },
    { from: /Beratungstermin buchen/gi, to: 'Vergleich starten' },
    { from: /Beratungstermin/gi, to: 'Vergleich starten' },
    { from: /Strategie-Gespräch anfragen/gi, to: 'Vergleich anfragen' },
    { from: /Experten-Check anfordern/gi, to: 'Vergleich anfordern' },
    { from: /Ja, bereits in Beratung/gi, to: 'Ja, bereits informiert' },
    { from: /Unabhängige Beratung/gi, to: 'Unabhängiger Vergleich' },
    { from: /IHK Registriert/gi, to: 'Geprüfte Tarife' },
    { from: /TÜV-Geprüft/gi, to: 'Top-Bewertet' },
    { from: /garantieren wir/gi, to: 'stellen wir sicher' },
    { from: /wir garantieren/gi, to: 'wir stellen sicher' },
    { from: /Garantierte Rente/gi, to: 'Sichere Rente' },
    { from: /garantierte lebenslange Rente/gi, to: 'lebenslange Rente' },
    { from: /Beitragsgarantie-Analyse/gi, to: 'Beitrags-Analyse' },
    { from: /Experten-Wissen/gi, to: 'Fach-Wissen' },
    { from: /Expertenwissen/gi, to: 'Fachwissen' },
    { from: /Experten-Ratgeber/gi, to: 'Vergleichs-Ratgeber' },
    { from: /Beratung/gi, to: 'Vergleich' },
    { from: / beraten /gi, to: ' vergleichen ' },
    { from: />beraten</gi, to: '>vergleichen<' },
    { from: /telefonischer Support/gi, to: 'E-Mail Support' },
    { from: /telefonischen Support/gi, to: 'E-Mail Support' }
];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Avoid recursing into .git, node_modules, .gemini, public
            if (['.git', 'node_modules', '.gemini', 'public', 'scratch'].includes(file)) continue;
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const r of safeReplacements) {
                if (r.from.test(content)) {
                    content = content.replace(r.from, r.to);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

console.log('Starting mass cleanup...');
searchDirs.forEach(processDir);
console.log('Mass cleanup finished.');
