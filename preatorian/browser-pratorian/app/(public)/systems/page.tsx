import type { Metadata } from 'next';
import { Box, Cpu, Layers3, RadioTower } from 'lucide-react';

import {
  InquiryBand,
  PublicPageHero,
  SectionHeading,
} from '@/components/marketing/page-structure';
import { systemTypes } from '@/config/marketing';

export const metadata: Metadata = {
  title: 'Systems | PRAETORIAN Autonomous Robotics',
  description:
    'System integration categories supported by the PRAETORIAN autonomous robotics platform.',
  alternates: { canonical: '/systems' },
};

const icons = [Box, RadioTower, Layers3, Cpu] as const;

export default function SystemsPage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="System forms"
        title="Autonomy across machine types."
        description="PRAETORIAN is an integration platform for multiple robotic and edge-compute forms. Categories are presented without inventing product models or deployment claims."
        index="03 / Systems"
      />
      <section className="border-b border-white/10 bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Integration categories"
            title="Platform-aligned systems."
            description="Each category shares the same disciplined foundations: perception, compute, secure communications, lifecycle visibility and human authority."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {systemTypes.map((item, index) => {
              const Icon = icons[index];
              return (
                <article
                  key={item.title}
                  className="relative min-h-80 overflow-hidden border border-white/10 bg-[#0e1115] p-7 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="size-8 text-red-500" strokeWidth={1.2} />
                    <span className="font-mono text-[9px] text-white/55">
                      {item.number}
                    </span>
                  </div>
                  <h2 className="mt-20 max-w-lg text-2xl font-semibold uppercase tracking-[-0.035em] text-white sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-steel">
                    {item.description}
                  </p>
                  <span className="mt-8 inline-flex border border-white/15 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/60">
                    {item.status}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Common foundation</p>
            <h2 className="section-title mt-5">Form changes. Discipline remains.</h2>
          </div>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {[
              [
                'Compute',
                'CPU, GPU and edge acceleration aligned to workload constraints.',
              ],
              [
                'Integration',
                'Hardware abstraction around sensors, power, motion and communications.',
              ],
              [
                'Operations',
                'Health, telemetry, auditability and controlled software lifecycle.',
              ],
              [
                'Governance',
                'Explicit authority, configurable autonomy and fail-safe behavior.',
              ],
            ].map(([term, definition]) => (
              <div key={term} className="grid gap-3 py-6 sm:grid-cols-[180px_1fr]">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {term}
                </dt>
                <dd className="text-sm leading-6 text-steel">{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <InquiryBand title="Evaluate a system integration path." />
    </main>
  );
}
