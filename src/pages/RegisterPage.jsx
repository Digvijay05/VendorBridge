import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Layers, UserCircle } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', role: 'procurement_officer', country: 'India', additionalInfo: '' });
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) { toast.error('Please fill in required fields'); return; }
    register(form);
    toast.success('Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 520 }}>
        <div className="logo-section">
          <div className="logo-icon"><Layers size={28} /></div>
          <h1>VendorBridge</h1>
          <p>Create your account</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <UserCircle size={40} />
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 4 }}>Upload Photo</p>
          </div>
          <div className="grid-2">
            <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" placeholder="First name" value={form.firstName} onChange={e => update('firstName', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Last name" value={form.lastName} onChange={e => update('lastName', e.target.value)} /></div>
          </div>
          <div className="form-group"><label className="form-label">Email Address *</label><input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Password *</label><input type="password" className="form-input" placeholder="Create a password" value={form.password} onChange={e => update('password', e.target.value)} /></div>
          <div className="grid-2">
            <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Role</label><select className="form-input" value={form.role} onChange={e => update('role', e.target.value)}><option value="procurement_officer">Procurement Officer</option><option value="vendor">Vendor</option><option value="manager">Manager / Approver</option><option value="admin">Admin</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">Country</label><select className="form-input" value={form.country} onChange={e => update('country', e.target.value)}><option>India</option><option>United States</option><option>United Kingdom</option><option>Other</option></select></div>
          <div className="form-group"><label className="form-label">Additional Information</label><textarea className="form-input" placeholder="Tell us about your organization..." value={form.additionalInfo} onChange={e => update('additionalInfo', e.target.value)} /></div>
          <button type="submit" className="btn btn-primary btn-lg w-full">Create Account</button>
          <div style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Already have an account? <Link to="/login">Sign In</Link></div>
        </form>
      </div>
    </div>
  );
}
