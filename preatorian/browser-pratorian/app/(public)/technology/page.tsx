import type { Metadata } from 'next';
import {
  Binary,
  Boxes,
  Braces,
  CircuitBoard,
  Cpu,
  Layers3,
  MonitorCog,
  Network,
} from 'lucide-react';

import {
  InquiryBand,
  PublicPageHero,
  SectionHeading,
} from '@/components/marketing/page-structure';

export const metadata: Metadata = {
  title: 'Technology | PRAETORIAN Autonomous Robotics',
  description:
    'Explore the software, compute and hardware integration layers behind the PRAETORIAN autonomous robotics platform.',
  alternates: { canonical: '/technology' },
};

const layers = [
  {
    title: 'AI',
    detail:
      'Reasoning, orchestration and model integration under explicit system boundaries.',
    icon: Binary,
  },
  {
    title: 'Perception',
    detail: 'Visual, spatial and sensor processing that contributes to the world model.',
    icon: MonitorCog,
  },
  {
    title: 'Runtime',
    detail:
      'Predictable execution, supervision and resource-aware scheduling close to the machine.',
    icon: Braces,
  },
  {
    title: 'Distributed systems',
    detail: 'Coordinated components that remain observable across intermittent links.',
    icon: Network,
  },
  {
    title: 'Operating systems',
    detail: 'Linux-based foundations shaped for controlled deployment and maintenance.',
    icon: Layers3,
  },
  {
    title: 'Compute',
    detail:
      'CPU, GPU and accelerator selection aligned to latency, power and thermal limits.',
    icon: Cpu,
  },
  {
    title: 'Embedded systems',
    detail: 'Machine-adjacent interfaces for sensors, state, actuation and health.',
    icon: CircuitBoard,
  },
  {
    title: 'Hardware integration',
    detail: 'A system boundary connecting compute, sensing, power and physical platforms.',
    icon: Boxes,
  },
] as const;

const technologies = [
  ['Rust', 'Memory-safe systems components, concurrency and predictable runtime behavior.'],
  [
    'Mojo',
    'Emerging high-performance AI computation where its maturity fits the workload.',
  ],
  ['Zig', 'Explicit low-level components and controlled cross-platform build surfaces.'],
  [
    'Python',
    'Model development, validation workflows and carefully bounded orchestration.',
  ],
  [
    'Linux',
    'A mature operating foundation for drivers, isolation and lifecycle management.',
  ],
  ['GPU computing', 'Parallel inference and perception acceleration close to sensor data.'],
] as const;

export default function TechnologyPage() {
  return (
    <main id="main-content">
      <PublicPageHero
        eyebrow="Engineering"
        title="Software to machine."
        description="PRAETORIAN treats autonomy as a systems-engineering discipline spanning AI, runtime behavior, operating systems, compute and hardware integration."
        index="04 / Technology"
      />
      <section className="border-b border-white/10 bg-[#0b0d10] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Computational layers"
            title="Every layer has a responsibility."
            description="Technology choices follow the constraints of their layer: determinism, safety, throughput, energy, maintainability and distance from the machine."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map((layer, index) => (
              <article key={layer.title} className="min-h-64 bg-[#0d1014] p-6">
                <div className="flex items-center justify-between">
                  <layer.icon className="size-6 text-red-500" strokeWidth={1.3} />
                  <span className="font-mono text-[9px] text-white/55">L{index + 1}</span>
                </div>
                <h2 className="mt-16 text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {layer.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-steel">{layer.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.66fr_1.34fr]">
          <div>
            <p className="eyebrow">Technology selection</p>
            <h2 className="section-title mt-5">Tools, not trophies.</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-steel">
              Programming languages and compute frameworks are selected for the technical
              properties they bring to a specific boundary. No one tool defines the
              platform.
            </p>
          </div>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {technologies.map(([name, reason]) => (
              <div key={name} className="grid gap-3 py-6 sm:grid-cols-[150px_1fr]">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">
                  {name}
                </dt>
                <dd className="text-sm leading-6 text-steel">{reason}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Edge constraints"
            title="Designed for imperfect conditions."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              [
                'Intermittent connectivity',
                'Local capability and state awareness reduce dependence on continuous backhaul.',
              ],
              [
                'Constrained compute',
                'Workloads are shaped around available thermal, energy and accelerator envelopes.',
              ],
              [
                'Controlled lifecycle',
                'Authenticated updates, compatibility checks and rollback-aware deployment preserve operability.',
              ],
            ].map(([title, detail]) => (
              <article key={title} className="border border-white/10 bg-black/20 p-7">
                <h2 className="text-sm font-bold uppercase tracking-[0.13em] text-white">
                  {title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-steel">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InquiryBand title="Explore the right computational architecture." />
    </main>
  );
}
