import { ArrowRight, ArrowUpRight, BarChart3 } from 'lucide-react';

import historico from '../../data/despesas-ce.json';
import { formatarDespesa, gestoresDoAno, governadores, relatorioEstadual } from '../../services/historicoEstadual';
import { GovernorPortrait } from '../../components/GovernorHistory/GovernorHistory';
import './Overview.css';

const ultimo = historico.at(-1);
const [gestor] = gestoresDoAno(ultimo.ano);

function Overview({ links }) {
  return (
    <div className="page-stack" id="visao-geral">
      <section className="info-card overview-metric" aria-labelledby="overview-metric-label">
        <div>
          <p id="overview-metric-label"><BarChart3 size={16} aria-hidden="true" /> Despesas liquidadas em {ultimo.ano}</p>
          <strong>{formatarDespesa(ultimo.total)}</strong>
          <a className="overview-report" href={relatorioEstadual(ultimo.ano)}>Relatório oficial de {ultimo.ano} <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <a className="overview-governor pressable" href="#governo">
          <GovernorPortrait id={gestor} decorative />
          <span>{governadores[gestor].nome}<small>Governador no exercício</small></span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </section>

      <nav className="overview-links" aria-label="Telas do painel">
        {links.map(({ label, description, icon: Icon, href }) => (
          <a className="info-card overview-link pressable" href={href} key={href}>
            <div className="overview-link-mark"><Icon size={18} aria-hidden="true" /></div>
            <strong>{label}</strong>
            <span>{description}</span>
            <ArrowRight className="overview-link-arrow" size={17} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Overview;
