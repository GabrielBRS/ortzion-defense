import type { Metadata } from 'next';

import { AutonomyPipeline } from '@/components/diagrams/system-diagrams';
import {
  InquiryBand,
  PublicPageHero,
  SectionHeading,
} from '@/components/marketing/page-structure';
import { platformCapabilities, reliabilityCapabilities } from '@/config/marketing';

export const metadata: Metadata = {
  title: 'Platform | PRAETORIAN Autonomous Robotics',
  description:
    'Explore the perception, intelligence, autonomy, compute and lifecycle layers of the PRAETORIAN platform.',
  alternates: { canonical: '/platform' },
};

export default function PlatformPage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="PRAETORIAN platform"
        title="Unified autonomous systems."
        description="A controlled architecture that connects sensors, perception, AI reasoning, planning and robotic execution across the full machine lifecycle."
        index="02 / Platform"
      />
      <section className="border-b border-white/10 bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Operating model"
            title="Perceive. Reason. Act."
            description="Every stage remains observable. Authorization and supervision are explicit inputs to the autonomy loop."
          />
          <div className="mt-14">
            <AutonomyPipeline />
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="The platform layers."
            description="Capabilities combine at the system level and can be configured to match the machine, environment and approved operating model."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {platformCapabilities.map((item, index) => (
              <article key={item.title} className="min-h-64 bg-[#0b0d10] p-6">
                <div className="flex items-center justify-between">
                  <item.icon className="size-6 text-red-500" strokeWidth={1.4} />
                  <span className="font-mono text-[9px] text-white/55">0{index + 1}</span>
                </div>
                <h2 className="mt-16 text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Operational resilience"
            title="Observable by design."
            description="The lifecycle layer supports the people responsible for readiness, maintenance and accountable operation."
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reliabilityCapabilities.map((item) => (
              <div key={item.title} className="border border-white/10 bg-black/20 p-5">
                <item.icon className="size-5 text-red-500" strokeWidth={1.4} />
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.13em] text-white/75">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <InquiryBand />
    </main>
  );
}
