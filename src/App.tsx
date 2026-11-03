import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortraitHero from "./components/PortraitHero";
import SelectedWork from "./components/SelectedWork";
import {
  capabilities,
  education,
  experience,
  profile,
} from "./data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function Arrow({
  diagonal = false,
  down = false,
  className = "",
}: {
  diagonal?: boolean;
  down?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          down
            ? "M12 4v16m-7-7 7 7 7-7"
            : diagonal
              ? "M5 19 19 5M5 5h14v14"
              : "M4 12h16m-7-7 7 7-7 7"
        }
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // React mounts after the browser's first attempt to resolve an incoming hash.
  // Restore direct links to project chapters without animating the initial visit.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!window.location.hash) return;
      try {
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant", block: "start" });
      } catch {
        /* An invalid URL fragment must not interrupt the portfolio. */
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".site-header"))
        setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 23 },
            {
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 94%", once: true },
            },
          );
        });
        gsap.fromTo(
          ".crossover-line--one",
          { xPercent: -8 },
          {
            xPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: ".crossover",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
            },
          },
        );
        gsap.fromTo(
          ".crossover-line--two",
          { xPercent: 7 },
          {
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: ".crossover",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
            },
          },
        );
      }, appRef);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={appRef} className="portfolio portfolio--portrait">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="wordmark"
            href="#home"
            aria-label="Jaswant Singh, back to top"
          >
            <span className="monogram" aria-hidden="true">
              js<span>.</span>
            </span>
            <span>
              Jaswant Singh
              <span className="wordmark-role">Web & AI Developer</span>
            </span>
          </a>
          <button
            id="menu-toggle"
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span
              className={menuOpen ? "menu-icon is-open" : "menu-icon"}
              aria-hidden="true"
            >
              <i />
              <i />
            </span>
          </button>
          <nav
            id="main-navigation"
            className={menuOpen ? "main-navigation is-open" : "main-navigation"}
            aria-label="Main navigation"
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Selected work
            </a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>
              Capabilities
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <PortraitHero />

        <div className="portfolio-content">
        <SelectedWork />

        <section
          className="crossover"
          aria-label="Connecting web, commerce, and AI"
        >
          <h2 className="sr-only">Connecting web, commerce, and AI</h2>
          <div aria-hidden="true">
            <div className="crossover-line crossover-line--one">
              WEB / COMMERCE
            </div>
            <div className="crossover-line crossover-line--two">
              COMMERCE / AI
            </div>
          </div>
          <p>
            Good things happen <br />
            when the pieces connect.
          </p>
        </section>

        <section
          className="capabilities-section section-pad frame"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="section-heading" data-reveal>
            <h2 id="capabilities-title">
              Built around
              <br />
              what you need.
            </h2>
            <p>
              A solid website is the start. <br />
              What it can do is where it gets interesting.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <article
                className="capability-row"
                key={capability.title}
                data-reveal
              >
                <div
                  className={`capability-symbol capability-symbol--${index}`}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{capability.title}</h3>
                <div>
                  <p>{capability.description}</p>
                  <ul className="capability-skills">
                    {capability.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="experience-section section-pad"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="frame experience-layout">
            <div className="experience-intro" data-reveal>
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
                Download my resume <Arrow down />
              </a>
            </div>
            <div className="experience-list">
              {experience.map((job) => (
                <article
                  className="experience-item"
                  key={job.company}
                  data-reveal
                >
                  <span className="job-period">{job.period}</span>
                  <h3>{job.role}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="job-description">{job.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad frame"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-main">
            <div className="about-name-art" aria-hidden="true">
              <span>jaswant</span>
              <span>
                singh<span className="about-name-dot">.</span>
              </span>
              <div className="about-place">
                <span className="location-dot" />
                New Delhi, India
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <h2 id="about-title">
                Thoughtful by nature.
                <br />
                Practical by choice.
              </h2>
              <p>
                I’m Jaswant Singh, a New Delhi–based developer working where
                websites, commerce, and AI come together.
              </p>
              <p>
                I enjoy the whole journey: understanding what a business needs,
                building the right experience, and making the details work.
                Sometimes that’s a well-built Shopify store. Sometimes it’s a
                custom WordPress plugin that takes a repetitive task off
                someone’s plate.
              </p>
              <p>
                My focus is simple: build things that are clear, useful, and
                easy to work with.
              </p>
            </div>
          </div>
          <div className="education-layout">
            <h3>Learning the foundations.</h3>
            <div>
              {education.map((item) => (
                <article className="education-item" key={item.title}>
                  <span>{item.period}</span>
                  <h4>{item.title}</h4>
                  <p>{item.institution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="frame">
            <div className="contact-top">
              <h2 id="contact-title">
                Have something
                <br />
                in mind?
              </h2>
              <a
                className="contact-arrow"
                href={`mailto:${profile.email}`}
                aria-label="Email Jaswant about your project"
              >
                <Arrow diagonal />
              </a>
            </div>
            <div className="contact-bottom">
              <p>
                A website, a store, or a smarter way to work.
                <br />
                Let’s make it happen.
              </p>
              <div className="contact-links">
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <Arrow diagonal />
                </a>
                <div>
                  <a href={profile.phoneHref}>{profile.phone}</a>
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn <Arrow diagonal />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
      <footer className="site-footer">
        <div className="frame">
          <a href="#home" className="footer-name">
            Jaswant Singh<span>Web & AI Developer</span>
          </a>
          <span>Made with thought. Built with care.</span>
          <a href="#home" className="back-top">
            Back to top <Arrow diagonal />
          </a>
        </div>
      </footer>
    </div>
  );
}
