import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import Link from 'next/link';

import {
  DevelopmentDataNote,
  PortalPageHeader,
  StatusBadge,
} from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export const metadata: Metadata = { title: 'Systems' };

export default async function SystemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const systems = (await getPraetorianApi().systems.list()).items;
  const { q = '' } = await searchParams;
  const query = q.trim().toLowerCase();
  const visibleSystems = query
    ? systems.filter((system) =>
        [
          system.name,
          system.model,
          system.serialNumber,
          system.softwareVersion,
          system.status,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query),
      )
    : systems;

  return (
    <>
      <PortalPageHeader
        eyebrow="Inventory / Systems"
        title="Authorized systems"
        description="Customer-authorized PRAETORIAN integration systems visible to this organization."
      />
      <DevelopmentDataNote />
      <div className="mt-5 border border-white/10 bg-[#0e1115]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <form
            action="/portal/systems"
            role="search"
            className="flex w-full max-w-md gap-2"
          >
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/55" />
              <Input
                aria-label="Search systems"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search systems"
                className="h-10 rounded-none border-white/10 bg-black/20 pl-10 text-white"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="h-10 rounded-none border-white/15 bg-white/3 px-4 text-[10px] uppercase tracking-[0.12em] text-white"
            >
              Search
            </Button>
          </form>
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
            {visibleSystems.length} of {systems.length} authorized records
          </p>
        </div>
        <Table>
          <TableCaption className="px-4 pb-4 text-left">
            Development system inventory. Select a system for hardware, software,
            connectivity and audit detail.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {[
                'System',
                'Model',
                'Serial',
                'Software version',
                'Status',
                'Last contact',
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
            {visibleSystems.map((system) => (
              <TableRow key={system.id} className="border-white/8 hover:bg-white/3">
                <TableCell className="px-4 py-4">
                  <Link
                    href={`/portal/systems/${system.id}`}
                    className="font-medium text-white/78 hover:text-white"
                  >
                    {system.name}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-4 text-white/55">{system.model}</TableCell>
                <TableCell className="px-4 py-4 font-mono text-[10px] text-white/55">
                  {system.serialNumber}
                </TableCell>
                <TableCell className="px-4 py-4 font-mono text-[10px] text-white/55">
                  {system.softwareVersion}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={system.status} />
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {formatTimestamp(system.lastContactAt)}
                </TableCell>
              </TableRow>
            ))}
            {visibleSystems.length === 0 ? (
              <TableRow className="border-white/8 hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-white/55"
                >
                  No authorized systems match “{q}”.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
