'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function PortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="mx-auto max-w-xl border border-red-500/20 bg-red-950/10 p-8"
      role="alert"
    >
      <AlertTriangle className="size-7 text-red-400" />
      <h1 className="mt-7 text-2xl font-semibold uppercase tracking-[-0.03em] text-white">
        Portal data unavailable
      </h1>
      <p className="mt-4 text-sm leading-6 text-white/55">
        The requested operational view could not be loaded. No system state was changed.
      </p>
      <Button
        onClick={reset}
        className="mt-7 h-11 rounded-none bg-red-700 px-5 text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-red-600"
      >
        <RefreshCw className="size-4" /> Try again
      </Button>
    </div>
  );
}
