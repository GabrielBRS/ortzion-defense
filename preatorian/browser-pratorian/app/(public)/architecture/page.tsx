import type { Metadata } from 'next';
import { Eye, Fingerprint, Radio, Route, ShieldCheck, Waypoints } from 'lucide-react';

import { ArchitectureDiagram } from '@/components/diagrams/system-diagrams';
import {
  InquiryBand,
  PublicPageHero,
  SectionHeading,
} from '@/components/marketing/page-structure';

export const metadata: Metadata = {
  title: 'Architecture | PRAETORIAN Autonomous Robotics',
  description:
    'A conceptual view of PRAETORIAN perception, reasoning, planning, autonomy, control and compute boundaries.',
  alternates: { canonical: '/architecture' },
};

const boundaries = [
  {
    title: 'Perception boundary',
    detail: 'VATES transforms visual and sensor inputs into interpreted observations.',
    icon: Eye,
  },
  {
    title: 'Reasoning boundary',
    detail: 'SOFIA contributes AI reasoning and orchestration within explicit constraints.',
    icon: Waypoints,
  },
  {
    title: 'Authorization boundary',
    detail: 'Human authority and policy define what may advance into execution.',
    icon: Fingerprint,
  },
  {
    title: 'Planning boundary',
    detail: 'Plans translate approved intent into observable machine objectives.',
    icon: Route,
  },
  {
    title: 'Control boundary',
    detail: 'Real-time components coordinate platform motion and machine state.',
    icon: Radio,
  },
  {
    title: 'Assurance boundary',
    detail: 'Health, logging and fail-safe behavior span every computational layer.',
    icon: ShieldCheck,
  },
] as const;

export default function ArchitecturePage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="System architecture"
        title="Intelligence into motion."
        description="A conceptual architecture for turning sensed information into accountable robotic behavior through observable, controlled system boundaries."
        index="05 / Architecture"
        aside={
          <span className="inline-flex border border-red-500/30 bg-red-950/10 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.18em] text-red-300">
            Conceptual architecture
          </span>
        }
      />
      <section className="border-b border-white/10 bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">End-to-end stack</p>
            <h2 className="section-title mt-5">A visible chain of responsibility.</h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-steel">
              Information moves downward from perception and reasoning toward machine
              control. Status, authorization and audit signals move across the stack so
              operators can understand system behavior.
            </p>
          </div>
          <ArchitectureDiagram />
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="System boundaries"
            title="Control at every transition."
            description="Arrows alone are not architecture. Each transition carries a contract, an authorization context and an observable state."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {boundaries.map((item, index) => (
              <article key={item.title} className="border border-white/10 bg-[#0d1014] p-7">
                <div className="flex items-center justify-between">
                  <item.icon className="size-6 text-red-500" strokeWidth={1.3} />
                  <span className="font-mono text-[9px] text-white/55">B{index + 1}</span>
                </div>
                <h2 className="mt-14 text-sm font-bold uppercase tracking-[0.13em] text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-steel">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Data flow</p>
            <h2 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.045em] text-white">
              Observation builds context.
            </h2>
            <p className="mt-6 text-sm leading-7 text-steel">
              Sensor observations, perception outputs and system health contribute to a
              time-aware world model. Source quality and freshness remain visible to
              downstream consumers.
            </p>
          </div>
          <div>
            <p className="eyebrow">Control flow</p>
            <h2 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.045em] text-white">
              Authority constrains action.
            </h2>
            <p className="mt-6 text-sm leading-7 text-steel">
              Policy, operator authorization, plan state and control feedback determine
              whether and how approved behavior advances toward the machine.
            </p>
          </div>
        </div>
      </section>
      <InquiryBand title="Review the PRAETORIAN architecture." />
    </main>
  );
}
