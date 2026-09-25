import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LaAntiguaLogoIcon, MenuIcon, XIcon, ArrowRightIcon, CalendarIcon, WhatsAppIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";
import { trackEvent } from "../../analytics/analytics";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hashId) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${hashId}`);
      return;
    }
    const elem = document.getElementById(hashId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = (ctaName, targetRoute) => {
    trackEvent("demo_cta_clicked", {
      cta_name: ctaName,
      location: "navbar",
      target_route: targetRoute
    });
    setMobileOpen(false);
  };

  return (
    <header className={`navbar-editorial ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-emblem">
            <LaAntiguaLogoIcon size={24} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">La Antigua</span>
            <span className="navbar-brand-subtitle">Eventos</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === "/" && !location.hash ? "active" : ""}`}
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <a 
              href="#experiencias" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("experiencias");
              }}
            >
              Experiencias
            </a>
          </li>
          <li>
            <a 
              href="#paquetes" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("paquetes");
              }}
            >
              Paquetes
            </a>
          </li>
          <li>
            <a 
              href="#disponibilidad" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("disponibilidad");
              }}
            >
              Disponibilidad
            </a>
          </li>
          <li>
            <Link 
              to="/cotizar" 
              className={`navbar-link ${location.pathname === "/cotizar" ? "active" : ""}`}
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              Cotiza
            </Link>
          </li>
          <li>
            <a 
              href="#contacto" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contacto");
              }}
            >
              Contacto
            </a>
          </li>

          {/* Mobile Actions inside Drawer */}
          <li className="navbar-mobile-actions">
            <a 
              href="#disponibilidad" 
              className="btn btn-primary btn-block"
              onClick={(e) => {
                e.preventDefault();
                handleCtaClick("consultar_fecha_mobile", "#disponibilidad");
                handleNavClick("disponibilidad");
              }}
            >
              <CalendarIcon size={16} />
              <span>Consultar fecha</span>
            </a>
            <Link 
              to="/cotizar" 
              className="btn btn-secondary btn-block"
              onClick={() => {
                handleCtaClick("cotizar_evento_mobile", "/cotizar");
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              <span>Cotizar evento</span>
              <ArrowRightIcon size={16} />
            </Link>
            <a 
              href={`https://wa.me/528991055896?text=${encodeURIComponent("Hola La Antigua Eventos, deseo consultar disponibilidad y paquetes para mi evento")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp 899 105 5896</span>
            </a>
          </li>
        </ul>

        {/* Actions Desktop */}
        <div className="navbar-actions">
          <a 
            href={`https://wa.me/528991055896?text=${encodeURIComponent("Hola La Antigua Eventos, deseo consultar disponibilidad y paquetes para mi evento")}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-action-whatsapp"
            title="Atención directa WhatsApp: 899 105 5896"
          >
            <WhatsAppIcon size={17} />
            <span>WhatsApp</span>
          </a>

          {/* CTA secundario: Cotizar evento */}
          <Link 
            to="/cotizar" 
            className="btn btn-secondary btn-sm navbar-action-quote"
            onClick={() => handleCtaClick("cotizar_evento", "/cotizar")}
          >
            <span>Cotizar evento</span>
          </Link>

          {/* CTA principal: Consultar fecha */}
          <a 
            href="#disponibilidad" 
            className="btn btn-primary btn-sm navbar-action-calendar"
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick("consultar_fecha", "#disponibilidad");
              handleNavClick("disponibilidad");
            }}
          >
            <CalendarIcon size={15} />
            <span>Consultar fecha</span>
          </a>

          {/* Mobile hamburger button */}
          <button 
            type="button" 
            className="navbar-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú principal"
          >
            {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
