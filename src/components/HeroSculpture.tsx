import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import "./hero-scene.css";

const HeroScene = lazy(() => import("./HeroScene"));

function StaticSculpture() {
  return (
    <div className="sculpture-static">
      <div className="sculpture-panel sculpture-panel--back">
        <i />
        <i />
        <i />
      </div>
      <div className="sculpture-panel sculpture-panel--blue">
        <i />
        <i />
        <span />
        <span />
      </div>
      <div className="sculpture-panel sculpture-panel--front">
        <i />
        <i />
        <span />
        <span />
        <span />
      </div>
      <div className="sculpture-block sculpture-block--one" />
      <div className="sculpture-block sculpture-block--two" />
      <div className="sculpture-link sculpture-link--one" />
      <div className="sculpture-link sculpture-link--two" />
    </div>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroSculpture({
  className = "",
}: {
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () =>
      setEligible(
        !reduced.matches &&
          !connection?.saveData &&
          "WebGL2RenderingContext" in window &&
          !(
            window.matchMedia("(pointer: coarse)").matches &&
            window.innerWidth < 700
          ),
      );
    const timer = window.setTimeout(update, 180);
    reduced.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (element.current) observer.observe(element.current);
    return () => {
      window.clearTimeout(timer);
      reduced.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={element}
      className={`hero-sculpture ${ready && eligible && !failed ? "is-ready" : ""} ${className}`}
      aria-hidden="true"
    >
      <StaticSculpture />
      {eligible && !failed && (
        <SceneBoundary onError={handleFailure}>
          <Suspense fallback={null}>
            <HeroScene
              active={visible && tabVisible}
              onReady={handleReady}
              onError={handleFailure}
            />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
