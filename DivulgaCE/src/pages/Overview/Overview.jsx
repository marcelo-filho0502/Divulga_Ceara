import { Building2, FileText, Wallet } from 'lucide-react';
import { useState } from 'react';

import StatCard from '../../components/StatCard/StatCard';
import ExpenseChart from '../../components/ExpenseChart/ExpenseChart';
import ExpenseHistory from '../../components/ExpenseHistory/ExpenseHistory';
import { fontesEstaduais, recorteContratos, urlContrato } from '../../services/estadual';
import './Overview.css';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const quantidade = new Intl.NumberFormat('pt-BR');
const { contratos, inicio, fim, consultadoEm } = recorteContratos;
const autoridades = [
  { nome: 'Elmano de Freitas', cargo: 'Governador', foto: 'elmano.jpg' },
  { nome: 'Jade Romero', cargo: 'Vice-governadora', foto: 'jade.jpg' },
];

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

function Overview() {
  const [busca, setBusca] = useState('');
  const termo = busca.trim().toLocaleLowerCase('pt-BR');
  const visiveis = contratos.filter(({ descricao_objeto, isn_sic, cod_orgao }) =>
    [descricao_objeto, isn_sic, cod_orgao].some((campo) => String(campo ?? '').toLocaleLowerCase('pt-BR').includes(termo)));

  return (
    <div className="overview" id="visao-geral">
      <ExpenseHistory />

      <p className="source-note">
        Contratos estaduais assinados de {dataBrasileira(inicio)} a {dataBrasileira(fim)}.
        {' '}Consulta de {dataBrasileira(consultadoEm)} · <a href={fontesEstaduais.contratos}>Dados originais</a>
      </p>

      <div className="stats-grid">
        <StatCard title="Contratos no recorte" value={quantidade.format(contratos.length)} description="Por data de assinatura" icon={FileText} />
        <StatCard title="Valor dos contratos" value={moeda.format(totalCentavos / 100)} description={`Soma dos valores publicados em ${comValor} registros`} icon={Wallet} />
        <StatCard title="Órgãos no recorte" value={quantidade.format(orgaos.size)} description="Códigos de órgão distintos informados" icon={Building2} />
      </div>

      <div className="overview-content">
        <ExpenseChart data={serie} />
        <section id="despesas" className="info-card">
          <h2>Execução orçamentária</h2>
          <p>Consulte os valores empenhados, liquidados e pagos no Ceará Transparente.</p>
          <div className="info-item">
            <a href={fontesEstaduais.despesas}>Despesas do Poder Executivo</a>
            <a href={fontesEstaduais.empenhos}>Despesas por nota de empenho</a>
          </div>
        </section>
      </div>

      <section className="info-card" id="contratos">
        <h2>Contratos estaduais</h2>
        <label className="contract-search">
          Buscar no recorte
          <input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Objeto, código do órgão ou ISN SIC" />
        </label>
        <p role="status">{visiveis.length} de {contratos.length} contratos</p>
        {visiveis.length === 0 ? <p>Nenhum contrato corresponde à busca.</p> : (
          <div className="contract-scroll">
            <table className="contract-table">
              <thead>
                <tr><th scope="col">Objeto</th><th scope="col">Órgão</th><th scope="col">Assinatura</th><th scope="col">Valor</th><th scope="col">Registro</th></tr>
              </thead>
              <tbody>
                {visiveis.map((contrato) => {
                  const centavos = valorEmCentavos(contrato.valor_contrato);
                  return (
                    <tr key={contrato.isn_sic}>
                      <td>{contrato.descricao_objeto || 'Objeto não informado'}</td>
                      <td>{contrato.cod_orgao || '—'}</td>
                      <td>{dataBrasileira(contrato.data_assinatura)}</td>
                      <td>{centavos === null ? 'Não informado' : moeda.format(centavos / 100)}</td>
                      <td><a href={urlContrato(contrato.isn_sic)} aria-label={`Consultar registro oficial ${contrato.isn_sic}`}>{contrato.isn_sic}</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="info-card" id="governo">
        <h2>Governo do Ceará</h2>
        <div className="government-grid">
          {autoridades.map(({ nome, cargo, foto }) => (
            <article className="government-profile" key={nome}>
              <img src={`${import.meta.env.BASE_URL}governo/${foto}`} alt={`Retrato oficial de ${nome}`} width="90" height="120" loading="lazy" />
              <div><h3>{nome}</h3><p>{cargo}</p></div>
            </article>
          ))}
        </div>
        <a href={fontesEstaduais.governo}>Perfis e fotos oficiais</a>
      </section>
    </div>
  );
}

export default Overview;
