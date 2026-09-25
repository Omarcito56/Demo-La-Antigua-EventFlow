# BS EventFlow — La Antigua Eventos

Propuesta comercial interactiva desarrollada por **BS Code** para digitalizar la consulta de disponibilidad en calendario, cotización inicial en tiempo real, selección de fecha, número de invitados, servicios adicionales, solicitud formal, registro de cliente, simulación de apartado con anticipo demo y administración completa de eventos para **La Antigua Eventos** (Reynosa, Tamaulipas).

---

## 1. Arquitectura Técnica Estable

- **Framework**: React 19 + Vite
- **Lenguaje**: JavaScript (ES Modules)
- **Enrutamiento**: React Router DOM (v7)
- **Estilos**: CSS Puro (con variables editoriales, paleta Crema / Rosa polvo / Terracota / Verde oscuro / Carbón / Champagne / Blanco y micro-interacciones "Romantic Modern Venue")
- **Almacenamiento Local**: `localStorage` reactivo (`useEventData`) con persistencia sincronizada y folios secuenciales (`ANT-000126+`)
- **Despliegue**: Optimizado para Vercel con `vercel.json` (SPA fallback)
- **Analítica de Producto**: Vercel Web Analytics + PostHog Product Analytics & Session Replay

---

## 2. Experiencia de Usuario & Flujos

### Web Pública
- **Landing Page Editorial**:
  - Hero asimétrico con fotografía de alta gama e indicadores: Fechas, Cotizaciones, Apartados, Seguimiento.
  - Título principal: *"Tu fecha. Tu celebración. Tu momento."*
  - Subtexto: *"Consulta disponibilidad, explora opciones y comienza a organizar tu evento de una manera sencilla."*
  - Concepto comercial: *"CONSULTA TU FECHA + COTIZA + APARTA + ORGANIZA TU EVENTO"*
  - Sección principal de disponibilidad: *"¿Ya tienes una fecha en mente?"* con mini calendario interactivo y 4 estados oficiales:
    - **Disponible**
    - **Disponibilidad limitada**
    - **En proceso**
    - **Apartada**
  - Catálogo de 3 paquetes demostrativos: **Esencial**, **Celebración** y **Experiencia** (con aviso visible de **PRECIOS DEMOSTRATIVOS**).
  - Selector visual por formatos de celebración: Boda, XV años, Cumpleaños, Graduación, Aniversario, Evento corporativo y Evento privado (*"Cada celebración comienza diferente"*).
  - Flujo de 5 pasos: *"De la fecha al gran día"* (01 Consulta, 02 Cotiza, 03 Personaliza, 04 Aparta, 05 Da seguimiento).
  - Pitch comercial del sistema: *"Menos mensajes para consultar fechas. Más tiempo para organizar eventos."* con representación interactiva del calendario administrativo.
  - CTA Final: *"Todo empieza con una fecha."*
  - Contacto verificado: WhatsApp oficial (`899 105 5896`) e Instagram (`@laantiguaeventos`).
- **Cotizador Central (`/cotizar`)**:
  - Flujo guiado de 7 pasos con prioridad a la fecha:
    1. **01 Fecha**: Date picker validado contra fechas pasadas + disponibilidad demostrativa en vivo (Disponible, Disponibilidad limitada, En proceso, Apartada).
    2. **02 Evento**: Selección de formato (Boda, XV años, Cumpleaños, Graduación, Aniversario, Corporativo, Otro).
    3. **03 Invitados**: Control numérico y rangos sugeridos (1-50, 51-100, 101-150, 151-200, 200+).
    4. **04 Opción**: Renta del espacio, Esencial, Celebración, Experiencia.
    5. **05 Extras**: Activación independiente de servicios adicionales demo (Decoración especial, Mesa de postres, Bebidas, Audio e iluminación, DJ, Fotografía, Video, Mobiliario especial, Personal adicional).
    6. **06 Datos**: Formulario de contacto protegido con `.ph-mask` y privacidad estricta.
    7. **07 Resumen**: Desglose formal de cotización y envío de solicitud a La Antigua Eventos.
  - Barra de cálculo dinámico permanente con desglose de opción base, ajuste por invitados y extras en tiempo real.
- **Confirmación (`/confirmacion`)**:
  - Folio generado correlativo (`ANT-000128+`) y estado inicial *"Solicitud recibida"*.
  - Título: *"Tu fecha ya está en proceso ✨"*
  - Botón directo de seguimiento inmediato por WhatsApp (`899 105 5896`).
  - Simulador *"Aparta tu fecha"* con cálculo de anticipo demo ($5,000 MXN), restante estimado, simulación de método (Transferencia demo / Tarjeta demo) y badge explícito de **SIMULACIÓN**.

