import { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyFull } from '../utils/formatters';
import { Send, Save } from 'lucide-react';

export default function SubmitQuotationPage() {
  const { rfqs } = useAppData();
  const toast = useToast();
  const navigate = useNavigate();
  const rfq = rfqs.find(r => r.status === 'pending_quotation') || rfqs[0];

  const [items, setItems] = useState(
    (rfq?.lineItems || []).map(li => ({ ...li, unitPrice: '', deliveryDays: '' }))
  );
  const [gstPercent, setGstPercent] = useState(18);
  const [notes, setNotes] = useState('');

  const updateItem = (id, k, v) => setItems(is => is.map(i => i.id === id ? { ...i, [k]: v } : i));
  const subtotal = items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.unitPrice) || 0), 0);
  const gstAmount = Math.round(subtotal * gstPercent / 100);
  const grandTotal = subtotal + gstAmount;

  const handleSubmit = (isDraft) => {
    if (!isDraft && items.some(i => !i.unitPrice)) { toast.error('Please fill in all prices'); return; }
    toast.success(isDraft ? 'Quotation saved as draft' : 'Quotation submitted successfully');
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="page-header"><div><h2>Submit Quotation</h2><p>RFQ: {rfq?.title} — Deadline {rfq?.deadline}</p></div></div>

      <div className="card mb-lg" style={{ background: 'var(--status-info-bg)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <h4 style={{ color: 'var(--status-info)' }}>RFQ Summary</h4>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{rfq?.lineItems?.map(l => `${l.item} × ${l.qty}`).join(', ')} — Category: {rfq?.category}</p>
      </div>

      <div className="card mb-lg">
        <h3 className="section-title">Your Quotation</h3>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Item</th><th>Qty</th><th>Unit Price (₹)</th><th>Total</th><th>Delivery (Days)</th></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td style={{ fontWeight: 500 }}>{i.item}</td>
                  <td>{i.qty}</td>
                  <td><input type="number" className="form-input" value={i.unitPrice} onChange={e => updateItem(i.id, 'unitPrice', e.target.value)} placeholder="0" style={{ width: 120, background: 'transparent', border: '1px solid var(--border-color)' }} /></td>
                  <td>{formatCurrencyFull((Number(i.qty) || 0) * (Number(i.unitPrice) || 0))}</td>
                  <td><input type="number" className="form-input" value={i.deliveryDays} onChange={e => updateItem(i.id, 'deliveryDays', e.target.value)} placeholder="0" style={{ width: 80, background: 'transparent', border: '1px solid var(--border-color)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2 mb-lg">
        <div className="card">
          <div className="flex flex-col gap-md">
            <div className="form-group"><label className="form-label">Tax / GST %</label><input type="number" className="form-input" value={gstPercent} onChange={e => setGstPercent(Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Notes / Terms</label><textarea className="form-input" placeholder="Payment terms: 20 days net..." value={notes} onChange={e => setNotes(e.target.value)} /></div>
          </div>
        </div>
        <div className="card">
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>{formatCurrencyFull(subtotal)}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>GST ({gstPercent}%)</span><span style={{ fontWeight: 600 }}>{formatCurrencyFull(gstAmount)}</span></div>
            <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: 'var(--space-sm)', marginTop: 'var(--space-sm)' }} className="flex justify-between">
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>Grand Total</span>
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--accent-primary)' }}>{formatCurrencyFull(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        <div className="flex gap-sm">
          <button className="btn btn-secondary" onClick={() => handleSubmit(true)}><Save size={16} /> Save Draft</button>
          <button className="btn btn-primary" onClick={() => handleSubmit(false)}><Send size={16} /> Submit Quotation</button>
        </div>
      </div>
    </div>
  );
}
