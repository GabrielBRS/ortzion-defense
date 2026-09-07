import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrganizationPanel } from '@/components/portal/organization-panel';
import { DevelopmentDataNote, PortalPageHeader } from '@/components/portal/primitives';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'Organization' };

export default async function OrganizationPage() {
  const api = getPraetorianApi();
  const [members, principal, systemsPage] = await Promise.all([
    api.organization.members(),
    api.account.me(),
    api.systems.list(),
  ]);
  if (!principal.permissions.includes('organization:read')) notFound();

  return (
    <>
      <PortalPageHeader
        eyebrow="Administration / Organization"
        title="Organization access"
        description="Members, roles, organization scope, authorized systems and effective access."
      />
      <DevelopmentDataNote />
      <div className="mt-5">
        <OrganizationPanel
          members={members}
          principal={principal}
          systems={systemsPage.items}
        />
      </div>
      <p className="mt-5 border-l border-amber-400 pl-4 text-xs leading-5 text-amber-100/55">
        Role controls in the frontend are descriptive. The backend must authorize every
        organization and system operation.
      </p>
    </>
  );
}