### Panel de Administración (`/admin` / `EventFlow Admin`)
1. **Resumen (`/admin/dashboard`)**: Métricas clave en tiempo real con protagonismo a fechas:
   - **Solicitudes nuevas**
   - **Fechas consultadas**
   - **Cotizaciones pendientes**
   - **Eventos confirmados**
   - **Anticipos registrados**
   - Módulo **Próximas fechas** (Fecha, Evento, Estado).
2. **Solicitudes (`/admin/solicitudes`)**: Tabla interactiva con columnas (Folio, Cliente, Fecha, Evento, Invitados, Estimado, Estado, Acciones) y estados oficiales:
   - `Nueva`, `Contactado`, `Cotizando`, `Esperando anticipo`, `Confirmada`, `Descartada`.
3. **Calendario (`/admin/calendario`)**: Vista de agenda operativa y cuadrícula interactiva con 6 estados oficiales:
   - `Disponible`, `Solicitud`, `Cotización`, `Apartado`, `Confirmado`, `Bloqueado`.
   - Permite seleccionar fecha, ver solicitudes y eventos demo asociados, marcar estado y persistir los cambios en `localStorage`.
4. **Cotizaciones (`/admin/cotizaciones`)**: Tabla (Folio, Cliente, Fecha, Evento, Paquete, Total, Estado, Acciones) y estados:
   - `Borrador`, `Enviada`, `Aceptada`, `Rechazada`, `Vencida`.
5. **Eventos (`/admin/eventos`)**: Tabla (Folio, Cliente, Evento, Fecha, Invitados, Total, Pagado, Saldo, Estado, Acciones) y estados:
   - `Apartado`, `Confirmado`, `En preparación`, `Realizado`, `Cancelado`.
6. **Clientes (`/admin/clientes`)**: Directorio con historial de solicitudes y presupuestos estimados.
7. **Pagos (`/admin/pagos`)**: Control de anticipos, segundos pagos y liquidaciones registradas (estados: Pagado, Pendiente, Cancelado).
8. **Paquetes (`/admin/paquetes`)**: Edición de precios base, capacidades y descripciones en `localStorage`.
9. **Configuración (`/admin/configuracion`)**: Identidad comercial de La Antigua Eventos (nombre, WhatsApp, ciudad), parámetros de telemetría y zona de reinicio demo a valores iniciales de fábrica.

---

## 3. Configuración de Analytics y Telemetría

La demo reporta automáticamente al proyecto central de PostHog de BS Code (**"BS Code Demos"**):
- **`demoId`**: `la_antigua_eventflow`
- **`prospectId`**: `la_antigua`
- **`projectType`**: `bs_code_demo`
- **`projectName`**: `BS Code Demos`

Archivo de configuración central:
👉 `src/analytics/analyticsConfig.js`

### Eventos Instrumentados
- `demo_viewed`
- `demo_cta_clicked`
- `quote_started`
- `quote_event_type_selected`
- `quote_package_selected`
- `quote_extras_selected`
- `quote_date_selected`
- `quote_completed`
- `availability_checked`
- `deposit_demo_viewed`
- `deposit_demo_registered`
- `admin_requests_opened`
- `admin_quotes_opened`
- `admin_calendar_opened`
- `admin_events_opened`
- `admin_payments_opened`
- `request_status_changed`
- `quote_status_changed`
- `event_created`
- `admin_login_opened`
- `admin_login_success`
- `$pageview`

### Políticas de Privacidad y Session Replay
- Enmascaramiento total de entradas (`maskAllInputs: true`).
- Selectores de privacidad: `.ph-mask, [data-ph-mask]`.
- Filtro estricto que elimina nombres, teléfonos, WhatsApp, correos, domicilios y notas personales antes de enviar telemetría.
- Rangos agregados (`guest_range`, `estimated_total_range`) para evitar vincular montos o datos exactos a personas individuales.

---

## 4. Instrucciones para Ejecución Local

1. Instalar dependencias (si no están instaladas):
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar para producción:
   ```bash
   npm run build
   ```

4. Credenciales de acceso al panel administrativo demo:
   - **Ruta**: `/admin/login`
   - **Usuario**: `admin@eventflow.demo` (o `laantigua@eventflow.demo`)
   - **Contraseña**: `demo123`
   - (Cuenta con botón de autocompletado en pantalla).
