"use client";
/* eslint-disable react-hooks/incompatible-library */

import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/lib/api";
import { QuestionType } from "@/types/quiz";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";

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
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { register, control, handleSubmit, watch, setValue } =
    useForm<QuizForm>({
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
    for (const q of data.questions) {
      if (q.type === "CHECKBOX") {
        const hasCorrect = q.options?.some((opt) => opt.isCorrect);
        if (!hasCorrect) {
          alert(
            "Each checkbox question must have at least one correct answer."
          );
          return;
        }
        if (!q.options || q.options.length < 1) {
          alert("Checkbox question must have at least one option.");
          return;
        }
      }
    }
    if (data.questions.length === 0) {
      alert("Quiz must contain at least one question.");
      return;
    }
    await api.post("/quizzes", data);

    setSuccess(true);

    setTimeout(() => {
      router.push("/quizzes");
    }, 1500);
  };
  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-black/20 focus:border-violet-300/70 focus:outline-none focus:ring-2 focus:ring-violet-400/40";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-violet-900/40 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute left-8 bottom-4 h-20 w-20 rounded-full bg-sky-400/20 blur-2xl" />
        <div className="relative space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200/80">
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
        className="space-y-5 rounded-3xl border border-white/10 bg-white/5 px-7 py-8 shadow-2xl shadow-violet-900/40 ring-1 ring-white/10 backdrop-blur-xl"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-violet-100">
            Quiz title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Quiz title"
            className={fieldClass}
          />
        </div>

        <div className="space-y-5">
          {fields.map((field, index) => {
            const type = watchQuestions[index]?.type;

            return (
              <div
                key={field.id}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-lg shadow-violet-900/40 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-violet-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-900/60">
                      {index + 1}
                    </span>
                    Question
                  </div>
                  <button
                    type="button"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    className={`text-sm font-semibold transition
    ${
      fields.length === 1
        ? "text-gray-600 cursor-not-allowed"
        : "text-red-400 hover:text-red-300"
    }
  `}
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-violet-100">
                    Prompt
                  </label>
                  <input
                    {...register(`questions.${index}.text`, {
                      required: "Question text is required",
                      minLength: {
                        value: 3,
                        message: "Question must be at least 3 characters",
                      },
                    })}
                    className={fieldClass}
                    placeholder="Write your question..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-violet-100">
                    Answer type
                  </label>

                  <div className="flex gap-2">
                    {["BOOLEAN", "INPUT", "CHECKBOX"].map((val) => {
                      const isActive = watchQuestions[index]?.type === val;

                      return (
                        <button
                          type="button"
                          key={val}
                          onClick={() =>
                            setValue(
                              `questions.${index}.type`,
                              val as QuestionType, // <── FIX
                              { shouldValidate: true }
                            )
                          }
                          className={`
            px-4 py-2 rounded-xl text-sm font-semibold transition
            border
            ${
              isActive
                ? "border-violet-500/70 bg-violet-500/20 text-violet-200 shadow-md shadow-violet-900/30"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }
          `}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {type === "INPUT" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-violet-100">
                      Correct answer
                    </label>
                    <input
                      {...register(`questions.${index}.correctAnswer`)}
                      className={fieldClass}
                      placeholder="Type the expected response"
                    />
                  </div>
                )}

                {type === "BOOLEAN" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-violet-100">
                      Correct answer
                    </label>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="true"
                          {...register(`questions.${index}.correctAnswer`)}
                          className="peer hidden"
                        />
                        <div
                          className="
    h-5 w-5 rounded-full border-2 border-white/30 
    peer-checked:border-violet-400 peer-checked:bg-violet-500
    transition-all duration-200
  "
                        ></div>
                        <span className="text-sm text-slate-200">True</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="false"
                          {...register(`questions.${index}.correctAnswer`)}
                          className="peer hidden"
                        />
                        <div
                          className="
    h-5 w-5 rounded-full border-2 border-white/30 
    peer-checked:border-violet-400 peer-checked:bg-violet-500
    transition-all duration-200
  "
                        ></div>
                        <span className="text-sm text-slate-200">False</span>
                      </label>
                    </div>
                  </div>
                )}

                {type === "CHECKBOX" && (
                  <div className="space-y-3">
                    {watchQuestions[index]?.options?.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex flex-1 flex-col gap-1">
                          <label className="text-xs font-semibold uppercase tracking-wide text-violet-100">
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

                        <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-slate-200 sm:mt-0 sm:w-40 sm:justify-end cursor-pointer">
                          <input
                            type="checkbox"
                            {...register(
                              `questions.${index}.options.${optIdx}.isCorrect`
                            )}
                            className="peer hidden"
                          />
                          <div
                            className="
      h-5 w-5 rounded-md border-2 border-white/30 
      peer-checked:border-violet-400 peer-checked:bg-violet-500
      flex items-center justify-center transition-all duration-200
    "
                          >
                            <svg
                              className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          Correct
                        </label>
                      </div>
                    ))}

                    {/* Add option button */}
                    <button
                      type="button"
                      onClick={() =>
                        setValue(`questions.${index}.options`, [
                          ...(watchQuestions[index].options || []),
                          { text: "", isCorrect: false },
                        ])
                      }
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
                    >
                      + Add option
                    </button>
                  </div>
                )}
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
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-900/50 transition hover:border-violet-300/60 hover:bg-white/10"
          >
            + Add question
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:translate-y-[-1px]"
          >
            Save quiz
          </button>
        </div>
      </form>
      <SuccessModal isOpen={success} onClose={() => router.push("/quizzes")} />
    </div>
  );
}
