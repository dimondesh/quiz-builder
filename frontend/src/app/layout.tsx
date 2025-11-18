import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizz Builder",
  description: "Quizz Builder App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}
      >
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-10">
          <header className="mb-10 flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-6 py-4 shadow-lg shadow-violet-900/40 ring-1 ring-white/10 backdrop-blur-lg">
            <Link
              href="/quizzes"
              className=" hidden md:flex items-center gap-3 "
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500  text-lg font-semibold shadow-lg shadow-violet-900/50">
                QB
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-violet-200/80">
                  Quiz Builder
                </p>
                <p className="text-lg font-semibold text-white">
                  Craft smarter quizzes
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-3 text-sm font-medium">
              <Link
                href="/quizzes"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:border-violet-400/60 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-violet-500/20"
              >
                Browse quizzes
              </Link>
              <Link
                href="/create"
                className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:translate-y-[-1px]"
              >
                New quiz
              </Link>
            </nav>
          </header>

          <main className="space-y-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
