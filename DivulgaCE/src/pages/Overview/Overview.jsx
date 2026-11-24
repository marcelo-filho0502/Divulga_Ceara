import { ArrowRight, BarChart3 } from 'lucide-react';

import GradientText from '../../components/ReactBits/GradientText';
import SpotlightCard from '../../components/ReactBits/SpotlightCard';
import historico from '../../data/despesas-ce.json';
import { formatarDespesa, gestoresDoAno, governadores, relatorioEstadual } from '../../services/historicoEstadual';
import { GovernorPortrait } from '../../components/GovernorHistory/GovernorHistory';
import './Overview.css';

const ultimo = historico.at(-1);
const [gestor] = gestoresDoAno(ultimo.ano);

function Overview({ links }) {
  return (
    <div className="page-stack" id="visao-geral">
      <SpotlightCard className="overview-metric" spotlightColor="#75ecb1" intensity={0.2}
        style={{ '--spotlight-card-surface': '#102d27' }}>
        <div>
          <p><BarChart3 size={16} aria-hidden="true" /> Despesas liquidadas em {ultimo.ano}</p>
          <strong><GradientText colors={['#abf7cb', '#e5f9ad', '#75ecb1']}>{formatarDespesa(ultimo.total)}</GradientText></strong>
          <a href={relatorioEstadual(ultimo.ano)}>Relatório oficial de {ultimo.ano}</a>
        </div>
        <a className="overview-governor" href="#governo">
          <GovernorPortrait id={gestor} />
          <span>{governadores[gestor].nome}<small>Governador no exercício</small></span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </SpotlightCard>

      <nav className="overview-links" aria-label="Telas do painel">
        {links.map(({ label, description, icon: Icon, href }) => (
          <a className="info-card overview-link" href={href} key={href}>
            <Icon className="overview-link-icon" size={20} aria-hidden="true" />
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
