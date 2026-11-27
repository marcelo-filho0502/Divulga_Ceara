import './ExpenseChart.css';

function ExpenseChart({ data }) {
  const max = Math.max(1, ...data.map(({ value }) => value));

  return (
    <section className="info-card chart-card" aria-labelledby="chart-title">
      <div className="chart-header">
        <div>
          <h2 id="chart-title">Contratos por dia</h2>
          <p>Quantidade por data de assinatura</p>
        </div>
      </div>
      {data.length ? (
        <div className="chart-scroll" tabIndex={0} role="region" aria-labelledby="chart-title">
          <ul className="chart">
            {data.map(({ label, value }) => (
              <li className="chart-column" key={label} aria-label={`${label}: ${value} contratos`}>
                <div className="bar-container">
                  <span className="bar-value">{value}</span>
                  <div className="bar-track" aria-hidden="true">
                    <div className="bar" style={{ height: `${value / max * 100}%` }} />
                  </div>
                </div>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : <p>Sem datas de assinatura disponíveis.</p>}
    </section>
  );
}

export default ExpenseChart;
