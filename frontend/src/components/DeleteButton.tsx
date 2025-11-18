"use client";

import { api } from "@/lib/api";

export function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    await api.delete(`/quizzes/${id}`);
    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center gap-2 rounded-full border border-red-300/40 bg-red-500/15 px-3 py-1.5 text-sm font-semibold text-red-100 transition hover:border-red-300/70 hover:bg-red-500/25 hover:text-white"
    >
      <span aria-hidden>X</span>
      Delete
    </button>
  );
}
