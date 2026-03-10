'use client';

// Dylan is card 1 (leftmost, on top). Each subsequent card falls behind.
// Rotations fan outward from left to right.
const TEAM = [
  { file: 'team-1.jpg', name: 'Dylan' },
  { file: 'team-2.jpg', name: 'Carolyn' },
  { file: 'team-3.jpg', name: 'Diego' },
  { file: 'team-4.jpg', name: 'Burton' },
  { file: 'team-5.jpg', name: 'CH' },
  { file: 'team-6.jpg', name: 'Team' },
];

const ROTATIONS = [-16, -9, -3, 3, 9, 16];
const TRANSLATE_Y = [-6, -3, 0, 0, -3, -6];

export default function OurTeam() {
  return (
    <section className="section" id="team">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline" style={{ marginBottom: '32px' }}>
            We&apos;re a small, tight-knit team.
          </h2>

          {/* Fan layout — card 1 (Dylan) on top, z-index descends */}
          <div className="team-fan">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="team-fan__photo"
                style={{
                  transform: `rotate(${ROTATIONS[idx]}deg) translateY(${TRANSLATE_Y[idx]}px)`,
                  zIndex: TEAM.length - idx,  // card 1 = highest z-index
                }}
              >
                <img
                  src={`/images/team/${member.file}`}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="body-copy" style={{ marginTop: '32px' }}>
            <p>With some of our TSSC team members approaching 3 years with us, this is the dream team that will help you get it done!</p>
            <p>You&apos;ll have direct communication with every member of our team and we&apos;re all invested in your success.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
