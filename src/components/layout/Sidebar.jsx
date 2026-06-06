import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, FileText, ClipboardList, CheckSquare, ShoppingCart, Receipt, BarChart3, Activity, Layers } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['procurement_officer', 'vendor', 'manager', 'admin'] },
  { path: '/vendors', label: 'Vendors', icon: Users, roles: ['procurement_officer', 'admin'] },
  { path: '/rfq/create', label: "RFQ's", icon: FileText, roles: ['procurement_officer', 'admin'] },
  { path: '/quotations', label: 'Quotations', icon: ClipboardList, roles: ['procurement_officer', 'vendor', 'admin'] },
  { path: '/approvals', label: 'Approvals', icon: CheckSquare, roles: ['procurement_officer', 'manager', 'admin'] },
  { path: '/purchase-orders', label: 'Purchase Orders', icon: ShoppingCart, roles: ['procurement_officer', 'vendor', 'admin'] },
  { path: '/invoices', label: 'Invoices', icon: Receipt, roles: ['procurement_officer', 'vendor', 'admin'] },
  { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['procurement_officer', 'admin'] },
  { path: '/activity', label: 'Activity', icon: Activity, roles: ['procurement_officer', 'vendor', 'manager', 'admin'] },
];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role || '';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon"><Layers size={18} /></div>
        <h1>VendorBridge</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.filter(item => item.roles.includes(role)).map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <NavLink key={item.path} to={item.path} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
