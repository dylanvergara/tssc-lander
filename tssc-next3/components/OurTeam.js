export default function OurTeam() {
  return (
    <section className="section" id="team">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline" style={{ marginBottom: '20px' }}>
            We&apos;re a small, tight-knit team.
          </h2>

          {/* 5 photo slots in a row */}
          <div className="team-photos">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="team-photo-slot">
                <img
                  src={`/images/team/team-${i}.jpg`}
                  alt={`TSSC team member ${i}`}
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('team-photo-slot--empty');
                  }}
                />
              </div>
            ))}
          </div>

          {/* Team copy */}
          <div className="body-copy" style={{ marginTop: '20px' }}>
            <p>With some of our TSSC team members approaching 3 years with us, this is the dream team that will help you get it done!</p>
            <p>You&apos;ll have direct communication with every member of our team and we&apos;re all invested in your success.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
