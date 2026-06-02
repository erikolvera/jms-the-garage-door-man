/* ==========================================================================
   JMS Garage Door Man - Interactive Website Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initHeaderScroll();
  initMobileMenu();
  initGalleryLightbox();
  initGalleryToggle();
  initServiceMap();
  initQuotePlanner();
  initFormValidation();
  initScrollAnimationsFallback();
});

/* ==========================================================================
   0. Bilingual (English / Spanish) Support
   ========================================================================== */

/**
 * Translation dictionary. Each key maps a stable identifier (referenced from
 * the HTML via data-i18n / data-i18n-html / data-i18n-placeholder /
 * data-i18n-content) to its English and Spanish copy. Dynamic strings used by
 * JS (quote planner options, pre-filled SMS body) live here too so a single
 * source of truth drives the whole page.
 */
const I18N = {
  en: {
    'meta.title': 'JMS Garage Door Man | 24/7 Professional Garage Door & Opener Repair Houston',
    'meta.description': "Owned and operated by Marlon. JMS Garage Door Man offers professional, 24/7 garage door installation, spring replacement, opener repair, and maintenance. Primarily serving Houston, but travels far — even hours away — for the job. Call or text 409-934-2301 today for a custom quote!",

    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.quote': 'Interactive Quote',
    'nav.why': 'Why JMS',
    'nav.gallery': 'Before/After',
    'nav.callBtn': 'Call 409-934-2301',

    'hero.badge': '24/7 Professional Dispatch',
    'hero.title': 'No Job Too Far. <span>No Repair Too Complex.</span>',
    'hero.desc': 'Owned and operated by <strong>Marlon</strong>. JMS Garage Door Man provides top-tier repairs, flawless installations, and comprehensive tune-ups. While I primarily serve the Houston area, I gladly travel far — even hours away — to get the job done right, quoting every job custom-tailored to your exact situation to guarantee the lowest price.',
    'hero.cta.quote': 'Get Custom Quote',
    'hero.cta.call': 'Call Marlon Direct',
    'hero.trust.emergency': 'Emergency Service',
    'hero.trust.custom': 'Custom Quoted',
    'hero.trust.fees': 'Hidden Fees',
    'hero.card.title': "Marlon's Promise",
    'hero.card.desc': 'Top quality work, no exceptions.',

    'services.badge': 'Our Expertise',
    'services.title': 'Our <span>Services</span>',
    'services.subtitle': 'Expert solutions for every garage door need.',
    'svc.install.title': 'Installation & Upgrades',
    'svc.install.desc': "Custom doors, smart openers, and keypads. Transform your home's curb appeal with modern solutions.",
    'svc.install.alt': 'Modern flush garage door with a row of windows',
    'svc.repair.title': 'Repairs & Troubleshooting',
    'svc.repair.desc': 'Emergency service for springs, cables, tracks, and openers. Available when you need us most.',
    'svc.repair.alt': 'Dark-stained arched wood carriage doors',
    'svc.maint.title': 'Inspections & Tune-ups',
    'svc.maint.desc': 'Preventative maintenance with our comprehensive 25-point audit to keep your door running smoothly.',
    'svc.maint.alt': 'Classic white long-panel garage door',
    'svc.configure': 'Configure Quote ›',

    'quote.badge': 'No Hidden Fees',
    'quote.title': 'Get Your <span>Custom Quote</span>',
    'quote.subtitle': 'Fast, transparent pricing tailored to your needs.',
    'quote.step1.title': 'What do you need?',
    'quote.radio.install': 'Installation',
    'quote.radio.repair': 'Repair',
    'quote.radio.maint': 'Tune-up',
    'quote.label.name': 'Your Name',
    'quote.ph.name': 'John Doe',
    'quote.err.name': 'Please enter your name.',
    'quote.label.phone': 'Phone Number',
    'quote.err.phone': 'Please enter a valid phone number.',
    'quote.label.notes': 'Location (Optional)',
    'quote.ph.notes': 'Houston, TX',
    'quote.send.prompt': 'Choose how to send your quote request:',
    'quote.optionA.btn': 'Call Marlon Now',
    'quote.optionB.btn': 'Send Text Message',

    'service.installation': 'Installation',
    'service.repair': 'Repair',
    'service.maintenance': 'Maintenance',
    'service.generic': 'garage',
    'sms.defaultName': 'Valued Client',
    'sms.greeting': 'Hello Marlon! My name is {name}. I need a quote for {service} services.',
    'sms.notes': ' Location: {notes}',

    'why.badge': 'Trusted Professional',
    'why.title': 'Why Choose <span>JMS Garage Door Man</span>',
    'why.f1.title': 'Owned & Operated by Marlon',
    'why.f1.desc': 'You speak directly with the owner and craftsman. Marlon performs all repair and installation work personally, ensuring unmatched attention to detail and no cut corners.',
    'why.f2.title': 'Flexible Custom Quoting',
    'why.f2.desc': "Since garage conditions vary wildly, Marlon doesn't impose rigid menu rates. He evaluates your situation fairly, charging only for what is necessary, saving you hundreds of dollars.",
    'why.f3.title': 'No Distance Too Far',
    'why.f3.desc': 'Based in the Houston metropolitan area, Marlon primarily serves Houston — but is fully willing to travel far, even hours away, to outlying towns for larger custom installation or repair projects.',
    'why.f4.title': '24/7 Availability',
    'why.f4.desc': 'Garage door springs snap at the worst possible times, locking your car inside. Marlon is on-call 24 hours a day, 7 days a week, ready to get your garage operational immediately.',
    'area.title': 'Service Area',
    'area.desc': 'Primarily serving Houston, Texas and all surrounding counties — but Marlon travels far, even hours away.',

    'ba.badge': 'Restoration Portfolio',
    'ba.title': 'Before & After <span>Showcase</span>',
    'ba.subtitle': 'See the difference Marlon makes — from worn, dated doors to clean, reliable installs. Residential, commercial, you name it: he does it all.',
    'ba.label.after': 'After',
    'ba.label.before': 'Before',
    'ba.alt.before': 'Before: a worn, dated garage door',
    'ba.alt.after': 'After: clean, freshly installed garage doors',
    'cap.residential': 'Residential',
    'cap.commercial': 'Commercial',
    'cap.all': 'You name it — he does it all',

    'gallery2.badge': 'Project Gallery',
    'gallery2.title': 'Our <span>Recent Work</span>',
    'gallery2.subtitle': 'A look at real garage doors Marlon has installed and restored across the Houston area and beyond. Tap any photo to view it full size.',
    'g.darkwood': 'Dark-stained arched wood carriage doors',
    'g.stone': 'Double garage door with stone trim',
    'g.glass2': 'Modern full-view glass doors',
    'g.carriage3a': 'Three two-tone carriage doors',
    'g.whitelong': 'Classic white long-panel door',
    'g.glasspool': 'Glass door opening to a poolside',
    'g.woodgrain': 'Wood-grain double door on brick',
    'g.cedar': 'Natural cedar barn-style doors',
    'g.brown2': 'Twin brown carriage-panel doors',
    'g.flush': 'Modern flush door with a window row',
    'g.twotone': 'Custom two-tone carriage door',
    'g.whitewin2': 'Windowed white doors, new build',
    'g.carriageiron': 'Carriage doors with iron hardware',
    'g.almond': 'Almond raised-panel double door',
    'g.frosted': 'Contemporary frosted-glass door',
    'g.whitenew': 'White raised-panel door, new construction',
    'g.carriage3b': 'Three-car carriage door set',
    'g.glassint': 'Full-view glass door, interior view',
    'g.arched': 'Arched two-tone carriage doors',
    'g.espresso': 'Espresso short-panel double door',
    'g.whiteraised': 'White raised-panel install',
    'g.whitewin1': 'White door with top window lites',
    'g.frostedpanel': 'Contemporary frosted-panel doors',
    'g.whitewin3': 'White carriage door with windows',
    'g.matteblack': 'Matte-black modern door with window lites',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous',
    'lightbox.next': 'Next',
    'gallery.showMore': 'See more ({n})',
    'gallery.showAll': 'Show all ({n})',
    'gallery.showLess': 'Show less',

    'rev.badge': 'Customer Reviews',
    'rev.title': 'What Our <span>Clients Say</span>',
    'rev.subtitle': 'Read feedback from homeowners around Houston who trust Marlon for their emergency repairs and door upgrades.',
    'rev.t1.text': '"My garage door spring snapped at 10 PM on a Sunday night, locking my car inside before a major flight. I called JMS Garage Door Man, and Marlon was at my house in Houston within 45 minutes. He fixed the spring, lubricated the rollers, and charged a very fair price. Absolutely life-saving service!"',
    'rev.t2.text': "\"Marlon installed a new matte glass panel garage door for our modern home rebuild. Other companies refused to drive out to our rural property, but Marlon didn't hesitate. The installation is flawless, incredibly quiet, and completely transformed the front of our house. Highest recommendation!\"",
    'rev.t3.text': '"My garage door opener motor was making a terrible grinding sound and wouldn\'t lift the door. Marlon came out, diagnosed a stripped plastic gear, and replaced it in under an hour instead of selling me an expensive new motor like other companies tried to do. Honesty is rare these days!"',

    'footer.desc': 'Professional residential garage door installations, fast spring replacements, opener troubleshooting, and preventative tune-ups. Managed and executed personally by Marlon.',
    'footer.nav.title': 'Navigation',
    'footer.contact.title': 'Contact Marlon',
    'footer.hours': 'Available 24/7 for Emergencies',
    'footer.area': 'Primarily Houston & surrounding areas — travels hours away for larger jobs',
    'footer.copyright': '© 2026 JMS Garage Door Man. All Rights Reserved.',
    'footer.bottom': 'Owned and Operated by Marlon | Call or Text <a href="tel:+14099342301" style="color: var(--accent-color); font-weight: 700;">409-934-2301</a>',

    'lang.toggleLabel': 'Español'
  },

  es: {
    'meta.title': 'JMS Garage Door Man | Reparación Profesional de Puertas de Garaje 24/7 en Houston',
    'meta.description': 'Propiedad y operado por Marlon. JMS Garage Door Man ofrece instalación, reemplazo de resortes, reparación de motores y mantenimiento de puertas de garaje las 24 horas. Atiende principalmente Houston, pero viaja lejos, incluso a horas de distancia. ¡Llame o envíe un mensaje al 409-934-2301 hoy para una cotización personalizada!',

    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.quote': 'Cotización Interactiva',
    'nav.why': 'Por Qué JMS',
    'nav.gallery': 'Antes/Después',
    'nav.callBtn': 'Llamar al 409-934-2301',

    'hero.badge': 'Despacho Profesional 24/7',
    'hero.title': 'Ningún Trabajo Muy Lejos. <span>Ninguna Reparación Muy Compleja.</span>',
    'hero.desc': 'Propiedad y operado por <strong>Marlon</strong>. JMS Garage Door Man ofrece reparaciones de primer nivel, instalaciones impecables y mantenimientos completos. Aunque atiendo principalmente el área de Houston, con gusto viajo lejos — incluso a horas de distancia — para hacer bien el trabajo, cotizando cada proyecto según su situación exacta para garantizar el mejor precio.',
    'hero.cta.quote': 'Obtener Cotización',
    'hero.cta.call': 'Llamar a Marlon',
    'hero.trust.emergency': 'Servicio de Emergencia',
    'hero.trust.custom': 'Cotización Personalizada',
    'hero.trust.fees': 'Cargos Ocultos',
    'hero.card.title': 'La Promesa de Marlon',
    'hero.card.desc': 'Trabajo de máxima calidad, sin excepciones.',

    'services.badge': 'Nuestra Experiencia',
    'services.title': 'Nuestros <span>Servicios</span>',
    'services.subtitle': 'Soluciones expertas para toda necesidad de puerta de garaje.',
    'svc.install.title': 'Instalación y Mejoras',
    'svc.install.desc': 'Puertas personalizadas, motores inteligentes y teclados. Transforme la apariencia de su hogar con soluciones modernas.',
    'svc.install.alt': 'Puerta de garaje moderna y lisa con una fila de ventanas',
    'svc.repair.title': 'Reparaciones y Diagnóstico',
    'svc.repair.desc': 'Servicio de emergencia para resortes, cables, rieles y motores. Disponible cuando más lo necesita.',
    'svc.repair.alt': 'Puertas de cochera de madera arqueada con tinte oscuro',
    'svc.maint.title': 'Inspecciones y Mantenimiento',
    'svc.maint.desc': 'Mantenimiento preventivo con nuestra auditoría completa de 25 puntos para que su puerta funcione sin problemas.',
    'svc.maint.alt': 'Puerta de garaje clásica blanca de panel largo',
    'svc.configure': 'Configurar Cotización ›',

    'quote.badge': 'Sin Cargos Ocultos',
    'quote.title': 'Obtenga su <span>Cotización Personalizada</span>',
    'quote.subtitle': 'Precios rápidos y transparentes adaptados a sus necesidades.',
    'quote.step1.title': '¿Qué necesita?',
    'quote.radio.install': 'Instalación',
    'quote.radio.repair': 'Reparación',
    'quote.radio.maint': 'Mantenimiento',
    'quote.label.name': 'Su Nombre',
    'quote.ph.name': 'Juan Pérez',
    'quote.err.name': 'Por favor ingrese su nombre.',
    'quote.label.phone': 'Número de Teléfono',
    'quote.err.phone': 'Por favor ingrese un número de teléfono válido.',
    'quote.label.notes': 'Ubicación (Opcional)',
    'quote.ph.notes': 'Houston, TX',
    'quote.send.prompt': 'Elija cómo enviar su solicitud de cotización:',
    'quote.optionA.btn': 'Llamar a Marlon Ahora',
    'quote.optionB.btn': 'Enviar Mensaje de Texto',

    'service.installation': 'Instalación',
    'service.repair': 'Reparación',
    'service.maintenance': 'Mantenimiento',
    'service.generic': 'garaje',
    'sms.defaultName': 'Cliente Estimado',
    'sms.greeting': '¡Hola Marlon! Me llamo {name}. Necesito una cotización para servicios de {service}.',
    'sms.notes': ' Ubicación: {notes}',

    'why.badge': 'Profesional de Confianza',
    'why.title': 'Por Qué Elegir a <span>JMS Garage Door Man</span>',
    'why.f1.title': 'Propiedad y Operado por Marlon',
    'why.f1.desc': 'Usted habla directamente con el dueño y artesano. Marlon realiza personalmente todo el trabajo de reparación e instalación, garantizando una atención al detalle inigualable y sin atajos.',
    'why.f2.title': 'Cotización Personalizada y Flexible',
    'why.f2.desc': 'Como las condiciones de cada garaje varían mucho, Marlon no impone tarifas rígidas. Evalúa su situación de forma justa, cobrando solo por lo necesario, ahorrándole cientos de dólares.',
    'why.f3.title': 'Ninguna Distancia Es Demasiada',
    'why.f3.desc': 'Con base en el área metropolitana de Houston, Marlon atiende principalmente Houston, pero está totalmente dispuesto a viajar lejos, incluso a horas de distancia, a pueblos remotos para proyectos más grandes de instalación o reparación.',
    'why.f4.title': 'Disponibilidad 24/7',
    'why.f4.desc': 'Los resortes de las puertas se rompen en los peores momentos, dejando su auto encerrado. Marlon está disponible las 24 horas del día, los 7 días de la semana, listo para poner su garaje en funcionamiento de inmediato.',
    'area.title': 'Área de Servicio',
    'area.desc': 'Atiende principalmente Houston, Texas y todos los condados cercanos, pero Marlon viaja lejos, incluso a horas de distancia.',

    'ba.badge': 'Portafolio de Restauración',
    'ba.title': 'Galería <span>Antes y Después</span>',
    'ba.subtitle': 'Vea la diferencia que hace Marlon — de puertas viejas y desgastadas a instalaciones limpias y confiables. Residencial, comercial, lo que necesite: él lo hace todo.',
    'ba.label.after': 'Después',
    'ba.label.before': 'Antes',
    'ba.alt.before': 'Antes: una puerta de garaje vieja y desgastada',
    'ba.alt.after': 'Después: puertas de garaje limpias y recién instaladas',
    'cap.residential': 'Residencial',
    'cap.commercial': 'Comercial',
    'cap.all': 'Lo que necesite — él lo hace todo',

    'gallery2.badge': 'Galería de Proyectos',
    'gallery2.title': 'Nuestro <span>Trabajo Reciente</span>',
    'gallery2.subtitle': 'Un vistazo a puertas de garaje reales que Marlon ha instalado y restaurado en el área de Houston y más allá. Toque cualquier foto para verla en tamaño completo.',
    'g.darkwood': 'Puertas de madera arqueadas color oscuro estilo cochera',
    'g.stone': 'Puerta doble de garaje con acabado en piedra',
    'g.glass2': 'Puertas modernas de vidrio completo',
    'g.carriage3a': 'Tres puertas estilo cochera de dos tonos',
    'g.whitelong': 'Puerta clásica blanca de paneles largos',
    'g.glasspool': 'Puerta de vidrio que da a la alberca',
    'g.woodgrain': 'Puerta doble imitación madera sobre ladrillo',
    'g.cedar': 'Puertas de cedro natural estilo granero',
    'g.brown2': 'Puertas gemelas marrón estilo cochera',
    'g.flush': 'Puerta moderna lisa con hilera de ventanas',
    'g.twotone': 'Puerta personalizada estilo cochera de dos tonos',
    'g.whitewin2': 'Puertas blancas con ventanas, obra nueva',
    'g.carriageiron': 'Puertas estilo cochera con herrajes de hierro',
    'g.almond': 'Puerta doble de paneles color almendra',
    'g.frosted': 'Puerta contemporánea de vidrio esmerilado',
    'g.whitenew': 'Puerta blanca de paneles, obra nueva',
    'g.carriage3b': 'Conjunto de tres puertas estilo cochera',
    'g.glassint': 'Puerta de vidrio completo, vista interior',
    'g.arched': 'Puertas arqueadas estilo cochera de dos tonos',
    'g.espresso': 'Puerta doble color espresso de paneles cortos',
    'g.whiteraised': 'Instalación de puerta blanca de paneles',
    'g.whitewin1': 'Puerta blanca con ventanas superiores',
    'g.frostedpanel': 'Puertas contemporáneas de paneles esmerilados',
    'g.whitewin3': 'Puerta blanca estilo cochera con ventanas',
    'g.matteblack': 'Puerta moderna negro mate con ventanas',
    'lightbox.close': 'Cerrar',
    'lightbox.prev': 'Anterior',
    'lightbox.next': 'Siguiente',
    'gallery.showMore': 'Ver más ({n})',
    'gallery.showAll': 'Ver todas ({n})',
    'gallery.showLess': 'Ver menos',

    'rev.badge': 'Reseñas de Clientes',
    'rev.title': 'Lo Que Dicen <span>Nuestros Clientes</span>',
    'rev.subtitle': 'Lea los comentarios de propietarios de toda el área de Houston que confían en Marlon para sus reparaciones de emergencia y mejoras de puertas.',
    'rev.t1.text': '"El resorte de mi puerta de garaje se rompió a las 10 PM un domingo por la noche, dejando mi auto encerrado antes de un vuelo importante. Llamé a JMS Garage Door Man, y Marlon llegó a mi casa en Houston en menos de 45 minutos. Arregló el resorte, lubricó los rodillos y cobró un precio muy justo. ¡Un servicio que me salvó la vida!"',
    'rev.t2.text': '"Marlon instaló una nueva puerta de garaje de paneles de vidrio mate para la remodelación de nuestra casa moderna. Otras compañías se negaron a venir a nuestra propiedad rural, pero Marlon no dudó. La instalación es impecable, increíblemente silenciosa y transformó por completo el frente de nuestra casa. ¡La más alta recomendación!"',
    'rev.t3.text': '"El motor del abridor de mi puerta de garaje hacía un ruido terrible y no levantaba la puerta. Marlon vino, diagnosticó un engranaje de plástico desgastado y lo reemplazó en menos de una hora, en lugar de venderme un motor nuevo y caro como intentaron otras compañías. ¡La honestidad es rara en estos días!"',

    'footer.desc': 'Instalaciones profesionales de puertas de garaje residenciales, reemplazos rápidos de resortes, diagnóstico de motores y mantenimientos preventivos. Administrado y ejecutado personalmente por Marlon.',
    'footer.nav.title': 'Navegación',
    'footer.contact.title': 'Contactar a Marlon',
    'footer.hours': 'Disponible 24/7 para Emergencias',
    'footer.area': 'Principalmente Houston y áreas cercanas — viaja a horas de distancia para trabajos grandes',
    'footer.copyright': '© 2026 JMS Garage Door Man. Todos los Derechos Reservados.',
    'footer.bottom': 'Propiedad y Operado por Marlon | Llame o Envíe un Mensaje al <a href="tel:+14099342301" style="color: var(--accent-color); font-weight: 700;">409-934-2301</a>',

    'lang.toggleLabel': 'English'
  }
};

