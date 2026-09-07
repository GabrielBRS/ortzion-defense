import type { Metadata } from 'next';
import { Cpu, HardDrive, MemoryStick, Network, Thermometer } from 'lucide-react';
import Link from 'next/link';

import {
  DevelopmentDataNote,
  MetricBar,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import { formatShortTimestamp } from '@/lib/format';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'Devices' };

export default async function DevicesPage() {
  const devices = (await getPraetorianApi().devices.list()).items;

  return (
    <>
      <PortalPageHeader
        eyebrow="Inventory / Devices"
        title="Registered devices"
        description="Non-weapon operational health for computing, sensing and robotic platform devices."
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {devices.map((device) => (
          <article key={device.id} className="border border-white/10 bg-[#0e1115]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-10 place-items-center border border-white/10 bg-white/3">
                  <Cpu className="size-5 text-red-500" />
                </span>
                <div>
                  <Link
                    href={`/portal/devices/${device.id}`}
                    className="text-base font-semibold text-white/80 hover:text-white"
                  >
                    {device.name}
                  </Link>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                    {device.kind.replaceAll('_', ' ')} · {device.softwareVersion}
                  </p>
                </div>
              </div>
              <StatusBadge status={device.health} />
            </div>
            <div className="grid gap-6 p-5 sm:grid-cols-2">
              <div className="space-y-5">
                <MetricBar label="CPU" value={device.metrics.cpuPercent} />
                {device.metrics.gpuPercent !== null ? (
                  <MetricBar label="GPU" value={device.metrics.gpuPercent} />
                ) : null}
                <MetricBar label="Memory" value={device.metrics.memoryPercent} />
                <MetricBar label="Storage" value={device.metrics.storagePercent} />
              </div>
              <dl className="space-y-4 border-t border-white/8 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <DeviceFact
                  icon={<Network />}
                  label="Network"
                  value={device.networkStatus.replaceAll('_', ' ')}
                />
                <DeviceFact
                  icon={<Thermometer />}
                  label="Temperature"
                  value={
                    device.metrics.temperatureCelsius === null
                      ? 'Unavailable'
                      : `${device.metrics.temperatureCelsius} °C`
                  }
                />
                <DeviceFact
                  icon={<HardDrive />}
                  label="Last contact"
                  value={formatShortTimestamp(device.lastContactAt)}
                />
                <DeviceFact icon={<MemoryStick />} label="System" value={device.systemId} />
              </dl>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function DeviceFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[18px_1fr_auto] items-center gap-3 text-xs">
      <span className="text-white/55 [&_svg]:size-4">{icon}</span>
      <dt className="text-white/55">{label}</dt>
      <dd className="max-w-40 text-right text-white/60">{value}</dd>
    </div>
  );
}
