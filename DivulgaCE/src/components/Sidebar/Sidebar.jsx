import {
  Landmark,
  ShieldCheck
} from 'lucide-react';

import './Sidebar.css';

function Sidebar({ menuItems, activeHash }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon"><Landmark size={21} aria-hidden="true" /></div>
          <div>
            <strong>DivulgaCE</strong>
            <span>Transparência pública</span>
          </div>
        </div>

        <div className="sidebar-section">
          <nav className="sidebar-nav" aria-label="Navegação principal">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  href={item.href}
                  key={item.label}
                  className="nav-item pressable"
                  aria-current={activeHash === item.href ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-icon">
          <ShieldCheck size={18} aria-hidden="true" />
        </div>
        <div>
          <strong>Dados públicos</strong>
          <span>Estado do Ceará</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
