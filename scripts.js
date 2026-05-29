/* ==========================================================================
   JMS Garage Door Man - Interactive Website Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initHeaderScroll();
  initMobileMenu();
  initGalleryLightbox();
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
    'services.title': 'Professional <span>Garage Services</span>',
    'services.subtitle': 'Marlon handles everything from full structural installations to complex mechanical repairs and general maintenance. No job is too big or small.',
    'svc.install.title': 'Installation & Upgrades',
    'svc.install.desc': "Upgrade your home's curb appeal and security with modern, high-performance garage doors and openers.",
    'svc.install.li1': 'Custom steel, glass, & wood doors',
    'svc.install.li2': 'Smart Wi-Fi opener assemblies',
    'svc.install.li3': 'Keyless keypads & key fob programming',
    'svc.install.li4': 'Heavy-duty tracking system setup',
    'svc.repair.title': 'Repairs & Troubleshooting',
    'svc.repair.desc': 'Rapid diagnostics and fixes for any mechanical or electrical failures. Same-day emergency service available.',
    'svc.repair.li1': 'Broken torsion spring replacement',
    'svc.repair.li2': 'Snapped steel cable recovery',
    'svc.repair.li3': 'Off-track alignment & resetting',
    'svc.repair.li4': 'Opener motor & gear assembly rebuilds',
    'svc.maint.title': 'Inspections & Tune-ups',
    'svc.maint.desc': 'Preventative maintenance programs that quiet noisy garage doors and extend the operational life of structural components.',
    'svc.maint.li1': '25-point comprehensive structural audit',
    'svc.maint.li2': 'Professional spring & track lubrication',
    'svc.maint.li3': 'Tension balance calibration',
    'svc.maint.li4': 'Safety sensor alignment & check',
    'svc.configure': 'Configure Quote →',

    'quote.badge': 'No Hidden Fees',
    'quote.title': 'Interactive <span>Quote Request Planner</span>',
    'quote.subtitle': 'Since every garage door job is unique, Marlon quotes depending on your specific situation. Use this planner to select what you need and instantly call or text him the details.',
    'quote.step1.title': '1. Select Service Category',
    'quote.step1.desc': 'Choose the general class of service required:',
    'quote.radio.install': 'Installation',
    'quote.radio.repair': 'Repair',
    'quote.radio.maint': 'Tune-up',
    'quote.step3.title': '2. Provide Your Details',
    'quote.step3.desc': 'Add your name and phone number so Marlon can address your request properly:',
    'quote.label.name': 'Your Name',
    'quote.ph.name': "Marlon's Customer",
    'quote.err.name': 'Please enter your name.',
    'quote.label.phone': 'Phone Number (For Call/Text back)',
    'quote.err.phone': 'Please enter a valid phone number.',
    'quote.label.notes': 'Additional Details / Project Location (Optional)',
    'quote.ph.notes': "Describe any specific requests, e.g., 'Double car door, opener makes clicking noise, located in Katy TX'",
    'quote.output.title': 'Your Formatted Message Details',
    'quote.optionA.title': 'Option A: Call Marlon (Fastest Response)',
    'quote.optionA.desc': 'Marlon works out in the field — calling him directly is the fastest way to reach him and get a quick quote over the phone.',
    'quote.optionA.btn': 'Call 409-934-2301 Now',
    'quote.optionB.title': 'Option B: Text Your Details',
    'quote.optionB.desc': 'Prefer to text? Send this pre-filled message with your project details and Marlon will reply as soon as he can.',
    'quote.optionB.btn': 'Text Message Marlon',

    'optTitle.installation': 'Select Installation Interests:',
    'optTitle.repair': 'What problems are you experiencing?',
    'optTitle.maintenance': 'Select Maintenance Services:',

    'opt.install.door': 'New Custom Garage Door',
    'opt.install.opener': 'New Automatic Opener Installation',
    'opt.install.spring': 'Torsion/Extension Spring System',
    'opt.install.keypad': 'Keyless Entry Pad & Remotes',
    'opt.install.sensors': 'Safety Sensor Eyes Setup',
    'opt.repair.spring': "Replace Broken Springs (Door is heavy/won't lift)",
    'opt.repair.cables': 'Frayed/Snapped Cables Replacement',
    'opt.repair.track': 'Re-align Off-track Garage Door',
    'opt.repair.opener': "Opener Troubleshooting (Motor hums, door won't move)",
    'opt.repair.rollers': 'Squeaking/Worn Roller Replacement',
    'opt.repair.panel': 'Damaged Slat or Panel Repair',
    'opt.maint.inspection': 'Full 25-Point Safety Inspection',
    'opt.maint.lube': 'High-Performance Roller/Spring Lubrication',
    'opt.maint.tighten': 'Structural Bolt & Hinge Tightening',
    'opt.maint.balance': 'Door Balance & Tension Calibration',

    'service.installation': 'Installation',
    'service.repair': 'Repair',
    'service.maintenance': 'Maintenance',
    'service.generic': 'garage',
    'sms.defaultName': 'Valued Client',
    'sms.greeting': 'Hello Marlon! My name is {name}. I need a quote for {service} services.',
    'sms.specifically': ' Specifically: {details}.',
    'sms.notes': ' Additional Details: {notes}',

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
    'area.desc': 'Primarily serving Houston, Texas and all surrounding counties — but Marlon travels far, even hours away, for extended road trips to outlying municipalities across East and Southeast Texas.',

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
    'ba.info.title': 'Craftsmanship That Speaks For Itself',
    'ba.info.p1': "Whether you have a rusted, heavy door with snapped tension springs or want a modern insulated aluminum design to elevate your home's aesthetics, Marlon delivers clean, durable craftsmanship.",
    'ba.info.p2': 'From single-family homes to storefronts, warehouses, and apartment complexes, Marlon sources premium-grade steel springs (rated for 20,000+ cycles) and high-quality LiftMaster openers to keep any door running smoothly for years.',
    'ba.stat.rating': 'Client Rating',
    'ba.stat.response.num': 'Same-Day',
    'ba.stat.response': 'Response Time',

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
    'services.title': '<span>Servicios de Garaje</span> Profesionales',
    'services.subtitle': 'Marlon se encarga de todo, desde instalaciones estructurales completas hasta reparaciones mecánicas complejas y mantenimiento general. Ningún trabajo es demasiado grande o pequeño.',
    'svc.install.title': 'Instalación y Mejoras',
    'svc.install.desc': 'Mejore la apariencia y la seguridad de su hogar con puertas de garaje y motores modernos de alto rendimiento.',
    'svc.install.li1': 'Puertas personalizadas de acero, vidrio y madera',
    'svc.install.li2': 'Motores inteligentes con Wi-Fi',
    'svc.install.li3': 'Teclados sin llave y programación de controles',
    'svc.install.li4': 'Instalación de sistemas de riel de alta resistencia',
    'svc.repair.title': 'Reparaciones y Diagnóstico',
    'svc.repair.desc': 'Diagnóstico rápido y solución de cualquier falla mecánica o eléctrica. Servicio de emergencia disponible el mismo día.',
    'svc.repair.li1': 'Reemplazo de resortes de torsión rotos',
    'svc.repair.li2': 'Reparación de cables de acero rotos',
    'svc.repair.li3': 'Alineación y reajuste de puertas descarriladas',
    'svc.repair.li4': 'Reconstrucción de motores y engranajes',
    'svc.maint.title': 'Inspecciones y Mantenimiento',
    'svc.maint.desc': 'Programas de mantenimiento preventivo que silencian las puertas ruidosas y extienden la vida útil de los componentes estructurales.',
    'svc.maint.li1': 'Auditoría estructural completa de 25 puntos',
    'svc.maint.li2': 'Lubricación profesional de resortes y rieles',
    'svc.maint.li3': 'Calibración del balance de tensión',
    'svc.maint.li4': 'Alineación y revisión de sensores de seguridad',
    'svc.configure': 'Configurar Cotización →',

    'quote.badge': 'Sin Cargos Ocultos',
    'quote.title': '<span>Planificador de Cotización</span> Interactivo',
    'quote.subtitle': 'Como cada trabajo de puerta de garaje es único, Marlon cotiza según su situación específica. Use este planificador para seleccionar lo que necesita y llamar o enviar un mensaje al instante con los detalles.',
    'quote.step1.title': '1. Seleccione la Categoría de Servicio',
    'quote.step1.desc': 'Elija el tipo general de servicio que necesita:',
    'quote.radio.install': 'Instalación',
    'quote.radio.repair': 'Reparación',
    'quote.radio.maint': 'Mantenimiento',
    'quote.step3.title': '2. Proporcione Sus Datos',
    'quote.step3.desc': 'Agregue su nombre y número de teléfono para que Marlon pueda atender su solicitud correctamente:',
    'quote.label.name': 'Su Nombre',
    'quote.ph.name': 'Cliente de Marlon',
    'quote.err.name': 'Por favor ingrese su nombre.',
    'quote.label.phone': 'Número de Teléfono (Para llamada/mensaje)',
    'quote.err.phone': 'Por favor ingrese un número de teléfono válido.',
    'quote.label.notes': 'Detalles Adicionales / Ubicación del Proyecto (Opcional)',
    'quote.ph.notes': "Describa cualquier solicitud específica, ej.: 'Puerta para dos autos, el motor hace un ruido de clic, ubicada en Katy TX'",
    'quote.output.title': 'Detalles de Su Mensaje',
    'quote.optionA.title': 'Opción A: Llamar a Marlon (Respuesta Más Rápida)',
    'quote.optionA.desc': 'Marlon trabaja en el campo — llamarlo directamente es la forma más rápida de contactarlo y obtener una cotización rápida por teléfono.',
    'quote.optionA.btn': 'Llamar al 409-934-2301 Ahora',
    'quote.optionB.title': 'Opción B: Enviar Sus Detalles por Mensaje',
    'quote.optionB.desc': '¿Prefiere enviar un mensaje? Envíe este mensaje ya preparado con los detalles de su proyecto y Marlon le responderá lo antes posible.',
    'quote.optionB.btn': 'Enviar Mensaje a Marlon',

    'optTitle.installation': 'Seleccione los Servicios de Instalación:',
    'optTitle.repair': '¿Qué problemas está experimentando?',
    'optTitle.maintenance': 'Seleccione los Servicios de Mantenimiento:',

    'opt.install.door': 'Nueva Puerta de Garaje Personalizada',
    'opt.install.opener': 'Instalación de Nuevo Motor Automático',
    'opt.install.spring': 'Sistema de Resortes de Torsión/Extensión',
    'opt.install.keypad': 'Teclado de Acceso sin Llave y Controles',
    'opt.install.sensors': 'Instalación de Sensores de Seguridad',
    'opt.repair.spring': 'Reemplazo de Resortes Rotos (La puerta pesa/no sube)',
    'opt.repair.cables': 'Reemplazo de Cables Desgastados/Rotos',
    'opt.repair.track': 'Realinear Puerta de Garaje Descarrilada',
    'opt.repair.opener': 'Diagnóstico del Motor (El motor zumba, la puerta no se mueve)',
    'opt.repair.rollers': 'Reemplazo de Rodillos Desgastados/Ruidosos',
    'opt.repair.panel': 'Reparación de Panel o Lámina Dañada',
    'opt.maint.inspection': 'Inspección de Seguridad Completa de 25 Puntos',
    'opt.maint.lube': 'Lubricación de Alto Rendimiento de Rodillos/Resortes',
    'opt.maint.tighten': 'Ajuste de Tornillos y Bisagras Estructurales',
    'opt.maint.balance': 'Calibración del Balance y la Tensión de la Puerta',

    'service.installation': 'Instalación',
    'service.repair': 'Reparación',
    'service.maintenance': 'Mantenimiento',
    'service.generic': 'garaje',
    'sms.defaultName': 'Cliente Estimado',
    'sms.greeting': '¡Hola Marlon! Me llamo {name}. Necesito una cotización para servicios de {service}.',
    'sms.specifically': ' Específicamente: {details}.',
    'sms.notes': ' Detalles adicionales: {notes}',

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
    'area.desc': 'Atiende principalmente Houston, Texas y todos los condados cercanos, pero Marlon viaja lejos, incluso a horas de distancia, para realizar viajes largos a municipios remotos en el este y sureste de Texas.',

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
    'ba.info.title': 'Trabajo Que Habla Por Sí Mismo',
    'ba.info.p1': 'Ya sea que tenga una puerta pesada y oxidada con resortes de tensión rotos o quiera un diseño moderno de aluminio aislado para realzar la estética de su hogar, Marlon ofrece un trabajo limpio y duradero.',
    'ba.info.p2': 'Desde casas unifamiliares hasta locales comerciales, bodegas y complejos de apartamentos, Marlon usa resortes de acero de grado premium (clasificados para más de 20,000 ciclos) y motores LiftMaster de alta calidad para mantener cualquier puerta funcionando sin problemas durante años.',
    'ba.stat.rating': 'Calificación de Clientes',
    'ba.stat.response.num': 'El Mismo Día',
    'ba.stat.response': 'Tiempo de Respuesta',

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
    lbImg.src = img.currentSrc || img.src;
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

/**
 * 4. Interactive Quote Request Planner
 */
