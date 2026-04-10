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
    let original = content;

    // Remove trust-badge elements containing IHK (in body, not just footer)
    // Common patterns:
    // <span class="trust-badge">...IHK...</span>
    // <div class="trust-badge">...IHK...</div>
    
    // Regex explanation:
    // <(span|div)[^>]*class="trust-badge"[^>]*>[\s\S]*?IHK[\s\S]*?<\/\1>
    
    const ihkRegex = /<(span|div)[^>]*class="trust-badge"[^>]*>[\s\S]*?IHK[\s\S]*?<\/\1>/gi;
    
    content = content.replace(ihkRegex, '');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Removed IHK badges from: ${path.relative(baseDir, file)}`);
    }
});

console.log('Finished removing IHK badges globally.');