let currentLang = 'en';

/** Translate a key in the current language, falling back to English then the key itself. */
function t(key) {
  const langPack = I18N[currentLang] || I18N.en;
  if (key in langPack) return langPack[key];
  if (key in I18N.en) return I18N.en[key];
  return key;
}

/** Fill {placeholders} in a template string from a values object. */
function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, name) => (name in values ? values[name] : match));
}

/**
 * Apply a language across the whole document: swaps every tagged node, updates
 * <html lang>, the <title>, meta description, and the toggle button labels,
 * then notifies any dynamic widgets (the quote planner) to re-render.
 */
function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'en';

  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  // Rich (HTML) content — copy that intentionally contains inline markup
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  // Input / textarea placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  // Meta attributes (e.g., description)
  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
  });
  // Image alt text
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
  });
  // ARIA labels (e.g., lightbox controls)
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });

  // Document-level
  document.documentElement.lang = currentLang;
  document.title = t('meta.title');

  // Toggle button labels (they advertise the language you'd switch TO)
  const toggleLabel = t('lang.toggleLabel');
  const desktopLabel = document.getElementById('lang-toggle-label');
  if (desktopLabel) desktopLabel.textContent = toggleLabel;
  document.querySelectorAll('[data-lang-mobile-label]').forEach((el) => {
    el.textContent = toggleLabel;
  });

  // Persist and broadcast so dynamic widgets can re-render in the new language
  try { localStorage.setItem('jms-lang', currentLang); } catch (e) { /* storage may be blocked */ }
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

