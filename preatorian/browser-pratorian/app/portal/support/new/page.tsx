import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DevelopmentDataNote, PortalPageHeader } from '@/components/portal/primitives';
import { SupportCaseForm } from '@/components/portal/support-case-form';
import { getPraetorianApi } from '@/services';

export const metadata: Metadata = { title: 'New support case' };

export default async function NewSupportCasePage() {
  const principal = await getPraetorianApi().account.me();
  if (!principal.permissions.includes('support:create')) notFound();

  return (
    <>
      <Link
        href="/portal/support"
        className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 hover:text-white"
      >
        <ArrowLeft className="size-4" /> Support center
      </Link>
      <PortalPageHeader
        eyebrow="Assistance / New case"
        title="New support case"
        description="Describe the technical issue and associate it with an authorized system when relevant."
      />
      <DevelopmentDataNote />
      <div className="mt-5 max-w-4xl border border-white/10 bg-[#0e1115] p-5 sm:p-8">
        <SupportCaseForm />
      </div>
    </>
  );
}
