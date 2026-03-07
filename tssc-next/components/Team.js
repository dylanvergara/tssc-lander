export default function Team({ data }) {
  const { team } = data;
  return (
    <section className="section section--dark" id="team">
      <div className="container">
        <span className="section-label reveal">The Team</span>
        <h2 className="h-display team__headline reveal">The People Behind the Community.</h2>
        <div className="team__grid">
          {team.map((member, i) => (
            <div key={member.id} className={`team__card reveal reveal--delay-${i}`}>
              <img
                src={member.photo}
                alt={member.name}
                className="team__photo"
                loading="lazy"
              />
              <div className="team__info">
                <h3 className="team__name">{member.name}</h3>
                <span className="team__title">{member.title}</span>
                <p className="team__bio">{member.bio}</p>
                <a href={member.linkedin} className="team__linkedin" target="_blank" rel="noopener noreferrer">
                  LinkedIn →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
