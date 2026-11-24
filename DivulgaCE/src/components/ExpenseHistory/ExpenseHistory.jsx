import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import historico from '../../data/despesas-ce.json';
import { gestoresDoAno, governadores, relatorioEstadual } from '../../services/historicoEstadual';
import { GovernorPortrait } from '../GovernorHistory/GovernorHistory';
import './ExpenseHistory.css';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const abreviado = new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', notation: 'compact', maximumSignificantDigits: 3,
});
const percentual = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 });
const primeiroAno = historico[0].ano;
const ultimoAno = historico.at(-1).ano;
const funcoes = [...new Set(historico.flatMap(({ funcoes }) => funcoes.map(({ nome }) => nome)))]
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

function ExpenseHistory() {
  const [ano, setAno] = useState(ultimoAno);
  const [filtro, setFiltro] = useState('');
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const gestores = gestoresDoAno(ano);
  const exercicio = historico.find((registro) => registro.ano === ano);
  const areas = [...exercicio.funcoes].sort((a, b) => b.centavos - a.centavos);
  const areasVisiveis = mostrarTodas ? areas : areas.slice(0, 5);
  const serie = historico.map((registro) => ({
    ano: registro.ano,
    valor: filtro
      ? registro.funcoes.find(({ nome }) => nome === filtro)?.centavos
      : registro.total,
  }));
  const escala = Math.max(1, ...serie.map(({ valor }) => valor ?? 0));
  const selecionado = serie.find((ponto) => ponto.ano === ano);

  return (
    <section className="expense-history" id="historico" aria-labelledby="page-title">
      <header className="expense-history-heading">
        <p>{primeiroAno}–{ultimoAno} · Despesas liquidadas do Governo do Estado</p>
      </header>

      <div className="expense-history-grid">
        <div className="info-card expense-panel">
          <h3>Evolução anual</h3>
          <div className="expense-history-controls">
            <label>
              Área na série histórica
              <select value={filtro} onChange={(event) => setFiltro(event.target.value)}>
                <option value="">Todas as áreas</option>
                {funcoes.map((nome) => <option key={nome}>{nome}</option>)}
              </select>
            </label>
            <label>
              Ano do detalhamento
              <select value={ano} onChange={(event) => setAno(Number(event.target.value))}>
                {historico.map(({ ano }) => <option key={ano}>{ano}</option>)}
              </select>
            </label>
          </div>

          <p className="expense-history-highlight" aria-live="polite">
            <span>{ano} · {filtro || 'Todas as áreas'}</span>
            <strong>{selecionado.valor == null ? 'Não informado' : moeda.format(selecionado.valor / 100)}</strong>
          </p>
          <div className="expense-history-governors">
            {gestores.map((id) => (
              <span key={id}><GovernorPortrait id={id} />{governadores[id].nome}</span>
            ))}
            {gestores.length > 1 && <a href="#governo-2022">Ver a transição de 2022</a>}
          </div>
          <div className="expense-history-scroll">
            <ul className="expense-years">
              {serie.map(({ ano: anoBarra, valor }) => {
                const exato = valor == null ? 'Não informado' : moeda.format(valor / 100);
                return (
                  <li key={anoBarra}>
                    <button type="button" aria-pressed={ano === anoBarra} aria-label={`${anoBarra}: ${exato}`}
                      title={exato} onClick={() => setAno(anoBarra)}>
                      <span>{valor == null ? '—' : abreviado.format(valor / 100)}</span>
                      <span className="expense-year-track" aria-hidden="true">
                        <span style={{ height: `${(valor ?? 0) / escala * 100}%` }} />
                      </span>
                      <strong>{anoBarra}</strong>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="info-card expense-panel">
          <h3>Onde o dinheiro foi aplicado em {ano}</h3>
          <p className="expense-history-hint">Abra uma área para ver as finalidades registradas no orçamento e seus valores.</p>
          <ul className="expense-areas" id="historico-areas">
            {areasVisiveis.map(({ nome, centavos, subfuncoes }) => (
              <li key={nome}>
                <details>
                  <summary>
                    <span className="expense-area-line">
                      <strong>{nome}</strong>
                      <span>{moeda.format(centavos / 100)} · {percentual.format(centavos / exercicio.total)}</span>
                    </span>
                    <span className="expense-area-track" aria-hidden="true">
                      <span style={{ width: `${centavos / exercicio.total * 100}%` }} />
                    </span>
                  </summary>
                  <ul className="expense-subareas">
                    {[...subfuncoes].sort((a, b) => b.centavos - a.centavos).map((subfuncao) => (
                      <li key={subfuncao.nome} className="expense-area-line">
                        <span>{subfuncao.nome}</span>
                        <span>{moeda.format(subfuncao.centavos / 100)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
          {areas.length > 5 && (
            <button className="expense-areas-toggle" type="button" aria-expanded={mostrarTodas}
              aria-controls="historico-areas" onClick={() => setMostrarTodas(!mostrarTodas)}>
              {mostrarTodas ? 'Mostrar as 5 maiores áreas' : `Ver todas as ${areas.length} áreas`}
            </button>
          )}
        </div>
      </div>

      <footer className="expense-history-source">
        <p>Valores nominais, sem correção pela inflação. A liquidação é o reconhecimento da obrigação após a verificação do direito do credor. A série exclui despesas intraorçamentárias.</p>
        <p><a href={relatorioEstadual(ano)}>Dados oficiais de {ano} <ArrowUpRight size={13} aria-hidden="true" /></a> · <a href="https://www.tesourotransparente.gov.br/ckan/dataset/api-rreo-entes">Siconfi, RREO Anexo 02</a>. Para 2014, a fonte é a DCA, Anexo I-E.</p>
      </footer>
    </section>
  );
}

export default ExpenseHistory;
