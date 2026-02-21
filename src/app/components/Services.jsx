"use client";
import styles from "./Services.module.css";

const services = [
  {
    id: 1,
    title: "Architectural Design",
    desc: "Comprehensive design services from concept to completion.",
  },
  {
    id: 2,
    title: "Interior Planning",
    desc: "Crafting internal spaces that enhance the human experience.",
  },
  {
    id: 3,
    title: "Urban Development",
    desc: "Sustainable planning for communities and cities.",
  },
  {
    id: 4,
    title: "Sustainable Consulting",
    desc: "Eco-friendly solutions for modern construction.",
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container" style={{ flexDirection: "column" }}>
        <h2 style={{ marginBottom: "4rem" }}>Our Expertise</h2>

        <div className={styles.servicesList}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
