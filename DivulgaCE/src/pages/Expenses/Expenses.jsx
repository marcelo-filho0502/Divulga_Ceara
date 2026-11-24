import { ArrowUpRight } from 'lucide-react';
import { fontesEstaduais } from '../../services/estadual';

function Expenses() {
  return (
    <section className="info-card page-stack" id="despesas" aria-labelledby="execucao-titulo">
      <div>
        <h2 id="execucao-titulo">Execução orçamentária</h2>
        <p>Consulte os valores empenhados, liquidados e pagos no Ceará Transparente.</p>
      </div>
      <div className="document-links">
        <a href={fontesEstaduais.despesas}>Despesas do Poder Executivo <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={fontesEstaduais.empenhos}>Despesas por nota de empenho <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export default Expenses;
