import type { Metadata } from 'next';

import { DevelopmentDataNote, PortalPageHeader } from '@/components/portal/primitives';
import { SettingsPanel } from '@/components/portal/settings-panel';
import { getAuthProvider } from '@/lib/auth/provider';

export const metadata: Metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const session = await getAuthProvider().requireSession('/portal/settings');
  return (
    <>
      <PortalPageHeader
        eyebrow="Account / Settings"
        title="Portal settings"
        description="Profile context, notification preferences, locale and session security."
      />
      <DevelopmentDataNote />
      <div className="mt-5">
        <SettingsPanel displayName={session.displayName} email={session.email} />
      </div>
    </>
  );
}
