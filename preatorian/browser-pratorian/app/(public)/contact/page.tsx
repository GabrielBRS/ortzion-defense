import type { Metadata } from 'next';
import { Clock3, LockKeyhole, ShieldCheck } from 'lucide-react';

import { ContactForm } from '@/components/marketing/contact-form';
import { PublicPageHero } from '@/components/marketing/page-structure';

export const metadata: Metadata = {
  title: 'Contact | PRAETORIAN Autonomous Robotics',
  description:
    'Request information about the PRAETORIAN autonomous robotics platform and system integration capabilities.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="Request information"
        title="Begin a technical conversation."
        description="Tell us what system, architecture or integration area you are evaluating. Keep sensitive operational details outside the initial inquiry."
        index="07 / Contact"
      />
      <section className="bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <aside>
            <p className="eyebrow">Inquiry context</p>
            <h2 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.045em] text-white">
              Useful information to include.
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [ShieldCheck, 'The system or integration category you are evaluating.'],
                [Clock3, 'Your current program phase and expected decision horizon.'],
                [
                  LockKeyhole,
                  'Any security, environment or compute constraints relevant to discussion.',
                ],
              ].map(([Icon, text]) => (
                <li key={String(text)} className="flex gap-4 text-sm leading-6 text-steel">
                  <Icon className="mt-0.5 size-5 shrink-0 text-red-500" strokeWidth={1.4} />
                  <span>{String(text)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-l border-red-600 pl-5 font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-white/55">
              Do not submit classified, export-controlled or operationally sensitive
              information through this form.
            </p>
          </aside>
          <div className="border border-white/10 bg-[#0d1014] p-6 sm:p-9">
            <div className="mb-8 border-b border-white/10 pb-6">
              <p className="eyebrow">Technical inquiry form</p>
              <p className="mt-3 text-sm leading-6 text-steel">
                Fields marked with an asterisk are required.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
