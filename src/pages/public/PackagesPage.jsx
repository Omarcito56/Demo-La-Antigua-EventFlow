import React from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { initialPackagesData } from "../../data/eventFlowData";
import { CheckIcon, ArrowRightIcon, UsersIcon, SparklesIcon, CalendarIcon } from "../../components/common/Icons";
import { useTrackOnMount } from "../../analytics/analytics";

export const PackagesPage = () => {
  const { packages, business } = useEventData();
  const filtered = packages.filter(p => p.id === "esencial" || p.id === "celebracion" || p.id === "experiencia");
  const displayPackages = filtered.length >= 3 ? filtered : initialPackagesData.slice(0, 3);

  useTrackOnMount("demo_viewed", {
    view_type: "packages_catalog",
    route: "/paquetes"
  });

  return (
    <div style={{ padding: "4rem 0 6rem", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <div className="section-header-centered">
          <span className="section-demo-badge">CATÁLOGO DEMOSTRATIVO</span>
          <h1 className="section-title-editorial">Una opción para cada celebración</h1>
          <p className="section-subtext">
            Conoce a detalle nuestros tres paquetes demostrativos para La Antigua Eventos. Personaliza invitados, servicios adicionales y solicita disponibilidad en tiempo real.
          </p>
        </div>

        <div className="packages-grid" style={{ marginBottom: "3rem" }}>
          {displayPackages.map((pkg) => (
            <article 
              key={pkg.id} 
              className={`package-card ${pkg.popular ? "highlighted" : ""}`}
            >
              <div className="package-card-img-wrap">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="package-card-img"
                  loading="lazy"
                />
                <span className="package-card-tag">{pkg.badge}</span>
              </div>

              <div className="package-card-body">
                <div className="package-card-title-row">
                  <h2 className="package-card-name">{pkg.name}</h2>
                </div>

                <div className="package-price-wrap">
                  <span className="package-price-from">Precio DEMO</span>
                  <div className="package-price-val">{pkg.priceFrom}</div>
                </div>

                <div className="package-capacity-pill">
                  <UsersIcon size={14} />
                  <span>{pkg.capacity}</span>
                </div>

                <p className="package-desc">{pkg.description}</p>

                <ul className="package-includes-list">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="package-include-item">
                      <CheckIcon size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-card-actions">
                  <Link 
                    to={`/cotizar?paquete=${pkg.id}`} 
                    className={`btn btn-block ${pkg.popular ? "btn-accent" : "btn-primary"}`}
                  >
                    <span>Configurar y cotizar</span>
                    <ArrowRightIcon size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", padding: "1.75rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
          <SparklesIcon size={24} style={{ color: "var(--color-accent)", margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1.25rem", color: "var(--color-charcoal-deep)", marginBottom: "0.5rem" }}>
            ¿Deseas rentar únicamente las instalaciones o un montaje a la medida?
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
            La Antigua Eventos puede adaptarse con opción de Renta del Espacio o personalización completa de mobiliario, barras de postres y ambientación.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/cotizar?paquete=renta-espacio" className="btn btn-secondary btn-sm">
              <span>Cotizar solo espacio</span>
            </Link>
            <Link to="/#disponibilidad" className="btn btn-primary btn-sm">
              <CalendarIcon size={15} />
              <span>Consultar calendario</span>
            </Link>
          </div>
        </div>

        <p className="package-disclaimer-note" style={{ marginTop: "2.5rem" }}>
          {business.disclaimer}
        </p>
      </div>
    </div>
  );
};
