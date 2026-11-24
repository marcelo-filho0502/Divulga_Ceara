import { MapPin } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <div className="breadcrumb"><MapPin size={13} />Ceará, Brasil / Painel</div>
        <h1>Visão geral</h1>
        <p>Consulte contratos e fontes oficiais de despesas do Governo do Ceará.</p>
      </div>
    </header>
  );
}

export default Header;
