// Edit the English catalogue here, then run npm run build.
// Source: the supplied VinWizard-English website. No competitor text or assets.
const photo = (file, alt, cls = '') => `<img class="${cls}" src="assets/${file}.webp" alt="${alt}" draggable="false">`;
const screen = (file, alt, caption) => `<figure class="screen"><button class="image-detail" data-image="assets/${file}.webp" data-caption="${caption}" aria-label="Enlarge ${alt}">${photo(file, alt)}<span class="enlarge-label">View detail +</span></button><figcaption>${caption}</figcaption></figure>`;
const features = items => `<ul class="features">${items.map(([title, text]) => `<li><strong>${title}</strong><p>${text}</p></li>`).join('')}</ul>`;
const logo = `<img class="brand-logo" src="assets/vinwizard-logo-v3.webp" alt="VinWizard">`;
const footer = (n, section) => `<footer class="page-footer"><span>VinWizard / ${section}</span><span>${String(n).padStart(2, '0')}</span></footer>`;
const head = (section, title, intro = '') => `<div class="section-name">${section}</div><h2>${title}</h2>${intro ? `<p class="intro">${intro}</p>` : ''}`;
const page = (title, cls, html, section = title) => ({ title, cls, html, section });

export const pages = [
  page('Cover', 'cover dark', `
    ${photo('hero', 'Stainless steel wine tanks in a winery', 'cover-photo')}
    <div class="cover-shade"></div><div class="cover-top">${logo}<span>Solutions catalogue</span></div>
    <div class="cover-copy"><p class="cover-kicker">Built around your wine.</p><h1>One cellar.<br>Connected.</h1><p class="cover-sub">Winery temperature control<br>and automation.</p><div class="cover-line"></div><p class="cover-bottom">From the individual tank<br>to the refrigeration plant.</p></div>
    <div class="cover-footer"><span>VinWizard</span><span>vinwizard.com</span></div>`),
  page('A connected cellar', 'intro-page', `
    ${head('The VinWizard approach', 'More time<br>for winemaking.', 'Bring your cellar equipment together around the decisions that matter to your wine.')}
    ${photo('ferment-tablet-portrait', 'Cellar operator reviewing VinWizard on a tablet', 'intro-photo')}
    <div class="intro-bottom"><h3>Start where you are.<br>Grow at your pace.</h3><p>Connect temperature control, pumpovers and refrigeration demand through one system. Begin with your priorities and extend the installation as your cellar evolves.</p></div>`, 'Introduction'),
  page('Inside the catalogue', 'contents-page', `
    ${head('Inside the catalogue', 'Your cellar.<br>At every level.')}
    <p class="intro">From daily decisions on the cellar floor to the equipment behind them.</p>
    <nav class="contents-list" aria-label="Catalogue chapters">${[
      [4, 'The connected system', 'How it fits together'], [5, 'Winery software', 'Control, schedules and history'], [7, 'Single Tank Controller', 'Local control at the tank'], [8, 'Multi-Sensor Probe', 'A deeper view of fermentation'], [9, 'IOWIZ', 'Centralized tank control'], [10, 'Energy & plant control', 'Coordinate demand and equipment'], [12, 'CellarView', 'One shared picture for the team'], [14, 'In the cellar', 'Arkenstone, Napa Valley'], [15, 'Your next step', 'Plan a project around your winery']
    ].map(([n, title, subtitle]) => `<a href="#page=${n}" data-page="${n - 1}"><span><strong>${title}</strong><small>${subtitle}</small></span><span class="contents-number">${String(n).padStart(2, '0')}</span></a>`).join('')}</nav>
    <p class="contents-note">Explore the book with the arrows, open a chapter above, or switch to reading view.</p>`, 'Contents'),
  page('The connected system', 'system-page', `
    ${head('The connected system', 'From the tank.<br>To the whole plant.', 'A connected approach to measurement, control and everyday cellar visibility.')}
    <div class="system-stack"><div class="system-layer layer-team"><span class="system-role">See & coordinate</span><h3>VinWizard software + CellarView</h3><p>Process controls, tank information and a shared view for your team.</p></div><div class="system-connector">Information & control</div><div class="system-layer layer-control"><span class="system-role">Control & automate</span><h3>STC + IOWIZ</h3><p>Local tank controls or panel-mounted modules, selected for your installation.</p></div><div class="system-connector">Measurements & equipment signals</div><div class="system-layer layer-cellar"><span class="system-role">Measure & operate</span><h3>Sensors, valves & plant</h3><p>MSP, tank equipment and compatible refrigeration systems.</p></div></div>
    <div class="page-callout"><h3>Build on what you have.</h3><p>Existing controllers, sensors, valves and communications are reviewed before integration is specified.</p></div>`, 'System overview'),
  page('Winery software', 'software-page', `
    ${head('VinWizard software', 'Your decisions.<br>Put into action.', 'A working view of your tanks, temperatures and operating states.')}
    ${screen('software-layout', 'VinWizard tank layout and control screen', 'Tank layout with the selected tank’s readings, setpoint, control mode and wine details.')}
    ${features([['See the cellar at a glance.', 'Move from a tank layout into the controls and information for an individual tank.'], ['Set the operating plan.', 'Manage temperatures, control modes and settings around the stage of your wine.'], ['Keep useful context close.', 'Review alarms, temperature history, wine details and cellar notes.']])}
    <a class="page-link" href="https://www.vinwizard.com/software" target="_blank" rel="noopener">Explore VinWizard software ↗</a>`, 'Software'),
  page('Pumpovers, alarms & history', 'operations-page', `
    ${head('Daily cellar operations', 'A plan for the work.<br>A record of the changes.')}
    <div class="operations-pair">${screen('software-pumpover', 'STC pumpover control screen', 'STC pumpover interface: on/off durations and operating status.')}${screen('software-charts', 'VinWizard temperature history', 'Temperature history example from the VinWizard interface.')}</div>
    ${features([['Pumpovers & agitation', 'Define templates and schedules, adjust the plan as fermentations develop and review completed operations.'], ['Alarms that need attention', 'Configure temperature thresholds, recipients and delays. Notification delivery depends on the installed service.'], ['History & reporting', 'Review control-setting changes and tank reports. PDF and CSV report options are available in the software.']])}
    <p class="fine-print">Remote access, notification services and available controls are specified for the installation.</p>`, 'Software'),
  page('Single Tank Controller', 'stc-page', `
    ${head('STC / Single Tank Controller', 'Control.<br>Right at the tank.', 'Local control on the cellar floor, connected to the wider VinWizard system.')}
    <div class="hardware-hero"><div class="product-label"><strong>STC</strong><span>Local control.<br>Connected visibility.</span></div>${photo('stc-front-photo', 'Front of the VinWizard Single Tank Controller', 'stc-product')}</div>
    <div class="spec-strip"><span>Heating & cooling</span><span>Pumpover options</span><span>Wired or wireless*</span></div>
    <p class="body-copy">Give cellar staff access at the tank while your team follows the installation from the software. Pumpover, valve and connectivity options are selected to suit your equipment.</p>
    <p class="fine-print">*Connectivity and control functions depend on the installation. Product photograph supplied in the VinWizard website assets.</p>
    <a class="page-link" href="https://www.vinwizard.com/hardware#stc" target="_blank" rel="noopener">Explore the Single Tank Controller ↗</a>`, 'Hardware / STC'),
  page('Multi-Sensor Probe', 'msp-page', `
    ${head('MSP / Multi-Sensor Probe', 'One tank.<br>More of the picture.', 'Follow temperature at different heights and gain a deeper view of fermentation.')}
    <div class="msp-layout">${photo('msp-probe-illustration', 'Technical illustration of a vertical Multi-Sensor Probe inside a tank', 'msp-product')}<div><h3>See beyond a single reading.</h3><p>Compare the vertical temperature profile, identify stratification and follow changes over time.</p><h3>Follow fermentation.</h3><p>Real-time Brix information adds context for temperature and pumpover decisions.</p></div></div>
    ${screen('msp-stratification-history', 'Recorded MSP temperature and stratification traces', 'Example sensor history: individual temperature traces and stratification over time.')}
    <p class="fine-print">The tank image is a technical illustration with example readings. Interface values describe a specific tank and period.</p>`, 'Hardware / MSP'),
  page('Centralized control', 'iowiz-page', `
    ${head('IOWIZ-4 / IOWIZ-16', 'Control for<br>groups of tanks.', 'Panel-mounted modules for centralized heating and cooling automation.')}
    <div class="iowiz-layout">${photo('iowiz-cabinet', 'Reference-based view of IOWIZ control modules in a cabinet', 'iowiz-product')}<div><h3>One installation.<br>A coordinated approach.</h3><p>Bring groups of tanks into the VinWizard platform through a panel-based control installation.</p><p>Pneumatic or electric actuation options are considered alongside your existing equipment.</p><span class="product-pill">IOWIZ-4</span><span class="product-pill">IOWIZ-16</span></div></div>
    <div class="page-callout"><h3>Which hardware fits your cellar?</h3><dl class="hardware-roles"><div><dt>STC</dt><dd>Local control at the tank.</dd></div><div><dt>IOWIZ</dt><dd>Centralized control in a panel.</dd></div><div><dt>MSP</dt><dd>Additional measurements inside the tank.</dd></div></dl></div>
    <p class="fine-print">Cabinet image is a reference-based presentation visual. Final panel layout and module selection are project-specific.</p>`, 'Hardware / IOWIZ'),
  page('Energy management', 'energy-page dark', `
    ${photo('power-saving-hero', 'Winery operator reviewing cooling demand on a tablet', 'energy-photo')}<div class="energy-shade"></div>
    <div class="energy-copy">${head('Energy management', 'Protect the wine.<br>Use energy<br>with purpose.', 'Coordinate tank demand, circulation and plant schedules around what your winery needs.')}<div class="energy-principles"><div><h3>Cool when it matters.</h3><p>Align cooling with the wine, the process and the available plant capacity.</p></div><div><h3>Connect demand to equipment.</h3><p>Bring compatible pumps, chillers and plant controls into the same conversation.</p></div></div><p class="fine-print">The opportunity depends on your plant, operating conditions and project scope. Establish a baseline and measure the result.</p></div>`, 'Energy management'),
  page('Six coordinated energy controls', 'controls-page', `
    ${head('Energy & plant control', 'Make demand<br>the starting point.', 'Six ways to coordinate cooling and compatible plant equipment.')}
    <div class="energy-controls">${[
      ['Pulse Cooling', 'Cycle coolant delivery to the tank jacket instead of maintaining continuous flow. Compatible modules and valves are required.'],
      ['Pump Control', 'Stop compatible circulation pumps when tanks no longer require heating or cooling; restart when demand returns.'],
      ['Load Scheduling', 'Adjust operating periods and temperature offsets around process requirements and electricity pricing.'],
      ['Load Control', 'Prioritize critical wine processes when configured system-demand limits are reached.'],
      ['System Temps', 'Monitor supply temperatures and pause affected tank control when the supply cannot deliver the required service.'],
      ['Scheduler', 'Schedule operating times and plant setpoint changes for compatible equipment, including chillers and boilers.']
    ].map(([title, text]) => `<div><h3>${title}</h3><p>${text}</p></div>`).join('')}</div>
    <div class="page-callout"><h3>Start with your energy figures.</h3><p>Explore indicative savings scenarios with the VinWizard CO₂ Calculator.</p><a href="https://co2calculator.vinwizard.es/" target="_blank" rel="noopener">Open the calculator ↗</a></div>`, 'Energy / Controls'),
  page('CellarView', 'cellarview-page', `
    ${head('CellarView', 'Your cellar.<br>One shared view.', 'Bring tank information, cellar signals and production data together for the team.')}
    ${photo('cellarview-hero', 'Laptop showing the CellarView tank board in a winery', 'cellarview-hero')}
    ${screen('cellarview', 'CellarView tank board with colour-coded tank information', 'Shared tank board example: contents, status and availability in one view.')}
    <div class="two-columns"><div><h3>The whole cellar at a glance.</h3><p>Follow tank contents, availability, allocations and planned work.</p></div><div><h3>Wherever the team works.</h3><p>Open the tank board in a browser, from the cellar floor to the office.</p></div></div>`, 'CellarView'),
  page('A shared picture for the team', 'team-page', `
    ${head('CellarView / Connected information', 'Bring the details<br>into focus.')}
    ${screen('cellarview-tank-details', 'CellarView individual tank details', 'Individual tank view: wine information, volume, chemistry and operational context.')}
    <div class="two-columns"><div><h3>Connect the information.</h3><p>Bring inventory and wine chemistry together with production platforms, Excel/CSV and APIs.</p></div><div><h3>Work from the same picture.</h3><p>Give the team a shared reference for planning and day-to-day cellar decisions.</p></div></div>
    ${photo('cellarview-team', 'Winery team reviewing a shared CellarView display', 'team-photo')}
    <a class="page-link" href="https://cellarview.vinwizard.com/" target="_blank" rel="noopener">Discover CellarView ↗</a>`, 'CellarView'),
  page('Arkenstone, Napa Valley', 'project-page', `
    ${head('In the cellar / Napa Valley, California', 'A cellar that grew.<br>A system that<br>grew with it.')}
    ${photo('arkenstone', 'Wine tanks inside the Arkenstone winery cellar', 'project-photo')}
    <div class="project-story"><h3>Arkenstone</h3><p>Tank temperature control was the beginning. The installation expanded over time to include pumpovers, refrigeration and glycol systems, air compressors and water filtration.</p><p>A focused starting point became broader cellar automation, coordinating equipment with cellar demand.</p></div>
    <a class="page-link" href="https://www.vinwizard.com/arkenstone" target="_blank" rel="noopener">Read the project story ↗</a>`, 'Projects'),
  page('Plan your project', 'planning-page', `
    ${head('Your next step', 'Start with<br>your cellar.', 'A useful first conversation begins with the equipment you have and the work you want to improve.')}
    <ol class="planning-steps"><li><h3>Define the priority.</h3><p>Temperature control, fermentation visibility, pumpovers, refrigeration demand or team coordination.</p></li><li><h3>Review the installation.</h3><p>Tank count, sensors, valves, control panels, communications and the plant equipment already in place.</p></li><li><h3>Agree the scope.</h3><p>Select hardware, software functions, integrations and commissioning around your winery.</p></li><li><h3>Leave room to grow.</h3><p>Start with the priorities that matter today and plan for the next stage.</p></li></ol>
    <div class="page-callout"><h3>A proposal built around your winery.</h3><p>Equipment, software, integration and support are scoped for your project. Contact the team for a tailored quotation.</p></div>
    <p class="fine-print">Product functions and compatibility depend on the agreed configuration. Remote access is coordinated with your IT team.</p>`, 'Project planning'),
  page('Talk to VinWizard', 'back-cover dark', `
    <div class="back-logo">${logo}</div><div class="back-copy"><p class="cover-kicker">Built around your wine.</p><h2>Better control<br>starts with a<br>conversation.</h2><p>Tell us about your tanks, your plant<br>and what you want to improve.</p><a class="contact-button" href="https://www.vinwizard.com/contactus#enquiry" target="_blank" rel="noopener">Talk to VinWizard ↗</a></div>
    <div class="back-contact"><a href="https://www.vinwizard.com" target="_blank" rel="noopener">www.vinwizard.com</a><p>Wine Technology Inc. / California, USA<br>Wine Technology International / Marlborough, New Zealand</p></div><div class="back-edition"><span>Solutions catalogue / English</span><span>Review edition · November 2026</span></div>`, 'Contact')
];

export function renderPages() {
  return pages.map((p, i) => `<article class="page ${p.cls}" id="page-${i + 1}" data-index="${i}" aria-label="Page ${i + 1}: ${p.title}">${p.html}${i > 0 && i < pages.length - 1 ? footer(i + 1, p.section) : ''}</article>`).join('\n');
}
