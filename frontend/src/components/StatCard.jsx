export default function StatCard({
  icon,
  title,
  value,
  subtitle,
  trend
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          {icon}
        </div>

        {trend && (
          <span className="stat-trend">
            {trend}
          </span>
        )}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

      {subtitle && (
        <div className="stat-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}