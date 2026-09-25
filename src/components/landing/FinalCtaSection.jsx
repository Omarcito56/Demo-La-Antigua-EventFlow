import React from "react";
import { ArrowRightIcon, CalendarIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const FinalCtaSection = () => {
  return (
    <section className="final-cta-section">
      <img 
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=80" 
        alt="Recepción romántica de celebración en La Antigua Eventos" 
        className="final-cta-bg-img"
        loading="lazy"
      />
      <div className="container">
        <div className="final-cta-content">
          <span className="eyebrow" style={{ color: "var(--color-champagne)" }}>
            DISPONIBILIDAD INMEDIATA
          </span>
          <h2 className="final-cta-title">
            Todo empieza con una fecha.
          </h2>
          <p className="final-cta-text">
            Consulta disponibilidad y comienza a organizar tu próxima celebración.
          </p>
          <a 
            href="#disponibilidad" 
            className="btn btn-accent btn-lg"
            onClick={() => {
              trackEvent("demo_cta_clicked", {
                cta_name: "consultar_mi_fecha_final",
                location: "final_cta_section"
              });
            }}
          >
            <CalendarIcon size={18} />
            <span>Consultar mi fecha</span>
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
