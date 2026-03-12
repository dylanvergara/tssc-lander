export default function StatBar() {
  const stats = [
    { value: '250+',   label: 'Members' },
    { value: '16',     label: 'Countries' },
    { value: '6,457',  label: 'Jobs shared last 2 years' },
    { value: '2022',   label: 'Est. & still growing' },
  ];

  return (
    <div className="stat-bar">
      {stats.map((s, i) => (
        <div key={i} className="stat-bar__item">
          <span className="stat-bar__value">{s.value}</span>
          <span className="stat-bar__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
