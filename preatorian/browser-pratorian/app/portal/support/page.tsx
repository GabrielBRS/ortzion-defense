import type { Metadata } from 'next';
import { Headphones, MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';

import { Can } from '@/components/portal/can';
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

export const metadata: Metadata = { title: 'Support' };

export default async function SupportPage() {
  const api = getPraetorianApi();
  const [casePage, principal] = await Promise.all([api.support.list(), api.account.me()]);
  const cases = casePage.items;

  return (
    <>
      <PortalPageHeader
        eyebrow="Assistance / Support"
        title="Support center"
        description="Track organization support cases and prepare a new technical request."
        action={
          <Can permission="support:create" permissions={principal.permissions}>
            <Link
              href="/portal/support/new"
              className="inline-flex h-11 items-center gap-2 bg-red-700 px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-red-600"
            >
              <MessageSquarePlus className="size-4" /> New support case
            </Link>
          </Can>
        }
      />
      <DevelopmentDataNote />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ['Open cases', String(cases.filter((item) => item.status !== 'RESOLVED').length)],
          ['Waiting', String(cases.filter((item) => item.status === 'WAITING').length)],
          ['Resolved this period', '0'],
        ].map(([label, value]) => (
          <div key={label} className="border border-white/10 bg-[#0e1115] p-5">
            <Headphones className="size-4 text-red-500" />
            <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
              {label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border border-white/10 bg-[#0e1115]">
        <Table>
          <TableCaption className="px-4 pb-4 text-left">
            Development support records. Production case history is supplied by GET
            /api/v1/support/cases.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {[
                'Case',
                'Subject',
                'Category',
                'Severity',
                'Status',
                'System',
                'Updated',
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
            {cases.map((supportCase) => (
              <TableRow key={supportCase.id} className="border-white/8 hover:bg-white/3">
                <TableCell className="px-4 py-4">
                  <span className="font-mono text-[10px] text-red-400">
                    {supportCase.reference}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 font-medium text-white/70">
                  {supportCase.subject}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {supportCase.category}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={supportCase.severity} />
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={supportCase.status} />
                </TableCell>
                <TableCell className="px-4 py-4 font-mono text-[9px] text-white/55">
                  {supportCase.systemId ?? '—'}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {formatTimestamp(supportCase.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