/** Wire up the language toggle buttons and apply the initial language. */
function initLanguage() {
  // Initial language: saved preference, else the browser's preference, else English
  let initial = 'en';
  try {
    const saved = localStorage.getItem('jms-lang');
    if (saved && I18N[saved]) {
      initial = saved;
    } else if ((navigator.language || '').toLowerCase().startsWith('es')) {
      initial = 'es';
    }
  } catch (e) { /* ignore */ }

  const toggle = () => applyLang(currentLang === 'en' ? 'es' : 'en');

  ['lang-toggle', 'lang-toggle-mobile'].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', toggle);
  });

  applyLang(initial);
}

/**
 * 1. Header Scroll Effect
 * Shrinks header and adds shadow when page is scrolled
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once initially in case page loads scrolled down
  handleScroll();
}

/**
 * 2. Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!menuToggle || !mobileNav) return;

  const toggleMenu = () => {
    mobileNav.classList.toggle('open');
    // Animate hamburger lines
    const spans = menuToggle.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/**
 * 3. Project Gallery Lightbox
 * Click any gallery photo to open a full-size, keyboard-navigable viewer.
 */
function initGalleryLightbox() {
  const gallery = document.getElementById('work-gallery');
  const lightbox = document.getElementById('lightbox');
  if (!gallery || !lightbox) return;

  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  const items = Array.from(gallery.querySelectorAll('.work-item'));
  let currentIndex = -1;
  let lastFocused = null;

  const render = (index) => {
    const item = items[index];
    if (!item) return;
    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption');
    // Prefer the full-resolution original (data-full) over the small srcset
    // variant the grid resolved to, so the lightbox shows a crisp image.
    lbImg.src = img.dataset.full || img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = caption ? caption.textContent.trim() : '';
    currentIndex = index;
  };

  const open = (index) => {
    lastFocused = document.activeElement;
    render(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    btnClose.focus();
  };

  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };

  const step = (delta) => {
    const next = (currentIndex + delta + items.length) % items.length;
    render(next);
  };

  // Open on click; make each item keyboard-activatable too
  items.forEach((item, index) => {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => open(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(index);
      }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(1));

  // Click on the dim backdrop (but not the image/controls) closes
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-figure')) {
      close();
    }
  });

  // Keyboard navigation while open
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
}

