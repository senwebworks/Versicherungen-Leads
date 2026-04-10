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
        
        // Rebranding
        content = content.replace(/VersicherungsPortal/g, 'Sicher Versicherung');
        content = content.replace(/v<span>Portal<\/span>/g, 'Sicher<span>Versicherung</span>');
        content = content.replace(/vPortal/g, 'Sicher Versicherung');
        
        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
console.log('Rebranding complete.');
