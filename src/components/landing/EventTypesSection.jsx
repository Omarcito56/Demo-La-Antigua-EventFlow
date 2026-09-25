import React from "react";
import { Link } from "react-router-dom";
import { eventTypesList } from "../../data/eventFlowData";
import { ArrowRightIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const EventTypesSection = () => {
  const allowedTypes = eventTypesList.filter(t => t.id !== "otro");

  const handleTypeClick = (typeId) => {
    trackEvent("demo_cta_clicked", {
      cta_name: "select_event_type_card",
      event_type: typeId,
      location: "event_types_section"
    });
  };

  return (
    <section className="event-types-section" id="experiencias">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">EXPERIENCIAS A TU MEDIDA</span>
          <h2 className="section-title-editorial">Cada celebración comienza diferente</h2>
          <p className="section-subtext">
            Espacios versátiles, montajes distinguidos y ambientación romántica moderna para que cada evento en La Antigua Eventos tenga un sello único e inolvidable.
          </p>
        </div>

        <div className="event-types-grid">
          {allowedTypes.map((type) => (
            <Link 
              key={type.id} 
              to={`/cotizar?tipo=${type.id}&paquete=${type.popularPackage}`}
              className="event-type-card"
              onClick={() => handleTypeClick(type.id)}
            >
              <img 
                src={type.image} 
                alt={`Celebración de ${type.name} en La Antigua Eventos`} 
                className="event-type-bg-img"
                loading="lazy"
              />
              <div className="event-type-gradient-overlay" />
              <div className="event-type-card-content">
                <h3 className="event-type-name">{type.name}</h3>
                <p className="event-type-sub">{type.subtitle}</p>
                <div className="event-type-cta-link">
                  <span>Cotizar {type.name}</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
