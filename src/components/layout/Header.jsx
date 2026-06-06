import { useAuth } from '../../context/AuthContext';
import { Bell, LogOut } from 'lucide-react';
import { getRoleName } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function Header({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="header">
      <h2 className="header-title">{title}</h2>
      <div className="header-actions">
        <div className="header-bell">
          <Bell size={20} />
          <span className="header-bell-dot" onClick={() => alert("Not Updated Yet")}/>
        </div>
        <div className="header-user">
          <div className="header-avatar">{user?.avatar}</div>
          <div className="header-user-info">
            <span className="header-user-name">{user?.firstName} {user?.lastName}</span>
            <span className="header-user-role">{getRoleName(user?.role)}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-icon" onClick={handleLogout} title="Logout"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
