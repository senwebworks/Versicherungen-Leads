
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
    solar: '/solar_panel_modern_1775647170454.png', kfz: '/luxury_car_highway_1775647217488.png',
    motorrad: '/luxury_car_highway_1775647217488.png', pkv: '/modern_hospital_care_1775647200471.png',
    'pkv-beamte': '/modern_hospital_care_1775647200471.png', 'pkv-studenten': '/modern_hospital_care_1775647200471.png',
    'pkv-ue55': '/modern_hospital_care_1775647200471.png', krankenzusatz: '/modern_hospital_care_1775647200471.png',
    pflegezusatz: '/modern_hospital_care_1775647200471.png', hundekrankenversicherung: '/modern_hospital_care_1775647200471.png',
    rente: '/happy_senior_future_1775647185671.png', bu: '/happy_senior_future_1775647185671.png',
    lebensversicherung: '/happy_senior_future_1775647185671.png', riester: '/happy_senior_future_1775647185671.png',
    risikoleben: '/happy_senior_future_1775647185671.png', ruerup: '/happy_senior_future_1775647185671.png',
    girokonto: '/modern_office_finance_1775647233879.png', baufinanzierung: '/modern_office_finance_1775647233879.png',
    kredit: '/modern_office_finance_1775647233879.png', kreditkarte: '/modern_office_finance_1775647233879.png',
    firmen: '/modern_office_finance_1775647233879.png', haftpflicht: '/modern_house_family_1775647252594.png',
    hausrat: '/modern_house_family_1775647252594.png', wohngebaeude: '/modern_house_family_1775647252594.png',
    'haus-grundbesitz': '/modern_house_family_1775647252594.png', tierhalter: '/modern_house_family_1775647252594.png',
    rechtsschutz: '/modern_house_family_1775647252594.png', strom: '/modern_house_family_1775647252594.png',
    oekostrom: '/modern_house_family_1775647252594.png', gas: '/modern_house_family_1775647252594.png',
    dsl: '/modern_house_family_1775647252594.png', mobilfunk: '/modern_office_finance_1775647233879.png',
    reise: '/luxury_car_highway_1775647217488.png', mietwagen: '/luxury_car_highway_1775647217488.png',
    zahnzusatz: '/modern_hospital_care_1775647200471.png'
};

