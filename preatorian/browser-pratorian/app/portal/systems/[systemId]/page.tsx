import type { Metadata } from 'next';
import {
  ArrowLeft,
  Box,
  CalendarClock,
  Cpu,
  Network,
  PackageCheck,
  ScrollText,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  DevelopmentDataNote,
  Panel,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import { formatTimestamp } from '@/lib/format';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'System detail' };

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ systemId: string }>;
}) {
  const { systemId } = await params;
  const system = await getPraetorianApi().systems.get(systemId);
  if (!system) notFound();

  return (
    <>
      <Link
        href="/portal/systems"
        className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 hover:text-white"
      >
        <ArrowLeft className="size-4" /> Systems
      </Link>
      <PortalPageHeader
        eyebrow="Inventory / System detail"
        title={system.name}
        description={`${system.model} · ${system.serialNumber}`}
        action={<StatusBadge status={system.status} />}
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-5 xl:grid-cols-2 2xl:grid-cols-4">
        <Panel title="Identity">
          <DetailList
            items={[
              ['System', system.name],
              ['Model', system.model],
              ['Serial', system.serialNumber],
            ]}
            icon={<Box className="size-5" />}
          />
        </Panel>
        <Panel title="Software">
          <DetailList
            items={[
              ['Installed version', system.softwareVersion],
              ['Release source', 'Authorized software service'],
              ['Compatibility', 'Evaluated by backend policy'],
              ['Update controls', 'Software Release Center'],
            ]}
            icon={<PackageCheck className="size-5" />}
          />
        </Panel>
        <Panel title="Connectivity">
          <DetailList
            items={[
              ['Link', system.connectivity.link],
              [
                'Latency',
                system.connectivity.latencyMs
                  ? `${system.connectivity.latencyMs} ms`
                  : 'Not available',
              ],
              ['Last handshake', formatTimestamp(system.connectivity.lastHandshakeAt)],
              ['Last contact', formatTimestamp(system.lastContactAt)],
            ]}
            icon={<Network className="size-5" />}
          />
        </Panel>
        <Panel title="Maintenance">
          <DetailList
            items={[
              ['Next window', formatTimestamp(system.nextMaintenanceAt)],
              ['State', system.status],
              ['Owner', 'Organization engineering'],
              ['Policy', 'Scheduled review'],
            ]}
            icon={<CalendarClock className="size-5" />}
          />
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Health">
          <ul className="space-y-3">
            {system.hardware.map((component) => (
              <li
                key={component.component}
                className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-white/70">{component.component}</p>
                  <p className="mt-1 text-xs text-white/55">{component.value}</p>
                </div>
                <StatusBadge status={component.state} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Audit history">
          <ol className="space-y-4">
            {system.auditEvents.map((event) => (
              <li key={event.id} className="grid grid-cols-[18px_1fr_auto] gap-3">
                <ScrollText className="mt-0.5 size-4 text-red-500" />
                <div>
                  <p className="text-sm text-white/70">{event.action}</p>
                  <p className="mt-1 text-xs text-white/55">{event.actor}</p>
                </div>
                <time
                  dateTime={event.occurredAt}
                  className="font-mono text-[8px] text-white/55"
                >
                  {formatTimestamp(event.occurredAt)}
                </time>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <div className="mt-5 grid gap-3 border border-white/8 bg-white/2 p-4 text-xs text-white/55 sm:grid-cols-3">
        <span className="flex items-center gap-2">
          <Cpu className="size-4" /> Compute details are non-weapon operational data.
        </span>
        <span className="flex items-center gap-2">
          <Wrench className="size-4" /> Maintenance is read-only in this preview.
        </span>
        <span className="flex items-center gap-2">
          <Network className="size-4" /> Backend authorization remains authoritative.
        </span>
      </div>
    </>
  );
}

function DetailList({
  items,
  icon,
}: {
  items: readonly (readonly [string, string])[];
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 text-red-500">{icon}</div>
      <dl className="space-y-3">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-5">
            <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
              {label}
            </dt>
            <dd className="max-w-[65%] text-right text-xs text-white/60">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
