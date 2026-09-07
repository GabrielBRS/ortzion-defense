import { AlertTriangle, CheckCircle2, Circle, Clock3, DatabaseZap } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { isPraetorianMockMode } from '@/services';

const statusStyle: Record<string, string> = {
  ONLINE: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  CONNECTED: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  COMPLETED: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  ACTIVE: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  NOMINAL: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  DEGRADED: 'border-amber-500/25 bg-amber-950/20 text-amber-300',
  LIMITED: 'border-amber-500/25 bg-amber-950/20 text-amber-300',
  ATTENTION: 'border-amber-500/25 bg-amber-950/20 text-amber-300',
  IN_PROGRESS: 'border-sky-500/25 bg-sky-950/20 text-sky-300',
  WAITING: 'border-amber-500/25 bg-amber-950/20 text-amber-300',
  PLANNED: 'border-white/15 bg-white/3 text-white/55',
  INVITED: 'border-white/15 bg-white/3 text-white/55',
  MAINTENANCE: 'border-violet-500/25 bg-violet-950/20 text-violet-300',
  OFFLINE: 'border-white/12 bg-white/3 text-white/60',
  DISCONNECTED: 'border-white/12 bg-white/3 text-white/60',
  FAILED: 'border-red-500/25 bg-red-950/20 text-red-300',
  CANCELED: 'border-white/12 bg-white/3 text-white/60',
  OPEN: 'border-red-500/25 bg-red-950/20 text-red-300',
  RESOLVED: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-300',
  LOW: 'border-white/15 bg-white/3 text-white/55',
  MEDIUM: 'border-sky-500/25 bg-sky-950/20 text-sky-300',
  HIGH: 'border-amber-500/25 bg-amber-950/20 text-amber-300',
  CRITICAL: 'border-red-500/25 bg-red-950/20 text-red-300',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em]',
        statusStyle[status] ?? statusStyle.OFFLINE,
      )}
    >
      <Circle className="size-1.5 fill-current" /> {status.replaceAll('_', ' ')}
    </span>
  );
}

export function DevelopmentDataNote() {
  if (!isPraetorianMockMode()) return null;

  return (
    <div className="flex items-start gap-3 border border-sky-500/15 bg-sky-950/10 px-4 py-3 text-xs leading-5 text-sky-100/60">
      <DatabaseZap className="mt-0.5 size-4 shrink-0 text-sky-400" />
      Development data — values shown in this portal are deterministic interface fixtures,
      not live system telemetry.
    </div>
  );
}

export function PortalPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-7 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-red-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-[-0.045em] text-white sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  tone = 'neutral',
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  tone?: 'neutral' | 'success' | 'attention';
  icon: ReactNode;
}) {
  return (
    <article className="border border-white/10 bg-[#0e1115] p-5">
      <div className="flex items-start justify-between">
        <span className="text-white/55">{icon}</span>
        {tone === 'success' ? (
          <CheckCircle2 className="size-4 text-emerald-400" />
        ) : tone === 'attention' ? (
          <AlertTriangle className="size-4 text-amber-400" />
        ) : (
          <Clock3 className="size-4 text-white/55" />
        )}
      </div>
      <p className="mt-10 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-2 text-xs text-white/55">{detail}</p>
    </article>
  );
}

export function MetricBar({
  label,
  value,
  suffix = '%',
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const bounded = Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.13em] text-white/55">
        <span>{label}</span>
        <span>
          {value}
          {suffix}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden bg-white/8"
        role="img"
        aria-label={`${label}: ${value}${suffix}`}
      >
        <div
          className={cn('h-full', bounded >= 75 ? 'bg-amber-400' : 'bg-red-600')}
          style={{ width: `${bounded}%` }}
        />
      </div>
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('border border-white/10 bg-[#0e1115]', className)}>
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
