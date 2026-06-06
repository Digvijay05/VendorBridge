import { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { formatDateTime } from '../utils/formatters';
import { FileText, CheckSquare, Receipt, Users, Clock, Shield } from 'lucide-react';

const typeConfig = {
  rfq: { icon: FileText, color: 'var(--status-info)', bg: 'var(--status-info-bg)' },
  approval: { icon: CheckSquare, color: 'var(--status-pending)', bg: 'var(--status-pending-bg)' },
  invoice: { icon: Receipt, color: 'var(--status-active)', bg: 'var(--status-active-bg)' },
  quotation: { icon: Clock, color: 'var(--accent-secondary)', bg: 'rgba(6,182,212,0.15)' },
  vendor: { icon: Users, color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
};

export default function ActivityLogsPage() {
  const { activityLogs } = useAppData();
  const [tab, setTab] = useState('all');

  const tabs = [{ key: 'all', label: 'All' }, { key: 'rfq', label: 'RFQ' }, { key: 'approval', label: 'Approvals' }, { key: 'invoice', label: 'Invoices' }, { key: 'vendor', label: 'Vendors' }];
  const filtered = tab === 'all' ? activityLogs : activityLogs.filter(l => l.type === tab);

  return (
    <div>
      <div className="page-header"><div><h2>Activity & Logs</h2><p>Procurement audit trail</p></div></div>

      <div className="flex items-center gap-md mb-lg" style={{ flexWrap: 'wrap' }}>
        <div className="tabs">
          {tabs.map(t => <button key={t.key} className={`tab-item ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>)}
        </div>
      </div>

      <div className="card">
        <div className="timeline">
          {filtered.map(log => {
            const cfg = typeConfig[log.type] || typeConfig.rfq;
            const Icon = cfg.icon;
            return (
              <div key={log.id} className="timeline-item">
                <div className="timeline-dot" style={{ background: cfg.bg, color: cfg.color }}><Icon size={16} /></div>
                <div className="timeline-content">
                  <div className="timeline-title">{log.title}</div>
                  <div className="timeline-desc">{log.description}</div>
                  <div className="timeline-time">{formatDateTime(log.timestamp)}{log.user && ` — ${log.user}`}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-xl)' }}>No activity logs found</p>}
        </div>
      </div>

      <div className="card mt-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="flex items-center gap-sm">
          <Shield size={18} style={{ color: 'var(--status-pending)' }} />
          <p style={{ color: 'var(--status-pending)', fontSize: 'var(--font-size-sm)' }}>
            <strong>Audit logs are immutable</strong> — These entries are write-once, no edit or delete. The database schema reflects this with no soft-delete on log records.
          </p>
        </div>
      </div>
    </div>
  );
}
