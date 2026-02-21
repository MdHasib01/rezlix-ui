"use client";
import { useState } from "react";
import styles from "./Portfolio.module.css";

const projects = [
  { id: 1, title: "Urban Oasis", category: "Residential", img: "/img1.jpg" },
  { id: 2, title: "Skyline Tower", category: "Commercial", img: "/img2.jpg" },
  { id: 3, title: "Eco Center", category: "Public", img: "/img3.png" },
  { id: 4, title: "Modern Villa", category: "Residential", img: "/img1.jpg" },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="portfolio">
      <div
        className="container"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Selected Works</h2>

        <div className={styles.portfolioGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.img}
                alt={project.title}
                className={styles.projectImage}
                loading="lazy"
              />
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.projectCategory}>
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className={styles.lightbox}
            onClick={() => setSelectedProject(null)}
          >
            <button className={styles.closeButton}>&times;</button>
            <img
              src={selectedProject.img}
              alt={selectedProject.title}
              className={styles.lightboxImage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
