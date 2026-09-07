'use client';

import { Check, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';

import { StatusBadge } from '@/components/portal/primitives';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  CurrentPrincipal,
  OrganizationMember,
  SystemSummary,
} from '@/types/praetorian';

const roles = [
  ['Organization Admin', 'Members, roles, systems and organization access'],
  ['Engineer', 'Technical visibility, software and audit-oriented workflows'],
  ['Operator', 'Operational monitoring and support case workflows'],
  ['Viewer', 'Read-only visibility for authorized system information'],
] as const;

export function OrganizationPanel({
  members,
  principal,
  systems,
}: {
  members: readonly OrganizationMember[];
  principal: CurrentPrincipal;
  systems: readonly SystemSummary[];
}) {
  return (
    <Tabs defaultValue="members" className="gap-0 border border-white/10 bg-[#0e1115]">
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-0 overflow-x-auto border-b border-white/10 px-3 py-0"
      >
        {['Members', 'Roles', 'Organizations', 'Systems', 'Access'].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab.toLowerCase()}
            className="min-h-12 min-w-fit rounded-none px-4 text-[10px] uppercase tracking-[0.12em]"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="members" className="m-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {['Member', 'Email', 'Role', 'Status'].map((heading) => (
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
            {members.map((member) => (
              <TableRow key={member.id} className="border-white/8 hover:bg-white/3">
                <TableCell className="px-4 py-4">
                  <span className="inline-flex items-center gap-3 text-sm text-white/70">
                    <span className="grid size-8 place-items-center border border-white/10 bg-white/3">
                      <UserRound className="size-4 text-white/55" />
                    </span>
                    {member.name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {member.email}
                </TableCell>
                <TableCell className="px-4 py-4 text-xs text-white/55">
                  {member.role}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={member.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="roles" className="m-0 grid gap-px bg-white/8 sm:grid-cols-2">
        {roles.map(([role, description]) => (
          <article key={role} className="bg-[#0e1115] p-6">
            <ShieldCheck className="size-5 text-red-500" />
            <h2 className="mt-8 text-sm font-semibold text-white/75">{role}</h2>
            <p className="mt-3 text-xs leading-6 text-white/55">{description}</p>
          </article>
        ))}
      </TabsContent>
      <TabsContent value="organizations" className="m-0 p-6">
        <EmptyPanel
          icon={<UserRound />}
          title={principal.organization.name}
          detail={`Authenticated scope for ${principal.user.displayName}. Organization changes require authoritative backend approval.`}
        />
      </TabsContent>
      <TabsContent value="systems" className="m-0 p-6">
        <EmptyPanel
          icon={<Check />}
          title={`${systems.length} authorized systems`}
          detail={`${systems.map((system) => system.name).join(', ')}. Assignment remains scoped and enforced by the backend.`}
        />
      </TabsContent>
      <TabsContent value="access" className="m-0 p-6">
        <EmptyPanel
          icon={<LockKeyhole />}
          title={`${principal.permissions.length} effective permissions`}
          detail={`${principal.permissions.join(', ')}. Frontend visibility mirrors these grants but never replaces server enforcement.`}
        />
      </TabsContent>
    </Tabs>
  );
}

function EmptyPanel({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="max-w-xl border border-white/8 bg-black/15 p-6">
      <span className="text-red-500 [&_svg]:size-5">{icon}</span>
      <h2 className="mt-7 text-base font-semibold text-white/75">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/55">{detail}</p>
    </div>
  );
}
