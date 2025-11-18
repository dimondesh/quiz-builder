"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-violet-900/40 ring-1 ring-white/10">
        <h2 className="text-xl font-semibold text-white text-center">
          🎉 Quiz created!
        </h2>

        <p className="mt-2 text-center text-slate-300">
          Your quiz has been successfully saved.
        </p>

        <button
          onClick={onClose}
          className="
            mt-6 w-full rounded-xl bg-violet-500 px-4 py-3 
            text-sm font-semibold text-white shadow-lg 
            shadow-violet-900/50 transition hover:bg-violet-600
          "
        >
          Go to Browse
        </button>
      </div>
    </div>
  );
}
