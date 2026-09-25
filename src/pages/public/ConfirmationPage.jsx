import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  CheckIcon, CheckCircleIcon, ArrowLeftIcon, 
  CreditCardIcon, SparklesIcon, WhatsAppIcon, CalendarIcon
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const ConfirmationPage = () => {
  const location = useLocation();
  const { registerDepositDemo, requests } = useEventData();

  // Tomar la solicitud del state o de fallback mock oficial
  const request = location.state?.request || (requests && requests[0]) || {
    folio: "ANT-000128",
    clientName: "Cliente Demo",
    eventType: "Boda",
    packageName: "Celebración",
    guests: 120,
    date: new Date().toISOString().split("T")[0],
    estimatedTotal: 28000,
    suggestedDeposit: 5000,
    status: "Solicitud recibida"
  };

  const [depositMethod, setDepositMethod] = useState("Transferencia");
  const [depositRegistered, setDepositRegistered] = useState(false);

  useTrackOnMount("deposit_demo_viewed", {
    route: "/confirmacion",
    has_request: Boolean(request?.folio)
  });

  const estimatedTotal = request.estimatedTotal || 28000;
  const depositAmount = request.suggestedDeposit || 5000;
  const remainingBalance = Math.max(0, estimatedTotal - depositAmount);

  const handleRegisterDeposit = () => {
    registerDepositDemo(request.folio, {
      amount: depositAmount,
      method: `${depositMethod} demo`,
      clientName: request.clientName,
      eventType: request.eventType
    });
    setDepositRegistered(true);
  };

  return (
    <div className="quote-page-wrap">
      <div className="container">
        <div className="confirmation-card-editorial animate-fade-in">
          {/* Success Check */}
          <div className="confirmation-success-icon" style={{ backgroundColor: "var(--color-terracotta)", color: "#FFFFFF" }}>
            <CheckIcon size={32} />
          </div>

          <span className="confirmation-folio-pill ph-mask">
            FOLIO DEMO: {request.folio}
          </span>

          <h1 className="confirmation-title">
            Tu fecha ya está en proceso ✨
          </h1>

          <p className="confirmation-lead-text">
            La Antigua Eventos podrá revisar tu solicitud y ponerse en contacto contigo para confirmar disponibilidad y preparar los detalles.
          </p>

          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <a 
              href={`https://wa.me/528991055896?text=${encodeURIComponent(`Hola La Antigua Eventos, acabo de enviar mi solicitud en línea con el folio demo ${request.folio} para mi evento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <WhatsAppIcon size={18} />
              <span>Seguimiento directo por WhatsApp: 899 105 5896</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="confirmation-details-card">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Fecha</span>
                <div style={{ fontWeight: 700, color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CalendarIcon size={14} style={{ color: "var(--color-terracotta)" }} />
                  <span>{request.date}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Evento</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.eventType}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Invitados</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.guests} personas</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Opción</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.packageName}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estimado</span>
                <div style={{ fontWeight: 700, color: "var(--color-terracotta)" }}>
                  ${estimatedTotal.toLocaleString("es-MX")} MXN
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estado</span>
                <div>
                  <StatusBadge status={depositRegistered ? "Confirmada" : (request.status || "Solicitud recibida")} />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              ANTICIPO DEMO: APARTA TU FECHA
              ================================================== */}
          <div className="deposit-demo-box">
            <span className="simulation-badge">SIMULACIÓN</span>

            <div className="deposit-demo-header">
              <h3 style={{ fontSize: "1.3rem", color: "var(--color-charcoal-deep)" }}>Aparta tu fecha</h3>
              <p style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
                En una plataforma como EventFlow, los prospectos pueden asegurar su fecha mediante un anticipo pactado. Esta sección es una simulación interactiva sin cargos reales.
              </p>
            </div>

            <div className="deposit-amounts-row">
              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Total estimado</span>
                <div className="deposit-amt-val">${estimatedTotal.toLocaleString("es-MX")}</div>
              </div>

              <div className="deposit-amt-box" style={{ borderColor: "var(--color-terracotta)", backgroundColor: "var(--color-terracotta-soft)" }}>
                <span className="deposit-amt-label">Anticipo DEMO</span>
                <div className="deposit-amt-val" style={{ color: "var(--color-terracotta)" }}>
                  ${depositAmount.toLocaleString("es-MX")}
                </div>
              </div>

              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Saldo</span>
                <div className="deposit-amt-val">${remainingBalance.toLocaleString("es-MX")}</div>
              </div>
            </div>

            {!depositRegistered ? (
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal-deep)", display: "block", marginBottom: "0.6rem" }}>
                  Opciones visuales de anticipo demo:
                </span>

                <div className="deposit-method-choices">
                  <div 
                    className={`deposit-method-option ${depositMethod === "Transferencia" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Transferencia")}
                    style={depositMethod === "Transferencia" ? { borderColor: "var(--color-terracotta)", backgroundColor: "var(--color-terracotta-soft)" } : {}}
                  >
                    <span>🏦 Transferencia demo</span>
                  </div>

                  <div 
                    className={`deposit-method-option ${depositMethod === "Tarjeta" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Tarjeta")}
                    style={depositMethod === "Tarjeta" ? { borderColor: "var(--color-terracotta)", backgroundColor: "var(--color-terracotta-soft)" } : {}}
                  >
                    <CreditCardIcon size={18} />
                    <span>Tarjeta demo</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary btn-block btn-lg"
                  onClick={handleRegisterDeposit}
                >
                  <SparklesIcon size={18} />
                  <span>Simular apartado con anticipo (${depositAmount.toLocaleString("es-MX")} MXN)</span>
                </button>

                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.85rem", textAlign: "center" }}>
                  * No se procesa ningún cobro real ni se solicitan datos financieros. La acción simulará la confirmación inmediata en el panel de administración.
                </p>
              </div>
            ) : (
              <div style={{ padding: "1.25rem", backgroundColor: "#ECFDF5", borderRadius: "var(--radius-sm)", border: "1px solid #A7F3D0", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#065F46", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                  <CheckCircleIcon size={22} />
                  <span>¡Anticipo demo registrado con éxito!</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#047857" }}>
                  La fecha ha sido apartada en la simulación. El movimiento se ha reflejado en el módulo de Pagos, Eventos y Calendario del panel administrativo.
                </p>
              </div>
            )}
          </div>

          {/* Botones de Retorno y Acceso a Admin */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link to="/" className="btn btn-outline btn-sm">
              <ArrowLeftIcon size={15} />
              <span>Volver al inicio</span>
            </Link>

            <Link to="/admin/login" className="btn btn-secondary btn-sm">
              <span>Ver panel administrativo demo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
