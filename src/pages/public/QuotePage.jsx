import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  initialExtrasData, 
  eventTypesList, 
  mockAvailabilityMap,
  getDateAvailabilityStatus 
} from "../../data/eventFlowData";
import { 
  CalendarIcon, CheckIcon, SparklesIcon, 
  ArrowRightIcon, ArrowLeftIcon, AlertCircleIcon,
  HeartIcon, BriefcaseIcon, GiftIcon, AcademicIcon, StarIcon, UsersIcon,
  ChevronLeftIcon, ChevronRightIcon
} from "../../components/common/Icons";

import { 
  trackEvent, 
  useTrackOnMount, 
  getGuestRange, 
  getEstimatedTotalRange 
} from "../../analytics/analytics";

export const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { packages, business, createRequest } = useEventData();

  // Stepper Oficial de 7 Pasos
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // Leer parámetros de URL si viene de landing o calendario
  const paramDate = searchParams.get("fecha") || "";
  const paramType = searchParams.get("tipo") || "boda";
  const paramPkg = searchParams.get("paquete") || "celebracion";

  const [quoteState, setQuoteState] = useState({
    date: paramDate,
    eventType: paramType,
    guests: 120,
    packageId: paramPkg,
    selectedExtras: [],
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    cityZone: "",
    comments: "",
    privacyAccepted: false
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useTrackOnMount("quote_started", {
    flow_type: "event_quote",
    route: "/cotizar",
    has_initial_date: Boolean(paramDate),
    initial_event_type: paramType
  });

  // Paquete / Opción elegida
  const selectedPackage = packages.find(p => p.id === quoteState.packageId) || packages[0];
  const basePrice = selectedPackage.priceNumber || 25000;
  const baseGuests = selectedPackage.baseGuests || 120;
  const extraGuestPrice = selectedPackage.extraGuestPrice || 200;

  // Cálculo Dinámico en Tiempo Real
  const extraGuestsCount = Math.max(0, quoteState.guests - baseGuests);
  const guestsAdjustment = extraGuestsCount * extraGuestPrice;

  // Suma de extras seleccionados
  const extrasTotal = quoteState.selectedExtras.reduce((sum, extraId) => {
    const extraObj = initialExtrasData.find(e => e.id === extraId);
    return sum + (extraObj ? extraObj.price : 0);
  }, 0);

  const estimatedTotal = basePrice + guestsAdjustment + extrasTotal;
  const suggestedDeposit = 5000; // Anticipo demo base

  // Derivar nombre del tipo de evento
  const selectedTypeObj = eventTypesList.find(t => t.id === quoteState.eventType);
  const eventTypeName = selectedTypeObj ? selectedTypeObj.name : "Boda";

  // Disponibilidad de la fecha con 4 estados oficiales
  const getDateStatus = (dateStr) => {
    if (!dateStr) return null;
    return getDateAvailabilityStatus(dateStr);
  };

  const selectedDateStatus = getDateStatus(quoteState.date);

  // Estado para el mes visualizado en el calendario interactivo del Cotizador
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    if (paramDate) {
      const parts = paramDate.split("-").map(Number);
      if (parts.length === 3 && !isNaN(parts[0])) {
        return new Date(parts[0], parts[1] - 1, 1);
      }
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth();

  const isCurrentMonthView = 
    viewYear === today.getFullYear() && 
    viewMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (isCurrentMonthView) return;
    setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleGoToCurrentMonth = () => {
    setCalendarViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const monthLabel = calendarViewDate.toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric"
  });

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Domingo
  const daysInViewMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ isPlaceholder: true, key: `empty-${i}` });
  }
  for (let d = 1; d <= daysInViewMonth; d++) {
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const iso = `${yyyy}-${mm}-${dd}`;
    const isPast = iso < todayISO;
    const isToday = iso === todayISO;
    const isSelected = quoteState.date === iso;
    const status = getDateStatus(iso);

    calendarDays.push({
      isPlaceholder: false,
      key: iso,
      dayNum: d,
      isoDate: iso,
      isPast,
      isToday,
      isSelected,
      status
    });
  }

  const formatHumanDate = (iso) => {
    if (!iso) return "";
    const parts = iso.split("-").map(Number);
    if (parts.length !== 3) return iso;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getAvailabilityMeta = (status) => {
    switch (status) {
      case "disponible":
        return {
          label: "Disponible",
          badgeClass: "status-badge-disponible",
          dotColor: "#10B981",
          bannerBg: "rgba(16, 185, 129, 0.08)",
          bannerBorder: "#10B981",
          bannerColor: "#065F46",
          message: "Esta fecha aparece disponible en la demostración para celebrar tu evento.",
          isAvailable: true
        };
      case "limitada":
        return {
          label: "Limitada",
          badgeClass: "status-badge-limitada",
          dotColor: "#F59E0B",
          bannerBg: "rgba(245, 158, 11, 0.08)",
          bannerBorder: "#F59E0B",
          bannerColor: "#92400E",
          message: "Existe una solicitud en revisión para esta fecha. Puedes registrar tu cotización preferencial.",
          isAvailable: true
        };
      case "proceso":
        return {
          label: "En proceso",
          badgeClass: "status-badge-proceso",
          dotColor: "#A86C60",
          bannerBg: "rgba(168, 108, 96, 0.08)",
          bannerBorder: "#A86C60",
          bannerColor: "#78350F",
          message: "Fecha en proceso de cotización previa. Puedes solicitar información o integrarte a lista prioritaria.",
          isAvailable: true
        };
      case "apartada":
      default:
        return {
          label: "Apartada",
          badgeClass: "status-badge-apartada",
          dotColor: "#6B7280",
          bannerBg: "rgba(107, 114, 128, 0.08)",
          bannerBorder: "#6B7280",
          bannerColor: "#374151",
          message: "Esta fecha se encuentra apartada con anticipo demostrativo. Por favor elige otra fecha libre.",
          isAvailable: false
        };
    }
  };

  // Definición del Stepper (7 pasos)
  const stepsList = [
    { num: "01", name: "Fecha" },
    { num: "02", name: "Evento" },
    { num: "03", name: "Invitados" },
    { num: "04", name: "Opción" },
    { num: "05", name: "Extras" },
    { num: "06", name: "Datos" },
    { num: "07", name: "Resumen" }
  ];

  // Handlers
  const handleDateChange = (dateVal) => {
    setQuoteState(prev => ({ ...prev, date: dateVal }));
    setErrorMsg("");
    if (dateVal) {
      const parts = dateVal.split("-").map(Number);
      if (parts.length === 3 && !isNaN(parts[0])) {
        setCalendarViewDate(new Date(parts[0], parts[1] - 1, 1));
      }
      trackEvent("quote_date_selected", {
        step: 1,
        is_future: dateVal >= todayISO,
        status: getDateStatus(dateVal)
      });
    }
  };


  const handleEventTypeSelect = (typeId) => {
    setQuoteState(prev => ({ ...prev, eventType: typeId }));
    setErrorMsg("");
    trackEvent("quote_event_type_selected", {
      event_type: typeId,
      step: 2
    });
  };

  const handleGuestsRange = (count) => {
    setQuoteState(prev => ({ ...prev, guests: count }));
  };

  const handleGuestsInput = (val) => {
    const num = Math.max(10, Math.min(1000, Number(val) || 10));
    setQuoteState(prev => ({ ...prev, guests: num }));
  };

  const handlePackageSelect = (pkgId) => {
    setQuoteState(prev => ({ ...prev, packageId: pkgId }));
    setErrorMsg("");
    trackEvent("quote_package_selected", {
      package_id: pkgId,
      step: 4
    });
  };

  const handleExtraToggle = (extraId) => {
    setQuoteState(prev => {
      const exists = prev.selectedExtras.includes(extraId);
      const updated = exists 
        ? prev.selectedExtras.filter(id => id !== extraId)
        : [...prev.selectedExtras, extraId];

      trackEvent("quote_extras_selected", {
        extras_count: updated.length,
        step: 5
      });

      return { ...prev, selectedExtras: updated };
    });
  };

  const handleNextStep = () => {
    setErrorMsg("");

    // Validación Paso 1 (Fecha)
    if (currentStep === 1) {
      if (!quoteState.date) {
        setErrorMsg("Por favor selecciona una fecha tentativa para tu evento.");
        return;
      }
      if (quoteState.date < todayISO) {
        setErrorMsg("Por favor selecciona una fecha futura válida.");
        return;
      }
      if (selectedDateStatus === "apartada") {
        setErrorMsg("La fecha seleccionada se encuentra apartada en la demostración. Por favor elige otra fecha disponible o limitada.");
        return;
      }
    }

    // Validación Paso 2 (Evento)
    if (currentStep === 2) {
      if (!quoteState.eventType) {
        setErrorMsg("Por favor selecciona el tipo de evento que deseas celebrar.");
        return;
      }
    }

    // Validación Paso 3 (Invitados)
    if (currentStep === 3) {
      if (!quoteState.guests || quoteState.guests < 10) {
        setErrorMsg("Por favor ingresa un número de invitados válido (mínimo 10).");
        return;
      }
    }

    // Validación Paso 4 (Opción)
    if (currentStep === 4) {
      if (!quoteState.packageId) {
        setErrorMsg("Por favor selecciona una opción o paquete base.");
        return;
      }
    }

    // Validación Paso 6 (Datos)
    if (currentStep === 6) {
      if (!quoteState.clientName.trim()) {
        setErrorMsg("Por favor ingresa tu nombre completo.");
        return;
      }
      if (!quoteState.clientPhone.trim()) {
        setErrorMsg("Por favor ingresa un teléfono o WhatsApp de contacto.");
        return;
      }
      if (!quoteState.clientEmail.trim() || !quoteState.clientEmail.includes("@")) {
        setErrorMsg("Por favor ingresa un correo electrónico válido.");
        return;
      }
      if (!quoteState.privacyAccepted) {
        setErrorMsg("Debes aceptar el aviso de privacidad demostrativo para continuar.");
        return;
      }
    }

    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSubmitRequest = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg("");

    const newRequest = createRequest({
      clientName: quoteState.clientName,
      clientPhone: quoteState.clientPhone,
      clientEmail: quoteState.clientEmail,
      cityZone: quoteState.cityZone,
      eventType: eventTypeName,
      guests: quoteState.guests,
      packageId: quoteState.packageId,
      packageName: selectedPackage.name,
      packageBasePrice: basePrice,
      extras: quoteState.selectedExtras,
      extrasTotal,
      estimatedTotal,
      suggestedDeposit,
      date: quoteState.date,
      comments: quoteState.comments
    });

    // Tracking estricto sin PII
    trackEvent("quote_completed", {
      event_type: quoteState.eventType,
      package_id: quoteState.packageId,
      guest_range: getGuestRange(quoteState.guests),
      extras_count: quoteState.selectedExtras.length,
      estimated_total_range: getEstimatedTotalRange(estimatedTotal)
    });

    navigate("/confirmacion", { state: { request: newRequest } });
  };

  // Render rápido del status de la fecha
  const renderDateStatusFeedback = () => {
    if (!quoteState.date) return null;

    if (selectedDateStatus === "disponible") {
      return (
        <div className="date-availability-status-box" style={{ borderColor: "#10B981", backgroundColor: "rgba(16, 185, 129, 0.08)", marginTop: "1rem" }}>
          <div style={{ color: "#059669", display: "flex", alignItems: "center" }}>
            <CheckIcon size={18} />
          </div>
          <span style={{ fontSize: "0.85rem", color: "#065F46", fontWeight: 500 }}>
            Esta fecha aparece <strong>disponible</strong> en la demostración.
          </span>
        </div>
      );
    }
    if (selectedDateStatus === "limitada") {
      return (
        <div className="date-availability-status-box" style={{ borderColor: "#F59E0B", backgroundColor: "rgba(245, 158, 11, 0.08)", marginTop: "1rem" }}>
          <div style={{ color: "#D97706", display: "flex", alignItems: "center" }}>
            <AlertCircleIcon size={18} />
          </div>
          <span style={{ fontSize: "0.85rem", color: "#92400E", fontWeight: 500 }}>
            Existe una solicitud en proceso para esta fecha. Disponibilidad sujeta a confirmación.
          </span>
        </div>
      );
    }
    if (selectedDateStatus === "proceso") {
      return (
        <div className="date-availability-status-box" style={{ borderColor: "#A86C60", backgroundColor: "rgba(168, 108, 96, 0.08)", marginTop: "1rem" }}>
          <div style={{ color: "#A86C60", display: "flex", alignItems: "center" }}>
            <AlertCircleIcon size={18} />
          </div>
          <span style={{ fontSize: "0.85rem", color: "#78350F", fontWeight: 500 }}>
            Fecha en proceso de cotización previa. Puedes solicitar información alternativa.
          </span>
        </div>
      );
    }
    if (selectedDateStatus === "apartada") {
      return (
        <div className="date-availability-status-box" style={{ borderColor: "#6B7280", backgroundColor: "rgba(107, 114, 128, 0.08)", marginTop: "1rem" }}>
          <div style={{ color: "#4B5563", display: "flex", alignItems: "center" }}>
            <AlertCircleIcon size={18} />
          </div>
          <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 500 }}>
            Esta fecha se encuentra apartada en la demostración. Por favor elige otro día.
          </span>
        </div>
      );
    }
    return null;
  };

  const renderEventIcon = (typeId) => {
    switch (typeId) {
      case "boda":
      case "aniversario":
        return <HeartIcon size={22} />;
      case "xv-anos":
        return <SparklesIcon size={22} />;
      case "cumpleanos":
        return <GiftIcon size={22} />;
      case "graduacion":
        return <AcademicIcon size={22} />;
      case "corporativo":
        return <BriefcaseIcon size={22} />;
      case "evento-privado":
        return <StarIcon size={22} />;
      default:
        return <CalendarIcon size={22} />;
    }
  };

  return (
    <div className="quote-page-wrap">
      <div className="container">
        {/* Header */}
        <div className="quote-header-box">
          <span className="quote-demo-badge">COTIZADOR INTERACTIVO DEMO</span>
          <h1 className="quote-title">Diseña tu celebración en La Antigua</h1>
          <p className="quote-subtext">
            Consulta disponibilidad, personaliza invitados, opciones y extras para recibir una cotización demostrativa inmediata.
          </p>
        </div>

        {/* Stepper Oficial de 7 Pasos con barra de progreso */}
        <nav className="stepper-nav" aria-label="Progreso del cotizador">
          <div className="stepper-progress-line">
            <div 
              className="stepper-progress-fill" 
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
            />
          </div>
          {stepsList.map((st, idx) => {
            const stepNumber = idx + 1;
            const isPassed = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <button 
                key={st.num} 
                type="button"
                className={`stepper-step-item ${isCurrent ? "active" : ""} ${isPassed ? "completed" : ""}`}
                onClick={() => {
                  if (stepNumber < currentStep) setCurrentStep(stepNumber);
                }}
                aria-label={`Ir al paso ${st.num} ${st.name}`}
              >
                <div className="stepper-circle">
                  {isPassed ? <CheckIcon size={14} /> : st.num}
                </div>
                <span className="stepper-label">{st.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Layout Grid: Pasos (Izquierda) + Desglose Dinámico (Derecha) */}
        <div className="quote-layout-grid">
          {/* Columna Izquierda: Tarjeta del Paso Activo */}
          <main className="quote-step-card animate-fade-in">
            {errorMsg && (
              <div className="alert-banner alert-warning animate-fade-in" style={{ marginBottom: "1.5rem" }}>
                <div className="alert-content-left">
                  <AlertCircleIcon size={18} />
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 1: FECHA
                ================================================== */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 01</span>
                <h2 className="quote-step-title">¿Cuándo quieres celebrar?</h2>
                <p className="quote-step-desc">
                  Selecciona la fecha tentativa para tu evento en nuestro calendario interactivo. Puedes consultar la disponibilidad demostrativa en tiempo real.
                </p>

                <div className="date-picker-wrap">
                  {/* Tarjeta del Calendario Interactivo */}
                  <div className="quote-calendar-card">
                    {/* Barra Superior con Mes y Navegación */}
                    <div className="quote-calendar-header">
                      <div className="quote-calendar-month-title">
                        <CalendarIcon size={20} style={{ color: "var(--color-terracotta)" }} />
                        <span>{monthLabel}</span>
                      </div>
                      <div className="quote-calendar-nav">
                        <button 
                          type="button" 
                          className="quote-calendar-btn"
                          onClick={handlePrevMonth}
                          disabled={isCurrentMonthView}
                          title={isCurrentMonthView ? "Mes actual" : "Mes anterior"}
                          aria-label="Mes anterior"
                        >
                          <ChevronLeftIcon size={16} />
                          <span>Anterior</span>
                        </button>
                        {!isCurrentMonthView && (
                          <button 
                            type="button" 
                            className="quote-calendar-btn"
                            onClick={handleGoToCurrentMonth}
                            title="Volver al mes actual"
                          >
                            <span>Hoy</span>
                          </button>
                        )}
                        <button 
                          type="button" 
                          className="quote-calendar-btn"
                          onClick={handleNextMonth}
                          aria-label="Mes siguiente"
                        >
                          <span>Siguiente</span>
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Leyenda de Disponibilidad */}
                    <div className="quote-calendar-legend">
                      <span className="quote-calendar-legend-item">
                        <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#10B981" }} />
                        Disponible
                      </span>
                      <span className="quote-calendar-legend-item">
                        <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#F59E0B" }} />
                        Disponibilidad limitada
                      </span>
                      <span className="quote-calendar-legend-item">
                        <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#A86C60" }} />
                        En proceso
                      </span>
                      <span className="quote-calendar-legend-item">
                        <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#6B7280" }} />
                        Apartada
                      </span>
                    </div>

                    {/* Grid de Días de la Semana y Celdas */}
                    <div className="quote-calendar-grid">
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dow, idx) => (
                        <div key={idx} className="quote-calendar-dow">
                          {dow}
                        </div>
                      ))}

                      {calendarDays.map((cell) => {
                        if (cell.isPlaceholder) {
                          return <div key={cell.key} className="quote-calendar-cell placeholder" />;
                        }

                        const meta = getAvailabilityMeta(cell.status);
                        const isSelectable = !cell.isPast;

                        return (
                          <div 
                            key={cell.key}
                            className={`quote-calendar-cell ${cell.isPast ? "past" : ""} ${cell.isSelected ? "selected" : ""}`}
                            onClick={() => {
                              if (isSelectable) {
                                handleDateChange(cell.isoDate);
                              }
                            }}
                            title={
                              cell.isPast 
                                ? "Fecha no disponible (pasada)" 
                                : `${cell.dayNum} de ${monthLabel}: ${meta.label}`
                            }
                            role="button"
                            tabIndex={isSelectable ? 0 : -1}
                            onKeyDown={(e) => {
                              if ((e.key === "Enter" || e.key === " ") && isSelectable) {
                                handleDateChange(cell.isoDate);
                              }
                            }}
                          >
                            <span className="quote-calendar-cell-num">
                              {cell.dayNum}
                            </span>

                            {!cell.isPast && (
                              <>
                                <span className={`quote-calendar-cell-badge ${meta.badgeClass}`}>
                                  {meta.label}
                                </span>
                                <span 
                                  className="quote-calendar-cell-dot" 
                                  style={{ backgroundColor: meta.dotColor }}
                                />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Callout de Confirmación de Fecha Seleccionada */}
                  {quoteState.date ? (() => {
                    const meta = getAvailabilityMeta(selectedDateStatus);
                    return (
                      <div 
                        className="quote-selected-date-card animate-fade-in" 
                        style={{ 
                          borderLeft: `4px solid ${meta.bannerBorder}`,
                          backgroundColor: meta.bannerBg 
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                          <div style={{ color: meta.bannerColor, marginTop: "0.2rem" }}>
                            {selectedDateStatus === "apartada" ? <AlertCircleIcon size={22} /> : <CheckIcon size={22} />}
                          </div>
                          <div>
                            <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: meta.bannerColor, display: "block" }}>
                              Fecha seleccionada para tu evento:
                            </span>
                            <strong style={{ fontSize: "1.08rem", color: "var(--color-charcoal-deep)", display: "block", textTransform: "capitalize", margin: "0.2rem 0" }}>
                              {formatHumanDate(quoteState.date)}
                            </strong>
                            <p style={{ fontSize: "0.86rem", color: meta.bannerColor, margin: 0, lineHeight: 1.4 }}>
                              {meta.message}
                            </p>
                          </div>
                        </div>

                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <span 
                            style={{ 
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              fontSize: "0.8rem", 
                              fontWeight: 700, 
                              padding: "0.35rem 0.8rem", 
                              borderRadius: "var(--radius-full)",
                              backgroundColor: meta.bannerBg,
                              border: `1px solid ${meta.bannerBorder}`,
                              color: meta.bannerColor 
                            }}
                          >
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: meta.dotColor }} />
                            {meta.label}
                          </span>
                        </div>
                      </div>
                    );
                  })() : (
                    <div style={{ 
                      padding: "1.1rem 1.25rem", 
                      backgroundColor: "var(--color-surface)", 
                      borderRadius: "var(--radius-md)", 
                      border: "1px dashed var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9rem"
                    }}>
                      <CalendarIcon size={20} style={{ color: "var(--color-accent)" }} />
                      <span>Haz clic sobre cualquier fecha en verde o amarillo para seleccionarla y avanzar.</span>
                    </div>
                  )}

                  {/* Opción rápida manual de fecha */}
                  <div className="quote-manual-date-toggle">
                    <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                      O si prefieres, escribe o selecciona la fecha en formato manual:
                    </span>
                    <input 
                      type="date"
                      id="quote-date-input"
                      className="form-input"
                      style={{ maxWidth: "220px", padding: "0.55rem 0.85rem", fontSize: "0.88rem" }}
                      min={todayISO}
                      value={quoteState.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 2: EVENTO
                ================================================== */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 02</span>
                <h2 className="quote-step-title">¿Qué estás celebrando?</h2>
                <p className="quote-step-desc">
                  Selecciona el formato de tu celebración para adaptar la sugerencia de montaje y logística.
                </p>

                <div className="event-selection-grid">
                  {eventTypesList.map((type) => {
                    const isSelected = quoteState.eventType === type.id;
                    return (
                      <div 
                        key={type.id}
                        className={`event-select-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleEventTypeSelect(type.id)}
                      >
                        <div className="event-select-icon">
                          {renderEventIcon(type.id)}
                        </div>
                        <span className="event-select-name">{type.name}</span>
                        <span className="event-select-desc">{type.subtitle}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 3: INVITADOS
                ================================================== */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 03</span>
                <h2 className="quote-step-title">¿Cuántas personas esperas?</h2>
                <p className="quote-step-desc">
                  Calcula tu presupuesto estimado según el número de invitados previstos.
                </p>

                <div className="guests-control-box">
                  <div className="guests-ranges-row">
                    {[
                      { label: "1–50", val: 50 },
                      { label: "51–100", val: 100 },
                      { label: "101–150", val: 150 },
                      { label: "151–200", val: 200 },
                      { label: "200+", val: 250 }
                    ].map((rng) => {
                      const isSelected = (
                        (rng.label === "1–50" && quoteState.guests <= 50) ||
                        (rng.label === "51–100" && quoteState.guests > 50 && quoteState.guests <= 100) ||
                        (rng.label === "101–150" && quoteState.guests > 100 && quoteState.guests <= 150) ||
                        (rng.label === "151–200" && quoteState.guests > 150 && quoteState.guests <= 200) ||
                        (rng.label === "200+" && quoteState.guests > 200)
                      );
                      return (
                        <button 
                          key={rng.label}
                          type="button"
                          className={`guest-range-btn ${isSelected ? "selected" : ""}`}
                          onClick={() => handleGuestsRange(rng.val)}
                        >
                          {rng.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="guest-number-dial">
                    <button 
                      type="button" 
                      className="dial-btn"
                      onClick={() => handleGuestsInput(Math.max(10, quoteState.guests - 10))}
                      aria-label="Disminuir 10 personas"
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      className="dial-input-val"
                      value={quoteState.guests}
                      onChange={(e) => handleGuestsInput(e.target.value)}
                      min={10}
                      max={1000}
                    />
                    <button 
                      type="button" 
                      className="dial-btn"
                      onClick={() => handleGuestsInput(quoteState.guests + 10)}
                      aria-label="Aumentar 10 personas"
                    >
                      +
                    </button>
                  </div>

                  <span style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", display: "block" }}>
                    Personas / Invitados estimados
                  </span>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.85rem", fontStyle: "italic" }}>
                    * Capacidades mostradas con fines demostrativos. Se adaptan a los requerimientos específicos de tu evento.
                  </p>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 4: OPCIÓN / PAQUETE
                ================================================== */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 04</span>
                <h2 className="quote-step-title">¿Cómo imaginas tu evento?</h2>
                <p className="quote-step-desc">
                  Selecciona la opción de espacio o paquete demostrativo que mejor represente tu visión.
                </p>

                <div className="package-selection-cards">
                  {packages.map((pkg) => {
                    const isSelected = quoteState.packageId === pkg.id;
                    return (
                      <div 
                        key={pkg.id}
                        className={`pkg-select-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        <div className="pkg-radio-circle">
                          {isSelected && <div className="pkg-radio-dot" />}
                        </div>

                        <div className="pkg-select-info">
                          <h4>{pkg.name}</h4>
                          <p>{pkg.description}</p>
                          {pkg.includes && (
                            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "0.6rem", listStyle: "none", padding: 0 }}>
                              {pkg.includes.slice(0, 3).map((inc, i) => (
                                <li key={i} style={{ fontSize: "0.76rem", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg)", padding: "0.2rem 0.55rem", borderRadius: "var(--radius-xs)" }}>
                                  ✓ {inc}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="pkg-select-price">
                          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block" }}>Precio DEMO</span>
                          <span className="pkg-price-num">${pkg.priceNumber?.toLocaleString("es-MX")}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>MXN</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 5: EXTRAS
                ================================================== */}
            {currentStep === 5 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 05</span>
                <h2 className="quote-step-title">Agrega algunos detalles</h2>
                <p className="quote-step-desc">
                  Personaliza tu celebración con servicios adicionales y detalles demostrativos.
                </p>

                <div className="extras-selection-grid">
                  {initialExtrasData.map((extra) => {
                    const isSelected = quoteState.selectedExtras.includes(extra.id);
                    return (
                      <div 
                        key={extra.id}
                        className={`extra-select-card ${isSelected ? "active" : ""}`}
                        onClick={() => handleExtraToggle(extra.id)}
                      >
                        <div className="extra-info-left">
                          <span className="extra-name">{extra.name}</span>
                          <span className="extra-price-tag">+${extra.price.toLocaleString("es-MX")} MXN</span>
                          <span style={{ fontSize: "0.74rem", color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
                            {extra.description}
                          </span>
                        </div>
                        <div className="extra-toggle-switch">
                          <div className="toggle-knob" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 6: DATOS DE CONTACTO
                ================================================== */}
            {currentStep === 6 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 06</span>
                <h2 className="quote-step-title">Tus datos de contacto</h2>
                <p className="quote-step-desc">
                  Comparte tus datos para enviarte la propuesta demostrativa y coordinar el seguimiento.
                </p>

                <div className="form-grid-2col">
                  <div>
                    <label className="form-label" htmlFor="client-name">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="client-name"
                      className="form-input ph-mask"
                      placeholder="Ej. Mariana Garza"
                      value={quoteState.clientName}
                      onChange={(e) => setQuoteState(p => ({ ...p, clientName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="client-phone">WhatsApp o Teléfono *</label>
                    <input 
                      type="tel" 
                      id="client-phone"
                      className="form-input ph-mask"
                      placeholder="Ej. 899 123 4567"
                      value={quoteState.clientPhone}
                      onChange={(e) => setQuoteState(p => ({ ...p, clientPhone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div>
                    <label className="form-label" htmlFor="client-email">Correo electrónico *</label>
                    <input 
                      type="email" 
                      id="client-email"
                      className="form-input ph-mask"
                      placeholder="ejemplo@correo.com"
                      value={quoteState.clientEmail}
                      onChange={(e) => setQuoteState(p => ({ ...p, clientEmail: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="client-zone">Zona o Ciudad (opcional)</label>
                    <input 
                      type="text" 
                      id="client-zone"
                      className="form-input ph-mask"
                      placeholder="Ej. Reynosa Centro"
                      value={quoteState.cityZone}
                      onChange={(e) => setQuoteState(p => ({ ...p, cityZone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group-full">
                  <label className="form-label" htmlFor="client-comments">Comentarios o requerimientos especiales (opcional)</label>
                  <textarea 
                    id="client-comments"
                    className="form-textarea ph-mask"
                    placeholder="Cuéntanos detalles especiales, horarios o dudas..."
                    value={quoteState.comments}
                    onChange={(e) => setQuoteState(p => ({ ...p, comments: e.target.value }))}
                  />
                </div>

                <div className="privacy-checkbox-row">
                  <input 
                    type="checkbox" 
                    id="privacy-check"
                    checked={quoteState.privacyAccepted}
                    onChange={(e) => setQuoteState(p => ({ ...p, privacyAccepted: e.target.checked }))}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <label htmlFor="privacy-check" style={{ cursor: "pointer", fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
                    He leído y acepto el aviso de privacidad demostrativo. Entiendo que paquetes, precios, disponibilidad e imágenes son mostrados con fines demostrativos para La Antigua Eventos.
                  </label>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 7: RESUMEN DE COTIZACIÓN
                ================================================== */}
            {currentStep === 7 && (
              <div className="animate-fade-in">
                <span className="step-num-eyebrow">PASO 07</span>
                <h2 className="quote-step-title">Resumen de tu cotización</h2>
                <p className="quote-step-desc">
                  Revisa los detalles de tu solicitud antes de enviarla a revisión con La Antigua Eventos.
                </p>

                <div className="quote-summary-sheet">
                  <div className="sheet-header-row">
                    <div>
                      <div className="sheet-brand-name">La Antigua Eventos</div>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Reynosa, Tamaulipas</span>
                    </div>
                    <span className="badge badge-accent">Cotización Demostrativa</span>
                  </div>

                  <div className="sheet-rows-list">
                    <div className="sheet-row">
                      <span className="sheet-label">Fecha tentativa:</span>
                      <span className="sheet-val">{quoteState.date || "No definida"}</span>
                    </div>
                    <div className="sheet-row">
                      <span className="sheet-label">Tipo de evento:</span>
                      <span className="sheet-val">{eventTypeName}</span>
                    </div>
                    <div className="sheet-row">
                      <span className="sheet-label">Invitados previstos:</span>
                      <span className="sheet-val">{quoteState.guests} personas</span>
                    </div>
                    <div className="sheet-row">
                      <span className="sheet-label">Opción seleccionada:</span>
                      <span className="sheet-val">{selectedPackage.name} (${basePrice.toLocaleString("es-MX")})</span>
                    </div>
                    {guestsAdjustment > 0 && (
                      <div className="sheet-row">
                        <span className="sheet-label">Ajuste por invitados adicionales:</span>
                        <span className="sheet-val">+${guestsAdjustment.toLocaleString("es-MX")}</span>
                      </div>
                    )}
                    <div className="sheet-row">
                      <span className="sheet-label">Servicios extras seleccionados ({quoteState.selectedExtras.length}):</span>
                      <span className="sheet-val">+${extrasTotal.toLocaleString("es-MX")}</span>
                    </div>
                    <div className="sheet-row" style={{ borderTop: "1px dashed var(--border-light)", paddingTop: "0.6rem" }}>
                      <span className="sheet-label">Cliente solicitante:</span>
                      <span className="sheet-val ph-mask">{quoteState.clientName} ({quoteState.clientPhone})</span>
                    </div>
                  </div>

                  <div className="sheet-total-bar">
                    <div>
                      <span style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.8, display: "block" }}>Total Estimado</span>
                      <div className="sheet-total-num">${estimatedTotal.toLocaleString("es-MX")} MXN</div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "0.8rem", opacity: 0.9 }}>
                      <div>Anticipo sugerido:</div>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-champagne)" }}>${suggestedDeposit.toLocaleString("es-MX")} MXN</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                    <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                      <ArrowLeftIcon size={16} />
                      <span>Editar datos</span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmitRequest} style={{ flexGrow: 1 }}>
                      <span>Enviar solicitud de fecha</span>
                      <ArrowRightIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navegación entre pasos (Anterior / Siguiente para pasos 1 a 6) */}
            {currentStep < 7 && (
              <div className="step-actions-row">
                {currentStep > 1 ? (
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={handlePrevStep}
                  >
                    <ArrowLeftIcon size={16} />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <Link to="/" className="btn btn-outline">
                    <ArrowLeftIcon size={16} />
                    <span>Volver al inicio</span>
                  </Link>
                )}

                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Continuar</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            )}
          </main>

          {/* Columna Derecha: Sidebar de Desglose Dinámico de Precio */}
          <aside className="quote-sidebar-calculator">
            <span className="calc-badge-demo">COTIZACIÓN DEMOSTRATIVA</span>
            <h3 className="calc-sidebar-title">Presupuesto Estimado</h3>

            <div className="calc-total-box">
              <span className="calc-total-label">Total aproximado</span>
              <div className="calc-total-val">
                ${estimatedTotal.toLocaleString("es-MX")} <span style={{ fontSize: "1rem", fontWeight: 500 }}>MXN</span>
              </div>
            </div>

            <div className="calc-breakdown-list">
              <div className="calc-line-item">
                <span>Opción ({selectedPackage.name}):</span>
                <span className="strong">${basePrice.toLocaleString("es-MX")}</span>
              </div>
              <div className="calc-line-item">
                <span>Invitados ({quoteState.guests} pax):</span>
                <span className="strong">{guestsAdjustment > 0 ? `+$${guestsAdjustment.toLocaleString("es-MX")}` : "Incluido"}</span>
              </div>
              <div className="calc-line-item">
                <span>Servicios extras ({quoteState.selectedExtras.length}):</span>
                <span className="strong">+${extrasTotal.toLocaleString("es-MX")}</span>
              </div>
              <div className="calc-line-item strong" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.5rem" }}>
                <span>Fecha:</span>
                <span style={{ color: quoteState.date ? "var(--color-charcoal-deep)" : "var(--color-text-muted)" }}>
                  {quoteState.date || "Por seleccionar"}
                </span>
              </div>
            </div>

            <p className="calc-disclaimer">
              El precio final dependería de la fecha, servicios seleccionados y requerimientos específicos del evento.
            </p>

            <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              Anticipo demo sugerido: <strong style={{ color: "var(--color-charcoal-deep)" }}>${suggestedDeposit.toLocaleString("es-MX")} MXN</strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
