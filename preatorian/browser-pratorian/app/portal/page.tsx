import type { Metadata } from 'next';
import { Activity, Boxes, Cpu, Headphones, PackageCheck, Radio } from 'lucide-react';
import Link from 'next/link';

import {
  DevelopmentDataNote,
  MetricCard,
  Panel,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import { formatShortTimestamp } from '@/lib/format';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'Overview' };

export default async function PortalOverviewPage() {
  const api = getPraetorianApi();
  const [snapshot, systemsPage, deploymentsPage] = await Promise.all([
    api.overview.get(),
    api.systems.list(),
    api.deployments.list(),
  ]);
  const attentionSystems = systemsPage.items.filter((system) => system.status !== 'ONLINE');
  const activeDeployment = deploymentsPage.items.find(
    (deployment) => deployment.status === 'IN_PROGRESS',
  );

  return (
    <>
      <PortalPageHeader
        eyebrow="Operations / Overview"
        title="System overview"
        description="Authorized platform status, software lifecycle and recent organization activity."
        action={
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
            Data timestamp ·{' '}
            {snapshot.activity[0]
              ? formatShortTimestamp(snapshot.activity[0].occurredAt)
              : 'Unavailable'}
          </span>
        }
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Authorized systems"
          value={String(snapshot.authorizedSystems)}
          detail="Organization scope"
          icon={<Boxes className="size-5" />}
        />
        <MetricCard
          label="Online devices"
          value={`${snapshot.onlineDevices} / ${snapshot.totalDevices}`}
          detail="Current contact state"
          tone="success"
          icon={<Radio className="size-5" />}
        />
        <MetricCard
          label="Software version"
          value={snapshot.softwareVersion}
          detail="Installed stable release"
          icon={<PackageCheck className="size-5" />}
        />
        <MetricCard
          label="System health"
          value={snapshot.systemHealth}
          detail={`${attentionSystems.length} systems require review`}
          tone="attention"
          icon={<Activity className="size-5" />}
        />
        <MetricCard
          label="Open support cases"
          value={String(snapshot.openSupportCases)}
          detail="Across organization"
          icon={<Headphones className="size-5" />}
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel title="Recent activity">
          <ol className="divide-y divide-white/8">
            {snapshot.activity.map((event) => (
              <li
                key={event.id}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[18px_1fr_auto] sm:items-start"
              >
                <span
                  className={`mt-1.5 size-2 rounded-full ${event.tone === 'SUCCESS' ? 'bg-emerald-400' : event.tone === 'ATTENTION' ? 'bg-amber-400' : 'bg-sky-400'}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-white/78">{event.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">{event.detail}</p>
                </div>
                <time
                  className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/55"
                  dateTime={event.occurredAt}
                >
                  {formatShortTimestamp(event.occurredAt)}
                </time>
              </li>
            ))}
          </ol>
        </Panel>
        <div className="grid gap-5">
          <Panel title="Health exceptions">
            {attentionSystems.length > 0 ? (
              <ul className="space-y-4">
                {attentionSystems.map((system) => (
                  <li key={system.id} className="flex items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/portal/systems/${system.id}`}
                        className="text-sm font-medium text-white/72 hover:text-white"
                      >
                        {system.name}
                      </Link>
                      <p className="mt-1 text-[10px] text-white/55">{system.model}</p>
                    </div>
                    <StatusBadge status={system.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/55">No systems require review.</p>
            )}
          </Panel>
          <Panel title="Active software rollout">
            {activeDeployment ? (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/75">
                      {activeDeployment.target}
                    </p>
                    <p className="mt-1 font-mono text-[9px] text-white/55">
                      Release {activeDeployment.version}
                    </p>
                  </div>
                  <StatusBadge status={activeDeployment.status} />
                </div>
                <div
                  className="mt-5 h-1.5 bg-white/8"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={activeDeployment.progress}
                  aria-label="Rollout progress"
                >
                  <div
                    className="h-full bg-red-600"
                    style={{ width: `${activeDeployment.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right font-mono text-[8px] text-white/55">
                  {activeDeployment.progress}% complete
                </p>
              </div>
            ) : (
              <p className="text-sm text-white/55">No active rollout.</p>
            )}
          </Panel>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 border border-white/8 bg-white/2 px-4 py-3 text-[10px] text-white/55">
        <Cpu className="size-4" /> System data is scoped by the authoritative backend in
        production.
      </div>
    </>
  );
}
