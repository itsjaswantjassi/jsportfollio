import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectPreview from "./ProjectPreview";
import { projects } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import "./selected-work.css";

gsap.registerPlugin(ScrollTrigger);

// A narrow preview is still the portfolio: keep its stacking interaction live.
const stackQuery = "(prefers-reduced-motion: no-preference)";

function ProjectArrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectInformation({ project }: { project: Project }) {
  return (
    <details className="stack-project-details">
      <summary>
        Behind the project
        <span className="plus" aria-hidden="true" />
      </summary>
      <div className="stack-project-story">
        <div><h4>The purpose</h4><p>{project.purpose}</p></div>
        <div><h4>My contribution</h4><p>{project.contribution}</p></div>
        <div><h4>The outcome</h4><p>{project.outcome}</p></div>
      </div>
    </details>
  );
}

function ProjectVideo({ project, active }: { project: Project; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    let visible = false;
    const syncPlayback = () => {
      if (visible && active && !reducedMotion && !document.hidden) {
        void video.play().catch(() => {
          // Keep the current frame if the browser blocks muted autoplay.
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReducedMotion(motion.matches);
    observer.observe(video);
    if (!active || reducedMotion || document.hidden) video.pause();
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [active, reducedMotion, failed]);

  if (failed) return <ProjectPreview project={project} />;

  return (
    <figure className={`project-media project-media--${project.preview}`}>
      <div className="project-visual project-visual--video">
        <video ref={videoRef} src={project.video} aria-label={`${project.title} website preview`} autoPlay={active && !reducedMotion} muted loop playsInline preload="metadata" onError={() => setFailed(true)} />
      </div>
      <figcaption><span>{project.title}</span><span>Project video</span></figcaption>
    </figure>
  );
}

function indexTitle(project: Project) {
  if (project.id === "wordpress-business-assistant") return "WordPress + AI";
  if (project.id === "ai-seo-automation") return "SEO + automation";
  if (project.id === "kho-kho-federation") return "Kho Kho Federation";
  return project.title;
}

export default function SelectedWork() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(projects[0].id);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const anchors = Array.from(root.querySelectorAll<HTMLElement>(".work-stack-anchor"));
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".work-stack-card"));
    let resizeFrame = 0;
    let disposed = false;

    // Anchors stay in normal flow, even while their sibling cards are sticky.
    const updateActiveProject = () => {
      const activationLine = Math.min(window.innerHeight * 0.32, 220);
      let active = projects[0].id;
      for (const anchor of anchors) {
        if (anchor.getBoundingClientRect().top <= activationLine) active = anchor.id;
        else break;
      }
      setActiveProject((previous) => previous === active ? previous : active);
    };

    const media = gsap.matchMedia();
    media.add(stackQuery, () => {
      const stickyOffset = (index: number) => {
        const styles = window.getComputedStyle(root);
        return Number.parseFloat(styles.getPropertyValue("--stack-top")) +
          index * Number.parseFloat(styles.getPropertyValue("--stack-step"));
      };
      cards.slice(0, -1).forEach((card, index) => {
        const surface = card.querySelector(".work-stack-surface");
        if (!surface) return;
        gsap.to(surface, {
          scale: 0.96,
          y: -6,
          ease: "none",
          scrollTrigger: {
            trigger: anchors[index + 1],
            start: () => `top ${Math.min(window.innerHeight * 0.8, 700)}`,
            end: () => `top ${stickyOffset(index + 1)}`,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    const measureCards = () => {
      resizeFrame = 0;
      if (disposed) return;
      // Measure naturally sized cards for the available sticky viewport.
      // Expanded stories leave the stack through CSS and use normal page flow.
      cards.forEach((card) => {
        const surface = card.firstElementChild as HTMLElement;
        card.style.setProperty("--stack-card-height", `${surface.offsetHeight}px`);
      });
      ScrollTrigger.refresh();
      updateActiveProject();
    };
    const scheduleMeasure = () => {
      if (!resizeFrame) resizeFrame = window.requestAnimationFrame(measureCards);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    cards.forEach((card) => observer.observe(card.firstElementChild!));
    window.addEventListener("scroll", updateActiveProject, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("hashchange", updateActiveProject);
    void document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });
    measureCards();

    return () => {
      disposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", updateActiveProject);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("hashchange", updateActiveProject);
      media.revert();
    };
  }, []);

  const revealFocusedCard = (event: FocusEvent<HTMLElement>, projectId: string) => {
    if (!window.matchMedia(stackQuery).matches ||
        event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    const bounds = event.target.getBoundingClientRect();
    const hit = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    if (bounds.top >= 16 && bounds.bottom <= window.innerHeight - 16 &&
        hit && event.currentTarget.contains(hit)) return;
    // Keyboard navigation can reach a card already covered by a later card.
    // Reveal its stable anchor before the focused control is used.
    document.getElementById(projectId)?.scrollIntoView({ behavior: "instant", block: "start" });
    event.target.scrollIntoView({ behavior: "instant", block: "nearest" });
  };

  return (
    <section ref={rootRef} className="work-section work-stacking section-pad" id="work" aria-labelledby="work-title">
      <div className="frame work-stack-layout">
        <aside className="work-stack-sidebar">
          <div className="work-stack-intro">
            <h2 id="work-title">Selected work<span className="heading-period">.</span></h2>
            <p>Different businesses.<br />The same care in the details.</p>
          </div>
          <nav className="project-index" aria-label="Project index">
            <span className="index-label">Explore the work</span>
            {projects.map((project) => (
              <a key={project.id} href={`#${project.id}`} aria-label={`${project.number}. ${project.title}`} aria-current={activeProject === project.id ? "location" : undefined}>
                <span>{project.number}</span>
                <span>{indexTitle(project)}</span>
                <ProjectArrow />
              </a>
            ))}
          </nav>
          <p className="work-stack-footnote">Web, commerce &amp;<br />everything connected.</p>
        </aside>

        <div className="work-stack" aria-label="Selected projects">
          {projects.map((project, index) => {
            const stackStyle = { "--stack-order": index } as CSSProperties;
            return (
              <Fragment key={project.id}>
                {index === 3 && <div id="more-work" className="work-stack-legacy-anchor" style={stackStyle} aria-hidden="true" />}
                <div id={project.id} className="work-stack-anchor" style={stackStyle} aria-hidden="true" />
                <article className="work-stack-card" style={stackStyle} aria-labelledby={`${project.id}-title`} data-project-id={project.id} onFocusCapture={(event) => revealFocusedCard(event, project.id)}>
                  <div className="work-stack-surface">
                    <div className="work-stack-card-top">
                      <span className="work-stack-number">{project.number}</span>
                      <span>{project.category}</span>
                    </div>
                    {project.video ? <ProjectVideo project={project} active={activeProject === project.id} /> : <ProjectPreview project={project} />}
                    <div className="work-stack-card-body">
                      <div className="work-stack-copy">
                        <h3 id={`${project.id}-title`}>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <div className="work-stack-meta">
                        <ul className="tech-list" aria-label={`${project.title} technologies`}>
                          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                        </ul>
                        {project.url ? (
                          <a className="stack-project-link" href={project.url} target="_blank" rel="noopener noreferrer">
                            Visit live site <ProjectArrow />
                            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                          </a>
                        ) : <span className="stack-project-type">{project.category}</span>}
                      </div>
                    </div>
                    <ProjectInformation project={project} />
                  </div>
                </article>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
