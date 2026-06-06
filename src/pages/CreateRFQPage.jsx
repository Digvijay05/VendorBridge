import { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Upload, Send, Save, Check } from 'lucide-react';

export default function CreateRFQPage() {
  const { vendors, dispatch } = useAppData();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', category: '', deadline: '', description: '' });
  const [lineItems, setLineItems] = useState([{ id: 1, item: '', qty: '', unit: 'NOS' }]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  const steps = [{ num: 1, label: 'RFQ Details' }, { num: 2, label: 'Line Items' }, { num: 3, label: 'Assign & Submit' }];
  const activeVendors = vendors.filter(v => v.status === 'active');

  const addLineItem = () => setLineItems(li => [...li, { id: Date.now(), item: '', qty: '', unit: 'NOS' }]);
  const removeLineItem = (id) => setLineItems(li => li.filter(l => l.id !== id));
  const updateLineItem = (id, k, v) => setLineItems(li => li.map(l => l.id === id ? { ...l, [k]: v } : l));
  const toggleVendor = (vid) => setSelectedVendors(sv => sv.includes(vid) ? sv.filter(v => v !== vid) : [...sv, vid]);

  const handleSubmit = (isDraft) => {
    if (!isDraft && (!form.title || !form.deadline)) { toast.error('Please fill in required fields'); return; }
    dispatch({ type: 'CREATE_RFQ', payload: { ...form, lineItems: lineItems.filter(l => l.item), assignedVendors: selectedVendors, createdBy: 'u1', isDraft } });
    toast.success(isDraft ? 'RFQ saved as draft' : 'RFQ sent to vendors');
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="page-header"><div><h2>Create RFQ</h2><p>New Request for Quotation</p></div></div>

      <div className="card mb-lg">
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={s.num} className={`stepper-step ${step > s.num ? 'completed' : step === s.num ? 'active' : ''}`}>
              <div className="stepper-circle">{step > s.num ? <Check size={18} /> : s.num}</div>
              <div className="stepper-label">{s.label}</div>
              {i < steps.length - 1 && <div className="stepper-line" />}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        {step === 1 && (
          <div className="flex flex-col gap-md">
            <div className="form-group"><label className="form-label">RFQ Title *</label><input className="form-input" placeholder="Office Furniture Procurement Q2" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="grid-2">
              <div className="form-group"><label className="form-label">Category</label><select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option value="">Select category</option><option>Furniture</option><option>IT Equipment</option><option>Office Supplies</option><option>Construction</option><option>Logistics</option></select></div>
              <div className="form-group"><label className="form-label">Deadline *</label><input type="date" className="form-input" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" placeholder="Ergonomic chairs and standing desks for 3rd floor" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="flex justify-between mt-md"><div /><button className="btn btn-primary" onClick={() => setStep(2)}>Next: Line Items →</button></div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-md">
            <h3 className="section-title">Line Items</h3>
            <div className="table-container">
              <table className="data-table">
                <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th></th></tr></thead>
                <tbody>
                  {lineItems.map(li => (
                    <tr key={li.id}>
                      <td><input className="form-input" placeholder="Item name" value={li.item} onChange={e => updateLineItem(li.id, 'item', e.target.value)} style={{ background: 'transparent', border: 'none', padding: 0 }} /></td>
                      <td style={{ width: 100 }}><input type="number" className="form-input" placeholder="Qty" value={li.qty} onChange={e => updateLineItem(li.id, 'qty', e.target.value)} style={{ background: 'transparent', border: 'none', padding: 0 }} /></td>
                      <td style={{ width: 120 }}><select className="form-input" value={li.unit} onChange={e => updateLineItem(li.id, 'unit', e.target.value)} style={{ background: 'transparent', border: 'none', padding: 0 }}><option>NOS</option><option>KG</option><option>BOX</option><option>SET</option><option>MTR</option></select></td>
                      <td style={{ width: 50 }}>{lineItems.length > 1 && <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeLineItem(li.id)}><Trash2 size={16} /></button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-ghost" onClick={addLineItem}><Plus size={16} /> Add Line Item</button>
            <div className="flex justify-between mt-md"><button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button><button className="btn btn-primary" onClick={() => setStep(3)}>Next: Assign Vendors →</button></div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-md">
            <h3 className="section-title">Assign Vendors</h3>
            <div className="flex flex-wrap gap-sm mb-md">
              {selectedVendors.map(vid => { const v = vendors.find(x => x.id === vid); return v ? <span key={vid} className="chip">{v.name}<span className="chip-remove" onClick={() => toggleVendor(vid)}>×</span></span> : null; })}
            </div>
            <div className="flex flex-col gap-xs">
              {activeVendors.map(v => (
                <label key={v.id} className="flex items-center gap-sm" style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'background 0.15s', background: selectedVendors.includes(v.id) ? 'var(--accent-primary-glow)' : 'transparent' }}>
                  <input type="checkbox" checked={selectedVendors.includes(v.id)} onChange={() => toggleVendor(v.id)} style={{ accentColor: 'var(--accent-primary)' }} />
                  <span style={{ fontWeight: 500 }}>{v.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginLeft: 'auto' }}>{v.category}</span>
                </label>
              ))}
            </div>

            <h3 className="section-title mt-lg">Attachments</h3>
            <div className="drop-zone"><Upload size={24} style={{ margin: '0 auto var(--space-sm)' }} /><p>Drag & drop files or click to upload</p></div>

            <div className="flex justify-between mt-lg">
              <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <div className="flex gap-sm">
                <button className="btn btn-secondary" onClick={() => handleSubmit(true)}><Save size={16} /> Save as Draft</button>
                <button className="btn btn-primary" onClick={() => handleSubmit(false)}><Send size={16} /> Save & Send to Vendors</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
