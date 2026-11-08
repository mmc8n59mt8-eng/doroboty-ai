import { ownershipLabels, type Contribution } from "./model";

/** Noninteractive fact: the text carries the meaning, the fill is supplementary. */
export function OwnershipTag({ ownership }: { ownership: Contribution["ownership"] }) {
  return (
    <span className="ownership-tag" data-ownership={ownership}>
      {ownershipLabels[ownership]}
    </span>
  );
}

/** Employer reading panel for the structured own-contribution card. */
export function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <>
      <div className="contribution-heading">
        <h3>Własny wkład kandydata</h3>
        <OwnershipTag ownership={contribution.ownership} />
      </div>
      <dl className="contribution-answers">
        <div>
          <dt>Co zrobił(a) samodzielnie, a co zespół</dt>
          <dd>{contribution.ownWork}</dd>
        </div>
        <div>
          <dt>Kto i jak długo z tego korzystał</dt>
          <dd>{contribution.usage}</dd>
        </div>
        <div>
          <dt>Wynik albo to, co nie zadziałało</dt>
          <dd>{contribution.outcome}</dd>
        </div>
      </dl>
      <section className="contribution-question" aria-labelledby="contribution-question-heading">
        <h4 id="contribution-question-heading">Dopytaj na rozmowie</h4>
        <p>{contribution.interviewQuestion}</p>
      </section>
      <p className="record-caption">
        Odpowiedzi pochodzą z aplikacji. Oznaczenie i pytanie na rozmowę są w tym prototypie
        przygotowane w scenariuszu (symulacja AI), a nie wyliczane na żywo.
      </p>
    </>
  );
}
