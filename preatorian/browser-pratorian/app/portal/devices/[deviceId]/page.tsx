import type { Metadata } from 'next';
import { ArrowLeft, Cpu, HardDrive, Network, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DeviceHealthChart } from '@/components/portal/device-health-chart';
import {
  DevelopmentDataNote,
  MetricBar,
  Panel,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import { formatTimestamp } from '@/lib/format';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'Device detail' };

export default async function DeviceDetailPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  const device = await getPraetorianApi().devices.get(deviceId);
  if (!device) notFound();

  return (
    <>
      <Link
        href="/portal/devices"
        className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 hover:text-white"
      >
        <ArrowLeft className="size-4" /> Devices
      </Link>
      <PortalPageHeader
        eyebrow="Inventory / Device detail"
        title={device.name}
        description={`${device.kind.replaceAll('_', ' ')} · ${device.id}`}
        action={<StatusBadge status={device.health} />}
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Panel title="Resource utilization · 50 minute view">
          <DeviceHealthChart current={device.metrics} />
        </Panel>
        <Panel title="Current metrics">
          <div className="space-y-5">
            <MetricBar label="CPU" value={device.metrics.cpuPercent} />
            {device.metrics.gpuPercent !== null ? (
              <MetricBar label="GPU" value={device.metrics.gpuPercent} />
            ) : null}
            <MetricBar label="Memory" value={device.metrics.memoryPercent} />
            <MetricBar label="Storage" value={device.metrics.storagePercent} />
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/8 pt-5">
            <CurrentFact
              icon={<Thermometer />}
              label="Temperature"
              value={
                device.metrics.temperatureCelsius === null
                  ? 'Unavailable'
                  : `${device.metrics.temperatureCelsius} °C`
              }
            />
            <CurrentFact
              icon={<Network />}
              label="Network"
              value={device.networkStatus.replaceAll('_', ' ')}
            />
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel title="Identity">
          <CurrentFact
            icon={<Cpu />}
            label="Device type"
            value={device.kind.replaceAll('_', ' ')}
          />
          <div className="mt-4">
            <CurrentFact icon={<HardDrive />} label="System" value={device.systemId} />
          </div>
        </Panel>
        <Panel title="Software">
          <CurrentFact
            icon={<Cpu />}
            label="Installed version"
            value={device.softwareVersion}
          />
          <div className="mt-4">
            <CurrentFact icon={<HardDrive />} label="Update channel" value="Stable" />
          </div>
        </Panel>
        <Panel title="Connectivity">
          <CurrentFact
            icon={<Network />}
            label="Network state"
            value={device.networkStatus.replaceAll('_', ' ')}
          />
          <div className="mt-4">
            <CurrentFact
              icon={<HardDrive />}
              label="Last contact"
              value={formatTimestamp(device.lastContactAt)}
            />
          </div>
        </Panel>
      </div>
    </>
  );
}

function CurrentFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <span className="text-red-500 [&_svg]:size-4">{icon}</span>
      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
        {label}
      </p>
      <p className="mt-1 text-xs text-white/65">{value}</p>
    </div>
  );
}
