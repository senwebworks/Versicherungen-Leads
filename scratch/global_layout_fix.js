import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const trustBarHtml = `
    <div class="trust-top-bar">
        <span>✓ Über 100.000 Kunden gespart</span>
        <span>✓ TÜV-Geprüfter Vergleich</span>
        <span>✓ 100% Kostenloser Service</span>
        <span>✓ SSL Verschlüsselt</span>
    </div>`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
                processDirectory(fullPath);
            }
        } else if (file.endsWith('.html')) {
            updateFile(fullPath);
        }
    });
}

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Ensure body has id="top"
    if (content.includes('<body>')) {
        content = content.replace('<body>', '<body id="top">');
        changed = true;
    }

    // 2. Ensure trust-top-bar is present
    if (content.includes('<body id="top">') && !content.includes('class="trust-top-bar"')) {
        content = content.replace('<body id="top">', `<body id="top">${trustBarHtml}`);
        changed = true;
    } else if (content.includes('<body>') && !content.includes('class="trust-top-bar"')) {
        // Fallback for cases where id="top" wasn't added yet or body was different
        content = content.replace('<body>', `<body id="top">${trustBarHtml}`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.relative(projectRoot, filePath)}`);
    }
}

processDirectory(projectRoot);
console.log('Global layout fix complete.');
