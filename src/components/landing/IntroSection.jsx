import React from "react";
import { CalendarIcon, SparklesIcon, HeartIcon, ShieldCheckIcon } from "../common/Icons";

export const IntroSection = () => {
  return (
    <section className="intro-section" id="concepto">
      <div className="container">
        <div className="intro-grid">
          {/* Visual Composition */}
          <div className="intro-photo-composition">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80" 
              alt="Montaje romántico y floral en La Antigua Eventos"
              className="intro-img-main"
              loading="lazy"
            />
            <div className="intro-card-overlay">
              <div className="intro-overlay-num">100%</div>
              <p className="intro-overlay-text">
                Experiencia integral: consulta tu fecha, cotiza en vivo, aparta y organiza cada detalle de tu gran celebración.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="intro-content">
            <span className="eyebrow">CONCEPTO COMERCIAL</span>
            <h2 className="intro-heading">
              Consulta tu fecha + Cotiza + Aparta + Organiza tu evento
            </h2>
            <p className="intro-text-concept">
              En La Antigua Eventos unimos la calidez de un espacio romántico y moderno con una solución digital ágil. Descubre fechas disponibles al instante, cotiza con transparencia y asegura tu día especial sin demoras.
            </p>

            <div className="intro-points-grid">
              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <CalendarIcon size={22} />
                </div>
                <h3 className="intro-point-title">Disponibilidad en Tiempo Real</h3>
                <p className="intro-point-desc">
                  Comprueba el calendario interactivo con fechas abiertas, en proceso y apartadas antes de iniciar.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <SparklesIcon size={22} />
                </div>
                <h3 className="intro-point-title">Ambiente Romántico y Moderno</h3>
                <p className="intro-point-desc">
                  Instalaciones de atmósfera refinada, mobiliario de diseño, iluminación cálida y jardines para fotografía.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <HeartIcon size={22} />
                </div>
                <h3 className="intro-point-title">Personalización Completa</h3>
                <p className="intro-point-desc">
                  Paquetes base ajustables por comensal y complementos gastronómicos, audiovisuales y decorativos.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <ShieldCheckIcon size={22} />
                </div>
                <h3 className="intro-point-title">Apartado y Organización</h3>
                <p className="intro-point-desc">
                  Generación de folio único, simulación de anticipo y seguimiento centralizado de tu solicitud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
