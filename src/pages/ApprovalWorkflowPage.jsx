import { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { formatCurrencyFull } from '../utils/formatters';
import { Check, X, MessageSquare } from 'lucide-react';

export default function ApprovalWorkflowPage() {
  const { approvals, vendors, dispatch } = useAppData();
  const toast = useToast();
  const [remarks, setRemarks] = useState('');

  const approval = approvals[0];
  if (!approval) return <div className="card"><p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-xl)' }}>No pending approvals</p></div>;

  const vendor = vendors.find(v => v.id === approval.vendorId);
  const steps = [{ label: 'Submitted' }, { label: 'L1 Review' }, { label: 'L2 Approval' }, { label: 'Generate PO' }];
  const currentStep = approval.status === 'approved' ? 4 : approval.status === 'rejected' ? -1 : approval.currentStep;

  const handleApprove = () => {
    dispatch({ type: 'APPROVE', payload: { id: approval.id, level: `L${approval.currentStep}`, approverName: approval.chain[approval.currentStep - 1]?.name } });
    toast.success(`Approved at ${approval.chain[approval.currentStep - 1]?.level} level`);
  };

  const handleReject = () => {
    dispatch({ type: 'REJECT', payload: { id: approval.id, approverName: approval.chain[approval.currentStep - 1]?.name } });
    toast.error('Procurement request rejected');
  };

  return (
    <div>
      <div className="page-header"><div><h2>Approval Workflow</h2><p>RFQ: Office Furniture Q2 — Vendor: {approval.vendorName} — {formatCurrencyFull(approval.amount)}</p></div></div>

      <div className="card mb-lg">
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={i} className={`stepper-step ${i + 1 < currentStep ? 'completed' : i + 1 === currentStep ? 'active' : ''}`}>
              <div className="stepper-circle">{i + 1 < currentStep ? <Check size={18} /> : i + 1}</div>
              <div className="stepper-label">{s.label}</div>
              {i < steps.length - 1 && <div className="stepper-line" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2 mb-lg">
        <div className="card">
          <h3 className="section-title">Approval Chain</h3>
          <div className="flex flex-col gap-md">
            {approval.chain.map((c, i) => (
              <div key={i} className="flex items-center gap-md" style={{ padding: 'var(--space-md)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.status === 'approved' ? 'var(--status-active-bg)' : c.status === 'awaiting' ? 'var(--status-pending-bg)' : c.status === 'rejected' ? 'var(--status-blocked-bg)' : 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.status === 'approved' ? 'var(--status-active)' : c.status === 'awaiting' ? 'var(--status-pending)' : c.status === 'rejected' ? 'var(--status-blocked)' : 'var(--text-muted)' }}>
                  {c.status === 'approved' ? <Check size={20} /> : c.status === 'rejected' ? <X size={20} /> : c.level[1]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{c.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 'var(--font-size-sm)' }}>({c.role})</span></div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    {c.status === 'approved' ? `Approved on ${c.date}, ${c.time}` : c.status === 'awaiting' ? `Awaiting — Assigned ${c.date}` : c.status === 'rejected' ? 'Rejected' : 'Pending'}
                  </div>
                </div>
                <span className={`badge badge-${c.status}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-lg">
          <div className="card">
            <h3 className="section-title">Quotation Summary</h3>
            <div className="flex flex-col gap-sm">
              {[['Vendor', approval.vendorName], ['Total', formatCurrencyFull(approval.amount)], ['Delivery', '10 days'], ['Rating', vendor ? `${vendor.rating}/5` : '—']].map(([k, v]) => (
                <div key={k} className="flex justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {approval.status !== 'approved' && approval.status !== 'rejected' && (
            <div className="card">
              <h3 className="section-title"><MessageSquare size={16} style={{ display: 'inline', marginRight: 8 }} />Approval Remarks</h3>
              <textarea className="form-input mb-md" placeholder="Add your comments or conditions..." value={remarks} onChange={e => setRemarks(e.target.value)} />
              <div className="flex gap-sm">
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleApprove}><Check size={16} /> Approve</button>
                <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleReject}><X size={16} /> Reject</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
