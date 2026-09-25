import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { SearchIcon, FilterIcon, EyeIcon, XIcon, CheckCircleIcon } from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminQuotesPage = () => {
  const { quotes, updateQuoteStatus } = useEventData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [notice, setNotice] = useState("");

  useTrackOnMount("admin_quotes_opened", { module: "quotes" });

  const QUOTE_STATUSES = [
    "Borrador",
    "Enviada",
    "Aceptada",
    "Rechazada",
    "Vencida"
  ];

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      (q.folio && q.folio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.clientName && q.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.eventType && q.eventType.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "todos" || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    updateQuoteStatus(id, newStatus);
    setNotice(`Estado de cotización actualizado a "${newStatus}"`);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    }
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div>
      {notice && (
        <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1.25rem" }}>
          <div className="alert-content-left">
            <CheckCircleIcon size={16} />
            <span>{notice}</span>
          </div>
        </div>
      )}

      <div className="admin-card-table">
        <div className="admin-table-toolbar">
          <div className="table-toolbar-left">
            <div className="table-search-input-wrap">
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Buscar cotización por folio o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FilterIcon size={16} style={{ color: "var(--color-text-muted)" }} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: "0.45rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", fontSize: "0.85rem" }}
              >
                <option value="todos">Todos los estados</option>
                {QUOTE_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
            Cotizaciones registradas: <strong>{filteredQuotes.length}</strong>
          </div>
        </div>

        {/* Tabla solicitada: Folio | Cliente | Fecha | Evento | Paquete | Total | Estado | Acciones */}
        <div className="table-responsive-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Evento</th>
                <th>Paquete</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="folio-cell">{quote.folio}</td>
                  <td className="client-name-cell ph-mask">{quote.clientName}</td>
                  <td style={{ fontWeight: 600 }}>{quote.date}</td>
                  <td>{quote.eventType}</td>
                  <td>{quote.packageName}</td>
                  <td style={{ fontWeight: 700, color: "var(--color-charcoal-deep)" }}>
                    ${(quote.total || 0).toLocaleString("es-MX")} MXN
                  </td>
                  <td>
                    <StatusBadge status={quote.status} />
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem" }}
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <EyeIcon size={13} />
                        <span>Ver</span>
                      </button>

                      <select
                        value={quote.status}
                        onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                        style={{ padding: "0.25rem 0.45rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)", fontSize: "0.75rem", cursor: "pointer" }}
                      >
                        {QUOTE_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalle de Cotización */}
      {selectedQuote && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedQuote(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontWeight: 700 }}>
                  Detalle de Cotización
                </span>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-charcoal-deep)" }}>
                  Folio: {selectedQuote.folio}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedQuote(null)} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Cliente</span>
                  <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }} className="ph-mask">{selectedQuote.clientName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }} className="ph-mask">{selectedQuote.clientEmail}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Fecha del evento</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.date}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Formato de celebración</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.eventType}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Paquete seleccionado</span>
                  <div style={{ fontWeight: 600, color: "var(--color-terracotta)" }}>{selectedQuote.packageName}</div>
                </div>
              </div>

              <div style={{ padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Total cotizado:</span>
                  <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-terracotta)" }}>
                    ${(selectedQuote.total || 0).toLocaleString("es-MX")} MXN
                  </div>
                </div>
                <StatusBadge status={selectedQuote.status} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
