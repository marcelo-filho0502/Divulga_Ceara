import { MapPin } from 'lucide-react';
import './Header.css';

function Header({ title }) {
  return (
    <header className="page-header">
      <p><MapPin size={15} aria-hidden="true" /> Ceará, Brasil</p>
      <h1 id="page-title">{title}</h1>
    </header>
  );
}

export default Header;
