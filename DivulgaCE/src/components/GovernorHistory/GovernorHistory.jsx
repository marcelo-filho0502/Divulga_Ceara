import { useState } from 'react';
import { ArrowUpRight, Landmark } from 'lucide-react';

import historico from '../../data/despesas-ce.json';
import {
  formatarDespesa, gestoresDoAno, governadores, periodosDe2022, relatorioEstadual,
} from '../../services/historicoEstadual';
import './GovernorHistory.css';

export function GovernorPortrait({ id, decorative = false }) {
  const { nome, foto } = governadores[id];

  return <img className="governor-portrait" src={`${import.meta.env.BASE_URL}governo/${foto}`}
    alt={decorative ? '' : `Retrato de ${nome}`} width="96" height="112" loading="lazy" />;
}

function GovernorHistory() {
  const [gestor, setGestor] = useState('elmano');
  const perfil = governadores[gestor];
  const exercicios = historico.filter(({ ano }) => gestoresDoAno(ano).includes(gestor));
  const periodoIndividual = periodosDe2022.find(({ gestores }) => gestores.length === 1 && gestores[0] === gestor);
  const despesas = exercicios.filter(({ ano }) => ano !== 2022).map(({ ano, total }) => ({
    label: ano, centavos: total, fonte: relatorioEstadual(ano),
  }));
  if (periodoIndividual) {
    despesas.push({ label: `${periodoIndividual.periodo} de 2022`, centavos: periodoIndividual.centavos });
  }
  const totalConfirmado = despesas.reduce((soma, { centavos }) => soma + centavos, 0);
  const escala = Math.max(...despesas.map(({ centavos }) => centavos));

  return (
    <section className="info-card governor-history" id="governo" aria-labelledby="governo-titulo">
      <header>
        <h2 id="governo-titulo"><Landmark size={21} aria-hidden="true" /> Gestões de 2014 a 2025</h2>
        <p>Selecione um governador para ver a execução orçamentária no período em que ocupou o cargo.</p>
      </header>

      <div className="governor-options" aria-label="Governadores no período" role="group">
        {Object.entries(governadores).reverse().map(([id, { nome, mandato }]) => (
          <button type="button" key={id} aria-pressed={id === gestor}
            aria-controls="governador-detalhe" onClick={() => setGestor(id)}>
            <GovernorPortrait id={id} decorative />
            <strong>{nome}</strong>
            <small>{mandato}</small>
          </button>
        ))}
      </div>

      <article className="governor-detail" id="governador-detalhe" aria-labelledby="governador-nome">
        <header>
          <div className="governor-detail-profile">
            <GovernorPortrait id={gestor} decorative />
            <div>
              <h3 id="governador-nome">{perfil.nome}</h3>
              <p>{perfil.cargo} do Ceará · {perfil.mandato}</p>
              <a href={perfil.posse}>Registro da posse <ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="governor-total">
            <p>{periodoIndividual ? 'Total no recorte, fora do bimestre de transição' : 'Total no recorte histórico'}</p>
            <strong key={gestor} className="data-update">{formatarDespesa(totalConfirmado)}</strong>
          </div>
        </header>
        <ul className="governor-expenses">
          {despesas.map(({ label, centavos, fonte }) => (
            <li key={label}>
              {fonte ? (
                <a href={fonte} aria-label={`Relatório oficial de ${label}`}>{label} <ArrowUpRight size={13} aria-hidden="true" /></a>
              ) : <span>{label}</span>}
              <strong>{formatarDespesa(centavos)}</strong>
              <span className="governor-expense-track" aria-hidden="true">
                <span style={{ width: `${centavos / escala * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
        {periodoIndividual && <p className="governor-sources"><a href="#governo-2022">Ver os três períodos de 2022</a></p>}
        <p className="governor-sources">Foto de <a href={perfil.fonteFoto}>{perfil.credito}</a>.</p>
      </article>
      <article className="governor-detail" id="governo-2022" tabIndex={-1} aria-labelledby="governo-2022-titulo">
        <h3 id="governo-2022-titulo">Transição de governo em 2022</h3>
        <p>A troca ocorreu em 2 de abril, dentro do bimestre que o RREO publica como um único valor.</p>
        <ul className="governor-expenses governor-transition">
          {periodosDe2022.map(({ gestores, periodo, centavos }) => (
            <li key={periodo}>
              <span className="governor-transition-period">
                <span className="governor-transition-photos">
                  {gestores.map((id) => <GovernorPortrait key={id} id={id} decorative />)}
                </span>
                <span>
                  <strong>{periodo}</strong>
                  <small>{gestores.map((id) => governadores[id].nome).join(' e ')}</small>
                </span>
              </span>
              <strong>{formatarDespesa(centavos)}</strong>
            </li>
          ))}
        </ul>
        <p className="governor-sources">
          Relatórios de 2022 · <a href={relatorioEstadual(2022, 1)}>Fevereiro</a>
          {' · '}<a href={relatorioEstadual(2022, 2)}>Abril</a>
          {' · '}<a href={relatorioEstadual(2022)}>Dezembro</a>
        </p>
      </article>
      <p className="governor-sources">
        Valores nominais de despesas liquidadas do Estado, excluindo despesas intraorçamentárias.
        O recorte de 2014 a 2025 segue as gestões titulares e inclui eventuais substituições interinas dentro dos períodos.
      </p>
    </section>
  );
}

export default GovernorHistory;
