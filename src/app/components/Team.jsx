"use client";
import styles from "./Team.module.css";

const team = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Principal Architect",
    img: "/img2.jpg",
  }, // Reusing images
  { id: 2, name: "David Chen", role: "Design Director", img: "/img3.png" },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Senior Architect",
    img: "/img1.jpg",
  },
];

export default function Team() {
  return (
    <section id="team" className="team">
      <div className="container" style={{ flexDirection: "column" }}>
        <h2 style={{ marginBottom: "3rem" }}>Our Team</h2>

        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.id} className={styles.teamMember}>
              <img
                src={member.img}
                alt={member.name}
                className={styles.memberImage}
                loading="lazy"
              />
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
