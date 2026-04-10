import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expansions = [
    { id: 'strom', title: 'Strom Vergleich', icon: '⚡', desc: 'Sichern Sie sich günstige Stromtarife und wechseln Sie bequem. Mit Preisgarantie.', benefits: ['Spürbare Senkung der Nebenkosten', 'Wechselprämie & Neukundenbonus', 'Einfacher digitaler Wechselprozess'] },
    { id: 'gas', title: 'Gas Vergleich', icon: '🔥', desc: 'Vergleichen Sie Gasanbieter und profitieren Sie von günstigen Preisen und Boni.', benefits: ['Schutz vor Preisschwankungen mit Preisgarantie', 'Attraktive Sofortboni', 'Reibungsloser Wechsel ohne Versorgungslücke'] },
    { id: 'reise', title: 'Reiseversicherung', icon: '✈️', desc: 'Sorgenfrei reisen: Weltweiter Schutz bei Storno, Krankheit und Gepäckverlust.', benefits: ['Rücktritt- & Abbruchschutz', 'Übernahme von Behandlungskosten im Ausland', 'Organisation von Krankenrücktransporten'] }
];

// Part 1: Insurance Pages
const baseVersicherungenDir = path.join(__dirname, 'versicherungen');
const templateInsPath = path.join(baseVersicherungenDir, 'haftpflicht', 'index.html'); // Using a simple template
if (fs.existsSync(templateInsPath)) {
    const templateIns = fs.readFileSync(templateInsPath, 'utf8');

    expansions.forEach(exp => {
        const outDir = path.join(baseVersicherungenDir, exp.id);
        if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); }
        
        // Simple replacement logic for the insurance page based on Haftpflicht template
        let pageHTML = templateIns;
        pageHTML = pageHTML.replace(/Privathaftpflichtversicherung/g, exp.title);
        pageHTML = pageHTML.replace(/Privathaftpflicht/g, exp.title);
        pageHTML = pageHTML.replace(/Unverzichtbarer Schutz für Sie & Ihre Familie\./g, exp.desc);
        pageHTML = pageHTML.replace(/Schon kleine Fehler können hohe Kosten verursachen. Sichern Sie sich gegen Personen-, Sach- und Vermögensschäden bis 50 Mio. € ab\./g, exp.desc);
        
        fs.writeFileSync(path.join(outDir, 'index.html'), pageHTML, 'utf8');
    });
    console.log('Service pages created.');
}

// Part 2: Blog Pages
const baseBlogTemplatePath = path.join(__dirname, 'blog', 'sinnvolle-versicherungen', 'index.html');
if (fs.existsSync(baseBlogTemplatePath)) {
    let targetHtml = fs.readFileSync(baseBlogTemplatePath, 'utf8');

    expansions.forEach(exp => {
        let blogPath = path.join(__dirname, 'blog', exp.id);
        if (!fs.existsSync(blogPath)) {
            fs.mkdirSync(blogPath, { recursive: true });
        }

        let pageHtml = targetHtml;
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>Vorteile von ${exp.title} - Neutraler Ratgeber | Sicher Versicherung</title>`);
        pageHtml = pageHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="Informieren Sie sich neutral über die Vorteile und Einsatzwecke von ${exp.title}. Unser Experten-Ratgeber hilft Ihnen weiter.">`);
        pageHtml = pageHtml.replace(/<h1.*?>.*?<\/h1>/, `<h1 style="font-size: 2.5rem; margin-top: 1rem;">Alles Wichtige zu ${exp.title}</h1>`);
        pageHtml = pageHtml.replace(/<p style="color: var\(--text-muted\);">.*?<\/p>/, `<p style="color: var(--text-muted);">${exp.desc}</p>`);

        let contentStart = pageHtml.indexOf('<div class="article-content">') + '<div class="article-content">'.length;
        let ctaStart = pageHtml.indexOf('<div class="upsell-box"');
        
        let articleContent = `
                    <p>Der Bereich <strong>${exp.title}</strong> ist ein wichtiger Baustein in der persönlichen Absicherung und Kostenoptimierung. In diesem neutralen Ratgeber beleuchten wir objektiv, für wen sich ein genauer Blick lohnt und welche generellen Vorteile dies mit sich bringt.</p>
                    <h2>Ihre Vorteile im Überblick</h2>
                    <ul>
                        ${exp.benefits.map(b => `<li style="margin-bottom: 0.5rem; list-style-type: disc; margin-left: 2rem;">${b}</li>`).join('')}
                    </ul>
                    <p>Ein unverbindlicher und unabhängiger Experten-Vergleich hilft dabei, den passenden Tarif am Markt zu identifizieren und bares Geld zu sparen.</p>
                    `;

        pageHtml = pageHtml.substring(0, contentStart) + articleContent + pageHtml.substring(ctaStart);
        fs.writeFileSync(path.join(blogPath, 'index.html'), pageHtml, 'utf8');
    });

    // Append to blog overview
    const blogIndex = path.join(__dirname, 'blog', 'index.html');
    let indexHtml = fs.readFileSync(blogIndex, 'utf8');
    
    // Quick regex to inject items before the end of the grid section
    // The previous script added formatting. We inject before "</div>\n            </div>\n        </section>"
    let gridRegex = /([\s\S]*?)(\s*<\/div>\s*<\/div>\s*<\/section>)([\s\S]*)/;
    let match = indexHtml.match(gridRegex);
    if (match) {
        let newCards = expansions.map(exp => `
                    <!-- New Blog Expansion -->
                    <a href="/blog/${exp.id}/" class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="height: 180px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; font-size: 3rem;">${exp.icon}</div>
                        <div style="padding: 1.5rem;">
                            <span class="badge-direct">Ratgeber</span>
                            <h3 style="margin-top: 0.75rem; font-size: 1.25rem;">${exp.title}</h3>
                            <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">${exp.desc}</p>
                        </div>
                    </a>`).join('\n');
        
        indexHtml = match[1] + '\n' + newCards + match[2] + match[3];
        fs.writeFileSync(blogIndex, indexHtml, 'utf8');
        console.log('Blog index expanded.');
    }
}
