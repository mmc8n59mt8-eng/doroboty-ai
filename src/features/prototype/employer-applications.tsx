import { useState } from "react";
import { Link } from "react-router";
import { ownershipLabels, stageLabels, type Application, type Stage } from "./model";

type Filter = "all" | "new" | "reviewed" | "invited" | "rejected";

const filterLabels: Record<Filter, string> = {
  all: "Wszystkie",
  new: "Nowe",
  reviewed: "Przejrzane",
  invited: "Zaproszeni",
  rejected: "Odrzuceni",
};
const filterStages: Record<Exclude<Filter, "all">, Stage[]> = {
  new: ["submitted"],
  reviewed: ["reviewed"],
  invited: ["interview_invited", "first_conversation_held", "continued", "hired"],
  rejected: ["rejected"],
};

function statusClass(stage: Stage) {
  if (stage === "submitted") return "drai-status drai-status--new";
  if (stage === "rejected" || stage === "withdrawn") return "drai-status drai-status--rej";
  if (filterStages.invited.includes(stage)) return "drai-status drai-status--ok";
  return "drai-status";
}

/** Employer candidate list in the "Sieć połączeń" system: rows, mono facts, status filters. */
export function EmployerApplications({
  applications,
  companyName,
}: {
  applications: Application[];
  companyName: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [jobId, setJobId] = useState("all");
  const jobs = [...new Map(applications.map((a) => [a.jobId, a.jobTitle])).entries()];
  const offer = jobs.find(([id]) => id === jobId);
  const searched = applications.filter(
    (a) =>
      (jobId === "all" || a.jobId === jobId) &&
      `${a.candidateName} ${a.jobTitle}`
        .toLocaleLowerCase("pl")
        .includes(query.toLocaleLowerCase("pl")),
  );
  const count = (f: Filter) =>
    f === "all"
      ? searched.length
      : searched.filter((a) => filterStages[f].includes(a.stage)).length;
  const visible =
    filter === "all" ? searched : searched.filter((a) => filterStages[filter].includes(a.stage));

  return (
    <div className="drai-theme drai-page">
      <div className="drai-shell drai-grid">
        <div className="drai-frame">
          <header className="drai-head">
            <div>
              <p className="drai-mono" style={{ margin: "0 0 8px" }}>
                Firma / <b>{companyName}</b> · ogłoszenie /{" "}
                <b>{offer ? offer[1] : `wszystkie [${jobs.length}]`}</b>
              </p>
              <h1 className="drai-h1">
                Kandydaci <span className="drai-mono">[{searched.length}]</span>
              </h1>
            </div>
            <div className="drai-field">
              <label htmlFor="candidate-offer">Ogłoszenie</label>
              <select
                id="candidate-offer"
                className="drai-input"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              >
                <option value="all">Wszystkie ogłoszenia [{applications.length}]</option>
                {jobs.map(([id, title]) => (
                  <option key={id} value={id}>
                    {title} [{applications.filter((a) => a.jobId === id).length}]
                  </option>
                ))}
              </select>
            </div>
            <div className="drai-field">
              <label htmlFor="candidate-search">Szukaj kandydata lub oferty</label>
              <input
                id="candidate-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
          </header>
          <div className="drai-toolbar">
            <div className="drai-tabs" role="group" aria-label="Status aplikacji">
              {(Object.keys(filterLabels) as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {filterLabels[f]} [{count(f)}]
                </button>
              ))}
            </div>
          </div>
          {visible.length ? (
            <ul className="drai-apps" aria-label="Aplikacje">
              {visible.map((a) => (
                <li className="drai-app" key={a.id}>
                  <span className="drai-app__mark" aria-hidden="true">
                    ↳
                  </span>
                  <Link className="drai-app__name" to={`/app/kandydaci/${a.id}`}>
                    {a.candidateName}
                  </Link>
                  <span className={`drai-mono drai-app__status ${statusClass(a.stage)}`}>
                    {stageLabels[a.stage]}
                  </span>
                  <div className="drai-app__body">
                    {a.contribution ? (
                      <p className="drai-app__work">{a.contribution.ownWork}</p>
                    ) : (
                      <p className="drai-app__work drai-app__work--missing">
                        Brak karty własnego wkładu. {a.summary}
                      </p>
                    )}
                    <p className="drai-mono drai-facts" style={{ margin: 0 }}>
                      <span>
                        Oferta / <b>{a.jobTitle}</b>
                      </span>
                      <span>
                        Rola /{" "}
                        <b>
                          {a.contribution
                            ? ownershipLabels[a.contribution.ownership].toLocaleLowerCase("pl")
                            : "brak"}
                        </b>
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="drai-empty">
              <h2 className="drai-h3">Brak aplikacji dla tych filtrów</h2>
              <p className="drai-help" style={{ margin: "6px 0 0" }}>
                Zmień wyszukiwanie albo wybierz status „Wszystkie”.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
