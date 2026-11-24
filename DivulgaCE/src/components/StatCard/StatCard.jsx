import SpotlightCard from '../ReactBits/SpotlightCard';
import './StatCard.css';

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <SpotlightCard className="stat-card" theme="light" spotlightColor="#5ad398" intensity={0.13}>
      <div className="stat-card-top">
        <span>{title}</span>

        <div className="stat-icon">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </SpotlightCard>
  );
}

export default StatCard;
