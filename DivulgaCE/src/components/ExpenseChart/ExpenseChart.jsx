import './ExpenseChart.css';

function ExpenseChart({ data }) {
  const max = Math.max(1, ...data.map(({ value }) => value));

  return (
    <section className="chart-card" aria-labelledby="chart-title">
      <div className="chart-header">
        <div>
          <h2 id="chart-title">Contratos por dia</h2>
          <p>Quantidade por data de assinatura</p>
        </div>
      </div>
      <ul className="chart">
        {data.map(({ label, value }) => (
          <li className="chart-column" key={label} aria-label={`${label}: ${value} contratos`}>
            <div className="bar-container">
              <span className="bar-value">{value}</span>
              <div className="bar" style={{ height: `${value / max * 100}%` }} />
            </div>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExpenseChart;
