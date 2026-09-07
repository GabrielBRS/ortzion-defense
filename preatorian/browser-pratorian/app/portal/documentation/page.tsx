import type { Metadata } from 'next';

import { DocumentationBrowser } from '@/components/portal/documentation-browser';
import { DevelopmentDataNote, PortalPageHeader } from '@/components/portal/primitives';

export const metadata: Metadata = { title: 'Documentation' };

export default function DocumentationPage() {
  return (
    <>
      <PortalPageHeader
        eyebrow="Knowledge / Documentation"
        title="Technical documentation"
        description="Search architecture, integration, runtime, operations, maintenance and security guidance."
      />
      <DevelopmentDataNote />
      <div className="mt-5">
        <DocumentationBrowser />
      </div>
    </>
  );
}
