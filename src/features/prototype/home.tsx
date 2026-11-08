import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { JobCard } from "@/features/jobs/job-card";
import { usePrototype } from "./store";
import { publishedJobs } from "./model";
import { cn } from "@/lib/utils";
import { NetworkGraphic } from "./network-graphic";

const categories = [
  {
    slug: "build",
    label: "Build",
    description: "Tworzysz modele, systemy i produkty wykorzystujące AI.",
  },
  {
    slug: "apply",
    label: "Apply",
    description: "Używasz AI, żeby lepiej wykonywać swoją właściwą pracę.",
  },
  {
    slug: "lead",
    label: "Lead",
    description: "Prowadzisz zmianę, decyzje i zespoły w świecie AI.",
  },
] as const;

export default function HomePage() {
  const { state } = usePrototype();
  const jobs = publishedJobs(state);
  const latestJobs = jobs.slice(0, 4);
  const count = (slug: string) => jobs.filter((job) => job.category === slug).length;

  return (
    <>
      <section className="home-intro">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-24">
          <div>
            <p className="drai-mono drai-facts" style={{ margin: 0 }}>
              <span>
                Portal pracy z AI · oferty <b>[{jobs.length}]</b>
              </span>
              {categories.map((category) => (
                <span key={category.slug}>
                  {category.label} <b>[{count(category.slug)}]</b>
                </span>
              ))}
            </p>
            <h1 className="mt-6 max-w-4xl">
              <span className="drai-voice">Praca dla ludzi,</span> którzy dowożą z AI.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              Wyselekcjonowane role, w których AI jest częścią odpowiedzialności, decyzji i wyniku
              pracy — nie dopiskiem w employer brandingu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/oferty" className={buttonVariants({ size: "lg" })}>
                Zobacz oferty <ArrowRight />
              </Link>
              <Link
                to="/metodologia"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Jak wybieramy role
              </Link>
            </div>
            <p className="drai-mono" style={{ margin: "24px 0 0" }}>
              Jak to działa / <b>kandydat → własny wkład → rozmowa → firma</b>
            </p>
          </div>
          <NetworkGraphic />
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-16 lg:px-8 lg:py-20">
        <p className="drai-mono" style={{ margin: 0 }}>
          Trzy sposoby pracy z AI
        </p>
        <h2 className="mt-3">Build. Apply. Lead.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {categories.map((category, index) => (
            <article key={category.slug} className="prototype-panel">
              <span className="drai-mono">
                0{index + 1} · oferty <b>[{count(category.slug)}]</b>
              </span>
              <h3 className="mt-3">{category.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--gui-link)] hover:underline"
                to={`/oferty?category=${category.slug}`}
              >
                Przeglądaj role <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="shadow-[inset_0_1px_#e7e1e3]">
        <div className="mx-auto max-w-[1360px] px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="drai-mono" style={{ margin: 0 }}>
                Aktualne role
              </p>
              <h2 className="mt-3">Najnowsze oferty</h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--gui-link)] hover:underline"
              to="/oferty"
            >
              Wszystkie oferty <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 pp-job-list">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