const formsByService = {
    'solar': '<div style="width: 100%" id="tcpp-iframe-solar"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-solar/solar-iframe.js"></script>',
    'kfz': '<div style="width: 100%" id="tcpp-iframe-kfz"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-kfz/kfz-iframe.js"></script>',
    'motorrad': '<div style="width: 100%" id="tcpp-iframe-mot"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-mot/mot-iframe.js"></script>',
    'rente': '<div style="width: 100%" id="tcpp-iframe-rente"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-rente/rente-iframe.js"></script>',
    'bu': '<div style="width: 100%" id="tcpp-iframe-buv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-buv/buv-iframe.js"></script>',
    'lebensversicherung': '<div style="width: 100%" id="tcpp-iframe-leben"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-leben/leben-iframe.js"></script>',
    'unfallversicherung': '<div style="width: 100%" id="tcpp-iframe-unf"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-unf/unf-iframe.js"></script>',
    'riester': '<div style="width: 100%" id="tcpp-iframe-riester"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-riester/riester-iframe.js"></script>',
    'risikoleben': '<div style="width: 100%" id="tcpp-iframe-rlv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-rlv/rlv-iframe.js"></script>',
    'ruerup': '<div style="width: 100%" id="tcpp-iframe-r-rente"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-r-rente/r-rente-iframe.js"></script>',
    'pflegezusatz': '<div style="width: 100%" id="tcpp-iframe-prv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-prv/prv-iframe.js"></script>',
    'pkv': '<div style="width: 100%" id="tcpp-iframe-pkv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-pkv/pkv-iframe.js"></script>',
    'pkv-beamte': '<div style="width: 100%" id="tcpp-iframe-pkv-beamte"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-pkv-beamte/pkv-beamte-iframe.js"></script>',
    'pkv-studenten': '<div style="width: 100%" id="tcpp-iframe-pkv-s"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-pkv-s/pkv-s-iframe.js"></script>',
    'pkv-ue55': '<div style="width: 100%" id="tcpp-iframe-pkv55"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-pkv55/pkv55-iframe.js"></script>',
    'krankenzusatz': '<div style="width: 100%" id="tcpp-iframe-pkv-z"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-pkv-z/pkv-z-iframe.js"></script>',
    'hundekrankenversicherung': '<div style="width: 100%" id="tcpp-iframe-tkv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-tkv/tkv-iframe.js"></script>',
    'haftpflicht': '<div style="width: 100%" id="tcpp-iframe-phv"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-phv/phv-iframe.js"></script>',
    'hausrat': '<div style="width: 100%" id="tcpp-iframe-hr"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-hr/hr-iframe.js"></script>',
    'tierhalter': '<div style="width: 100%" id="tcpp-iframe-tie"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-tie/tie-iframe.js"></script>',
    'wohngebaeude': '<div style="width: 100%" id="tcpp-iframe-wg"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-wg/wg-iframe.js"></script>',
    'haus-grundbesitz': '<div style="width: 100%" id="tcpp-iframe-hug"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-hug/hug-iframe.js"></script>',
    'rechtsschutz': '<div style="width: 100%" id="tcpp-iframe-rs"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-rs/rs-iframe.js"></script>',
    'firmen': '<div style="width: 100%" id="tcpp-iframe-fc"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-fc/fc-iframe.js"></script>',
    'girokonto': '<div style="width: 100%" id="tcpp-iframe-giro"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-giro/giro-iframe.js"></script>',
    'baufinanzierung': '<div style="width: 100%" id="tcpp-iframe-baufi"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-baufi/baufi-iframe.js"></script>',
    'kredit': '<div style="width: 100%" id="tcpp-iframe-kredit" data-duration="12" data-purpose="8" data-amount="5000"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-kredit/kredit-iframe.js"></script>',
    'kreditkarte': '<div style="width: 100%" id="tcpp-iframe-cc"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-cc/cc-iframe.js"></script>',
    'strom': '<div style="width: 100%" id="c24pp-power-iframe" data-scrollto="begin"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-power-iframe/power-iframe.js"></script>',
    'oekostrom': '<div style="width: 100%" id="c24-oekostrom-iframe" data-scrollto="begin"></div><script src="https://files.check24.net/widgets/auto/1169716/c24-oekostrom-iframe/power-iframe.js"></script>',
    'gas': '<div style="width: 100%" id="c24pp-gas-iframe" data-scrollto="begin"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-gas-iframe/gas-iframe.js"></script>',
    'dsl': '<div style="width: 100%" id="c24pp-dsl-iframe"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-dsl-iframe/dsl-iframe.js"></script>',
    'mobilfunk': '<div style="width: 100%" id="c24pp-mobileservice-iframe"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-mobileservice-iframe/sim-only-iframe.js"></script>',
    'reise': '<div style="width: 100%" id="c24pp-package-iframe" data-offer="allgemein" data-scrollto="begin" data-forward-url="no"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-package-iframe/package-iframe.js"></script>',
    'mietwagen': '<div style="width: 100%" id="c24pp-rentalcar-iframe" data-scrollto="begin"></div><script src="https://files.check24.net/widgets/auto/1169716/c24pp-rentalcar-iframe/rentalcar-iframe.js"></script>',
    'zahnzusatz': '<div style="width: 100%" id="tcpp-iframe-zaz"></div><script src="https://form.partner-versicherung.de/widgets/200382/tcpp-iframe-zaz/zaz-iframe.js"></script>'
};

