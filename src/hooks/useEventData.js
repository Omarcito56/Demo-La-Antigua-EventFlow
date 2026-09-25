import { useState, useEffect, useCallback } from "react";
import {
  initialBusinessData,
  initialPackagesData,
  initialRequestsData,
  initialQuotesData,
  initialEventsData,
  initialClientsData,
  initialPaymentsData
} from "../data/eventFlowData";
import { trackEvent } from "../analytics/analytics";

const STORAGE_KEYS = {
  BUSINESS: "eventflow_business",
  PACKAGES: "eventflow_packages",
  REQUESTS: "eventflow_requests",
  QUOTES: "eventflow_quotes",
  EVENTS: "eventflow_events",
  CLIENTS: "eventflow_clients",
  PAYMENTS: "eventflow_payments",
  CALENDAR_OVERRIDES: "eventflow_calendar_overrides",
  AUTH: "eventflow_auth",
  DATA_VERSION: "eventflow_version_antigua_v3_pricing"
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error leyendo ${key} de localStorage:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("eventflow_storage_updated"));
  } catch (e) {
    console.error(`Error guardando ${key} en localStorage:`, e);
  }
};

// Validador de integridad para asegurar que el catálogo tenga todos los paquetes de La Antigua
const isValidAntiguaCatalog = (pkgs) => {
  if (!Array.isArray(pkgs) || pkgs.length < 3) return false;
  const hasEsencial = pkgs.some(p => p.id === "esencial");
  const hasCelebracion = pkgs.some(p => p.id === "celebracion");
  const hasExperiencia = pkgs.some(p => p.id === "experiencia");
  return hasEsencial && hasCelebracion && hasExperiencia;
};

