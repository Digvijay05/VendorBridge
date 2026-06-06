import { useParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { formatCurrencyFull, formatDate } from '../utils/formatters';
import { Download, Printer, Mail, CheckCircle } from 'lucide-react';

export default function POInvoicePage() {
  const { poId } = useParams();
  const { purchaseOrders, dispatch } = useAppData();
  const toast = useToast();
  const navigate = useNavigate();

  const po = purchaseOrders.find(p => p.id === poId) || purchaseOrders[0];
  if (!po) return <div className="card"><p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-xl)' }}>Purchase order not found</p></div>;

  const handlePDF = async () => {
    try {
      const el = document.getElementById('po-doc');
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().set({ margin: 10, filename: `${po.poNumber}.pdf`, html2canvas: { scale: 2 }, jsPDF: { format: 'a4' } }).from(el).save();
      toast.success('PDF downloaded');
    } catch { toast.error('PDF generation failed'); }
  };

  const handlePrint = () => { window.print(); };
  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice - ${po.poNumber}`);
    const body = encodeURIComponent(`Please find attached the invoice for ${po.poNumber}.\n\nAmount: ${formatCurrencyFull(po.grandTotal)}\nDue Date: ${formatDate(po.dueDate)}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    toast.info('Email client opened');
  };

  const handleMarkPaid = () => {
    dispatch({ type: 'MARK_PAID', payload: { id: po.id, poNumber: po.poNumber } });
    toast.success(`${po.poNumber} marked as paid`);
  };

  return (
    <div>
      <div className="page-header">
        <div><h2>Purchase Order & Invoice</h2><p>{po.poNumber} — Auto-generated after approval</p></div>
        <div className="flex gap-sm">
          <button className="btn btn-secondary" onClick={handlePDF}><Download size={16} /> Download PDF</button>
          <button className="btn btn-secondary" onClick={handlePrint}><Printer size={16} /> Print</button>
          <button className="btn btn-secondary" onClick={handleEmail}><Mail size={16} /> Email Invoice</button>
        </div>
      </div>

      <div className="flex items-center gap-sm mb-lg">
        <span className={`badge badge-${po.status === 'paid' ? 'paid' : 'pending'}`} style={{ fontSize: 'var(--font-size-sm)', padding: '6px 14px' }}>
          Status: {po.status === 'paid' ? 'Paid' : 'Pending Payment'}
        </span>
        {po.status !== 'paid' && <button className="btn btn-primary btn-sm" onClick={handleMarkPaid}><CheckCircle size={14} /> Mark as Paid</button>}
      </div>

      <div id="po-doc" className="po-invoice-doc">
        <div className="po-header">
          <div>
            <div className="po-title">INVOICE</div>
            <p style={{ marginTop: 4, fontSize: 'var(--font-size-sm)', color: '#6b7280' }}>PO Number: {po.poNumber}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#6b7280' }}>PO Date: {formatDate(po.poDate)}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#6b7280' }}>Invoice Date: {formatDate(po.invoiceDate)}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#6b7280' }}>Due Date: {formatDate(po.dueDate)}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 24 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#6b7280', marginBottom: 8 }}>BILL TO</p>
            <p style={{ fontWeight: 600 }}>{po.billTo?.name}</p>
            <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>{po.billTo?.address}</p>
            <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>GSTIN: {po.billTo?.gstin}</p>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#6b7280', marginBottom: 8 }}>VENDOR</p>
            <p style={{ fontWeight: 600 }}>{po.vendorName}</p>
            <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>{po.vendorAddress}</p>
            <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>GSTIN: {po.vendorGstin}</p>
          </div>
        </div>

        <table>
          <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
          <tbody>
            {po.items?.map((item, i) => (
              <tr key={i}><td>{item.item}</td><td>{item.qty}</td><td>{formatCurrencyFull(item.unitPrice)}</td><td style={{ textAlign: 'right' }}>{formatCurrencyFull(item.total)}</td></tr>
            ))}
          </tbody>
        </table>

        <div className="po-summary">
          <table className="po-summary-table">
            <tbody>
              <tr><td style={{ color: '#6b7280' }}>Subtotal</td><td style={{ textAlign: 'right' }}>{formatCurrencyFull(po.subtotal)}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>CGST (9%)</td><td style={{ textAlign: 'right' }}>{formatCurrencyFull(po.cgst)}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>SGST (9%)</td><td style={{ textAlign: 'right' }}>{formatCurrencyFull(po.sgst)}</td></tr>
              <tr className="grand-total"><td>Grand Total</td><td style={{ textAlign: 'right' }}>{formatCurrencyFull(po.grandTotal)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
