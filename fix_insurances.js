import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versicherungenDir = path.join(__dirname, 'versicherungen');

const oldFooterRegex = /<footer style="margin-top: 0;">\s*<div class="container">\s*<div class="footer-grid">[\s\S]*?<\/footer>/;

const universalCta = (id) => `
        <!-- Universal CTA -->
        <section class="section-padding text-center">
            <div class="container">
                <div class="card animate-fade-in" style="background: linear-gradient(135deg, var(--accent), var(--accent-hover)); border: none; padding: var(--space-2xl);">
                    <h2 style="color: white; font-size: clamp(2rem, 4vw, 3rem); margin-bottom: var(--space-md);">Sind Sie optimal abgesichert?</h2>
                    <p style="color: rgba(255,255,255,0.9); margin-bottom: var(--space-xl); max-width: 650px; margin-left: auto; margin-right: auto; font-size: 1.125rem;">Lassen Sie uns gemeinsam den passenden Schutz für Ihre Bedürfnisse finden. Unabhängig, kostenlos und transparent.</p>
                    <a href="/anfrage/?type=${id}" class="btn btn-success" style="padding: 1.25rem 3rem; font-size: 1.25rem; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);">Kostenloses Angebot anfordern</a>
                </div>
            </div>
        </section>
`;

fs.readdirSync(versicherungenDir).forEach(dir => {
    const indexPath = path.join(versicherungenDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        let initialContent = content;

        // Remove old small footer
        content = content.replace(oldFooterRegex, '');

        // Check if there is already a large CTA section near the bottom
        // We look for 'section-padding text-center' which is the class used for bottom CTAs usually.
        if (!content.includes('section-padding text-center')) {
            content = content.replace('</main>', universalCta(dir) + '    </main>');
        } else {
            // Also update the existing CTA href if needed or leave it
            // Just leaving custom CTAs as they are is better.
        }

        if (content !== initialContent) {
            fs.writeFileSync(indexPath, content, 'utf8');
            console.log(`Updated CTA/Footer for: ${dir}`);
        }
    }
});

console.log('Insurances cleanup complete.');