function initQuotePlanner() {
  const plannerForm = document.getElementById('quote-planner-form');
  if (!plannerForm) return;

  const serviceRadios = plannerForm.querySelectorAll('input[name="service_type"]');
  const optionsTitle = document.getElementById('options-title');
  const detailsGrid = document.getElementById('details-grid');

  // Output block elements
  const quoteOutput = document.getElementById('quote-output');
  const summaryContent = document.getElementById('summary-content');
  const textCta = document.getElementById('text-cta');
  const callCta = document.getElementById('call-cta');

  // Defined details options map. Each option carries a stable id (used to
  // preserve selection across language switches) and an i18n key whose
  // translated label becomes both the visible text and the SMS value.
  const detailsMap = {
    installation: [
      { id: 'opt_new_door', key: 'opt.install.door' },
      { id: 'opt_opener', key: 'opt.install.opener' },
      { id: 'opt_spring_system', key: 'opt.install.spring' },
      { id: 'opt_keypad', key: 'opt.install.keypad' },
      { id: 'opt_sensors', key: 'opt.install.sensors' }
    ],
    repair: [
      { id: 'opt_broken_spring', key: 'opt.repair.spring' },
      { id: 'opt_cables', key: 'opt.repair.cables' },
      { id: 'opt_track', key: 'opt.repair.track' },
      { id: 'opt_opener_repair', key: 'opt.repair.opener' },
      { id: 'opt_rollers', key: 'opt.repair.rollers' },
      { id: 'opt_panel', key: 'opt.repair.panel' }
    ],
    maintenance: [
      { id: 'opt_inspection', key: 'opt.maint.inspection' },
      { id: 'opt_lube', key: 'opt.maint.lube' },
      { id: 'opt_tighten', key: 'opt.maint.tighten' },
      { id: 'opt_balance', key: 'opt.maint.balance' }
    ]
  };

  // 4a. Update dynamic sub-options when service category changes.
  // checkedIds lets us repaint in a new language while keeping selections.
  const updateSubOptions = (serviceType, checkedIds = []) => {
    detailsGrid.innerHTML = '';
    const options = detailsMap[serviceType] || [];

    optionsTitle.textContent = t('optTitle.' + serviceType);

    options.forEach(opt => {
      const label = t(opt.key);
      const checkboxCard = document.createElement('div');
      checkboxCard.className = 'checkbox-option';
      checkboxCard.innerHTML = `
        <input type="checkbox" id="${opt.id}" name="service_details" value="${label.replace(/"/g, '&quot;')}" ${checkedIds.includes(opt.id) ? 'checked' : ''}>
        <label for="${opt.id}" class="checkbox-card">
          <div class="checkbox-indicator">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="checkbox-label">${label}</span>
        </label>
      `;
      detailsGrid.appendChild(checkboxCard);
    });

    // Re-attach change event listener to newly created checkboxes to update summary live
    const checkboxes = detailsGrid.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', generateLiveSummary));
  };

  // 4b. Generate the live output summary and pre-filled message links
  const generateLiveSummary = () => {
    const nameInput = document.getElementById('client_name');
    const phoneInput = document.getElementById('client_phone');
    const serviceRadio = plannerForm.querySelector('input[name="service_type"]:checked');
    const checkedDetails = Array.from(plannerForm.querySelectorAll('input[name="service_details"]:checked')).map(cb => cb.value);
    const notesInput = document.getElementById('client_notes');

    const name = nameInput.value.trim() || t('sms.defaultName');
    const serviceType = serviceRadio ? serviceRadio.value : null;
    const notes = notesInput.value.trim();

    // Localized service name
    const serviceName = serviceType ? t('service.' + serviceType) : t('service.generic');

    // Build the descriptive summary text from localized templates
    let summaryText = fillTemplate(t('sms.greeting'), { name, service: serviceName });
    if (checkedDetails.length > 0) {
      summaryText += fillTemplate(t('sms.specifically'), { details: checkedDetails.join(', ') });
    }
    if (notes) {
      summaryText += fillTemplate(t('sms.notes'), { notes });
    }

    // Display summary on screen
    summaryContent.textContent = summaryText;

    // Build the SMS link (handling iOS vs Android separator)
    const smsNumber = '4099342301'; // Clean number for link
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const smsSeparator = isIOS ? '&' : '?';

    // Create text message URI
    const smsUrl = `sms:+1${smsNumber}${smsSeparator}body=${encodeURIComponent(summaryText)}`;
    textCta.href = smsUrl;

    // Create call URL with dynamic details (just click to call Marlon)
    callCta.href = `tel:+14099342301`;
  };

  // Helper: current service type and checked option ids
  const getCurrentServiceType = () => {
    const radio = plannerForm.querySelector('input[name="service_type"]:checked');
    return radio ? radio.value : 'repair';
  };
  const getCheckedIds = () => Array.from(detailsGrid.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);

  // Event Listeners for quote planner inputs
  serviceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateSubOptions(e.target.value);
      generateLiveSummary();
    });
  });

  // Track keyup/change on input fields to update summary live
  const textInputs = plannerForm.querySelectorAll('input[type="text"], input[type="tel"], textarea');
  textInputs.forEach(input => {
    input.addEventListener('input', generateLiveSummary);
  });

  // Re-render the dynamic parts (option labels + summary) when language changes,
  // preserving the user's current selections.
  document.addEventListener('langchange', () => {
    updateSubOptions(getCurrentServiceType(), getCheckedIds());
    generateLiveSummary();
  });

  // Initialize with the currently checked radio (defaults to 'repair')
  const defaultChecked = plannerForm.querySelector('input[name="service_type"]:checked');
  if (defaultChecked) {
    updateSubOptions(defaultChecked.value);
  } else {
    const repairRadio = document.getElementById('srv_repair');
    if (repairRadio) {
      repairRadio.checked = true;
      updateSubOptions('repair');
    }
  }
  generateLiveSummary();

  // Prevent form submission redirect, handle it by revealing the lead output
  plannerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (plannerForm.checkValidity()) {
      quoteOutput.scrollIntoView({ behavior: 'smooth' });
    }
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
