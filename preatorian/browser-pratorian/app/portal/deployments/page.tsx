import type { Metadata } from 'next';
import { CheckCircle2, Clock3, Rocket, ShieldCheck } from 'lucide-react';

import {
  DevelopmentDataNote,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatTimestamp } from '@/lib/format';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'Deployments' };

export default async function DeploymentsPage() {
  const deployments = (await getPraetorianApi().deployments.list()).items;
  const active = deployments.filter((item) => item.status === 'IN_PROGRESS').length;

  return (
    <>
      <PortalPageHeader
        eyebrow="Software lifecycle / Deployments"
        title="Deployment history"
        description="Auditable software and configuration rollouts. This area does not represent geographic operations or mission planning."
        action={
          <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
            <span className="size-1.5 rounded-full bg-sky-400" /> {active} active rollout
          </span>
        }
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          [Rocket, 'Controlled rollout', 'Compatibility checked before execution'],
          [ShieldCheck, 'Authorized changes', 'Backend policy remains authoritative'],
          [Clock3, 'Traceable lifecycle', 'Initiator and timestamps retained'],
        ].map(([Icon, title, detail]) => (
          <div key={String(title)} className="border border-white/10 bg-[#0e1115] p-5">
            <Icon className="size-5 text-red-500" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              {String(title)}
            </p>
            <p className="mt-2 text-xs text-white/55">{String(detail)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border border-white/10 bg-[#0e1115]">
        <Table>
          <TableCaption className="px-4 pb-4 text-left">
            Development rollout records. Progress is illustrative and not connected to live
            systems.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {[
                'Target',
                'Release',
                'Environment',
                'Status',
                'Progress',
                'Initiated by',
                'Started',
                'Completed',
              ].map((heading) => (
                <TableHead
                  key={heading}
                  className="h-11 px-4 font-mono text-[8px] uppercase tracking-[0.13em] text-white/55"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id} className="border-white/8 hover:bg-white/3">
                <TableCell className="px-4 py-4 font-medium text-white/70">
                  {deployment.target}
                </TableCell>
                <TableCell className="px-4 py-4 font-mono text-[10px] text-white/55">
                  {deployment.version}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {deployment.environment}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={deployment.status} />
                </TableCell>
                <TableCell className="min-w-40 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-white/8">
                      <div
                        className="h-full bg-red-600"
                        style={{ width: `${deployment.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-[8px] text-white/55">
                      {deployment.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {deployment.initiatedBy}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {formatTimestamp(deployment.startedAt)}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {deployment.completedAt ? (
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 className="size-3 text-emerald-400" />
                      {formatTimestamp(deployment.completedAt)}
                    </span>
                  ) : (
                    'Pending'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
