import React from "react";
import { Link } from "react-router-dom";
import { LaAntiguaLogoIcon, WhatsAppIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";

export const Footer = () => {
  return (
    <footer className="footer-editorial">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--color-terracotta)", color: "var(--color-white)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LaAntiguaLogoIcon size={22} />
              </div>
              <h3 className="footer-brand-title">{initialBusinessData.name}</h3>
            </div>
            <span className="footer-brand-subtitle">Romantic Modern Venue · Reynosa</span>
            <p className="footer-brand-desc">
              Propuesta interactiva para consultar disponibilidad de fechas, cotizar paquetes, realizar apartados demostrativos y organizar celebraciones.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="footer-col-heading">Navegación</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">Inicio</Link></li>
              <li className="footer-link-item"><a href="#experiencias">Experiencias</a></li>
              <li className="footer-link-item"><a href="#paquetes">Paquetes demo</a></li>
              <li className="footer-link-item"><a href="#disponibilidad">Disponibilidad en vivo</a></li>
              <li className="footer-link-item"><Link to="/cotizar">Cotizador interactivo</Link></li>
              <li className="footer-link-item"><a href="#contacto">Contacto y citas</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="footer-col-heading">Celebraciones</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/cotizar?tipo=boda">Bodas y recepciones</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=xv-anos">XV Años de gala</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=cumpleanos">Cumpleaños</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=graduacion">Graduaciones</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=aniversario">Aniversarios</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=corporativo">Eventos corporativos</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="footer-col-heading">Atención Directa</h4>
            <div className="footer-contact-info">
              <a 
                href={initialBusinessData.whatsappUrl + "?text=" + encodeURIComponent("Hola La Antigua Eventos, me interesa solicitar informes para mi evento.")} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-pill"
                style={{ borderColor: "rgba(37, 211, 102, 0.4)", color: "#FFFFFF" }}
              >
                <WhatsAppIcon size={16} style={{ color: "#25D366" }} />
                <span>WhatsApp: {initialBusinessData.phoneFormatted}</span>
              </a>

              <a 
                href={initialBusinessData.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-pill"
              >
                <span>Instagram: @{initialBusinessData.instagram}</span>
              </a>

              <span style={{ fontSize: "0.8rem", color: "#A8A29E", lineHeight: 1.5 }}>
                {initialBusinessData.city}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="footer-legal-disclaimer">
          {initialBusinessData.disclaimer}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {initialBusinessData.name}. Todos los derechos reservados.
          </div>

          <div className="footer-bs-code-tag">
            {initialBusinessData.footerNote}
          </div>

          <div>
            <Link to="/admin/login" className="footer-admin-link">
              Acceso a Panel EventFlow Admin →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
