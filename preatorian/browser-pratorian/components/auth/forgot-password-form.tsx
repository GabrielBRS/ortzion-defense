'use client';

import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" aria-live="polite">
        <CheckCircle2 className="size-8 text-emerald-400" />
        <h2 className="mt-7 text-4xl font-semibold uppercase tracking-[-0.05em] text-white">
          Recovery route validated
        </h2>
        <p className="mt-5 text-sm leading-7 text-steel">
          No email was sent by this frontend. In an enterprise deployment, the configured
          identity provider owns account discovery and recovery delivery.
        </p>
        <Link href="/auth/login" className="action-secondary mt-8">
          <ArrowLeft className="size-4" /> Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Account recovery</p>
      <h2 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.05em] text-white">
        Reset access
      </h2>
      <p className="mt-4 text-sm leading-7 text-steel">
        Enter your organization email. Recovery is completed by the configured identity
        provider.
      </p>
      <form
        className="mt-9 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="grid gap-2">
          <label
            htmlFor="recovery-email"
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55"
          >
            Email{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </label>
          <Input
            id="recovery-email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-12 rounded-none border-white/15 bg-black/25 px-4 text-white focus-visible:border-red-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="h-12 rounded-none bg-red-700 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-red-600"
        >
          Validate recovery route <ArrowRight className="size-4" />
        </Button>
      </form>
      <Link
        href="/auth/login"
        className="mt-7 inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-white"
      >
        <ArrowLeft className="size-4" /> Back to sign in
      </Link>
    </div>
  );
}
