import type { Metadata } from 'next';
import { Check, Download, FileClock, PackageCheck, ShieldCheck } from 'lucide-react';

import {
  DevelopmentDataNote,
  Panel,
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

export const metadata: Metadata = { title: 'Software' };

export default async function SoftwarePage() {
  const releases = await getPraetorianApi().software.releases();
  const installed = releases.find((release) => release.installed) ?? releases[0];

  return (
    <>
      <PortalPageHeader
        eyebrow="Software / Release center"
        title="Software releases"
        description="Installed versions, available releases, release notes and model compatibility."
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <Panel title="Installed version">
          <PackageCheck className="size-7 text-emerald-400" />
          <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
            Stable channel
          </p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">
            {installed.version}
          </p>
          <div className="mt-5">
            <StatusBadge status="NOMINAL" />
          </div>
          <dl className="mt-8 space-y-3 border-t border-white/8 pt-5">
            <div className="flex justify-between gap-4 text-xs">
              <dt className="text-white/55">Published</dt>
              <dd className="text-right text-white/55">
                {formatTimestamp(installed.publishedAt)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-xs">
              <dt className="text-white/55">Update state</dt>
              <dd className="text-white/55">Current</dd>
            </div>
            <div className="flex justify-between gap-4 text-xs">
              <dt className="text-white/55">Integrity</dt>
              <dd className="inline-flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="size-3" /> Verified
              </dd>
            </div>
          </dl>
        </Panel>
        <Panel title="Release notes">
          <div className="space-y-7">
            {releases.map((release) => (
              <article
                key={release.id}
                className="border-b border-white/8 pb-7 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileClock className="size-4 text-red-500" />
                    <h2 className="text-sm font-semibold text-white/75">
                      PRAETORIAN {release.version}
                    </h2>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                    {release.channel} · {formatTimestamp(release.publishedAt)}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {release.releaseNotes.map((note) => (
                    <li key={note} className="flex gap-3 text-xs leading-5 text-white/60">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-red-500" />
                      {note}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Panel>
      </div>
      <div className="mt-5 border border-white/10 bg-[#0e1115]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70">
            Compatibility matrix
          </h2>
          <Download className="size-4 text-white/55" />
        </div>
        <Table>
          <TableCaption className="px-4 pb-4 text-left">
            Model compatibility is illustrative development content and must be validated by
            the production release service.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {[
                'Release',
                'Channel',
                'Compatible integration categories',
                'Install state',
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
            {releases.map((release) => (
              <TableRow key={release.id} className="border-white/8 hover:bg-white/3">
                <TableCell className="px-4 py-4 font-mono text-[10px] text-white/65">
                  {release.version}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {release.channel}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/60">
                  {release.compatibleModels.join(' · ')}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={release.installed ? 'ACTIVE' : 'PLANNED'} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
