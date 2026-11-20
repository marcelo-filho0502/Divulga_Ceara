import { Bell, MapPin } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <div className="breadcrumb">
          <MapPin size={13} />
          Ceará, Brasil / Painel
        </div>

        <h1>Visão geral</h1>
        <p>Acompanhe as despesas públicas do Estado do Ceará.</p>
      </div>

      <div className="header-actions">
        <div className="header-status">
          <span className="status-indicator"></span>
          Ambiente demonstrativo
        </div>

        <button className="notification-button" aria-label="Notificações">
          <Bell size={19} />
        </button>

        <div className="header-avatar">CE</div>
      </div>
    </header>
  );
}

export default Header;
