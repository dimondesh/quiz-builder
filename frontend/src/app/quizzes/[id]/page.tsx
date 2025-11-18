import { api } from "@/lib/api";
import { Quiz } from "@/types/quiz";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailPage(props: PageProps) {
  const { id } = await props.params;

  const quiz: Quiz = await api.get(`/quizzes/${id}`);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-violet-900/40 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute right-6 bottom-6 h-28 w-28 rounded-full bg-violet-500/20 blur-2xl" />
        <div className="relative flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200/80">
            Quiz overview
          </p>
          <h1 className="text-4xl font-semibold text-white">{quiz.title}</h1>
          <p className="text-slate-300">
            {quiz.questions.length} curated questions. Review the wording,
            confirm the answers, then ship it to your learners.
          </p>
        </div>
      </section>

      <div className="space-y-4">
        {quiz.questions.map((q, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-lg shadow-violet-900/40 ring-1 ring-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-sm font-bold text-white shadow-lg shadow-violet-900/60">
                  {i + 1}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{q.text}</p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-100">
                {q.type}
              </span>
            </div>

            {q.type === "INPUT" && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100">
                Correct answer: {q.correctText}
              </p>
            )}

            {(q.type === "BOOLEAN" || q.type === "CHECKBOX") && q.options && (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((o, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium shadow-sm ${
                      o.isCorrect
                        ? "border-emerald-300/60 bg-emerald-500/15 text-emerald-50"
                        : "border-white/10 bg-white/5 text-slate-200"
                    }`}
                  >
                    <span>{o.text}</span>
                    {o.isCorrect && (
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
