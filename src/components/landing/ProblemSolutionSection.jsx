import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboardIcon, CalendarIcon, FileTextIcon, ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const ProblemSolutionSection = () => {
  return (
    <section className="system-pitch-section">
      <div className="container">
        <div className="pitch-grid">
          {/* Left Content */}
          <div className="pitch-content">
            <span className="eyebrow" style={{ color: "var(--color-champagne)" }}>
              PROPUESTA PARA LA ANTIGUA EVENTOS
            </span>
            <h2 className="pitch-title">
              Menos mensajes para consultar fechas.<br />
              Más tiempo para organizar eventos.
            </h2>
            <p className="pitch-text">
              Una plataforma como EventFlow puede centralizar solicitudes, disponibilidad, cotizaciones, clientes y anticipos para facilitar el trabajo diario.
            </p>

            <div className="pitch-features-list">
              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <CalendarIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Calendario y disponibilidad inmediata</h4>
                  <p>Permite a los clientes comprobar fechas libres antes de enviar un mensaje, filtrando prospectos calificados.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <FileTextIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Cotizaciones claras en tiempo real</h4>
                  <p>Automatiza el desglose de paquetes y extras por comensal, reduciendo cotizaciones manuales por chat.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <LayoutDashboardIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Control de solicitudes, anticipos y saldos</h4>
                  <p>Centraliza cada prospecto, seguimiento comercial y apartado desde un solo panel administrativo.</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link 
                to="/cotizar" 
                className="btn btn-accent"
                onClick={() => {
                  trackEvent("demo_cta_clicked", {
                    cta_name: "probar_cotizador_pitch",
                    location: "problem_solution_section"
                  });
                }}
              >
                <span>Probar cotizador demo</span>
                <ArrowRightIcon size={16} />
              </Link>

              <Link 
                to="/admin/login" 
                className="btn btn-outline"
                style={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.4)" }}
              >
                <span>Ver panel administrativo demo</span>
              </Link>
            </div>
          </div>

          {/* Right Visual: Representación Elegante del Calendario Administrativo */}
          <div className="pitch-admin-mock">
            <div className="mock-window-bar">
              <div className="mock-dots">
                <span className="mock-dot" style={{ backgroundColor: "#EF4444" }} />
                <span className="mock-dot" style={{ backgroundColor: "#F59E0B" }} />
                <span className="mock-dot" style={{ backgroundColor: "#10B981" }} />
              </div>
              <span className="mock-title">EventFlow Admin · La Antigua Eventos</span>
              <span className="mock-active-badge">● Agenda en Vivo</span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mock-stats-row">
              <div className="mock-stat-box">
                <div className="mock-stat-val">5</div>
                <div className="mock-stat-label">Solicitudes nuevas</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">34</div>
                <div className="mock-stat-label">Fechas consultadas</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">$30,000</div>
                <div className="mock-stat-label">Anticipos demo</div>
              </div>
            </div>

            {/* Calendario Administrativo Representativo */}
            <div style={{ padding: "1.25rem", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "var(--radius-sm)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-champagne)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Calendario Operativo
                </span>
                <span style={{ fontSize: "0.74rem", color: "#A8A29E" }}>
                  Control de Fechas & Estados
                </span>
              </div>

              {/* Mini Calendar Representation */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.4rem", textAlign: "center", fontSize: "0.72rem" }}>
                {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                  <span key={i} style={{ color: "#78716C", fontWeight: 600, paddingBottom: "0.2rem" }}>{d}</span>
                ))}
                
                {/* 14 Representative Days */}
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>12</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", borderRadius: "4px", color: "#FDE68A", fontWeight: 700 }}>
                  13<span style={{ display: "block", fontSize: "0.6rem" }}>Cotiz.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>14</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", borderRadius: "4px", color: "#A7F3D0", fontWeight: 700 }}>
                  15<span style={{ display: "block", fontSize: "0.6rem" }}>Conf.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>16</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(168, 108, 96, 0.25)", border: "1px solid rgba(168, 108, 96, 0.5)", borderRadius: "4px", color: "#FCA5A5", fontWeight: 700 }}>
                  17<span style={{ display: "block", fontSize: "0.6rem" }}>Apart.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>18</div>
              </div>
            </div>

            {/* Mock Table Stream */}
            <div className="mock-table-wrap">
              <div className="mock-table-heading">
                ÚLTIMAS SOLICITUDES Y FECHAS
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>ANT-000121</strong> · Mariana Garza (Boda)
                </div>
                <span className="status-badge badge-blue">Nueva</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>ANT-000123</strong> · Andrea Rguez. (XV años)
                </div>
                <span className="status-badge badge-warning">Cotizando</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>ANT-000125</strong> · Fda. López (Graduación)
                </div>
                <span className="status-badge badge-success">Confirmada</span>
              </div>
            </div>

            <div className="mock-footer-row">
              <span className="mock-footer-note">Centralizado en un solo lugar</span>
              <Link to="/admin/login" className="mock-admin-link">
                Acceso a administración demo →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
