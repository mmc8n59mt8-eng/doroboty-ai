import { ownershipLabels, type Contribution } from "./model";

/**
 * Employer reading panel for the own-contribution card, in the "Sieć połączeń" anatomy:
 * mono eyebrow and fact strip (platform layer), three content cards (candidate's answers),
 * a framed interview question and a caption naming the simulated parts.
 */
export function ContributionCard({
  contribution,
  jobTitle,
}: {
  contribution: Contribution;
  jobTitle: string;
}) {
  return (
    <>
      <p className="drai-mono" style={{ margin: "0 0 10px" }}>
        Przykład pracy · <b>{jobTitle}</b>
      </p>
      <h3>Własny wkład kandydata</h3>
      <p className="drai-mono drai-facts drai-work__facts">
        <span>
          Rola / <b>{ownershipLabels[contribution.ownership].toLocaleLowerCase("pl")}</b>
        </span>
        <span>
          Oznaczenie / <b>symulacja AI</b>
        </span>
      </p>
      <div className="drai-three">
        <section className="drai-card" aria-labelledby="contribution-own">
          <h4 id="contribution-own">Co zrobił(a) sam(a), a co zespół</h4>
          <p>{contribution.ownWork}</p>
        </section>
        <section className="drai-card" aria-labelledby="contribution-usage">
          <h4 id="contribution-usage">Kto i jak długo z tego korzystał</h4>
          <p>{contribution.usage}</p>
        </section>
        <section className="drai-card" aria-labelledby="contribution-outcome">
          <h4 id="contribution-outcome">Wynik albo to, co nie zadziałało</h4>
          <p>{contribution.outcome}</p>
        </section>
      </div>
      <section className="drai-question" aria-labelledby="contribution-question-heading">
        <h4 id="contribution-question-heading" className="drai-mono" style={{ margin: 0 }}>
          Dopytaj na rozmowie / <b>symulacja AI</b>
        </h4>
        <p>{contribution.interviewQuestion}</p>
      </section>
      <p className="drai-help" style={{ margin: "12px 0 0" }}>
        Odpowiedzi pochodzą z aplikacji. Oznaczenie i pytanie na rozmowę są w tym prototypie
        przygotowane w scenariuszu (symulacja AI), a nie wyliczane na żywo.
      </p>
    </>
  );
}

/** Match Score below the work example: mono value, plain description, no accent colour. */
export function DraiMatchScore({ score }: { score: number }) {
  return (
    <section className="drai-score" aria-labelledby="drai-score-heading">
      <div className="drai-score__head">
        <h3 id="drai-score-heading" className="drai-mono" style={{ margin: 0 }}>
          Match Score / <b className="drai-score__val">{score}</b> / 100
        </h3>
      </div>
      <p className="drai-score__lead">
        Zgodność tekstu aplikacji z ogłoszeniem. Nie mierzy umiejętności.
      </p>
      <details>
        <summary>Co to znaczy?</summary>
        <p>
          Wynik liczy model dr-match-1 na podstawie tekstów: ogłoszenia, profilu i odpowiedzi
          kandydata. To nie jest test umiejętności ani szansa na zatrudnienie. Od czerwca 2026 słabo
          przewiduje, kto przejdzie dalej po pierwszej rozmowie. W tym prototypie wynik jest stałą
          wartością ze scenariusza, a składowe nie są zapisane.
        </p>
      </details>
    </section>
  );
}
