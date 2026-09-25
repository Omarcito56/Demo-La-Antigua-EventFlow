import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

const steps = [
  {
    num: "01",
    title: "Consulta",
    desc: "Revisa fechas abiertas y consulta disponibilidad en el calendario interactivo sin esperas."
  },
  {
    num: "02",
    title: "Cotiza",
    desc: "Selecciona tu formato de evento, número de invitados y recibe un presupuesto estimado en tiempo real."
  },
  {
    num: "03",
    title: "Personaliza",
    desc: "Agrega extras a tu medida: mobiliario especial, estación de postres, ambientación y fotografía."
  },
  {
    num: "04",
    title: "Aparta",
    desc: "Asegura tu fecha mediante un anticipo pactado y genera tu folio formal de seguimiento."
  },
  {
    num: "05",
    title: "Da seguimiento",
    desc: "Coordina detalles operativos, visitas al recinto y mantén la organización centralizada de tu evento."
  }
];

export const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">PASO A PASO</span>
          <h2 className="section-title-editorial">De la fecha al gran día</h2>
          <p className="section-subtext">
            Un proceso pensado para que organizar tu celebración en La Antigua Eventos sea claro, ágil y sin fricciones desde el primer momento.
          </p>
        </div>

        <div className="experience-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="experience-step-card">
              <span className="experience-step-num">{step.num}</span>
              <h3 className="experience-step-title">{step.title}</h3>
              <p className="experience-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a 
            href="#disponibilidad" 
            className="btn btn-primary btn-lg"
            onClick={() => {
              trackEvent("demo_cta_clicked", {
                cta_name: "consultar_fecha_experience",
                location: "experience_section"
              });
            }}
          >
            <CalendarIcon size={18} />
            <span>Consultar disponibilidad</span>
          </a>

          <Link 
            to="/cotizar" 
            className="btn btn-secondary btn-lg"
            onClick={() => {
              trackEvent("demo_cta_clicked", {
                cta_name: "iniciar_cotizacion_experience",
                location: "experience_section"
              });
            }}
          >
            <span>Cotizar mi evento</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
