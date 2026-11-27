import { ArrowDown, ArrowDownUp, ArrowUp, Building2, FileText, Wallet } from 'lucide-react';
import { useState } from 'react';

import StatCard from '../../components/StatCard/StatCard';
import ExpenseChart from '../../components/ExpenseChart/ExpenseChart';
import { fontesEstaduais, recorteContratos, urlContrato } from '../../services/estadual';
import './Contracts.css';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const quantidade = new Intl.NumberFormat('pt-BR');
const { contratos, inicio, fim, consultadoEm } = recorteContratos;

function dataBrasileira(data) {
  return data.slice(0, 10).split('-').reverse().join('/');
}

function valorEmCentavos(valor) {
  if (typeof valor !== 'string' || !/^-?\d+(\.\d{1,2})?$/.test(valor)) return null;
  return Math.round(Number(valor) * 100);
}

const totalCentavos = contratos.reduce((total, contrato) =>
  total + (valorEmCentavos(contrato.valor_contrato) ?? 0), 0);
const comValor = contratos.filter(({ valor_contrato }) => valorEmCentavos(valor_contrato) !== null).length;
const orgaos = new Set(contratos.map(({ cod_orgao }) => cod_orgao).filter(Boolean));
const serie = [];

for (const dia = new Date(`${inicio}T00:00:00Z`); dia.toISOString().slice(0, 10) <= fim; dia.setUTCDate(dia.getUTCDate() + 1)) {
  const data = dia.toISOString().slice(0, 10);
  serie.push({
    label: dataBrasileira(data).slice(0, 5),
    value: contratos.filter(({ data_assinatura }) => data_assinatura.startsWith(data)).length,
  });
}

const colunasOrdenaveis = [
  { chave: 'data_assinatura', titulo: 'Assinatura' },
  { chave: 'valor_contrato', titulo: 'Valor', classe: 'contract-value' },
];

function compararContratos(a, b, { chave, direcao }) {
  if (chave === 'data_assinatura') {
    return direcao * a.data_assinatura.slice(0, 10).localeCompare(b.data_assinatura.slice(0, 10));
  }

  const valorA = valorEmCentavos(a.valor_contrato);
  const valorB = valorEmCentavos(b.valor_contrato);
  if (valorA === null || valorB === null) return Number(valorA === null) - Number(valorB === null);
  return direcao * (valorA - valorB);
}

function Contracts() {
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState(null);
  const termo = busca.trim().toLocaleLowerCase('pt-BR');
  const visiveis = contratos.filter(({ descricao_objeto, isn_sic, cod_orgao }) =>
    [descricao_objeto, isn_sic, cod_orgao].some((campo) => String(campo ?? '').toLocaleLowerCase('pt-BR').includes(termo)));

  if (ordenacao) visiveis.sort((a, b) => compararContratos(a, b, ordenacao));

  function ordenarPor(chave) {
    setOrdenacao((anterior) => ({
      chave,
      direcao: anterior?.chave === chave ? -anterior.direcao : 1,
    }));
  }

  return (
    <div className="page-stack" id="contratos">
      <p className="source-note">
        Contratos estaduais assinados de {dataBrasileira(inicio)} a {dataBrasileira(fim)}.
        {' '}Consulta de {dataBrasileira(consultadoEm)} · <a href={fontesEstaduais.contratos}>Dados originais</a>
      </p>

      <div className="stats-grid">
        <StatCard title="Contratos no recorte" value={quantidade.format(contratos.length)} description="Por data de assinatura" icon={FileText} />
        <StatCard title="Valor dos contratos" value={moeda.format(totalCentavos / 100)} description={`Soma dos valores publicados em ${comValor} registros`} icon={Wallet} />
        <StatCard title="Órgãos no recorte" value={quantidade.format(orgaos.size)} description="Códigos de órgão distintos informados" icon={Building2} />
      </div>

      <ExpenseChart data={serie} />

      <section className="info-card" aria-labelledby="contracts-title">
        <h2 id="contracts-title">Contratos estaduais</h2>
        <label className="contract-search">
          Buscar no recorte
          <input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Objeto, código do órgão ou ISN SIC" />
        </label>
        <p role="status">
          {visiveis.length ? `${visiveis.length} de ${contratos.length} contratos`
            : busca.trim() ? 'Nenhum contrato corresponde à busca.' : 'Nenhum contrato disponível no recorte.'}
        </p>
        {visiveis.length === 0 && (
          <p className="contract-empty">
            {busca.trim() ? 'Experimente outro termo de busca.' : 'Consulte os dados originais no início da página.'}
          </p>
        )}
        <div hidden={visiveis.length === 0} className="contract-scroll" tabIndex={0} role="region" aria-label="Tabela de contratos estaduais">
          <table className="contract-table">
            <thead>
              <tr>
                <th scope="col">Objeto</th>
                <th scope="col">Órgão</th>
                {colunasOrdenaveis.map(({ chave, titulo, classe }) => {
                  const direcao = ordenacao?.chave === chave ? ordenacao.direcao : 0;
                  const Icone = direcao === 0 ? ArrowDownUp : direcao === 1 ? ArrowUp : ArrowDown;
                  return (
                    <th key={chave} scope="col" className={['contract-sort-heading', classe].filter(Boolean).join(' ')}
                      aria-sort={direcao === 0 ? undefined : direcao === 1 ? 'ascending' : 'descending'}>
                      <button type="button" className="contract-sort" onClick={() => ordenarPor(chave)}>
                        {titulo}<Icone size={14} aria-hidden="true" />
                      </button>
                    </th>
                  );
                })}
                <th scope="col">Registro</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((contrato) => {
                const centavos = valorEmCentavos(contrato.valor_contrato);
                return (
                  <tr key={contrato.isn_sic}>
                    <td>{contrato.descricao_objeto || 'Objeto não informado'}</td>
                    <td>{contrato.cod_orgao || '—'}</td>
                    <td>{dataBrasileira(contrato.data_assinatura)}</td>
                    <td className="contract-value">{centavos === null ? 'Não informado' : moeda.format(centavos / 100)}</td>
                    <td><a href={urlContrato(contrato.isn_sic)} aria-label={`Consultar registro oficial ${contrato.isn_sic}`}>{contrato.isn_sic}</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Contracts;
