import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { PortalShell } from '@/components/portal/portal-shell';
import { getAuthProvider } from '@/lib/auth/provider';
import { getPraetorianApi, isPraetorianMockMode } from '@/services';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { default: 'PRAETORIAN Portal', template: '%s | PRAETORIAN Portal' },
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const auth = getAuthProvider();
  const session = await auth.requireSession('/portal');
  const fixturePrincipal = await getPraetorianApi().account.me();
  const principal = {
    ...fixturePrincipal,
    user: {
      id: session.subject,
      email: session.email,
      displayName: session.displayName,
    },
  };

  return (
    <PortalShell
      principal={principal}
      signOutUrl={auth.getSignOutUrl('/')}
      environment={isPraetorianMockMode() ? 'Development' : 'Connected'}
    >
      {children}
    </PortalShell>
  );
}
