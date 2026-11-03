import { useEffect, useRef, useState } from "react";
import { capabilities } from "../data/portfolio";
import "./capabilities.css";

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let inView = false;
    const syncMotion = () => {
      setMotionAllowed(preference.matches);
      setMotionActive(preference.matches && inView && !document.hidden);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncMotion();
      },
      { threshold: 0 },
    );

    observer.observe(section);
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="capabilities-showcase"
      id="capabilities"
      aria-labelledby="capabilities-title"
      data-motion={motionActive && !paused ? "running" : "paused"}
    >
      <div className="capabilities-showcase__frame">
        <div className="capabilities-showcase__introduction">
          <p className="capabilities-showcase__label" aria-hidden="true">Capabilities</p>
          <h2 id="capabilities-title">
            <span>Built around</span>{" "}
            <span className="capabilities-showcase__heading-accent">what you need.</span>
          </h2>
          <p className="capabilities-showcase__intro">
            A solid website is the start. What it can do is where it gets interesting.
          </p>

          <figure className="capabilities-showcase__illustration" aria-hidden="true">
            <svg className="capabilities-showcase__curve" viewBox="0 0 160 320" fill="none">
              <path
                d="M125 276C39 239 19 171 47 110C61 81 82 62 111 48M95 46L113 47L111 65"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <img
              src="/images/capabilities-browser-fan.png"
              alt=""
              width="1024"
              height="1024"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="capabilities-showcase__motion-control">
            {motionAllowed && (
              <button
                className="capabilities-showcase__pause"
                type="button"
                onClick={() => setPaused((previous) => !previous)}
                aria-pressed={paused}
                aria-label={paused ? "Resume capabilities animation" : "Pause capabilities animation"}
              >
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  {paused ? (
                    <path d="m6 4 7 5-7 5V4Z" fill="currentColor" />
                  ) : (
                    <path d="M6 4v10M12 4v10" stroke="currentColor" strokeWidth="1.6" />
                  )}
                </svg>
                {paused ? "Resume animation" : "Pause animation"}
              </button>
            )}
          </div>
        </div>

        <div className="capabilities-showcase__services">
          {capabilities.map((capability, index) => (
            <article
              className={`capabilities-showcase__service${index === 0 ? " capabilities-showcase__service--featured" : ""}`}
              key={capability.title}
              aria-labelledby={`capability-service-${index + 1}`}
            >
              <span className="capabilities-showcase__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="capabilities-showcase__service-content">
                <h3 id={`capability-service-${index + 1}`}>{capability.title}</h3>
                <p className="capabilities-showcase__description">{capability.description}</p>
                <ul className="capabilities-showcase__skills" aria-label={`${capability.title} skills`}>
                  {capability.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