const services = [
    { id: 'solar', title: 'Solaranlage Check', desc: 'Eigener Strom, maximale Unabhängigkeit. Vergleichen Sie Solaranbieter in Ihrer Region.' },
    { id: 'kfz', title: 'KFZ-Versicherung', desc: 'Top-Schutz for Ihr Fahrzeug. Wechseln & bis zu 800€ sparen.' },
    { id: 'motorrad', title: 'Motorradversicherung', desc: 'Sorgenfreier Fahrspaß mit dem optimalen Schutz for Ihr Bike.' },
    { id: 'rente', title: 'Rente', desc: 'Die besten Strategien for einen sorgenfreien Ruhestand.' },
    { id: 'bu', title: 'Berufsunfähigkeit', desc: 'Sichern Sie Ihr wertvollstes Gut: Ihre Arbeitskraft.' },
    { id: 'lebensversicherung', title: 'Lebensversicherung', desc: 'Langfristige Absicherung und Kapitalaufbau for Ihre Liebsten.' },
    { id: 'riester', title: 'Riester-Rente', desc: 'Staatliche Zulagen und Steuervorteile clever nutzen.' },
    { id: 'pkv', title: 'PKV Vollversicherung', desc: 'Premium-Gesundheitsschutz for Besserverdienende und Selbstständige.' },
    { id: 'pkv-beamte', title: 'PKV for Beamte', desc: 'Erstklassige Beihilfe-Tarife mit massiver Beitragsersparnis.' },
    { id: 'pkv-studenten', title: 'PKV for Studenten', desc: 'Günstiger Schutz während der Studienzeit – besser als GKV.' },
    { id: 'pkv-ue55', title: 'PKV for Ü55', desc: 'Beiträge im Alter senken – wir zeigen Ihnen die Möglichkeiten.' },
    { id: 'krankenzusatz', title: 'Krankenzusatzversicherung', desc: 'Chefarzt, Einbettzimmer & mehr – privat versichert als Kassenpatient.' },
    { id: 'haftpflicht', title: 'Privathaftpflichtversicherung', desc: 'Ein absolutes Muss zum Schutz vor millionenschweren Forderungen.' },
    { id: 'hausrat', title: 'Hausratversicherung', desc: 'Schutz for Ihr bewegliches Hab und Gut bei Feuer, Wasser oder Diebstahl.' },
    { id: 'wohngebaeude', title: 'Wohngebäudeversicherung', desc: 'Unverzichtbarer Schutz for Immobilienbesitzer.' },
    { id: 'strom', title: 'Strom', desc: 'Bis zu 800€ jährlich sparen durch Anbieterwechsel.' },
    { id: 'oekostrom', title: 'Ökostrom', desc: 'Günstiger Ökostrom-Check – nachhaltig & preiswert.' },
    { id: 'gas', title: 'Gastarife', desc: 'Heizkosten-Check: Günstige Gastarife for Ihr Zuhause.' },
    { id: 'dsl', title: 'DSL & Internet', desc: 'Schnelles Internet zum Sparpreis – alle Anbieter im Check.' },
    { id: 'reise', title: 'Pauschalreisen', desc: 'Traumurlaub zum Tiefpreis. Vergleichen Sie tausende Angebote weltweit.' },
    { id: 'mietwagen', title: 'Mietwagen-Check', desc: 'Weltweit mobil zum Bestpreis – mit Rundum-Sorglos-Schutz.' },
    { id: 'zahnzusatz', title: 'Zahnzusatzversicherung', desc: 'Top-Schutz for Ihre Zähne. Sofort-Leistung ohne Wartezeit.' }
];

const standardTrustBadges = `<div class="trust-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 100% Kostenlos</div><div class="trust-badge">🔒 SSL-Sicher</div><div class="trust-badge">🏆 TÜV-Geprüft</div><div class="trust-badge">🤝 Unabhängig</div><div class="trust-badge">⭐ 4.9/5 Rating</div><div class="trust-badge">👥 100.000+ Kunden</div>`;

