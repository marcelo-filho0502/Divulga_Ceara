
import './ExpenseChart.css';

const data = [
  { month: 'Jan', value: 65 },
  { month: 'Fev', value: 80 },
  { month: 'Mar', value: 55 },
  { month: 'Abr', value: 90 },
  { month: 'Mai', value: 72 },
  { month: 'Jun', value: 100 },
  { month: 'Jul', value: 85 },
  { month: 'Ago', value: 68 },
  { month: 'Set', value: 95 },
  { month: 'Out', value: 75 },
  { month: 'Nov', value: 60 },
  { month: 'Dez', value: 88 }
];

function ExpenseChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Evolução das despesas</h3>
          <p>Distribuição mensal demonstrativa</p>
        </div>

        <select defaultValue="2026" className="chart-select">
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="chart">
        {data.map((item) => (
          <div className="chart-column" key={item.month}>
            <div className="bar-container">
              <div
                className="bar"
                style={{ height: `${item.value}%` }}
                title={`${item.value}%`}
              />
            </div>

            <span>{item.month}</span>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span></span>
        Despesas mensais ilustrativas
      </div>
    </div>
  );
}

export default ExpenseChart;