export const useEventData = () => {
  const [business, setBusiness] = useState(() => getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
  const [packages, setPackages] = useState(() => {
    const stored = getStored(STORAGE_KEYS.PACKAGES, initialPackagesData);
    if (!isValidAntiguaCatalog(stored)) {
      try {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackagesData));
      } catch (err) {}
      return initialPackagesData;
    }
    return stored;
  });
  const [requests, setRequests] = useState(() => getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
  const [quotes, setQuotes] = useState(() => getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
  const [events, setEvents] = useState(() => getStored(STORAGE_KEYS.EVENTS, initialEventsData));
  const [clients, setClients] = useState(() => getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
  const [payments, setPayments] = useState(() => getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));
  const [calendarOverrides, setCalendarOverrides] = useState(() => getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {}));

  const refreshFromStorage = useCallback(() => {
    // Verificar inicialización limpia de datos para La Antigua Eventos con control de versión
    const storedBus = getStored(STORAGE_KEYS.BUSINESS, null);
    const storedPkgs = getStored(STORAGE_KEYS.PACKAGES, []);
    const storedVer = localStorage.getItem(STORAGE_KEYS.DATA_VERSION);
    
    const isOldData = !storedBus || 
      !storedBus.name || 
      !storedBus.name.includes("Antigua") || 
      !isValidAntiguaCatalog(storedPkgs) ||
      storedVer !== "3.0";

    if (isOldData) {
      localStorage.setItem(STORAGE_KEYS.DATA_VERSION, "3.0");
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackagesData));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
      localStorage.setItem(STORAGE_KEYS.CALENDAR_OVERRIDES, JSON.stringify({}));
    }

    setBusiness(getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
    setPackages(getStored(STORAGE_KEYS.PACKAGES, initialPackagesData));
    setRequests(getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
    setQuotes(getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
    setEvents(getStored(STORAGE_KEYS.EVENTS, initialEventsData));
    setClients(getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
    setPayments(getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));
    setCalendarOverrides(getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {}));
  }, []);


  useEffect(() => {
    const handleStorageChange = () => {
      refreshFromStorage();
    };

    window.addEventListener("eventflow_storage_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("eventflow_storage_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshFromStorage]);

  /**
   * Crea una nueva solicitud desde la web pública con folio correlativo ANT-000126+
   */
  const createRequest = (formData) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentClients = getStored(STORAGE_KEYS.CLIENTS, initialClientsData);
    const currentQuotes = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);

    // Calcular siguiente folio secuencial ANT-
    let nextNum = 126;
    currentRequests.forEach((req) => {
      if (req.folio && req.folio.startsWith("ANT-")) {
        const numPart = parseInt(req.folio.replace("ANT-", ""), 10);
        if (!isNaN(numPart) && numPart >= nextNum) {
          nextNum = numPart + 1;
        }
      }
    });

    const paddedNum = String(nextNum).padStart(6, "0");
    const folio = `ANT-${paddedNum}`;

    const newRequest = {
      id: `req-${Date.now()}`,
      folio,
      clientName: formData.clientName || "Cliente Demo",
      clientPhone: formData.clientPhone || "",
      clientEmail: formData.clientEmail || "",
      cityZone: formData.cityZone || "Reynosa, Tamaulipas",
      eventType: formData.eventType || "Boda",
      guests: Number(formData.guests) || 120,
      packageId: formData.packageId || "celebracion",
      packageName: formData.packageName || "Celebración",
      packageBasePrice: Number(formData.packageBasePrice) || 25000,
      extras: formData.extras || [],
      extrasTotal: Number(formData.extrasTotal) || 0,
      estimatedTotal: Number(formData.estimatedTotal) || 25000,
      suggestedDeposit: Number(formData.suggestedDeposit) || 5000,
      date: formData.date || new Date().toISOString().split("T")[0],
      status: "Nueva",
      comments: formData.comments || "",
      createdAt: new Date().toISOString()
    };

    const updatedRequests = [newRequest, ...currentRequests];
    setStored(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Crear/actualizar cliente demo
    const clientPhone = formData.clientPhone || "";
    const clientEmail = (formData.clientEmail || "").toLowerCase();
    const existingIndex = currentClients.findIndex(
      (c) => (clientPhone && c.phone === clientPhone) || (clientEmail && c.email.toLowerCase() === clientEmail)
    );

    let updatedClients = [...currentClients];
    if (existingIndex >= 0) {
      updatedClients[existingIndex] = {
        ...updatedClients[existingIndex],
        eventsCount: (updatedClients[existingIndex].eventsCount || 1) + 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Activo"
      };
    } else {
      const newClient = {
        id: `cli-${Date.now()}`,
        name: newRequest.clientName,
        phone: newRequest.clientPhone,
        email: newRequest.clientEmail,
        eventsCount: 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Nuevo"
      };
      updatedClients = [newClient, ...updatedClients];
    }
    setStored(STORAGE_KEYS.CLIENTS, updatedClients);

    // Crear cotización inicial vinculada
    const newQuote = {
      id: `q-${Date.now()}`,
      folio: newRequest.folio,
      clientName: newRequest.clientName,
      clientEmail: newRequest.clientEmail,
      eventType: newRequest.eventType,
      packageName: newRequest.packageName,
      guests: newRequest.guests,
      total: newRequest.estimatedTotal,
      date: newRequest.date,
      status: "Borrador",
      createdAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.QUOTES, [newQuote, ...currentQuotes]);

    return newRequest;
  };

  /**
   * Cambia el estado de una solicitud
   */
  const updateRequestStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const item = current.find((r) => r.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((req) => (req.id === id ? { ...req, status: newStatus } : req));
    setStored(STORAGE_KEYS.REQUESTS, updated);

    if (oldStatus !== newStatus) {
      trackEvent("request_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Cambia el estado de una cotización
   */
  const updateQuoteStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);
    const item = current.find((q) => q.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((q) => (q.id === id ? { ...q, status: newStatus } : req));
    setStored(STORAGE_KEYS.QUOTES, updated);

    if (oldStatus !== newStatus) {
      trackEvent("quote_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Convierte una solicitud en un Evento formal
   */
  const convertRequestToEvent = (requestId) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const req = currentRequests.find((r) => r.id === requestId);

    if (!req) return null;

    // Actualizar solicitud a Confirmada
    updateRequestStatus(requestId, "Confirmada");

    // Verificar si ya existe en eventos
    const existing = currentEvents.find((e) => e.folio === req.folio);
    if (existing) return existing;

    const newEvent = {
      id: `evt-${Date.now()}`,
      folio: req.folio,
      clientName: req.clientName,
      clientPhone: req.clientPhone,
      eventType: req.eventType,
      date: req.date,
      guests: req.guests,
      total: req.estimatedTotal,
      paid: req.suggestedDeposit || 5000,
      balance: Math.max(0, req.estimatedTotal - (req.suggestedDeposit || 5000)),
      status: "Apartado",
      packageName: req.packageName,
      zone: req.cityZone || "Reynosa, Tamaulipas"
    };

    setStored(STORAGE_KEYS.EVENTS, [newEvent, ...currentEvents]);

    trackEvent("event_created", {
      event_type: req.eventType,
      package_id: req.packageId
    });

    return newEvent;
  };

  /**
   * Registra un anticipo demo (simulación 100% segura sin procesamiento de dinero real)
   */
  const registerDepositDemo = (folio, depositData = {}) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentPayments = getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);

    const req = currentRequests.find((r) => r.folio === folio);
    const amount = Number(depositData.amount) || (req ? req.suggestedDeposit : 5000);
    const method = depositData.method || "Transferencia demo";
    const clientName = req ? req.clientName : (depositData.clientName || "Cliente Demo");
    const eventType = req ? req.eventType : (depositData.eventType || "Evento");

    // Crear pago registrado
    const newPayment = {
      id: `pay-${Date.now()}`,
      folio,
      clientName,
      eventType,
      concept: "Anticipo",
      amount,
      method,
      date: new Date().toISOString().split("T")[0],
      status: "Pagado"
    };

    setStored(STORAGE_KEYS.PAYMENTS, [newPayment, ...currentPayments]);

    // Si la solicitud existe, cambiar estado a Confirmada
    if (req) {
      updateRequestStatus(req.id, "Confirmada");
    }

    // Actualizar o crear evento vinculado
    const eventIndex = currentEvents.findIndex((e) => e.folio === folio);
    if (eventIndex >= 0) {
      const updatedEvents = [...currentEvents];
      const prevPaid = updatedEvents[eventIndex].paid || 0;
      const newPaid = prevPaid + amount;
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        paid: newPaid,
        balance: Math.max(0, updatedEvents[eventIndex].total - newPaid),
        status: "Apartado"
      };
      setStored(STORAGE_KEYS.EVENTS, updatedEvents);
    } else if (req) {
      const newEvent = {
        id: `evt-${Date.now()}`,
        folio: req.folio,
        clientName: req.clientName,
        clientPhone: req.clientPhone,
        eventType: req.eventType,
        date: req.date,
        guests: req.guests,
        total: req.estimatedTotal,
        paid: amount,
        balance: Math.max(0, req.estimatedTotal - amount),
        status: "Apartado",
        packageName: req.packageName,
        zone: req.cityZone || "Reynosa, Tamaulipas"
      };
      setStored(STORAGE_KEYS.EVENTS, [newEvent, ...currentEvents]);
    }

    trackEvent("deposit_demo_registered", {
      method,
      has_request: Boolean(req)
    });

    return newPayment;
  };

  /**
   * Actualiza el estado de un evento
   */
  const updateEventStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const updated = current.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    setStored(STORAGE_KEYS.EVENTS, updated);
  };

  /**
   * Permite marcar/actualizar el estado de una fecha en el calendario admin y persistirlo
   * Estados: "Disponible", "Solicitud", "Cotización", "Apartado", "Confirmado", "Bloqueado"
   */
  const updateCalendarDayStatus = (dateStr, newStatus) => {
    const currentOverrides = getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {});
    const updated = { ...currentOverrides, [dateStr]: newStatus };
    setStored(STORAGE_KEYS.CALENDAR_OVERRIDES, updated);
    setCalendarOverrides(updated);
  };

  /**
   * Actualiza un paquete demo
   */
  const updatePackage = (id, updatedData) => {
    const current = getStored(STORAGE_KEYS.PACKAGES, initialPackagesData);
    const updated = current.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    setStored(STORAGE_KEYS.PACKAGES, updated);
  };

  /**
   * Actualiza datos generales de configuración
   */
  const updateBusiness = (updatedData) => {
    setStored(STORAGE_KEYS.BUSINESS, { ...business, ...updatedData });
  };

  /**
   * Restaura todos los datos demo a los valores predeterminados de fábrica de La Antigua Eventos
   */
  const resetDemoData = () => {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackagesData));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
    localStorage.setItem(STORAGE_KEYS.CALENDAR_OVERRIDES, JSON.stringify({}));
    refreshFromStorage();
  };

  // Cálculo de Métricas demo para el Administrador de La Antigua Eventos
  const newRequestsCount = requests.filter((r) => r.status === "Nueva").length;
  const quotesSentCount = quotes.filter((q) => q.status === "Enviada" || q.status === "Aceptada").length;
  const confirmedEventsCount = events.filter((e) => e.status === "Confirmado" || e.status === "Apartado").length;
  const upcomingEventsCount = events.filter((e) => e.status !== "Cancelado" && e.status !== "Realizado").length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "Borrador" || q.status === "Cotizando" || q.status === "Enviada").length;

  const totalDepositsSum = payments
    .filter((p) => p.status === "Pagado" && p.concept === "Anticipo")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const projectedIncomeSum = events
    .filter((e) => e.status !== "Cancelado")
    .reduce((sum, e) => sum + (e.total || 0), 0) +
    requests
    .filter((r) => r.status === "Nueva" || r.status === "Contactado" || r.status === "Esperando anticipo")
    .reduce((sum, r) => sum + (r.estimatedTotal || 0), 0);

  // Fechas consultadas en agenda y cotizador (métrica con base demostrativa)
  const datesConsultedCount = 34 + requests.length;

  const metrics = {
    // 5 Métricas principales solicitadas para el Dashboard:
    newRequests: newRequestsCount || 5,
    datesConsulted: datesConsultedCount,
    pendingQuotes: pendingQuotesCount || 4,
    confirmedEvents: confirmedEventsCount || 3,
    totalDeposits: totalDepositsSum || 30000,
    // Métricas auxiliares:
    quotesSent: quotesSentCount || 4,
    upcomingEvents: upcomingEventsCount || 4,
    projectedIncome: projectedIncomeSum || 185000,
    activePackagesCount: packages.filter((p) => p.status === "Activo").length,
    totalClientsCount: clients.length
  };

  return {
    business,
    packages,
    requests,
    quotes,
    events,
    clients,
    payments,
    calendarOverrides,
    metrics,
    createRequest,
    updateRequestStatus,
    updateQuoteStatus,
    convertRequestToEvent,
    registerDepositDemo,
    updateEventStatus,
    updateCalendarDayStatus,
    updatePackage,
    updateBusiness,
    resetDemoData,
    refreshFromStorage
  };
};
