import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Extract Master Header and Footer from index.html
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerMatch = indexContent.match(/<header>([\s\S]*?)<\/header>/);
const footerMatch = indexContent.match(/<footer>([\s\S]*?)<\/footer>/);

if (!headerMatch || !footerMatch) {
    console.error('Could not find header or footer in index.html');
    process.exit(1);
}

const masterHeader = headerMatch[0];
const masterFooter = footerMatch[0];

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.git' && name !== 'dist') {
            walkSync(filePath, callback);
        }
    });
}

console.log('Starting global layout synchronization...');

const masterIndexPath = path.join(__dirname, 'index.html');

walkSync(__dirname, function(filePath) {
    if (filePath.endsWith('.html') && path.resolve(filePath) !== path.resolve(masterIndexPath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;
        
        // 0. Preliminary cleanup of literal \n strings
        content = content.replace(/\\n/g, '\n');
        
        // 1. Sync Header
        if (content.match(/<header/i)) {
            content = content.replace(/<header>[\s\S]*?<\/header>/i, masterHeader);
        } else {
            // Robust body tag match
            content = content.replace(/(<body[^>]*>)/i, `$1\n${masterHeader}`);
        }
        
        // 2. Sync Footer
        if (content.match(/<footer/i)) {
            content = content.replace(/<footer>[\s\S]*?<\/footer>/i, masterFooter);
        } else {
            content = content.replace(/(<\/body>)/i, `\n${masterFooter}\n$1`);
        }

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${path.relative(__dirname, filePath)}`);
        } else {
            // console.log(`Skipped (already in sync): ${path.relative(__dirname, filePath)}`);
        }
    }
});

console.log('Global layout synchronization completed.');