// Project gallery reveal settings
const INITIAL_GALLERY = 4; // photos shown before any reveal
const GALLERY_STEP = 5;    // photos revealed per "See more" click

/**
 * 3c. Project Gallery incremental reveal
 * Shows the first few photos, then reveals 5 more per click ("See more (n)"),
 * or every photo at once ("Show all (total)"), with a "Show less" to collapse.
 * Progressive enhancement: without JS every photo shows and the buttons stay hidden.
 * Because revealed items use the `hidden` attribute, their lazy images aren't
 * fetched until shown.
 */
function initGalleryToggle() {
  const gallery = document.getElementById('work-gallery');
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll('.work-item'));
  const total = items.length;
  const moreBtn = document.getElementById('gallery-more');
  const allBtn = document.getElementById('gallery-all');
  const lessBtn = document.getElementById('gallery-less');
  if (!moreBtn || !allBtn || !lessBtn || total <= INITIAL_GALLERY) return;

  let visible = INITIAL_GALLERY;

  const render = () => {
    items.forEach((item, i) => { item.hidden = i >= visible; });
    const remaining = total - visible;
    if (remaining > 0) {
      const step = Math.min(GALLERY_STEP, remaining);
      moreBtn.hidden = false;
      moreBtn.textContent = fillTemplate(t('gallery.showMore'), { n: step });
      allBtn.hidden = false;
      allBtn.textContent = fillTemplate(t('gallery.showAll'), { n: total });
      lessBtn.hidden = true;
    } else {
      moreBtn.hidden = true;
      allBtn.hidden = true;
      lessBtn.hidden = false;
      lessBtn.textContent = t('gallery.showLess');
    }
  };

  moreBtn.addEventListener('click', () => {
    visible = Math.min(visible + GALLERY_STEP, total);
    render();
  });
  allBtn.addEventListener('click', () => {
    visible = total;
    render();
  });
  lessBtn.addEventListener('click', () => {
    visible = INITIAL_GALLERY;
    render();
    const header = document.getElementById('work-gallery-header');
    if (header) header.scrollIntoView({ behavior: 'smooth' });
  });

  // Re-render labels (they contain counts) when the language changes.
  document.addEventListener('langchange', render);

  render();
}

