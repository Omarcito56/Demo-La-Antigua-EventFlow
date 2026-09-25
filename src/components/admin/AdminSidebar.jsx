import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboardIcon, FileTextIcon, CalendarIcon, UsersIcon, 
  CreditCardIcon, SparklesIcon, SettingsIcon, LogOutIcon, ArrowLeftIcon, LaAntiguaLogoIcon 
} from "../common/Icons";
import { useEventData } from "../../hooks/useEventData";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { metrics, business } = useEventData();

  const handleLogout = () => {
    localStorage.removeItem("eventflow_auth");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon" style={{ backgroundColor: "var(--color-terracotta)", color: "#FFFFFF" }}>
          <LaAntiguaLogoIcon size={22} />
        </div>
        <div className="sidebar-brand-text">
          <h2 className="sidebar-title">EventFlow Admin</h2>
          <span className="sidebar-sub">{business.name}</span>
          <span className="sidebar-demo-tag">Propuesta Demo</span>
        </div>
      </div>

      {/* Nav Menu (Exact 9 items in required order) */}
      <ul className="sidebar-nav">
        {/* 1. Resumen */}
        <li>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <LayoutDashboardIcon size={18} />
            <span>Resumen</span>
          </NavLink>
        </li>

        {/* 2. Solicitudes */}
        <li>
          <NavLink 
            to="/admin/solicitudes" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <FileTextIcon size={18} />
            <span>Solicitudes</span>
            {metrics.newRequests > 0 && (
              <span className="sidebar-badge">{metrics.newRequests}</span>
            )}
          </NavLink>
        </li>

        {/* 3. Calendario */}
        <li>
          <NavLink 
            to="/admin/calendario" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <CalendarIcon size={18} />
            <span>Calendario</span>
          </NavLink>
        </li>

        {/* 4. Cotizaciones */}
        <li>
          <NavLink 
            to="/admin/cotizaciones" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <FileTextIcon size={18} />
            <span>Cotizaciones</span>
            {metrics.pendingQuotes > 0 && (
              <span className="sidebar-badge" style={{ backgroundColor: "#F59E0B", color: "#FFF" }}>
                {metrics.pendingQuotes}
              </span>
            )}
          </NavLink>
        </li>

        {/* 5. Eventos */}
        <li>
          <NavLink 
            to="/admin/eventos" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <SparklesIcon size={18} />
            <span>Eventos</span>
            {metrics.upcomingEvents > 0 && (
              <span className="sidebar-badge" style={{ backgroundColor: "#10B981", color: "#FFF" }}>
                {metrics.upcomingEvents}
              </span>
            )}
          </NavLink>
        </li>

        {/* 6. Clientes */}
        <li>
          <NavLink 
            to="/admin/clientes" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <UsersIcon size={18} />
            <span>Clientes</span>
          </NavLink>
        </li>

        {/* 7. Pagos */}
        <li>
          <NavLink 
            to="/admin/pagos" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <CreditCardIcon size={18} />
            <span>Pagos</span>
          </NavLink>
        </li>

        {/* 8. Paquetes */}
        <li>
          <NavLink 
            to="/admin/paquetes" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <SparklesIcon size={18} />
            <span>Paquetes</span>
          </NavLink>
        </li>

        {/* 9. Configuración */}
        <li>
          <NavLink 
            to="/admin/configuracion" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <SettingsIcon size={18} />
            <span>Configuración</span>
          </NavLink>
        </li>
      </ul>

      {/* Footer / Exit */}
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-btn-public">
          <ArrowLeftIcon size={14} />
          <span>Ver sitio web público</span>
        </Link>
        <button type="button" className="sidebar-btn-logout" onClick={handleLogout}>
          <LogOutIcon size={14} />
          <span>Cerrar sesión demo</span>
        </button>
      </div>
    </aside>
  );
};
