import { api } from "@/lib/api";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";

interface QuizListItem {
  id: string;
  title: string;
  questionsCount: number;
}

export default async function QuizzesPage() {
  const quizzes: QuizListItem[] = await api.get("/quizzes");
  const hasQuizzes = quizzes.length > 0;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-sky-400/30 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200/80">
              Quiz library
            </p>
            <h1 className="text-4xl font-semibold text-white">All quizzes</h1>
            <p className="max-w-3xl text-slate-300">
              Browse everything you have built so far. Open a quiz to preview its
              questions, or trim the list as you keep experimenting.
            </p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition hover:translate-y-[-1px]"
          >
            <span className="text-lg">+</span>
            Create new quiz
          </Link>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {hasQuizzes ? (
          quizzes.map((q) => (
            <div
              key={q.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-lg shadow-indigo-900/40 ring-1 ring-white/5 transition hover:-translate-y-[2px] hover:border-indigo-300/60 hover:shadow-indigo-900/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <Link
                    href={`/quizzes/${q.id}`}
                    className="text-lg font-semibold text-white underline-offset-4 transition hover:text-indigo-200 hover:underline"
                  >
                    {q.title}
                  </Link>
                  <p className="text-sm text-slate-300">
                    {q.questionsCount} questions ready to run.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                  Quiz
                </span>
              </div>

              <div className="relative mt-5 flex items-center gap-3">
                <Link
                  href={`/quizzes/${q.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-300/50 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-50 transition hover:bg-indigo-500/30"
                >
                  View details
                  <span aria-hidden>-&gt;</span>
                </Link>
                <DeleteButton id={q.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center shadow-lg shadow-indigo-900/30 ring-1 ring-white/5">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200/80">
              Nothing yet
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Start your first quiz
            </h2>
            <p className="mt-2 text-slate-300">
              Create a quiz to see it appear here and keep iterating until it is
              perfect.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition hover:translate-y-[-1px]"
            >
              Build one now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
