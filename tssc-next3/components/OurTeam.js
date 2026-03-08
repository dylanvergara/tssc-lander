'use client';

const TEAM_ROTATIONS = [-18, -10, -3, 4, 11, 19];
const TEAM_TRANSLATE = [-8, -4, -1, 1, 4, 8];

export default function OurTeam() {
  return (
    <section className="section" id="team">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline" style={{ marginBottom: '28px' }}>
            We&apos;re a small, tight-knit team.
          </h2>

          {/* 6 overlapping fan photos */}
          <div className="team-fan">
            {[1,2,3,4,5,6].map((i, idx) => (
              <div
                key={i}
                className="team-fan__photo"
                style={{
                  transform: `rotate(${TEAM_ROTATIONS[idx]}deg) translateY(${TEAM_TRANSLATE[idx]}px)`,
                  zIndex: idx + 1,
                }}
              >
                <img
                  src={`/images/team/team-${i}.jpg`}
                  alt={`TSSC team member ${i}`}
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('team-fan__photo--empty');
                  }}
                />
              </div>
            ))}
          </div>

          <div className="body-copy" style={{ marginTop: '28px' }}>
            <p>With some of our TSSC team members approaching 3 years with us, this is the dream team that will help you get it done!</p>
            <p>You&apos;ll have direct communication with every member of our team and we&apos;re all invested in your success.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
