import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon, CalendarIcon, HeartIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const Hero = () => {
  const handleCta = (ctaName, target) => {
    trackEvent("demo_cta_clicked", {
      cta_name: ctaName,
      location: "hero",
      target_route: target
    });
  };

  return (
    <section className="hero-editorial">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & CTAs */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <SparklesIcon size={14} />
              <span>EVENTOS · CELEBRACIONES · MOMENTOS</span>
            </div>

            <h1 className="hero-title">
              Tu fecha.<br />
              Tu celebración.<br />
              <span style={{ color: "var(--color-primary)", fontStyle: "italic" }}>Tu momento.</span>
            </h1>

            <p className="hero-subtitle">
              Consulta disponibilidad, explora opciones y comienza a organizar tu evento de una manera sencilla.
            </p>

            <div className="hero-actions">
              <a 
                href="#disponibilidad" 
                className="btn btn-primary btn-lg"
                onClick={() => handleCta("consultar_disponibilidad", "#disponibilidad")}
              >
                <CalendarIcon size={18} />
                <span>Consultar disponibilidad</span>
              </a>

              <Link 
                to="/cotizar" 
                className="btn btn-secondary btn-lg"
                onClick={() => handleCta("cotizar_mi_evento", "/cotizar")}
              >
                <span>Cotizar mi evento</span>
                <ArrowRightIcon size={18} />
              </Link>
            </div>

            {/* 4 Indicadores discretos de la propuesta: Fechas, Cotizaciones, Apartados, Seguimiento */}
            <div className="hero-indicators">
              <div className="hero-indicator-item">
                <span className="indicator-number">01</span>
                <span className="indicator-label">Fechas</span>
                <span className="indicator-sub">Calendario y disponibilidad</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">02</span>
                <span className="indicator-label">Cotizaciones</span>
                <span className="indicator-sub">Presupuestos estimados</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">03</span>
                <span className="indicator-label">Apartados</span>
                <span className="indicator-sub">Simulación demostrativa</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">04</span>
                <span className="indicator-label">Seguimiento</span>
                <span className="indicator-sub">Organización en un solo lugar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fotografía Protagonista Romántica / Editorial */}
          <div className="hero-visual-wrap">
            <div className="hero-main-photo-card">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80" 
                alt="Montaje romántico y elegante en La Antigua Eventos" 
                className="hero-img-cover"
                loading="eager"
              />
              <div className="hero-floating-badge">
                <div className="hero-badge-left">
                  <span className="hero-badge-tag">Romantic Modern Venue</span>
                  <span className="hero-badge-title">La Antigua Eventos</span>
                </div>
                <div style={{ color: "var(--color-champagne)", display: "flex", alignItems: "center" }}>
                  <HeartIcon size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
