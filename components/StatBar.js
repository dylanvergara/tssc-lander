export default function StatBar() {
  const stats = [
    { value: '250+',   label: 'Members' },
    { value: '16',     label: 'Countries' },
    { value: '6,457',  label: 'Jobs Shared' },
    { value: '2022',   label: 'Est.' },
  ];

  return (
    <div className="stat-bar">
      <div className="stat-bar__track">
        {/* Render twice for seamless loop */}
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="stat-bar__item">
            <span className="stat-bar__value">{s.value}</span>
            <span className="stat-bar__dot">·</span>
            <span className="stat-bar__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
