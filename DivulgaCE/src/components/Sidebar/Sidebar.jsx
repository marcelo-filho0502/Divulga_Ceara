
import {
  LayoutDashboard,
  ChartColumn,
  Wallet,
  FileText,
  Users,
  ShieldCheck
} from 'lucide-react';

import './Sidebar.css';

function Sidebar() {
  const menuItems = [
    { label: 'Visão geral', icon: LayoutDashboard, href: '#visao-geral' },
    { label: 'Histórico de gastos', icon: ChartColumn, href: '#historico' },
    { label: 'Despesas', icon: Wallet, href: '#despesas' },
    { label: 'Contratos', icon: FileText, href: '#contratos' },
    { label: 'Governo', icon: Users, href: '#governo' }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">D</div>
          <div>
            <h2>DivulgaCE</h2>
            <span>Transparência pública</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">MENU PRINCIPAL</span>

          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  href={item.href}
                  key={item.label}
                  className="nav-item"
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-icon">
          <ShieldCheck size={20} />
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
