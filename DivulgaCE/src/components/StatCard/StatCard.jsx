import './StatCard.css';

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="info-card stat-card">
      <div className="stat-card-top">
        <span>{title}</span>

        <div className="stat-icon">
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>

      <p className="stat-value">{value}</p>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;
