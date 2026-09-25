/**
 * Datos iniciales y catálogo comercial para BS EventFlow
 * Propuesta demostrativa: La Antigua Eventos (Reynosa, Tamaulipas)
 */

export const initialBusinessData = {
  name: "La Antigua Eventos",
  brandShort: "La Antigua",
  category: "Salón y Jardín de Eventos",
  tagline: "Tu fecha. Tu celebración. Tu momento.",
  city: "Reynosa, Tamaulipas",
  phone: "8991055896",
  phoneFormatted: "899 105 5896",
  whatsappUrl: "https://wa.me/528991055896",
  instagram: "laantiguaeventos",
  instagramUrl: "https://instagram.com/laantiguaeventos",
  email: "contacto@laantigua.demo",
  heroTitle: "Tu fecha.\nTu celebración.\nTu momento.",
  heroSubtitle: "Consulta disponibilidad, explora opciones y comienza a organizar tu evento de una manera sencilla.",
  conceptText: "CONSULTA TU FECHA + COTIZA + APARTA + ORGANIZA TU EVENTO",
  disclaimer: "Paquetes, precios, disponibilidad e imágenes mostrados con fines demostrativos. La versión final puede adaptarse a la operación real de La Antigua Eventos.",
  footerNote: "Propuesta comercial demostrativa desarrollada por BS Code para La Antigua Eventos."
};

