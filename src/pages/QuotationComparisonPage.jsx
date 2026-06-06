import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyFull } from '../utils/formatters';
import { CheckCircle } from 'lucide-react';

export default function QuotationComparisonPage() {
  const { quotations, vendors, dispatch } = useAppData();
  const toast = useToast();
  const navigate = useNavigate();

  const rfqQuotations = quotations.filter(q => q.rfqId === 'rfq1');
  const lowestTotal = Math.min(...rfqQuotations.map(q => q.grandTotal));

  const criteria = [
    { label: 'Grand Total', key: 'grandTotal', format: formatCurrencyFull, highlight: true },
    { label: 'GST %', key: 'gstPercent', format: v => `${v}%` },
    { label: 'Delivery (Days)', key: null, format: null, custom: q => q.items[0]?.deliveryDays || '—' },
    { label: 'Vendor Rating', key: 'vendorId', format: null, custom: q => { const v = vendors.find(x => x.id === q.vendorId); return v ? `${v.rating}/5` : '—'; } },
    { label: 'Payment Terms', key: 'paymentTerms', format: v => v },
  ];

  const handleSelect = (q) => {
    dispatch({ type: 'SELECT_VENDOR', payload: { rfqId: q.rfqId, quotationId: q.id, vendorId: q.vendorId, vendorName: q.vendorName, amount: q.grandTotal } });
    toast.success(`${q.vendorName} selected — approval workflow initiated`);
    navigate('/approvals');
  };

  return (
    <div>
      <div className="page-header"><div><h2>Quotation Comparison</h2><p>RFQ: Office Furniture Procurement Q2 — {rfqQuotations.length} quotations received</p></div></div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Criteria</th>
                {rfqQuotations.map(q => <th key={q.id}>{q.vendorName}{q.grandTotal === lowestTotal && <span style={{ color: 'var(--accent-primary)', marginLeft: 4, fontSize: 'var(--font-size-xs)' }}>(Lowest)</span>}</th>)}
              </tr>
            </thead>
            <tbody>
              {criteria.map(c => (
                <tr key={c.label}>
                  <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{c.label}</td>
                  {rfqQuotations.map(q => {
                    const val = c.custom ? c.custom(q) : c.format ? c.format(q[c.key]) : q[c.key];
                    const isBest = c.highlight && q.grandTotal === lowestTotal;
                    return <td key={q.id} className={isBest ? 'highlight-best' : ''}>{val}</td>;
                  })}
                </tr>
              ))}
              <tr>
                <td></td>
                {rfqQuotations.map(q => (
                  <td key={q.id}>
                    <button className={`btn ${q.grandTotal === lowestTotal ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => handleSelect(q)}>
                      {q.grandTotal === lowestTotal ? <><CheckCircle size={14} /> Select & Approve</> : 'Select'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-lg" style={{ background: 'var(--status-active-bg)', border: '1px solid rgba(16,185,129,0.2)' }}>
        <p style={{ color: 'var(--accent-primary)', fontSize: 'var(--font-size-sm)' }}>
          <strong>Note:</strong> Green = lowest price. Selecting a vendor initiates the approval workflow.
        </p>
      </div>
    </div>
  );
}
