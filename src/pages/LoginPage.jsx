import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Layers, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) { toast.success('Welcome back!'); navigate('/dashboard'); }
      else { setError(result.error); setLoading(false); }
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo-icon"><Layers size={28} /></div>
          <h1>VendorBridge</h1>
          <p>Procurement & Vendor Management ERP</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} className="form-input" placeholder="Enter your password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} style={{ paddingRight: 42 }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="login-links">
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Password reset link sent to your email!'); }} style={{ color: 'var(--text-muted)' }}>Forgot Password?</a>
            <Link to="/register">Create Account</Link>
          </div>
        </form>
        <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-md)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>Demo Credentials:</p>
          <p>Officer: officer@vendorbridge.com</p>
          <p>Vendor: vendor@vendorbridge.com</p>
          <p>Manager: manager@vendorbridge.com</p>
          <p>Admin: admin@vendorbridge.com</p>
          <p style={{ marginTop: 4 }}>Password: pass123</p>
        </div>
      </div>
    </div>
  );
}
