import { useAppData } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyFull, formatDate } from '../utils/formatters';
import { Eye } from 'lucide-react';

export default function PurchaseOrdersListPage() {
  const { purchaseOrders } = useAppData();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header"><div><h2>Purchase Orders</h2><p>View and manage all purchase orders</p></div></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>PO #</th><th>Vendor</th><th>PO Date</th><th>Due Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {purchaseOrders.map(po => (
                <tr key={po.id}>
                  <td style={{ fontWeight: 600 }}>{po.poNumber}</td>
                  <td>{po.vendorName}</td>
                  <td>{formatDate(po.poDate)}</td>
                  <td>{formatDate(po.dueDate)}</td>
                  <td>{formatCurrencyFull(po.grandTotal)}</td>
                  <td><span className={`badge badge-${po.status === 'paid' ? 'paid' : 'pending'}`}>{po.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate(`/po/${po.id}`)}><Eye size={16} /> View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
