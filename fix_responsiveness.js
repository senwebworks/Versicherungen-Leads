import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.git') {
            walkSync(filePath, callback);
        }
    });
}

walkSync(__dirname, function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;

        // Fix hero-split across all pages to remove inline grid styles that break mobile
        content = content.replace(/<div class="hero-split" style="grid-template-columns: 1fr 1.2fr; align-items: flex-start; gap: var(--space-2xl);">/g, '<div class="hero-split">');
        content = content.replace(/<div class="hero-split" style="grid-template-columns: 1fr 1\.2fr; align-items: flex-start; gap: var\(--space-2xl\);">/g, '<div class="hero-split">');
        
        // Fix grid style on index.html or others
        content = content.replace(/grid-template-columns: repeat\(auto-fit, minmax\(350px, 1fr\)\)/g, 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))');

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});

console.log('Responsiveness fixes applied globally.');
