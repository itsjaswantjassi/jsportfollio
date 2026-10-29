import { useState } from "react";
import type { Project, ProjectPreview as PreviewKind } from "../data/portfolio";

function MountainScene() {
  return (
    <svg className="travel-landscape" viewBox="0 0 800 450" aria-hidden="true">
      <rect width="800" height="450" fill="#b5cedd" />
      <circle cx="613" cy="95" r="40" fill="#f4edcf" />
      <path d="M0 265 177 95 344 270 484 130 800 321V450H0Z" fill="#8aabb7" />
      <path
        d="m177 95-61 107 58-24 55 20zM484 130l-54 90 54-19 43 31z"
        fill="#e4ecea"
      />
      <path
        d="M0 345 130 263 260 320 405 250 585 350 800 270V450H0Z"
        fill="#466f76"
      />
      <path d="M0 407 183 347 356 406 529 331 800 386V450H0Z" fill="#244e50" />
      <path
        d="M460 450c-30-42-99-44-62-72s57-30 40-54c42 25 3 45 5 55s49 25 67 71"
        fill="#d1dfd9"
      />
    </svg>
  );
}

function Jewelry({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "jewelry-art jewelry-art--small" : "jewelry-art"}
      viewBox="0 0 280 280"
      aria-hidden="true"
    >
      <ellipse cx="140" cy="239" rx="71" ry="10" fill="#b8b59d" opacity=".35" />
      <g fill="none" stroke="#9a793b" strokeWidth="9">
        <ellipse
          cx="103"
          cy="153"
          rx="36"
          ry="59"
          transform="rotate(-17 103 153)"
        />
        <ellipse
          cx="178"
          cy="159"
          rx="36"
          ry="59"
          transform="rotate(17 178 159)"
        />
      </g>
      <g fill="none" stroke="#efe0ad" strokeWidth="3">
        <ellipse
          cx="101"
          cy="152"
          rx="36"
          ry="59"
          transform="rotate(-17 101 152)"
        />
        <ellipse
          cx="176"
          cy="158"
          rx="36"
          ry="59"
          transform="rotate(17 176 158)"
        />
      </g>
      <g fill="#d4bb79" stroke="#9a793b" strokeWidth="2">
        <circle cx="84" cy="93" r="8" />
        <circle cx="195" cy="99" r="8" />
      </g>
    </svg>
  );
}

