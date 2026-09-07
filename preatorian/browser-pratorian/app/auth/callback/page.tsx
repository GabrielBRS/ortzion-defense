import type { Metadata } from 'next';
import { LoaderCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Completing sign in | PRAETORIAN Portal' };

export default function CallbackPage() {
  return (
    <div role="status" aria-live="polite">
      <div className="flex items-center gap-4">
        <LoaderCircle className="size-7 animate-spin text-red-500 motion-reduce:animate-none" />
        <ShieldCheck className="size-7 text-white/55" />
      </div>
      <h2 className="mt-8 text-4xl font-semibold uppercase tracking-[-0.05em] text-white">
        Verifying identity
      </h2>
      <p className="mt-5 text-sm leading-7 text-steel">
        The configured identity provider completes this step. No authentication tokens are
        rendered on this page.
      </p>
      <Link href="/auth/login" className="action-secondary mt-8">
        Return to sign in
      </Link>
    </div>
  );
}
