import { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Eye, X } from 'lucide-react';

export default function VendorsPage() {
  const { vendors, dispatch } = useAppData();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [viewVendor, setViewVendor] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', gst: '', contact: '', email: '', address: '' });

  const filtered = vendors.filter(v => {
    if (tab !== 'all' && v.status !== tab) return false;
    if (search) { const s = search.toLowerCase(); return v.name.toLowerCase().includes(s) || v.gst.toLowerCase().includes(s) || v.category.toLowerCase().includes(s); }
    return true;
  });

  const counts = { all: vendors.length, active: vendors.filter(v => v.status === 'active').length, pending: vendors.filter(v => v.status === 'pending').length, blocked: vendors.filter(v => v.status === 'blocked').length };
  const tabs = [{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'pending', label: 'Pending' }, { key: 'blocked', label: 'Blocked' }];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.category) { toast.error('Name and category are required'); return; }
    dispatch({ type: 'ADD_VENDOR', payload: form });
    toast.success(`${form.name} added successfully`);
    setShowModal(false);
    setForm({ name: '', category: '', gst: '', contact: '', email: '', address: '' });
  };

  return (
    <div>
      <div className="page-header">
        <div><h2>Vendors</h2><p>Manage supplier profiles and registrations</p></div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={18} /> Add Vendor</button>
      </div>

      <div className="flex items-center justify-between gap-md mb-lg" style={{ flexWrap: 'wrap' }}>
        <div className="tabs">
          {tabs.map(t => <button key={t.key} className={`tab-item ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}<span className="tab-count">({counts[t.key]})</span></button>)}
        </div>
        <div className="search-bar"><Search size={18} /><input className="form-input" placeholder="Search by name, GST number, category..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Vendor Name</th><th>Category</th><th>GST No.</th><th>Contact</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600 }}>{v.name}</td>
                  <td>{v.category}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>{v.gst}</td>
                  <td>{v.contact}</td>
                  <td><span className={`badge badge-${v.status}`}>{v.status}</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setViewVendor(v)}><Eye size={16} /> View</button></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-xl)' }}>No vendors found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Add New Vendor</h3><button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button></div>
            <form onSubmit={handleAdd}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="form-group"><label className="form-label">Vendor Name *</label><input className="form-input" placeholder="Company name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div className="grid-2">
                  <div className="form-group"><label className="form-label">Category *</label><select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option value="">Select</option><option>Construction</option><option>IT</option><option>Logistics</option><option>Office Supplies</option><option>Manufacturing</option><option>Energy</option><option>Facility Management</option></select></div>
                  <div className="form-group"><label className="form-label">GST Number</label><input className="form-input" placeholder="27AABCS1429BZ0" value={form.gst} onChange={e => setForm(f => ({ ...f, gst: e.target.value }))} /></div>
                </div>
                <div className="grid-2">
                  <div className="form-group"><label className="form-label">Contact No.</label><input className="form-input" placeholder="+91 XXXX XXXX" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" placeholder="vendor@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                </div>
                <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" placeholder="Full address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Add Vendor</button></div>
            </form>
          </div>
        </div>
      )}

      {viewVendor && (
        <div className="modal-overlay" onClick={() => setViewVendor(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{viewVendor.name}</h3><button className="btn btn-ghost btn-icon" onClick={() => setViewVendor(null)}><X size={20} /></button></div>
            <div className="modal-body">
              <div className="flex flex-col gap-md">
                {[['Category', viewVendor.category], ['GST Number', viewVendor.gst], ['Contact', viewVendor.contact], ['Email', viewVendor.email], ['Address', viewVendor.address], ['Status', viewVendor.status], ['Rating', viewVendor.rating ? `${viewVendor.rating}/5` : 'N/A']].map(([k, v]) => (
                  <div key={k} className="flex justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
