import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, ShoppingCart, AlertTriangle, Plus, UserPlus, Receipt } from 'lucide-react';
import { formatCurrency, formatCurrencyFull } from '../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { spendingTrends } from '../data/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const { rfqs, approvals, purchaseOrders } = useAppData();
  const navigate = useNavigate();

  const stats = [
    { label: 'Active RFQs', value: rfqs.filter(r => r.status !== 'draft').length || 12, icon: FileText, color: 'blue' },
    { label: 'Pending Approvals', value: approvals.filter(a => a.status.startsWith('awaiting')).length || 5, icon: Clock, color: 'amber' },
    { label: "PO's this Month", value: formatCurrency(purchaseOrders.reduce((s, p) => s + (p.grandTotal || 0), 0) || 230000), icon: ShoppingCart, color: 'green' },
    { label: 'Overdue Invoices', value: purchaseOrders.filter(p => p.status === 'pending_payment').length || 3, icon: AlertTriangle, color: 'red' },
  ];

  const recentPOs = purchaseOrders.slice(0, 3);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, {user?.firstName} — Today's Overview</p>
        </div>
      </div>

      <div className="grid-4 mb-lg">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card stat-card" style={{ animationDelay: `${i * 80}ms`, animation: 'slideUp 0.5s ease both' }}>
              <div className={`stat-icon ${s.color}`}><Icon size={22} /></div>
              <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
            </div>
          );
        })}
      </div>

      <div className="grid-2 mb-lg" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="card">
          <h3 className="section-title">Spending Trends — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={spendingTrends}>
              <defs><linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#1a2236', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#f1f5f9' }} formatter={(v) => [formatCurrencyFull(v), 'Spend']} />
              <Area type="monotone" dataKey="amount" stroke="#10b981" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="section-title">Quick Actions</h3>
          <div className="flex flex-col gap-sm">
            <button className="btn btn-primary w-full" onClick={() => navigate('/rfq/create')}><Plus size={18} /> New RFQ</button>
            <button className="btn btn-secondary w-full" onClick={() => navigate('/vendors')}><UserPlus size={18} /> Add Vendor</button>
            <button className="btn btn-secondary w-full" onClick={() => navigate('/purchase-orders')}><Receipt size={18} /> View Invoices</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Recent Purchase Orders</h3>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>PO #</th><th>Vendor</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {recentPOs.map(po => (
                <tr key={po.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/po/${po.id}`)}>
                  <td style={{ fontWeight: 600 }}>{po.poNumber}</td>
                  <td>{po.vendorName}</td>
                  <td>{formatCurrencyFull(po.grandTotal)}</td>
                  <td><span className={`badge badge-${po.status === 'paid' ? 'approved' : 'pending'}`}>{po.status === 'paid' ? 'Paid' : po.status === 'pending_payment' ? 'Pending' : 'Draft'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
