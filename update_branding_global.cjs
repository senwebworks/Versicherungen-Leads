const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.resolve(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(fullPath));
            }
        } else {
            if (file.endsWith('.html')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const baseDir = 'c:\\Users\\senka\\.gemini\\antigravity\\scratch\\Versicherungen Leads';
const files = walk(baseDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update Favicon
    content = content.replace(/<link rel="icon" type="image\/svg\+xml" href="\/vite\.svg">/g, '<link rel="icon" type="image/png" href="/favicon.png">');
    content = content.replace(/<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg">/g, '<link rel="icon" type="image/png" href="/favicon.png">');
    
    // Update Title Branding (if it contains Jetzt Tarif Sparen in mixed case)
    content = content.replace(/Jetzt Tarif Sparen/g, 'JETZT TARIF SPAREN');
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully updated favicon and branding in all HTML files.');
