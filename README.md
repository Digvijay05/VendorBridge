# VendorBridge — Enterprise Vendor & Procurement Management Portal

VendorBridge is a modern, high-performance, glassmorphic SaaS portal designed to streamline the enterprise procurement lifecycle. It bridges the gap between organization requesters, procurement managers, vendors, and finance approvers. 

The application is built using **React + Vite**, styled with a customized **Vanilla CSS design system**, and powered by a centralized local state repository (with role-based simulated sessions and complete CRUD operation flows).

---

## 🚀 Key Features

### 🔐 1. Multi-Role Authentication & Access Control
- **Admin**: System-wide configuration, user management, and activity monitoring.
- **Procurement Manager**: Manage vendors, build Requests for Quotation (RFQs), compare bids, and draft Purchase Orders.
- **Requester / Approver**: Raise procurement requests, approve RFQs, sign off on Purchase Orders, and authorize Invoice payments.
- **Vendor**: View assigned RFQs, submit binding quotations, track POs, and generate invoices.
- Centralized `AuthContext` to persist sessions, handle logouts, and enforce page routing/guard rails.

### 📊 2. Dynamic Dashboard & Procurement Analytics
- Glassmorphic stat cards displaying critical metrics (Total Spend, Active RFQs, Pending Approvals, Action Items).
- Interactive charting with **Recharts**:
  - **Spend Trend**: Area chart showing monthly spend patterns.
  - **Category Breakdown**: Pie chart displaying spend across departments (IT, Operations, Logistics, etc.).
  - **RFQ Success Rate**: Bar chart depicting completed vs canceled RFQs.
- Quick action panels adapted to the logged-in user's role.

### 🏢 3. Vendor Directory & Management
- Searchable and filterable data tables for vendor records.
- Status segmentation tabs: *All*, *Active*, *Pending*, *Blocked* with dynamic item counts.
- Add Vendor modal capturing company name, category, GST number, contact person, email, and phone.

### 📝 4. Request for Quotation (RFQ) Wizard
- Interactive 3-step wizard for creating RFQs:
  - **Step 1: Details**: Title, category, deadline date, and description.
  - **Step 2: Line Items**: Dynamic table row editor to specify item names, quantities, and units.
  - **Step 3: Vendor Assignment**: Multi-select assignment of registered vendors to bid on the RFQ.

### 🤝 5. Quotation Submission & Side-by-Side Comparison
- **Vendor Portal**: Secure form where assigned vendors submit unit pricing, delivery timelines, and special notes.
- **Comparison Engine**: Side-by-side comparison matrix of all submitted vendor bids.
- **Smart Highlighting**: Automatically highlights the lowest-cost bid for every line item to help procurement managers optimize costs.
- One-click winning bid selection to transition RFQ to Purchase Order drafting.

### ✍️ 6. Multi-Stage Approval Workflow
- Center list of pending approvals (RFQs, POs, Invoices) requiring approver action.
- Sliding side-panel drawer displaying detailed previews of the item, line items, and audit trails.
- Actionable Approve and Reject modals with mandatory rejection comment fields.

### 📄 7. PO & Invoice Generation (with PDF Export)
- Auto-generation of Purchase Orders from winning bids.
- Print-ready purchase order and invoice layouts designed like professional invoices.
- **html2pdf.js** integration allowing users to download official POs and Invoices as PDFs.
- Progression stepper tracking stages: *Draft -> Approved -> Invoice Generated -> Paid*.

---

## 🛠️ Technology Stack

- **Core**: React 18, Vite (Fast HMR)
- **Routing**: React Router DOM (v6)
- **Charts**: Recharts (SVG-based responsive charts)
- **Icons**: Lucide React (Clean, scalable icons)
- **PDF Generation**: html2pdf.js (Client-side HTML-to-PDF rendering)
- **Styling**: Modern Vanilla CSS
  - Custom variables for dark mode and neon accent palettes (`#6366f1` Indigo, `#10b981` Emerald, `#f59e0b` Amber).
  - Modern layout techniques (CSS Grid, Flexbox, Aspect-Ratio).
  - Premium glassmorphism effects (`backdrop-filter: blur(12px)`).
  - Smooth micro-animations for interactive elements.

---

## 📂 Project Structure

```text
VendorBridge/
├── public/                  # Static assets & SVG icons
├── src/
│   ├── assets/              # Default images and styles
│   ├── context/
│   │   ├── AuthContext.jsx      # Session management & roles
│   │   ├── AppDataContext.jsx   # Core CRUD state reducer (RFQs, POs, etc.)
│   │   └── ToastContext.jsx     # Global feedback alerts
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── VendorsPage.jsx
│   │   ├── CreateRFQPage.jsx
│   │   ├── SubmitQuotationPage.jsx
│   │   ├── QuotationComparisonPage.jsx
│   │   ├── ApprovalWorkflowPage.jsx
│   │   ├── PurchaseOrdersListPage.jsx
│   │   ├── POInvoicePage.jsx
│   │   ├── ActivityLogsPage.jsx
│   │   └── ReportsPage.jsx
│   ├── utils/
│   │   ├── mockData.js          # Preloaded data for all roles
│   │   └── formatters.js        # Date/Currency helper functions
│   ├── App.jsx              # Main routing & guards
│   ├── index.css            # Base design system & components
│   └── main.jsx             # React entrypoint
├── Dockerfile               # Multi-stage Docker config for Render/Railway
├── nginx.conf               # Nginx server configuration for static deployment
├── package.json
└── vite.config.js
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/VendorBridge.git
   cd VendorBridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🐳 Docker Deployment

The project contains a production-ready **Dockerfile** that builds the application and serves it via a lightweight Node-based static serve daemon. This setup is fully optimized for container platforms like **Render**, **Railway**, or self-hosted **Docker** environments.

### Running with Docker locally

1. Build the Docker image:
   ```bash
   docker build -t vendorbridge:latest .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name vendorbridge vendorbridge:latest
   ```
   Access the app at `http://localhost:3000`.

### Deploying to Render
1. Create a new **Web Service** on Render.
2. Connect this repository.
3. Render will automatically detect the `Dockerfile` in the root.
4. Set the environment variable `PORT` to `10000` (or let Render assign it).
5. Deploy! Render will build the static bundle and serve it reliably.
