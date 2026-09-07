import type { Metadata } from 'next';
import { Boxes, Cpu, Eye, Network, ShieldCheck, Waypoints } from 'lucide-react';

import { EcosystemDiagram } from '@/components/diagrams/system-diagrams';
import {
  InquiryBand,
  PublicPageHero,
  SectionHeading,
} from '@/components/marketing/page-structure';

export const metadata: Metadata = {
  title: 'Company | PRAETORIAN by ORTZION Technology',
  description:
    'PRAETORIAN is the autonomous robotics platform within the ORTZION Defense ecosystem.',
  alternates: { canonical: '/company' },
};

const principles = [
  {
    title: 'Discipline',
    detail: 'System boundaries and responsibilities are explicit.',
    icon: ShieldCheck,
  },
  {
    title: 'Intelligence',
    detail: 'Reasoning contributes to controlled machine behavior.',
    icon: Waypoints,
  },
  {
    title: 'Autonomy',
    detail: 'Capability is configurable, observable and authorized.',
    icon: Cpu,
  },
  {
    title: 'Resilience',
    detail: 'Systems anticipate constrained and unreliable conditions.',
    icon: Network,
  },
  {
    title: 'Reliability',
    detail: 'Health, lifecycle and failure behavior are first-class concerns.',
    icon: Boxes,
  },
  {
    title: 'Precision',
    detail: 'Perception and action are grounded in traceable state.',
    icon: Eye,
  },
] as const;

export default function CompanyPage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="Company"
        title="Autonomous systems, engineered responsibly."
        description="PRAETORIAN belongs to the ORTZION Defense ecosystem, connecting deep software, AI, perception and machine engineering into one disciplined product direction."
        index="06 / Company"
      />
      <section className="border-b border-white/10 bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow">ORTZION Technology</p>
            <h2 className="section-title mt-5">Part of a wider intelligence ecosystem.</h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-steel">
              ORTZION connects specialized platforms around perception, intelligence and
              physical autonomy. Each layer retains a clear role while contributing to a
              coherent systems architecture.
            </p>
          </div>
          <EcosystemDiagram />
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Engineering principles"
            title="Principles engineered into PRAETORIAN."
            description="These principles shape the product, the operating experience and how autonomy is governed."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item, index) => (
              <article key={item.title} className="min-h-56 bg-[#0b0d10] p-6">
                <div className="flex items-center justify-between">
                  <item.icon className="size-6 text-red-500" strokeWidth={1.3} />
                  <span className="font-mono text-[9px] text-white/55">P{index + 1}</span>
                </div>
                <h2 className="mt-14 text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-steel">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Responsible autonomy</p>
            <h2 className="section-title mt-5">Human authority remains explicit.</h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-steel">
            <p>
              PRAETORIAN is designed around system observability, accountable authorization
              and traceable behavior. The platform does not include autonomous lethal
              decision interfaces.
            </p>
            <p>
              The aim is not autonomy without people. It is capable machines operating
              within understood boundaries, supported by visible state and governed by
              responsible operators.
            </p>
          </div>
        </div>
      </section>
      <InquiryBand title="Start a responsible autonomy conversation." />
    </main>
  );
}