export const initialPackagesData = [
  {
    id: "esencial",
    name: "Esencial",
    badge: "Celebraciones Íntimas",
    popular: false,
    priceFrom: "Desde $15,000 MXN",
    priceNumber: 15000,
    baseGuests: 80,
    extraGuestPrice: 160,
    capacity: "Celebraciones íntimas (hasta 100 personas)",
    description: "Ideal para celebraciones íntimas. Incluye renta del espacio, mobiliario, montaje base y servicio básico.",
    includes: [
      "Renta del espacio climatizado y jardines (5 horas continuas)",
      "Mobiliario completo con mesas redondas y sillas vestidas",
      "Montaje base con mantelería en tonalidades neutras",
      "Servicio básico de atención y personal de apoyo en salón",
      "Uso de áreas de sesión fotográfica y estacionamiento",
      "Servicio de hielo y refresco ilimitado demostrativo"
    ],
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  },
  {
    id: "celebracion",
    name: "Celebración",
    badge: "El Más Popular",
    popular: true,
    priceFrom: "Desde $25,000 MXN",
    priceNumber: 25000,
    baseGuests: 120,
    extraGuestPrice: 200,
    capacity: "80 - 180 invitados",
    description: "Propuesta completa y versátil para bodas y XV años: espacio, mobiliario, montaje, decoración base, servicio y bebidas.",
    includes: [
      "Renta del espacio exclusivo para tu evento (6 horas continuas)",
      "Mobiliario de diseño con sillas tipo Tiffany o Crossback",
      "Montaje y mantelería fina texturizada en colores a elegir",
      "Decoración base en mesa principal y centros de mesa",
      "Personal de servicio completo y capitán de meseros",
      "Servicio de bebidas, refresco ilimitado, hielo y descorche",
      "Sistema de sonido ambiental e iluminación cálida"
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  },
  {
    id: "experiencia",
    name: "Experiencia",
    badge: "Gala Exclusiva",
    popular: false,
    priceFrom: "Desde $38,000 MXN",
    priceNumber: 38000,
    baseGuests: 150,
    extraGuestPrice: 250,
    capacity: "120 - 300+ invitados",
    description: "La propuesta premium para celebraciones inolvidables: espacio, montaje especial, decoración, servicio, bebidas, coordinación y extras.",
    includes: [
      "Renta del espacio de gala con tiempo extendido (7 horas continuas)",
      "Montaje especial de gala con mobiliario imperial y salas lounge",
      "Decoración floral de autor en arco de acceso y mesa de honor",
      "Servicio integral de meseros calificados y atención personalizada",
      "Servicio de bebidas premium, hielo ilimitado y cristalería fina",
      "Coordinación ejecutiva del evento durante toda la celebración",
      "Audio profesional con DJ en vivo e iluminación robótica de pista",
      "Extras de cortesía y amenidades para recepción y protocolo"
    ],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  },
  {
    id: "renta-espacio",
    name: "Renta del espacio",
    badge: "Solo Instalaciones",
    popular: false,
    priceFrom: "Desde $10,000 MXN",
    priceNumber: 10000,
    baseGuests: 80,
    extraGuestPrice: 100,
    capacity: "Hasta 250 personas",
    description: "Renta exclusiva de las instalaciones de La Antigua para coordinar tus propios proveedores y montaje a tu gusto.",
    includes: [
      "Uso exclusivo del salón y áreas verdes por 5 horas de evento",
      "Tiempo adicional previo para montaje y proveedores externos",
      "Climatización integral, sanitarios de gala y estacionamiento",
      "Mobiliario base de salón disponible para distribución",
      "Personal de mantenimiento y accesos durante el evento"
    ],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  }
];

export const initialExtrasData = [
  {
    id: "decoracion-especial",
    name: "Decoración especial",
    price: 4500,
    description: "Diseño floral elevado de autor, senderos de velas y arco ceremonial escénico",
    category: "Decoración"
  },
  {
    id: "mesa-postres",
    name: "Mesa de postres",
    price: 3800,
    description: "Estación de repostería fina, tartaletas, mini postres gourmet y montaje de gala",
    category: "Gastronomía"
  },
  {
    id: "bebidas",
    name: "Bebidas",
    price: 3200,
    description: "Barra de cócteles de bienvenida, mixología sin alcohol y cristalería de gala",
    category: "Bebidas"
  },
  {
    id: "audio-iluminacion",
    name: "Audio e iluminación",
    price: 5500,
    description: "Estructuras truss, cabezas robóticas beam, chisperos de pirotecnia fría y sonido de alta fidelidad",
    category: "Producción"
  },
  {
    id: "dj",
    name: "DJ",
    price: 4000,
    description: "DJ profesional en vivo con repertorio personalizado para toda la noche",
    category: "Música"
  },
  {
    id: "fotografia",
    name: "Fotografía",
    price: 5000,
    description: "Cobertura completa de protocolo y recepción con galería digital HD privada",
    category: "Foto y video"
  },
  {
    id: "video",
    name: "Video",
    price: 6500,
    description: "Resumen cinematográfico en 4K, tomas aéreas y teaser listo para redes sociales",
    category: "Foto y video"
  },
  {
    id: "mobiliario-especial",
    name: "Mobiliario especial",
    price: 3500,
    description: "Salas lounge contemporáneas, periqueras de cóctel y mesa de honor imperial",
    category: "Mobiliario"
  },
  {
    id: "personal-adicional",
    name: "Personal adicional",
    price: 2500,
    description: "Hostess bilingüe de bienvenida, meseros de refuerzo y apoyo logístico continuo",
    category: "Coordinación"
  }
];

export const eventTypesList = [
  {
    id: "boda",
    name: "Boda",
    subtitle: "Ceremonia, recepción nupcial y cena romántica",
    icon: "HeartIcon",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  },
  {
    id: "xv-anos",
    name: "XV años",
    subtitle: "Recepción de gala, vals, protocolo y ambientación moderna",
    icon: "SparklesIcon",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  },
  {
    id: "cumpleanos",
    name: "Cumpleaños",
    subtitle: "Celebraciones familiares, fiestas temáticas y cenas especiales",
    icon: "GiftIcon",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80",
    popularPackage: "esencial"
  },
  {
    id: "graduacion",
    name: "Graduación",
    subtitle: "Galas de generación, brindis y cenas de celebración",
    icon: "AcademicIcon",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  },
  {
    id: "aniversario",
    name: "Aniversario",
    subtitle: "Bodas de plata, oro y homenajes familiares entrañables",
    icon: "HeartIcon",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80",
    popularPackage: "esencial"
  },
  {
    id: "corporativo",
    name: "Evento corporativo",
    subtitle: "Cenas de fin de año, congresos, galas y reconocimientos",
    icon: "BriefcaseIcon",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80",
    popularPackage: "experiencia"
  },
  {
    id: "evento-privado",
    name: "Evento privado",
    subtitle: "Cenas íntimas, recepciones VIP y reuniones exclusivas",
    icon: "StarIcon",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=700&q=80",
    popularPackage: "esencial"
  },
  {
    id: "otro",
    name: "Otro",
    subtitle: "Cualquier celebración especial personalizada",
    icon: "SparklesIcon",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  }
];

// Fechas demo dinámicas relativas para que siempre se vean vigentes
const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const initialRequestsData = [
  {
    id: "req-121",
    folio: "ANT-000121",
    clientName: "Mariana Garza Villarreal",
    clientPhone: "8999234512",
    clientEmail: "mariana.garza@gmail.com",
    cityZone: "Col. Las Fuentes / Reynosa",
    eventType: "Boda",
    guests: 180,
    packageId: "experiencia",
    packageName: "Experiencia",
    packageBasePrice: 38000,
    extras: ["audio-iluminacion", "fotografia", "bebidas"],
    extrasTotal: 13700,
    estimatedTotal: 59200,
    suggestedDeposit: 5000,
    date: getOffsetDate(18),
    status: "Nueva",
    comments: "Boda de noche con 180 invitados. Nos interesa prueba de iluminación y ambientación romántica.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "req-122",
    folio: "ANT-000122",
    clientName: "Ing. Carlos Martínez Cantú",
    clientPhone: "8991204891",
    clientEmail: "carlos.martinez@corporativo.com",
    cityZone: "Fracc. Anzaldúas / Reynosa",
    eventType: "Evento corporativo",
    guests: 150,
    packageId: "celebracion",
    packageName: "Celebración",
    packageBasePrice: 25000,
    extras: ["audio-iluminacion", "dj"],
    extrasTotal: 9500,
    estimatedTotal: 40500,
    suggestedDeposit: 5000,
    date: getOffsetDate(24),
    status: "Contactado",
    comments: "Cena de fin de año con entrega de reconocimientos. Requerimos micrófonos y factura.",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "req-123",
    folio: "ANT-000123",
    clientName: "Andrea Rodríguez Morales",
    clientPhone: "8993456789",
    clientEmail: "andrea.rodriguez@gmail.com",
    cityZone: "Zona Ribereña / Reynosa",
    eventType: "XV años",
    guests: 140,
    packageId: "celebracion",
    packageName: "Celebración",
    packageBasePrice: 25000,
    extras: ["decoracion-especial", "video", "mesa-postres"],
    extrasTotal: 14800,
    estimatedTotal: 43800,
    suggestedDeposit: 5000,
    date: getOffsetDate(35),
    status: "Cotizando",
    comments: "Recepción de XV años temática romántica moderna. Interesa video cinemático y mesa de postres.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: "req-124",
    folio: "ANT-000124",
    clientName: "Dr. José Hernández Treviño",
    clientPhone: "8997891234",
    clientEmail: "jose.hernandez@hospital.com",
    cityZone: "Col. Los Doctores / Reynosa",
    eventType: "Aniversario",
    guests: 90,
    packageId: "esencial",
    packageName: "Esencial",
    packageBasePrice: 15000,
    extras: ["bebidas", "mobiliario-especial"],
    extrasTotal: 6700,
    estimatedTotal: 23300,
    suggestedDeposit: 5000,
    date: getOffsetDate(12),
    status: "Esperando anticipo",
    comments: "Bodas de Plata familiares con montaje distinguido y música ambiental selecta.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    id: "req-125",
    folio: "ANT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    clientEmail: "fernanda.lopez@uanl.edu",
    cityZone: "Jarachina Norte / Reynosa",
    eventType: "Graduación",
    guests: 160,
    packageId: "celebracion",
    packageName: "Celebración",
    packageBasePrice: 25000,
    extras: ["audio-iluminacion", "dj"],
    extrasTotal: 9500,
    estimatedTotal: 42500,
    suggestedDeposit: 5000,
    date: getOffsetDate(42),
    status: "Confirmada",
    comments: "Gala de graduación universitaria. Anticipo demo cubierto y fecha reservada.",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

export const initialQuotesData = [
  {
    id: "q-121",
    folio: "ANT-000121",
    clientName: "Mariana Garza Villarreal",
    clientEmail: "mariana.garza@gmail.com",
    eventType: "Boda",
    packageName: "Experiencia",
    guests: 180,
    total: 59200,
    date: getOffsetDate(18),
    status: "Enviada",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: "q-122",
    folio: "ANT-000122",
    clientName: "Ing. Carlos Martínez Cantú",
    clientEmail: "carlos.martinez@corporativo.com",
    eventType: "Evento corporativo",
    packageName: "Celebración",
    guests: 150,
    total: 40500,
    date: getOffsetDate(24),
    status: "Borrador",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "q-123",
    folio: "ANT-000123",
    clientName: "Andrea Rodríguez Morales",
    clientEmail: "andrea.rodriguez@gmail.com",
    eventType: "XV años",
    packageName: "Celebración",
    guests: 140,
    total: 43800,
    date: getOffsetDate(35),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  },
  {
    id: "q-124",
    folio: "ANT-000124",
    clientName: "Dr. José Hernández Treviño",
    clientEmail: "jose.hernandez@hospital.com",
    eventType: "Aniversario",
    packageName: "Esencial",
    guests: 90,
    total: 23300,
    date: getOffsetDate(12),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },
  {
    id: "q-125",
    folio: "ANT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientEmail: "fernanda.lopez@uanl.edu",
    eventType: "Graduación",
    packageName: "Celebración",
    guests: 160,
    total: 42500,
    date: getOffsetDate(42),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 90).toISOString()
  }
];

export const initialEventsData = [
  {
    id: "evt-125",
    folio: "ANT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    eventType: "Graduación",
    date: getOffsetDate(42),
    guests: 160,
    total: 42500,
    paid: 10000,
    balance: 32500,
    status: "Confirmado",
    packageName: "Celebración",
    zone: "Jarachina Norte / Reynosa"
  },
  {
    id: "evt-118",
    folio: "ANT-000118",
    clientName: "Daniel Ramírez Chapa",
    clientPhone: "8998901234",
    eventType: "Boda",
    date: getOffsetDate(8),
    guests: 150,
    total: 48000,
    paid: 20000,
    balance: 28000,
    status: "En preparación",
    packageName: "Celebración",
    zone: "Río Bravo / Conurbada"
  },
  {
    id: "evt-115",
    folio: "ANT-000115",
    clientName: "Mariana Garza Villarreal",
    clientPhone: "8999234512",
    eventType: "Evento privado",
    date: getOffsetDate(2),
    guests: 80,
    total: 22000,
    paid: 22000,
    balance: 0,
    status: "Confirmado",
    packageName: "Esencial",
    zone: "Col. Del Prado / Reynosa"
  },
  {
    id: "evt-110",
    folio: "ANT-000110",
    clientName: "Ing. Carlos Martínez Cantú",
    clientPhone: "8991204891",
    eventType: "Evento corporativo",
    date: getOffsetDate(-10),
    guests: 130,
    total: 35000,
    paid: 35000,
    balance: 0,
    status: "Realizado",
    packageName: "Celebración",
    zone: "Reynosa Centro"
  }
];

export const initialClientsData = [
  {
    id: "cli-1",
    name: "Mariana Garza Villarreal",
    phone: "8999234512",
    email: "mariana.garza@gmail.com",
    eventsCount: 2,
    lastRequestDate: getOffsetDate(18),
    estimatedTotal: "$81,200 MXN",
    status: "Activo"
  },
  {
    id: "cli-2",
    name: "Ing. Carlos Martínez Cantú",
    phone: "8991204891",
    email: "carlos.martinez@corporativo.com",
    eventsCount: 2,
    lastRequestDate: getOffsetDate(24),
    estimatedTotal: "$75,500 MXN",
    status: "Activo"
  },
  {
    id: "cli-3",
    name: "Andrea Rodríguez Morales",
    phone: "8993456789",
    email: "andrea.rodriguez@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(35),
    estimatedTotal: "$43,800 MXN",
    status: "Cotizando"
  },
  {
    id: "cli-4",
    name: "Dr. José Hernández Treviño",
    phone: "8997891234",
    email: "jose.hernandez@hospital.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(12),
    estimatedTotal: "$23,300 MXN",
    status: "Esperando anticipo"
  },
  {
    id: "cli-5",
    name: "Lic. Fernanda López Salinas",
    phone: "8995678901",
    email: "fernanda.lopez@uanl.edu",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(42),
    estimatedTotal: "$42,500 MXN",
    status: "Confirmado"
  },
  {
    id: "cli-6",
    name: "Daniel Ramírez Chapa",
    phone: "8998901234",
    email: "daniel.ramirez@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(8),
    estimatedTotal: "$48,000 MXN",
    status: "Confirmado"
  }
];

export const initialPaymentsData = [
  {
    id: "pay-1",
    folio: "ANT-000125",
    clientName: "Lic. Fernanda López Salinas",
    eventType: "Graduación",
    concept: "Anticipo",
    amount: 10000,
    method: "Transferencia demo",
    date: getOffsetDate(-3),
    status: "Pagado"
  },
  {
    id: "pay-2",
    folio: "ANT-000118",
    clientName: "Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Anticipo",
    amount: 10000,
    method: "Tarjeta demo",
    date: getOffsetDate(-15),
    status: "Pagado"
  },
  {
    id: "pay-3",
    folio: "ANT-000118",
    clientName: "Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Segundo pago",
    amount: 10000,
    method: "Transferencia demo",
    date: getOffsetDate(-2),
    status: "Pagado"
  },
  {
    id: "pay-4",
    folio: "ANT-000115",
    clientName: "Mariana Garza Villarreal",
    eventType: "Evento privado",
    concept: "Liquidación",
    amount: 22000,
    method: "Transferencia demo",
    date: getOffsetDate(-1),
    status: "Pagado"
  },
  {
    id: "pay-5",
    folio: "ANT-000124",
    clientName: "Dr. José Hernández Treviño",
    eventType: "Aniversario",
    concept: "Anticipo",
    amount: 5000,
    method: "Tarjeta demo",
    date: getOffsetDate(1),
    status: "Pendiente"
  }
];

// Mapa de disponibilidad demostrativa mensual con 4 estados oficiales:
// - "disponible" (Disponible)
// - "limitada" (Disponibilidad limitada)
// - "proceso" (En proceso)
// - "apartada" (Apartada)
export const mockAvailabilityMap = {
  [getOffsetDate(2)]: "apartada",
  [getOffsetDate(5)]: "disponible",
  [getOffsetDate(6)]: "limitada",
  [getOffsetDate(8)]: "apartada",
  [getOffsetDate(10)]: "limitada",
  [getOffsetDate(12)]: "proceso",
  [getOffsetDate(13)]: "disponible",
  [getOffsetDate(14)]: "disponible",
  [getOffsetDate(18)]: "proceso",
  [getOffsetDate(19)]: "limitada",
  [getOffsetDate(20)]: "disponible",
  [getOffsetDate(24)]: "proceso",
  [getOffsetDate(25)]: "disponible",
  [getOffsetDate(26)]: "disponible",
  [getOffsetDate(27)]: "limitada",
  [getOffsetDate(35)]: "proceso",
  [getOffsetDate(42)]: "apartada"
};

/**
 * Obtiene el estado de disponibilidad oficial para cualquier fecha ISO (YYYY-MM-DD)
 * 4 Estados: "disponible", "limitada", "proceso", "apartada"
 */
export const getDateAvailabilityStatus = (dateStr) => {
  if (!dateStr) return "disponible";
  if (mockAvailabilityMap[dateStr]) return mockAvailabilityMap[dateStr];

  // Algoritmo determinístico para días no explícitos en el mapa inicial
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return "disponible";
  const [year, month, day] = parts;
  const hash = (year * 372 + month * 31 + day) % 11;
  if (hash === 0 || hash === 7) return "apartada";
  if (hash === 2 || hash === 5) return "limitada";
  if (hash === 3) return "proceso";
  return "disponible";
};

