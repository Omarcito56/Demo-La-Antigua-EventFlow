import React from "react";
import { ShieldCheckIcon, WhatsAppIcon, InstagramIcon, MapPinIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";
import { trackEvent } from "../../analytics/analytics";

export const LocationContact = () => {
  return (
    <section className="contact-editorial-section" id="contacto">
      <div className="container">
        <div className="contact-editorial-box">
          <span className="eyebrow">CANALES DE CONTACTO</span>
          <h2 className="contact-title">
            Contacto y Redes
          </h2>
          <p className="contact-desc">
            Comunícate directamente con La Antigua Eventos para resolver dudas, consultar detalles sobre fechas o coordinar una atención personalizada.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "2rem 0" }}>
            {/* WhatsApp Card */}
            <div className="contact-email-card" style={{ borderColor: "var(--color-terracotta)", backgroundColor: "var(--color-surface)" }}>
              <div className="contact-email-row">
                <WhatsAppIcon size={24} style={{ color: "#25D366" }} />
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                    WhatsApp de Atención
                  </span>
                  <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 700 }}>
                    {initialBusinessData.phoneFormatted}
                  </span>
                </div>
              </div>

              <a 
                href={initialBusinessData.whatsappUrl + "?text=" + encodeURIComponent("Hola La Antigua Eventos, me interesa solicitar informes y disponibilidad para mi evento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp contact-send-btn"
                style={{ backgroundColor: "#25D366", color: "#FFFFFF", borderColor: "#25D366" }}
                onClick={() => {
                  trackEvent("demo_cta_clicked", {
                    cta_name: "whatsapp_contact_click",
                    location: "contact_section"
                  });
                }}
              >
                <WhatsAppIcon size={18} />
                <span>Enviar mensaje a WhatsApp</span>
              </a>
            </div>

            {/* Instagram Card */}
            <div className="contact-email-card" style={{ borderColor: "var(--color-accent-border)", backgroundColor: "var(--color-surface)" }}>
              <div className="contact-email-row">
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#E1306C" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                    Instagram Oficial
                  </span>
                  <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 700 }}>
                    @{initialBusinessData.instagram}
                  </span>
                </div>
              </div>

              <a 
                href={initialBusinessData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline contact-send-btn"
                style={{ borderColor: "var(--color-terracotta)", color: "var(--color-terracotta)" }}
                onClick={() => {
                  trackEvent("demo_cta_clicked", {
                    cta_name: "instagram_contact_click",
                    location: "contact_section"
                  });
                }}
              >
                <span>Visitar @{initialBusinessData.instagram}</span>
              </a>
            </div>

            {/* Ciudad y Ubicación confirmada */}
            <div className="contact-email-card" style={{ borderColor: "var(--border-light)", backgroundColor: "var(--color-surface)" }}>
              <div className="contact-email-row">
                <MapPinIcon size={22} style={{ color: "var(--color-green-dark)" }} />
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                    Ciudad
                  </span>
                  <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 600 }}>
                    {initialBusinessData.city}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", display: "block", marginTop: "0.5rem" }}>
                Atención directa para eventos sociales y celebraciones en Reynosa.
              </span>
            </div>
          </div>

          <div className="contact-disclaimer-box">
            <ShieldCheckIcon size={18} className="contact-disclaimer-icon" />
            <p className="contact-disclaimer-text">
              {initialBusinessData.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
