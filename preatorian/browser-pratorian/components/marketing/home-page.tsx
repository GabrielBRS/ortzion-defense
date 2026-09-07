import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Cpu,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  ArchitectureDiagram,
  AutonomyPipeline,
  EcosystemDiagram,
} from '@/components/diagrams/system-diagrams';
import {
  platformCapabilities,
  reliabilityCapabilities,
  systemTypes,
} from '@/config/marketing';

const engineeringLayers = [
  ['AI', 'Reasoning and orchestration'],
  ['Perception', 'Visual and spatial understanding'],
  ['Runtime', 'Deterministic execution'],
  ['Distributed systems', 'Coordinated services'],
  ['Operating systems', 'Controlled platform foundation'],
  ['Compute', 'CPU, GPU and edge acceleration'],
  ['Embedded systems', 'Machine-adjacent control'],
  ['Hardware integration', 'Sensors, power and actuation'],
] as const;

const governance = [
  'Operator authorization',
  'Traceable actions',
  'Configurable autonomy',
  'Fail-safe behavior',
] as const;

export function HomePage() {
  return (
    <main id="main-content">
      <section className="technical-grid relative isolate min-h-[820px] overflow-hidden border-b border-white/10 pt-20 lg:min-h-screen">
        <div className="absolute inset-0 -z-20 bg-[#08090b]" />
        <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden opacity-70 sm:w-[72%] lg:w-[66%]">
          <Image
            src="/og.png"
            alt="Concept artwork of an unarmed autonomous ground platform with an aerial sensor drone"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 70vw"
            className="object-cover object-[78%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/90 to-[#08090b]/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/35" />
        </div>
        <div className="shell relative flex min-h-[calc(100vh-5rem)] items-center py-20 sm:py-24">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-9 flex items-center gap-4">
              <span className="h-px w-12 bg-red-600" />
              <p className="eyebrow">An ORTZION Defense platform</p>
            </div>
            <h1 className="font-display text-[clamp(4rem,10vw,8.8rem)] font-semibold uppercase leading-[0.76] tracking-[-0.075em] text-white">
              Praetorian
              <span className="mt-5 block text-[0.55em] tracking-[-0.055em] text-white/52">
                Autonomous
                <br />
                Robotics
              </span>
            </h1>
            <p className="mt-10 max-w-xl text-balance text-lg leading-8 text-white/78 sm:text-xl">
              AI-powered autonomous systems engineered for complex, high-reliability
              environments.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-steel sm:text-base">
              PRAETORIAN combines perception, artificial intelligence, robotics and
              high-performance computing into a unified autonomous systems platform.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link className="action-primary" href="/platform">
                Explore platform <ArrowRight className="size-4" />
              </Link>
              <Link className="action-secondary" href="/contact">
                Request information <ArrowDownRight className="size-4" />
              </Link>
            </div>
            <Link
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/48 transition hover:text-white focus-visible:text-white"
              href="/auth/login"
            >
              Sign in to PRAETORIAN <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/35 backdrop-blur-sm">
          <div className="shell flex h-14 items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            <span>Intelligence · Autonomy · Resilience</span>
            <span className="hidden sm:block">Platform architecture / 01</span>
          </div>
        </div>
      </section>

      <section className="section-dark border-b border-white/10 py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow">Unified autonomy loop</p>
              <h2 className="section-title mt-5">
                Perceive.
                <br />
                Reason.
                <br />
                <span className="text-red-500">Act.</span>
              </h2>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-7 text-steel sm:text-lg">
              PRAETORIAN integrates sensing, perception, AI reasoning and robotic control
              into a unified architecture with human authority at the center.
            </p>
          </div>
          <div className="mt-14">
            <AutonomyPipeline />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0e1115] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow">ORTZION ecosystem</p>
            <h2 className="section-title mt-5">
              Intelligence becomes
              <span className="block text-red-500">physical behavior.</span>
            </h2>
            <div className="mt-8 space-y-4 text-sm leading-7 text-steel">
              <p>
                <strong className="text-white">VATES</strong> provides perception and
                computer vision.
              </p>
              <p>
                <strong className="text-white">SOFIA</strong> provides AI reasoning, agents
                and orchestration.
              </p>
              <p>
                <strong className="text-white">PRAETORIAN</strong> transforms perception and
                intelligence into observable autonomous robotic behavior.
              </p>
            </div>
          </div>
          <EcosystemDiagram />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">PRAETORIAN platform</p>
              <h2 className="section-title mt-5 max-w-2xl">
                One system. Every layer of autonomy.
              </h2>
            </div>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:text-white"
            >
              Platform detail <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {platformCapabilities.map((item, index) => (
              <article
                key={item.title}
                className="group min-h-64 bg-[#0b0d10] p-6 transition hover:bg-[#12151a]"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="size-6 text-red-500" strokeWidth={1.4} />
                  <span className="font-mono text-[9px] text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-16 text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">System architecture</p>
            <h2 className="section-title mt-5">From world model to machine.</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-steel">
              Specialized computational layers are selected for their runtime
              responsibilities—not displayed as marketing ornaments. AI, perception,
              planning and control remain observable across the stack.
            </p>
            <Link className="action-secondary mt-8" href="/architecture">
              Explore architecture <ArrowRight className="size-4" />
            </Link>
          </div>
          <ArchitectureDiagram />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#08090b] py-20 sm:py-28">
        <div className="shell">
          <p className="eyebrow">Engineering</p>
          <h2 className="section-title mt-5 max-w-4xl">
            Engineered from software to machine.
          </h2>
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringLayers.map(([title, detail], index) => (
              <div key={title} className="bg-[#0b0d10] p-5">
                <span className="font-mono text-[8px] text-red-500">
                  L{String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.13em] text-white">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-5 text-steel">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-9 gap-y-4 border-y border-white/10 py-6 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            {['Rust', 'Mojo', 'Zig', 'Python', 'Linux', 'GPU computing'].map(
              (technology) => (
                <span key={technology}>{technology}</span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">System types</p>
              <h2 className="section-title mt-5">A platform for multiple machine forms.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-steel lg:justify-self-end">
              Categories describe platform integration directions. They do not represent
              named products, certifications or field deployments.
            </p>
          </div>
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {systemTypes.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-[10px] text-red-500">{item.number}</span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
                    {item.description}
                  </p>
                </div>
                <span className="w-fit border border-white/15 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/48">
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#08090b] py-20 sm:py-32">
        <div className="absolute right-[-10rem] top-[-10rem] size-[32rem] rounded-full bg-red-950/20 blur-[120px]" />
        <div className="shell relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              <UserCheck className="size-5 text-red-500" strokeWidth={1.5} />
              <p className="eyebrow">Safety & human oversight</p>
            </div>
            <h2 className="section-title mt-6 max-w-3xl">
              Human authority.
              <span className="block text-white/55">Machine assistance.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-steel">
              PRAETORIAN is designed around explicit authorization, system observability,
              traceability and human governance. Autonomy is a controlled system
              property—not an absence of accountability.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {governance.map((item) => (
              <li
                key={item}
                className="flex min-h-24 items-center gap-4 border border-white/10 bg-white/3 p-5 text-xs font-semibold uppercase tracking-[0.12em] text-white/75"
              >
                <Check className="size-4 text-red-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1014] py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Reliability</p>
              <h2 className="section-title mt-5">Built for resilience.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-steel lg:justify-self-end">
              Operational continuity depends on visible health, recoverable behavior and
              controlled software lifecycle management.
            </p>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reliabilityCapabilities.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 border border-white/10 bg-black/20 p-5"
              >
                <item.icon className="size-5 text-red-500" strokeWidth={1.4} />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/72">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="technical-grid bg-[#08090b] py-24 sm:py-32">
        <div className="shell border border-white/10 bg-[#0d1014]/90 p-7 sm:p-12 lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-red-500" strokeWidth={1.5} />
              <p className="eyebrow">PRAETORIAN / ORTZION Technology</p>
            </div>
            <h2 className="section-title mt-7 max-w-4xl">
              Build autonomy on an engineered foundation.
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 lg:mt-0">
            <Link className="action-primary" href="/contact">
              Request information <ArrowRight className="size-4" />
            </Link>
            <Link className="action-secondary" href="/technology">
              Engineering layers <Cpu className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