const whyUsSectionHtml = `<section class="section-padding" style="background: var(--accent-deep); padding: 6rem 0; color: white;"><div class="container"><div style="text-align: center; margin-bottom: 4rem;"><h2 style="color: white; font-family: 'Outfit', sans-serif; font-size: clamp(2.25rem, 5vw, 3.5rem); margin-bottom: 1.5rem; font-weight: 800; letter-spacing: -0.02em;">Warum Sie bei uns richtig sind</h2><p style="color: rgba(255,255,255,0.9); font-family: 'Inter', sans-serif; font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">Profitieren Sie von exklusiven Vorteilen durch unseren unabhängigen Marktvergleich.</p></div><div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;"><div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.05); border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);"><div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2.5rem;">📊</div><h4 style="margin-bottom: 1.25rem; color: #60A5FA; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700;">Anbieter-Vielfalt</h4><p style="font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.6;">Über 280 Anbieter im direkten Vergleich für optimale Ergebnisse.</p></div><div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.05); border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);"><div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2.5rem;">⚖️</div><h4 style="margin-bottom: 1.25rem; color: #60A5FA; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700;">100% Unabhängig</h4><p style="font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.6;">Wir sind an keine Versicherung gebunden und vergleichen neutral in Ihrem Interesse.</p></div><div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.05); border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);"><div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2.5rem;">⚡</div><h4 style="margin-bottom: 1.25rem; color: #60A5FA; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700;">Sofort-Ergebnis</h4><p style="font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.6;">In vielen Bereichen erhalten Sie Ihr Vergleichsergebnis in Echtzeit.</p></div><div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.05); border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1);"><div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2.5rem;">🎁</div><h4 style="margin-bottom: 1.25rem; color: #60A5FA; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700;">100% Kostenlos</h4><p style="font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.6;">Unser Vergleichsservice ist und bleibt für Sie vollkommen gebührenfrei.</p></div></div></div></section>`;


