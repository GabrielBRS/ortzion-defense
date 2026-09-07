import { ArrowLeft, FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="technical-grid grid min-h-screen place-items-center bg-[#08090b] px-5 text-white"
    >
      <div className="max-w-lg border border-white/10 bg-[#0d1014] p-8 sm:p-10">
        <FileQuestion className="size-8 text-red-500" />
        <p className="eyebrow mt-8">404 / Route unavailable</p>
        <h1 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.055em]">
          No authorized view found.
        </h1>
        <p className="mt-5 text-sm leading-7 text-steel">
          The requested page does not exist or is outside the current application route map.
        </p>
        <Link href="/" className="action-secondary mt-8">
          <ArrowLeft className="size-4" /> Return home
        </Link>
      </div>
    </main>
  );
}
