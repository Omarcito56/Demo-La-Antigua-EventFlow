import React from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { initialPackagesData } from "../../data/eventFlowData";
import { CheckIcon, ArrowRightIcon, UsersIcon, SparklesIcon, CalendarIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const PackagesSection = () => {
  const { packages, business } = useEventData();
  
  // Garantizar que siempre se muestren los 3 paquetes principales demostrativos
  const filtered = packages.filter(p => p.id === "esencial" || p.id === "celebracion" || p.id === "experiencia");
  const displayPackages = filtered.length >= 3 ? filtered : initialPackagesData.slice(0, 3);

  const handlePackageClick = (pkgId) => {
    trackEvent("demo_cta_clicked", {
      cta_name: "cotizar_paquete_card",
      package_id: pkgId,
      location: "packages_section"
    });
  };

  return (
    <section className="packages-section" id="paquetes">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-demo-badge">PRECIOS DEMOSTRATIVOS</span>
          <h2 className="section-title-editorial">Una opción para cada celebración</h2>
          <p className="section-subtext">
            Opciones pensadas para adaptarse a la atmósfera y formato de tu evento. Elige una propuesta base y personalízala según tus preferencias.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="packages-grid">
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
                  <h3 className="package-card-name">{pkg.name}</h3>
                </div>

                <div className="package-price-wrap">
                  <span className="package-price-from">PRECIO DEMO</span>
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
                    onClick={() => handlePackageClick(pkg.id)}
                  >
                    <span>Cotizar {pkg.name}</span>
                    <ArrowRightIcon size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4ta Opción Demostrativa: Renta del Espacio */}
        <div style={{ 
          maxWidth: "840px", 
          margin: "2.75rem auto 1.5rem", 
          textAlign: "center", 
          padding: "1.75rem 1.5rem", 
          backgroundColor: "var(--color-surface)", 
          borderRadius: "var(--radius-lg)", 
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-sm)"
        }}>
          <SparklesIcon size={24} style={{ color: "var(--color-accent)", margin: "0 auto 0.6rem" }} />
          <h3 style={{ fontSize: "1.2rem", color: "var(--color-charcoal-deep)", marginBottom: "0.4rem" }}>
            ¿Prefieres coordinar tus propios proveedores? Renta solo el espacio
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: "1.15rem", maxWidth: "620px", margin: "0 auto 1.15rem" }}>
            Opción demostrativa de <strong>Renta del Espacio</strong> con uso de instalaciones climatizadas, jardines y mobiliario básico desde <strong>$10,000 MXN</strong>.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            <Link 
              to="/cotizar?paquete=renta-espacio" 
              className="btn btn-secondary btn-sm"
              onClick={() => handlePackageClick("renta-espacio")}
            >
              <span>Cotizar solo espacio (Desde $10,000 MXN)</span>
              <ArrowRightIcon size={14} />
            </Link>
            <a href="#disponibilidad" className="btn btn-primary btn-sm">
              <CalendarIcon size={14} />
              <span>Ver calendario de disponibilidad</span>
            </a>
          </div>
        </div>

        {/* Mandatory Discrete Disclaimer */}
        <p className="package-disclaimer-note">
          {business.disclaimer}
        </p>
      </div>
    </section>
  );
};