const template = (service) => {
    const formHtml = formsByService[service.id] || `<div class="card" style="padding: 3rem; background: white; border: 1px solid var(--accent);"><h3 style="margin-bottom: 1.5rem;">Direkt-Check & Vergleich</h3><p style="margin-bottom: 2rem;">Geben Sie Ihre Daten ein und erhalten Sie sofort die besten Angebote.</p><a href="/anfrage/?type=${service.id}" class="btn btn-primary" style="width: 100%; padding: 1.25rem;">Jetzt kostenlos vergleich</a></div>`;
    const isFullWidth = ['strom', 'gas', 'dsl', 'reise', 'mietwagen'].includes(service.id);
    const imagePath = images[service.id] || '/modern_office_finance_1775647233879.png';
    const gridClass = isFullWidth ? 'widget-fullwidth-container' : 'hero-form-grid';

    let content = `<!DOCTYPE html>
<html lang="de">
<head>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18082578300"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18082578300');
</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.title} Vergleich 2026 - JETZT TARIF SPAREN</title>
    <meta name="description" content="${service.desc}">
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" type="image/png" href="/favicon.png">
</head>
<body id="top">
    <div class="trust-top-bar">
        <span>✓ Über 100.000 Kunden gespart</span>
        <span>✓ TÜV-Geprüfter Vergleich</span>
        <span>✓ 100% Kostenloser Service</span>
        <span>✓ SSL Verschlüsselt</span>
    </div>
    <header></header>
    <main>
        <section id="form-section" class="section-padding" style="padding-top: 150px; background: var(--primary-light);">
            <div class="container animate-fade-in text-center">
                <div class="milestone-claim" style="margin-bottom: 2rem;">
                    <span style="font-size: 1.25rem;">🎉</span>
                    Über 100.000 Kunden haben bereits mit uns gespart!
                </div>
                <span class="speed-marker">⚡ Unabhängiger Partner-Vergleich 2026</span>
                <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 1.5rem;">${service.title}<span class="affiliate-marker">*</span></h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 3.5rem; max-width: 750px; margin-left: auto; margin-right: auto;">${service.desc}</p>
                <div class="${gridClass}">
                    <div class="form-container">
                        <div style="background: white; border-radius: 1.5rem; overflow: visible; box-shadow: var(--shadow-xl); border: 2px solid var(--accent); padding-bottom: 2rem; position: relative;">
                            ${formHtml}
                            <div style="margin: 2rem 2rem 0; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                                ${standardTrustBadges}
                            </div>
                        </div>
                    </div>`;

    if (!isFullWidth) {
        content += `
                    <div class="trust-column text-left">
                        <div class="card" style="padding: 2.5rem; background: white; border: 1px solid var(--border); position: sticky; top: 100px; box-shadow: var(--shadow-lg);">
                            <h4 style="margin-bottom: 2rem; font-size: 1.4rem; font-weight: 800; color: var(--text-main);">Ihre exklusiven Vorteile</h4>
                            <ul style="list-style: none; padding: 0; margin-bottom: 2.5rem;">
                                <li style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                                    <div style="min-width: 28px; height: 28px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;">✓</div>
                                    <div><div style="font-weight: 800; font-size: 1rem; color: var(--text-main);">Marktweiter Vergleich</div><div style="font-size: 0.85rem; color: var(--text-muted);">Über 280 Anbieter im Direkt-Check.</div></div>
                                </li>
                                <li style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                                    <div style="min-width: 28px; height: 28px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;">✓</div>
                                    <div><div style="font-weight: 800; font-size: 1rem; color: var(--text-main);">Sonder-Konditionen</div><div style="font-size: 0.85rem; color: var(--text-muted);">Exklusive Rabatte for Online-Kunden.</div></div>
                                </li>
                                <li style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                                    <div style="min-width: 28px; height: 28px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;">✓</div>
                                    <div><div style="font-weight: 800; font-size: 1rem; color: var(--text-main);">Geprüfte Sicherheit</div><div style="font-size: 0.85rem; color: var(--text-muted);">SSL-verschlüsselt & DSGVO konform.</div></div>
                                </li>
                            </ul>
                        </div>
                    </div>`;
    }

    content += `
                </div>
            </div>
        </section>
        ${whyUsSectionHtml}
        <section class="section-padding" style="background: white;"><div class="container"><div style="max-width: 850px; margin: 0 auto 5rem auto; text-align: center;"><span class="badge-direct" style="background: var(--accent); margin-bottom: 1rem; display: inline-block;">Wissenswertes</span><h2 style="font-size: clamp(2.25rem, 5vw, 3rem); margin-bottom: 1.5rem;">Transparenz & Markt-Check</h2><p style="font-size: 1.2rem; color: var(--text-muted); line-height: 1.7;">Wir analysieren for Sie den gesamten Markt.</p></div><div class="grid-responsive" style="gap: 5rem; align-items: center;"><div class="animate-fade-in"><img src="${imagePath}" alt="${service.title}" style="width: 100%; border-radius: 2rem; box-shadow: var(--shadow-2xl); border: 8px solid white;"></div><div><h3 style="font-size: 2rem; margin-bottom: 1.5rem;">Unabhängiger Vergleich</h3><p style="margin-bottom: 2rem; line-height: 1.8;">Unser Algorithmus prüft über 280 Anbieter in Echtzeit.</p><a href="#top" class="btn btn-primary">Jetzt Tarif-Check starten</a></div></div></div></section>
        <section class="section-padding" style="background: var(--surface-hover);"><div class="container"><div style="text-align: center; margin-bottom: 4rem;"><span class="badge-direct" style="background: var(--accent); margin-bottom: 1rem; display: inline-block;">Unsere Kernbereiche</span><h2 style="font-size: clamp(2rem, 4vw, 3rem);">Bester Markt-Check</h2></div><div class="grid-responsive"><div class="card animate-fade-in" style="padding: 1.5rem; background: white;"><img src="/images/health.png" style="width: 100%; height: 280px; object-fit: cover; border-radius: 1.5rem;"><h3>Gesundheit & Pflege</h3><a href="/versicherungen/pkv/" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a></div><div class="card animate-fade-in" style="padding: 1.5rem; background: white;"><img src="/images/property.png" style="width: 100%; height: 280px; object-fit: cover; border-radius: 1.5rem;"><h3>Eigentum & Haftung</h3><a href="/versicherungen/haftpflicht/" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a></div><div class="card animate-fade-in" style="padding: 1.5rem; background: white;"><img src="/images/finance.png" style="width: 100%; height: 280px; object-fit: cover; border-radius: 1.5rem;"><h3>Vermögen & Zukunft</h3><a href="/versicherungen/rente/" class="btn btn-outline" style="width: 100%;">Bereich entdecken</a></div></div></div></section>
    </main>
    <footer></footer>
    <script type="module" src="/main.js"></script>
</body>
</html>`;
    return content;
};

for (const service of services) {
    const dir = path.resolve(__dirname, 'versicherungen', service.id);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.resolve(dir, 'index.html'), template(service), 'utf8');
    console.log(`Processed: ${service.id}/index.html`);
}