/**
 * 3d. Service Area Map (lazy)
 * Injects a real OpenStreetMap iframe only when the Service Area section nears
 * the viewport, so it never affects initial page load / first paint.
 */
function initServiceMap() {
  const mount = document.getElementById('service-map');
  if (!mount) return;

  const src = mount.getAttribute('data-map-src');
  if (!src) return;

  let injected = false;
  const inject = () => {
    if (injected) return;
    injected = true;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.title = 'Map of the Houston, Texas service area';
    iframe.setAttribute('aria-label', mount.getAttribute('aria-label') || 'Service area map');
    mount.appendChild(iframe);
  };

  if (!('IntersectionObserver' in window)) {
    inject();
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inject();
        obs.disconnect();
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(mount);
}

/**
 * 4. Interactive Quote Request Planner
 */
function initQuotePlanner() {
  const plannerForm = document.getElementById('quote-planner-form');
  if (!plannerForm) return;

  const serviceRadios = plannerForm.querySelectorAll('input[name="service_type"]');

  // Output / action elements
  const quoteOutput = document.getElementById('quote-output');
  const textCta = document.getElementById('text-cta');
  const callCta = document.getElementById('call-cta');

  // Build the pre-filled call/text links from the customer's inputs.
  // The text (SMS) link carries a localized, ready-to-send message body.
  const generateLiveSummary = () => {
    const nameInput = document.getElementById('client_name');
    const serviceRadio = plannerForm.querySelector('input[name="service_type"]:checked');
    const notesInput = document.getElementById('client_notes');

    const name = nameInput ? nameInput.value.trim() || t('sms.defaultName') : t('sms.defaultName');
    const serviceType = serviceRadio ? serviceRadio.value : null;
    const notes = notesInput ? notesInput.value.trim() : '';

    // Localized service name
    const serviceName = serviceType ? t('service.' + serviceType) : t('service.generic');

    // Build the descriptive message from localized templates
    let summaryText = fillTemplate(t('sms.greeting'), { name, service: serviceName });
    if (notes) {
      summaryText += fillTemplate(t('sms.notes'), { notes });
    }

    if (!textCta || !callCta) return;

    // Build the SMS link (handling iOS vs Android separator)
    const smsNumber = '4099342301'; // Clean number for link
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const smsSeparator = isIOS ? '&' : '?';

    // Create text message URI with the pre-filled body
    textCta.href = `sms:+1${smsNumber}${smsSeparator}body=${encodeURIComponent(summaryText)}`;

    // Call link is a simple click-to-call
    callCta.href = `tel:+14099342301`;
  };

  // Rebuild the message when the service category changes
  serviceRadios.forEach(radio => {
    radio.addEventListener('change', generateLiveSummary);
  });

  // Track typing on the text fields to keep the message current
  const textInputs = plannerForm.querySelectorAll('input[type="text"], input[type="tel"], textarea');
  textInputs.forEach(input => {
    input.addEventListener('input', generateLiveSummary);
  });

  // Rebuild the message (with localized templates) when language changes
  document.addEventListener('langchange', generateLiveSummary);

  generateLiveSummary();

  // Prevent an Enter-key submit from navigating; keep focus in the form area
  plannerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (quoteOutput) quoteOutput.scrollIntoView({ behavior: 'smooth' });
  });
}

