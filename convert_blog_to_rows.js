import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPath = path.join(__dirname, 'blog', 'index.html');
if (fs.existsSync(blogPath)) {
    let content = fs.readFileSync(blogPath, 'utf8');

    // Simplify the container
    content = content.replace(/<div class="contain\s*<div class="grid-4 blog-grid">/g, '<div class="container"><div class="blog-row-container">');
    // Also handle possible variations
    content = content.replace(/<div class="grid-4 blog-grid">/g, '<div class="blog-row-container">');

    const cardRegex = /<a href="\/blog\/[^"]+"\s+class="card"[\s\S]*?<\/a>/g;

    content = content.replace(cardRegex, (match) => {
        const hrefMatch = match.match(/href="([^"]+)"/);
        const href = hrefMatch ? hrefMatch[1] : '#';
        
        const iconMatch = match.match(/<div style="height: 100px;[^>]+>([\s\S]+?)<\/div>/);
        const icon = iconMatch ? iconMatch[1].trim() : '📋';
        
        const badgeMatch = match.match(/<span class="badge-[^>]+">([\s\S]+?)<\/span>/);
        const badgeText = badgeMatch ? badgeMatch[1] : 'Ratgeber';
        const badgeClass = badgeMatch ? badgeMatch[0].match(/class="([^"]+)"/)[1] : 'badge-direct';
        
        const titleMatch = match.match(/<h3[^>]*>([\s\S]+?)<\/h3>/);
        let title = titleMatch ? titleMatch[1].trim() : '';
        
        const textMatch = match.match(/<p style="color: var\(--text-muted\);[^>]+>([\s\S]+?)<\/p>/);
        let text = textMatch ? textMatch[1].trim() : '';

        return `
        <a href="${href}" class="blog-row-card">
            <div class="blog-row-img" style="background: #F8FAFC;">${icon}</div>
            <div class="blog-row-content">
                <div class="flex" style="justify-content: flex-start; margin-bottom: 0.5rem;">
                   <span class="${badgeClass}">${badgeText}</span>
                </div>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${title}</h3>
                <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">${text}</p>
                <div style="margin-top: 1rem; color: var(--accent); font-weight: 700; font-size: 0.9rem;">Vollständigen Artikel lesen →</div>
            </div>
        </a>`;
    });

    fs.writeFileSync(blogPath, content, 'utf8');
    console.log('Blog overview converted to horizontal row layout.');
}
