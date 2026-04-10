const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const FAVICON_TAG = '    <link rel="icon" type="image/png" href="/favicon.png">';

function walkSync(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walkSync(filePath, callback);
            }
        } else {
            callback(filePath);
        }
    });
}

console.log('Starting favicon propagation...');

let updatedCount = 0;

walkSync(ROOT_DIR, (filePath) => {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if favicon is already present
        if (!content.includes('rel="icon"') && !content.includes('rel="shortcut icon"')) {
            // Insert before </head>
            if (content.includes('</head>')) {
                const refreshedContent = content.replace('</head>', `${FAVICON_TAG}\n</head>`);
                fs.writeFileSync(filePath, refreshedContent, 'utf8');
                console.log(`Updated: ${path.relative(ROOT_DIR, filePath)}`);
                updatedCount++;
            }
        }
    }
});

console.log(`Favicon propagation complete. Updated ${updatedCount} files.`);
