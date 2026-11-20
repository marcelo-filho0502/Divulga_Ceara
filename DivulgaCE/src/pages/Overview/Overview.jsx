
import {
  FileText,
  ClipboardCheck,
  Wallet,
  Building2,
  Info
} from 'lucide-react';

import StatCard from '../../components/StatCard/StatCard';
import ExpenseChart from '../../components/ExpenseChart/ExpenseChart';

import './Overview.css';

function Overview() {
  return (
    <section className="overview">

      <div className="demo-warning">
        <Info size={17} />
        <span>
          Ambiente demonstrativo. Os valores apresentados são fictícios.
        </span>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total empenhado"
          value="R$ 12,8 bi"
          description="Valores ilustrativos"
          icon={FileText}
        />

        <StatCard
          title="Total liquidado"
          value="R$ 10,4 bi"
          description="Valores ilustrativos"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Total pago"
          value="R$ 9,7 bi"
          description="Valores ilustrativos"
          icon={Wallet}
        />

        <StatCard
          title="Órgãos monitorados"
          value="42"
          description="Quantidade demonstrativa"
          icon={Building2}
        />
      </div>

      <div className="overview-content">
        <ExpenseChart />

        <div className="info-card">
          <div className="info-card-header">
            <h3>Entenda os indicadores</h3>
            <Info size={18} />
          </div>

          <p>
            A execução das despesas públicas possui diferentes etapas.
            Entenda o significado de cada indicador.
          </p>

          <div className="info-item">
            <strong>Empenhado</strong>
            <span>
              Valor reservado para uma despesa pública.
            </span>
          </div>

          <div className="info-item">
            <strong>Liquidado</strong>
            <span>
              Despesa cuja entrega ou serviço foi reconhecido.
            </span>
          </div>

          <div className="info-item">
            <strong>Pago</strong>
            <span>
              Valor efetivamente pago pelo governo.
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Overview;
