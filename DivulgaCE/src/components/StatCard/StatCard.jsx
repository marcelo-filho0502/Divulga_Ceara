import './StatCard.css';

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>

        <div className="stat-icon">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;
