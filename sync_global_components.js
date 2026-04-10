import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = __dirname;
const SOURCE_FILE = path.join(ROOT_DIR, 'index.html');

// Helper to extract content by ID or simple tag
function extractSectionContent(content, id) {
    const regex = new RegExp(`<section id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`, 'i');
    const match = content.match(regex);
    return match ? match[1] : null;
}

// Specific for header/footer
function extractTagContent(content, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = content.match(regex);
    return match ? match[1] : null;
}

// Function to replace tag content
function replaceTagContent(content, tagName, newInnerContent) {
    const regex = new RegExp(`(<${tagName}[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`, 'gi');
    return content.replace(regex, `$1${newInnerContent}$3`);
}

function replaceSectionContent(content, id, newInnerContent) {
    const regex = new RegExp(`(<section id="${id}"[^>]*>)([\\s\\S]*?)(<\\/section>)`, 'gi');
    return content.replace(regex, `$1${newInnerContent}$3`);
}

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath);
        } else if (stat.isDirectory() && 
                   name !== 'node_modules' && 
                   name !== '.git' && 
                   name !== 'dist') {
            walkSync(filePath, callback);
        }
    });
}

const sourceContent = fs.readFileSync(SOURCE_FILE, 'utf8');
const headerContent = extractTagContent(sourceContent, 'header');
const footerContent = extractTagContent(sourceContent, 'footer');
const whyUsContent = extractSectionContent(sourceContent, 'why-us');

if (!headerContent || !footerContent || !whyUsContent) {
    console.error('Could not find header, footer, or why-us section in source file.');
    process.exit(1);
}

console.log('Syncing components across all HTML files...');

walkSync(ROOT_DIR, (filePath) => {
    if (filePath.endsWith('.html') && filePath !== SOURCE_FILE) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Sync Header
        content = replaceTagContent(content, 'header', headerContent);
        
        // Sync Trust Section (Insert before footer if not present)
        if (content.includes('id="why-us"')) {
            content = replaceSectionContent(content, 'why-us', whyUsContent);
        } else {
            // Find footer and insert before it
            content = content.replace(/<footer/i, `    <section id="why-us" class="trust-section-global">${whyUsContent}</section>\n\n    <footer`);
        }
        
        // Sync Footer
        content = replaceTagContent(content, 'footer', footerContent);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${path.relative(ROOT_DIR, filePath)}`);
        }
    }
});

console.log('Sync complete.');