/**
 * 5. Form Validation Styling & ARIA Synchronization
 * Uses modern best practices (validate-input-after-interaction)
 */
function initFormValidation() {
  const form = document.getElementById('quote-planner-form');
  if (!form) return;

  // Sync aria-invalid with the visual CSS :user-invalid state
  const syncAria = (el) => {
    if (!el || !el.setAttribute) return;
    const isInvalid = el.matches(':user-invalid') || el.classList.contains('user-invalid-fallback');
    el.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
  };

  // Update on blur (to show error) and input (to clear it)
  form.addEventListener('blur', (e) => {
    syncAria(e.target);
  }, true); // Capture phase

  form.addEventListener('input', (e) => {
    if (e.target.hasAttribute('aria-invalid')) {
      syncAria(e.target);
    }
  });

  // 5a. Fallback for browsers that do not support :user-invalid
  if (!CSS.supports('selector(:user-invalid)')) {
    const dirtyState = new WeakMap();

    const updateFallbackState = (input) => {
      const isValid = input.checkValidity();
      input.classList.toggle('user-invalid-fallback', !isValid);
      input.classList.toggle('user-valid-fallback', isValid);
      syncAria(input);
    };

    const handleFallbackEvent = (event) => {
      const input = event.target;
      if (!input.checkValidity) return;

      if (event.type === 'reset') {
        const controls = form.elements || [];
        for (const control of controls) {
          dirtyState.delete(control);
          control.classList.remove('user-invalid-fallback');
          control.classList.remove('user-valid-fallback');
          control.removeAttribute('aria-invalid');
        }
        return;
      }

      if (event.type === 'input' || event.type === 'change') {
        const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
        state.hasInteracted = true;
        dirtyState.set(input, state);
        if (state.hasBlurred) {
          updateFallbackState(input);
        }
      } else if (event.type === 'blur') {
        const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
        state.hasBlurred = true;
        dirtyState.set(input, state);
        if (state.hasInteracted) {
          updateFallbackState(input);
        }
      }
    };

    form.addEventListener('blur', handleFallbackEvent, true);
    form.addEventListener('input', handleFallbackEvent);
    form.addEventListener('change', handleFallbackEvent);
    form.addEventListener('reset', handleFallbackEvent, true);
  }
}

/**
 * 6. Scroll-Driven Animations Fallback
 * Uses IntersectionObserver for browsers without CSS View Timelines support
 */
function initScrollAnimationsFallback() {
  // If CSS View Timelines and range are supported, do nothing, let native CSS handle it
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    return;
  }

  // Fallback setup using JSIntersectionObserver
  const options = {
    root: null, // Viewport
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before scrolling into view
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, we can unobserve if we want it to be a one-way entrance
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Select elements to reveal
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const scaleElements = document.querySelectorAll('.scroll-scale');

  revealElements.forEach(el => {
    el.classList.add('js-reveal');
    observer.observe(el);
  });

  scaleElements.forEach(el => {
    el.classList.add('js-scale');
    observer.observe(el);
  });
}
