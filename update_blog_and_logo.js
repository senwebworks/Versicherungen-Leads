import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Compact Blog Overview
const blogIndexPath = path.join(__dirname, 'blog', 'index.html');
if (fs.existsSync(blogIndexPath)) {
    let blogHtml = fs.readFileSync(blogIndexPath, 'utf8');
    
    blogHtml = blogHtml.replace(/grid-template-columns: repeat\(auto-fit, minmax\(320px, 1fr\)\); gap: var\(--space-lg\);/g, 'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-md);');
    blogHtml = blogHtml.replace(/height: 180px;/g, 'height: 100px;');
    blogHtml = blogHtml.replace(/font-size: 3rem;/g, 'font-size: 2rem;');
    blogHtml = blogHtml.replace(/<div style="padding: 1\.5rem;">/g, '<div style="padding: 1rem;">');
    blogHtml = blogHtml.replace(/<h3 style="margin-top: 0\.75rem; font-size: 1\.25rem;">/g, '<h3 style="margin-top: 0.5rem; font-size: 1.1rem;">');
    blogHtml = blogHtml.replace(/<p style="color: var\(--text-muted\); font-size: 0\.875rem; margin-top: 0\.5rem;">/g, '<p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem;">');
    blogHtml = blogHtml.replace(/padding-top: 100px;/g, 'padding-top: 120px;');

    fs.writeFileSync(blogIndexPath, blogHtml, 'utf8');
    console.log('Blog overview compacted.');
}

// 2. Global Logo Update
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
        
        // Replace all instances of the logo name
        content = content.replace(/Sicher<span>Versicherung<\/span>/g, 'SICHER<span>VERSICHERUNG</span>');
        
        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});

console.log('Global logo update completed.');
