import { technologySkills } from "../data/skills";
import { technologyIcons } from "./technology-icons";
import "./technology-skills.css";

// Technical concepts without a brand mark use simple, consistent line icons.
const conceptIcons: Record<string, string> = {
  acf: "M3 3h18v18H3ZM3 9h18M9 9v12M12 13h6m-6 4h4M6 6h.01",
  googleaistudio: "M9 3h6m-5 0v6l-6 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-6-9V3M7 15h10M10 18h.01M15 17h.01",
  api: "M8 6 2 12l6 6m8-12 6 6-6 6M14 4l-4 16",
  terminal: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4 4 4-4 4m7 0h5",
  liquid: "M12 2C10 6 5 10 5 15a7 7 0 0 0 14 0c0-5-5-9-7-13Zm-3 13a3 3 0 0 0 3 3",
  performance: "M4.2 17.8a10 10 0 1 1 15.6 0M12 12l5-5M4 12h1m7-8v1m7 7h1M9 20h6",
  workflow: "M2 9h6v6H2Zm14-7h6v6h-6Zm0 14h6v6h-6ZM8 12h3a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h1M8 12h3a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1",
};

function TechnologyIcon({ name }: { name: string }) {
  const brandPath = technologyIcons[name];

  return (
    <svg
      className="technology-skills__icon"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
      fill={brandPath ? "currentColor" : "none"}
      stroke={brandPath ? undefined : "currentColor"}
      strokeWidth={brandPath ? undefined : 1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={brandPath ?? conceptIcons[name]} />
    </svg>
  );
}

export default function TechnologySkills() {
  return (
    <section
      className="technology-skills section-pad"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="frame">
        <div className="technology-skills__intro" data-reveal>
          <h2 id="skills-title">Technical skills.</h2>
          <p>
            The languages, platforms, and tools behind my web and AI work.
          </p>
        </div>

        <div className="technology-skills__groups">
          {technologySkills.map((group) => (
            <div className="technology-skills__group" key={group.id} data-reveal>
              <h3 id={`skills-${group.id}`}>{group.title}</h3>
              <ul aria-labelledby={`skills-${group.id}`}>
                {group.items.map((skill) => (
                  <li key={skill.name}>
                    <TechnologyIcon name={skill.icon} />
                    <span>
                      {"title" in skill ? (
                        <abbr title={skill.title}>{skill.name}</abbr>
                      ) : (
                        skill.name
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