function Illustration({ kind }: { kind: PreviewKind }) {
  if (kind === "travel")
    return (
      <div className="preview-browser travel-browser" data-ui>
        <div className="browser-chrome">
          <span />
          <span />
          <span />
          <i>TravelBit Holidays</i>
        </div>
        <div className="travel-nav">
          <strong>
            travelbit<span>®</span>
          </strong>
          <span>Discover &nbsp; Journeys &nbsp; About us</span>
          <b>
            Find your escape <span>↗</span>
          </b>
        </div>
        <div className="travel-hero">
          <MountainScene />
          <div>
            <p>Go a little further.</p>
            <strong>
              A new place.
              <br />A new perspective.
            </strong>
            <span>Journeys worth making.</span>
          </div>
          <span className="travel-mark">Explore the extraordinary</span>
        </div>
        <div className="travel-bottom">
          <b>Made for your next chapter.</b>
          <span>Thoughtful itineraries. Seamless bookings.</span>
          <span className="preview-round">↗</span>
        </div>
      </div>
    );

  if (kind === "assistant" || kind === "automation")
    return (
      <div className="preview-browser assistant-browser" data-ui>
        <div className="browser-chrome">
          <span />
          <span />
          <span />
          <i>WordPress / Business assistant</i>
        </div>
        <div className="assistant-app">
          <aside>
            <span className="wp-mark">W</span>
            <span>Overview</span>
            <b>Business assistant</b>
            <span>Content</span>
            <span>Settings</span>
            <span className="assistant-sidebar-bottom">Powered by Gemini</span>
          </aside>
          <div className="assistant-main">
            <div className="assistant-heading">
              <svg
                className="sparkle-mark"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
              <span>
                Less busywork.
                <br />
                <strong>More possibility.</strong>
              </span>
            </div>
            <div className="assistant-prompt">
              <span>What are we creating?</span>
              <b>SEO content for your next page</b>
              <div>
                Page content <span>Connected to WordPress</span>
              </div>
            </div>
            <div className="assistant-options">
              <span className="selected">SEO title</span>
              <span>Description</span>
              <span>FAQs</span>
            </div>
            <div className="assistant-output">
              <span>Content, with a head start.</span>
              <p>
                Turn your page into clear, useful content.
                <br />
                Ready to review. Yours to refine.
              </p>
              <div>
                <span>Generated draft</span>
                <b>
                  Review content <span>↗</span>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (kind === "commerce")
    return (
      <div className="preview-browser commerce-browser" data-ui>
        <div className="browser-chrome">
          <span />
          <span />
          <span />
          <i>Mata Payals / Shopify</i>
        </div>
        <div className="commerce-nav">
          <span>Shop &nbsp; Collections</span>
          <strong>MATA PAYALS</strong>
          <span>Search &nbsp; Bag (0)</span>
        </div>
        <div className="commerce-hero">
          <div>
            <span>Considered details.</span>
            <strong>
              Everyday,
              <br />
              extraordinary.
            </strong>
            <span className="commerce-shop">
              Explore the collection <span>↗</span>
            </span>
          </div>
          <Jewelry />
        </div>
        <div className="commerce-foot">
          <span>
            Made to be worn.
            <br />
            Made to be loved.
          </span>
          <div className="jewelry-tile">
            <Jewelry small />
          </div>
          <div className="commerce-word">
            A little
            <br />
            something
            <br />
            <em>special.</em>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className={`preview-browser archive-illustration archive-illustration--${kind}`}
      data-ui
    >
      <div className="browser-chrome">
        <span />
        <span />
        <span />
        <i>Project preview</i>
      </div>
      <div className="archive-art">
        {kind === "sport" && (
          <>
            <div className="sport-path" />
            <strong>
              A game.
              <br />A community.
            </strong>
            <span>Kho Kho Federation of India</span>
          </>
        )}
        {kind === "health" && (
          <>
            <div className="herbal-leaf" />
            <strong>
              Rooted
              <br />
              in nature.
            </strong>
            <span>Universal Remedies</span>
          </>
        )}
        {kind === "industrial" && (
          <>
            <div className="valve-art">
              <i />
              <i />
              <i />
            </div>
            <strong>
              Built for
              <br />
              performance.
            </strong>
            <span>Trident Valves</span>
          </>
        )}
        {kind === "coffee" && (
          <>
            <div className="coffee-cup" />
            <strong>
              A moment.
              <br />
              Well brewed.
            </strong>
            <span>Zohra’s Coffee Shop</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectPreview({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const missing = failedImage === project.image;
  return (
    <figure
      className={`project-media project-media--${project.preview}${compact ? " project-media--compact" : ""}`}
    >
      <div
        className={`project-visual${imageLoaded && !missing ? " project-visual--image" : ""}`}
      >
        {(!imageLoaded || missing) && (
          <div
            className="preview-drawing"
            role="img"
            aria-label={`Illustrative preview for ${project.title}. Project screenshot to be added.`}
          >
            <Illustration kind={project.preview} />
          </div>
        )}
        {!missing && (
          <img
            src={project.image}
            alt={project.imageAlt}
            width="1600"
            height="1200"
            loading="lazy"
            decoding="async"
            className={
              imageLoaded ? "screenshot screenshot--loaded" : "screenshot"
            }
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setFailedImage(project.image);
              setImageLoaded(false);
            }}
          />
        )}
      </div>
      <figcaption>
        <span>
          {imageLoaded && !missing ? project.title : "Illustrative preview"}
        </span>
        <span>
          {imageLoaded && !missing
            ? "Project screenshot"
            : "Project screenshot to be added"}
        </span>
      </figcaption>
    </figure>
  );
}
