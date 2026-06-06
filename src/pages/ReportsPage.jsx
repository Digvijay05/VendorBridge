import { formatCurrencyFull } from '../utils/formatters';
import { DollarSign, Users, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { spendingTrends, spendingByCategory } from '../data/mockData';
import { useToast } from '../context/ToastContext';

const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#a855f7'];

export default function ReportsPage() {
  const toast = useToast();

  const stats = [
    { label: 'Total Spend', value: '₹ 12.4L', icon: DollarSign, color: 'green' },
    { label: 'Active Vendors', value: '28', icon: Users, color: 'blue' },
    { label: 'PO Fulfillment', value: '94%', icon: TrendingUp, color: 'amber' },
    { label: 'Overdue Invoices', value: '3', icon: AlertTriangle, color: 'red' },
  ];

  const handleExport = () => {
    const csv = 'Month,Amount\n' + spendingTrends.map(d => `${d.month},${d.amount}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'procurement_report.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported as CSV');
  };

  return (
    <div>
      <div className="page-header">
        <div><h2>Reports & Analytics</h2><p>Procurement Insights — May 2025</p></div>
        <div className="flex gap-sm items-center">
          <select className="form-input" style={{ width: 'auto' }} defaultValue="may"><option value="may">May 2025</option><option value="apr">April 2025</option><option value="mar">March 2025</option></select>
          <button className="btn btn-primary" onClick={handleExport}><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="grid-4 mb-lg">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card stat-card" style={{ animation: `slideUp 0.5s ease ${i * 80}ms both` }}>
              <div className={`stat-icon ${s.color}`}><Icon size={22} /></div>
              <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
            </div>
          );
        })}
      </div>

      <div className="grid-2 mb-lg">
        <div className="card">
          <h3 className="section-title">Monthly Spending Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={spendingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#1a2236', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#f1f5f9' }} formatter={(v) => [formatCurrencyFull(v), 'Spend']} />
              <Bar dataKey="amount" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="section-title">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={spendingByCategory} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`} labelLine={false} fontSize={11}>
                {spendingByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a2236', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#f1f5f9' }} formatter={v => formatCurrencyFull(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
