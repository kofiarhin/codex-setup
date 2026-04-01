import './status-card.styles.scss';

function StatusCard({ title, value, description }) {
  return (
    <article className="status-card">
      <div className="status-card__title">{title}</div>
      <div className="status-card__value">{value}</div>
      <p className="status-card__description">{description}</p>
    </article>
  );
}

export default StatusCard;
