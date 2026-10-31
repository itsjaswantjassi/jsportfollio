import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../data/portfolio";
import "./portrait-hero.css";

function HeroArrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={down ? "M12 4v16m-7-7 7 7 7-7" : "M5 19 19 5M5 5h14v14"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PortraitHero() {
  const section = useRef<HTMLElement>(null);
  const userPaused = useRef(false);
  const syncMotion = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      setMotionEnabled(true);
      let inView = false;
      const context = gsap.context(() => {
        gsap.from(".portrait-hero__copy", {
          x: -22,
          duration: 1.05,
          ease: "power3.out",
          clearProps: "transform",
        });
      }, section);
      // One heading, one transform. No cloned marquee text or animation loop
      // running when the banner is offscreen, hidden, or explicitly paused.
      const heading = section.current?.querySelector(
        ".portrait-hero__name-motion",
      );
      const drift = gsap.fromTo(
        heading!,
        { x: -12 },
        {
          x: 12,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        },
      );
      const sync = () =>
        drift.paused(userPaused.current || document.hidden || !inView);
      syncMotion.current = sync;
      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      if (section.current) observer.observe(section.current);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        syncMotion.current = null;
        drift.revert();
        context.revert();
        setMotionEnabled(false);
      };
    });
    return () => media.revert();
  }, []);

  const toggleMotion = () => {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    syncMotion.current?.();
  };

  return (
    <section
      ref={section}
      className="portrait-hero"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="portrait-hero__background">
        <img
          src="/images/banner-original.webp"
          srcSet="/images/portrait-960.webp 960w, /images/banner-original.webp 1672w"
          sizes="(max-width: 760px) 960px, 100vw"
          width="1672"
          height="941"
          alt="Jaswant Singh in a charcoal suit and black turban, seated against a grey studio background"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="portrait-hero__light" aria-hidden="true" />
      <div className="portrait-hero__content">
        <div className="portrait-hero__copy">
          <p className="portrait-hero__job">
            Web &amp; AI <br />
            Developer<span>.</span>
          </p>
          <p className="portrait-hero__description">
            Thoughtful websites. Practical AI.
            <br />
            Built around what your business needs.
          </p>
          <div className="portrait-hero__actions">
            <a className="portrait-hero__work" href="#work">
              Explore my work <HeroArrow />
            </a>
            <a
              className="portrait-hero__resume"
              href={profile.resumeUrl}
              download
            >
              Download resume <HeroArrow down />
            </a>
          </div>
        </div>
        <h1 id="hero-title" className="portrait-hero__name">
          <span className="portrait-hero__name-motion">
            <span>Jaswant</span> <span>Singh</span>
          </span>
        </h1>
        <div className="portrait-hero__footer">
          <p className="portrait-hero__location">
            <span className="portrait-hero__status" aria-hidden="true" />
            New Delhi, India
          </p>
          <p className="portrait-hero__expertise">
            WordPress <span>/</span> Shopify <span>/</span> AI integration
          </p>
          <p className="portrait-hero__proof">
            Nearly 4 years of experience
            <br />
            100+ websites delivered
          </p>
          <div className="portrait-hero__motion-control">
            {motionEnabled && (
              <button
                type="button"
                onClick={toggleMotion}
                aria-pressed={paused}
                aria-label={
                  paused ? "Resume name animation" : "Pause name animation"
                }
                className="portrait-hero__pause"
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  {paused ? (
                    <path d="m5 3 7 5-7 5V3Z" fill="currentColor" />
                  ) : (
                    <path
                      d="M5 3v10M11 3v10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}
                </svg>
                {paused ? "Resume motion" : "Pause motion"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
