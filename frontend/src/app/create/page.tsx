"use client";
/* eslint-disable react-hooks/incompatible-library */

import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/lib/api";
import { QuestionType } from "@/types/quiz";

interface OptionForm {
  text: string;
  isCorrect: boolean;
}

interface QuestionForm {
  text: string;
  type: QuestionType;
  options?: OptionForm[];
  correctAnswer?: string;
}

interface QuizForm {
  title: string;
  questions: QuestionForm[];
}

export default function CreateQuizPage() {
  const { register, control, handleSubmit, watch } = useForm<QuizForm>({
    defaultValues: {
      title: "",
      questions: [
        {
          text: "",
          type: "BOOLEAN",
          options: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  const onSubmit = async (data: QuizForm) => {
    await api.post("/quizzes", data);
    alert("Quiz created!");
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-black/20 focus:border-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-400/40";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute left-8 bottom-4 h-20 w-20 rounded-full bg-sky-400/20 blur-2xl" />
        <div className="relative space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-200/80">
            Build mode
          </p>
          <h1 className="text-4xl font-semibold text-white">Create a quiz</h1>
          <p className="max-w-3xl text-slate-300">
            Design questions, pick the right answer style, and preview the
            grading hints. Everything stays flexible until you hit publish.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10 backdrop-blur-xl"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-indigo-100">
            Quiz title
          </label>
          <input
            {...register("title")}
            placeholder="E.g. Fundamentals of TypeScript"
            className={fieldClass}
          />
        </div>

        <div className="space-y-5">
          {fields.map((field, index) => {
            const type = watchQuestions[index]?.type;

            return (
              <div
                key={field.id}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-lg shadow-indigo-900/40 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-indigo-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 text-white shadow-lg shadow-indigo-900/60">
                      {index + 1}
                    </span>
                    Question
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm font-semibold text-rose-200 transition hover:text-rose-100"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-100">
                    Prompt
                  </label>
                  <input
                    {...register(`questions.${index}.text`)}
                    className={fieldClass}
                    placeholder={`Write your question ${index + 1}...`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-100">
                    Answer type
                  </label>
                  <select
                    {...register(`questions.${index}.type`)}
                    className={`${fieldClass} cursor-pointer border-indigo-300/50 bg-indigo-500/10 text-white`}
                  >
                    <option value="BOOLEAN">Boolean</option>
                    <option value="INPUT">Input</option>
                    <option value="CHECKBOX">Checkbox</option>
                  </select>
                </div>

                {type === "INPUT" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-indigo-100">
                      Correct answer
                    </label>
                    <input
                      {...register(`questions.${index}.correctAnswer`)}
                      className={fieldClass}
                      placeholder="Type the expected response"
                    />
                  </div>
                )}

                {(type === "BOOLEAN" || type === "CHECKBOX") &&
                  watchQuestions[index]?.options?.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-1 flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-indigo-100">
                          Option {optIdx + 1}
                        </label>
                        <input
                          {...register(
                            `questions.${index}.options.${optIdx}.text`
                          )}
                          className={fieldClass}
                          placeholder="Choice text"
                        />
                      </div>

                      <label className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-200 sm:mt-0 sm:w-40 sm:justify-end">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-400 focus:ring-indigo-400/50"
                          {...register(
                            `questions.${index}.options.${optIdx}.isCorrect`
                          )}
                        />
                        Correct answer
                      </label>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              append({
                text: "",
                type: "BOOLEAN",
                options: [
                  { text: "True", isCorrect: true },
                  { text: "False", isCorrect: false },
                ],
            })
          }
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-900/50 transition hover:border-indigo-300/60 hover:bg-white/10"
        >
          + Add question
        </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition hover:translate-y-[-1px]"
          >
            Save quiz
          </button>
        </div>
      </form>
    </div>
  );
}
