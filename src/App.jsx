import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { ToastProvider } from './context/ToastContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import VendorsPage from './pages/VendorsPage';
import CreateRFQPage from './pages/CreateRFQPage';
import SubmitQuotationPage from './pages/SubmitQuotationPage';
import QuotationComparisonPage from './pages/QuotationComparisonPage';
import ApprovalWorkflowPage from './pages/ApprovalWorkflowPage';
import POInvoicePage from './pages/POInvoicePage';
import PurchaseOrdersListPage from './pages/PurchaseOrdersListPage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import ReportsPage from './pages/ReportsPage';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/vendors': 'Vendors',
  '/rfq/create': "Create RFQ",
  '/quotations': 'Quotation Comparison',
  '/approvals': 'Approval Workflow',
  '/purchase-orders': 'Purchase Orders',
  '/invoices': 'Invoices',
  '/reports': 'Reports & Analytics',
  '/activity': 'Activity & Logs',
};

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const path = '/' + location.pathname.split('/').filter(Boolean)[0];
  const title = pageTitles[location.pathname] || pageTitles[path] || 'VendorBridge';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <div className="page-content"><Outlet /></div>
      </div>
    </div>
  );
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/vendors" element={<VendorsPage />} />
                <Route path="/rfq/create" element={<CreateRFQPage />} />
                <Route path="/quotations" element={<QuotationComparisonPage />} />
                <Route path="/quotation/submit" element={<SubmitQuotationPage />} />
                <Route path="/quotation/submit/:rfqId" element={<SubmitQuotationPage />} />
                <Route path="/approvals" element={<ApprovalWorkflowPage />} />
                <Route path="/purchase-orders" element={<PurchaseOrdersListPage />} />
                <Route path="/invoices" element={<PurchaseOrdersListPage />} />
                <Route path="/po/:poId" element={<POInvoicePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/activity" element={<ActivityLogsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </ToastProvider>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
