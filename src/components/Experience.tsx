import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, profile } from "../data/portfolio";
import "./experience.css";

gsap.registerPlugin(ScrollTrigger);

const companyMonograms: Record<string, string> = {
  HANJICREATIONS: "HC",
  "SOCIAL EMERGER WEB SOLUTIONS": "SE",
  "PRUDENTIAL BIOTECH": "PB",
};

function ArrowDown() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16m-7-7 7 7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const items = Array.from(list.querySelectorAll<HTMLElement>(".experience-item"));
        gsap.utils.toArray<HTMLElement>(".experience-connector", list).forEach((connector, index) => {
          const nextItem = items[index + 1];
          if (!nextItem) return;
          gsap.fromTo(
            connector,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: nextItem,
                start: "top 73%",
                end: "top 54%",
                scrub: 0.45,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".experience-marker", list).forEach((marker) => {
          gsap.fromTo(
            marker,
            { scale: 0.82, opacity: 0.62 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: marker.closest(".experience-item"),
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }, section);
      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      className="experience-section experience-timeline section-pad"
      id="experience"
      aria-labelledby="experience-title"
      ref={sectionRef}
    >
      <div className="frame experience-layout">
        <div className="experience-intro" data-reveal>
          <span className="experience-eyebrow"><i aria-hidden="true" /> EXPERIENCE</span>
          <h2 id="experience-title">
            Experience,
            <br />
            put to work.
          </h2>
          <p>
            From business websites to AI integrations. A foundation built by
            making things that people use.
          </p>
          <a className="text-link" href={profile.resumeUrl} download>
            Download my resume <ArrowDown />
          </a>
        </div>

        <div className="experience-track">
          <ol className="experience-list" ref={listRef} aria-label="Career experience">
            {experience.map((job, index) => {
              const monogram = companyMonograms[job.company] ?? job.company.slice(0, 2);
              const current = job.period.includes("Present");

              return (
                <li className="experience-item" key={job.company} data-reveal>
                  <span className="experience-marker" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </span>
                  {index < experience.length - 1 && <span className="experience-connector" aria-hidden="true" />}
                  <article className={`experience-card${current ? " experience-card--current" : ""}`}>
                    <div className="experience-card-top">
                      <span className="job-period">{job.period}</span>
                      {current && <span className="experience-current"><i aria-hidden="true" /> Current role</span>}
                    </div>
                    <div className="experience-card-heading">
                      <span className={`company-logo company-logo--${index + 1}`} aria-hidden="true">{monogram}</span>
                      <div className="experience-role">
                        <p className="job-company">{job.company}</p>
                        <h3>{job.role}</h3>
                      </div>
                      <span className="experience-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
