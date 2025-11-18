import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header section */}
        <section className="relative rounded-3xl border border-white/10 bg-white/5 px-8 py-16 shadow-2xl shadow-violet-900/40 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="absolute left-6 bottom-6 h-20 w-20 rounded-full bg-sky-400/20 blur-2xl" />

          <div className="relative space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-200/80">
              Quiz Builder
            </p>
            <h1 className="text-4xl font-semibold text-white">
              Build quizzes with ease
            </h1>
            <p className="text-slate-300 max-w-xl">
              Create interactive quizzes, customize questions, choose answer
              types, and preview results. Your workspace for smart learning.
            </p>
          </div>

          <div className="relative mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/create"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:translate-y-px sm:w-auto"
            >
              + Create Quiz
            </Link>

            <Link
              href="/quizzes"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-900/50 transition hover:border-violet-300/60 hover:bg-white/10 sm:w-auto"
            >
              View All Quizzes →
            </Link>
          </div>
        </section>

        {/* Info blocks */}
        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-violet-900/40">
            <h3 className="text-lg font-semibold text-white">
              Multiple Question Types
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Choose from boolean, input, and checkbox questions to build
              flexible tests.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-violet-900/40">
            <h3 className="text-lg font-semibold text-white">
              Instant Preview
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              See exactly how your quiz will look before you publish it.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-violet-900/40">
            <h3 className="text-lg font-semibold text-white">
              Smart Validation
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              We ensure no quiz is missing required fields or correct answers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-violet-900/40">
            <h3 className="text-lg font-semibold text-white">Fast & Modern</h3>
            <p className="mt-2 text-sm text-slate-300">
              Powered by Next.js, Prisma, and PostgreSQL — smooth and reliable.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
