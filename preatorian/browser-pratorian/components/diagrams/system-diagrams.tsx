import { ArrowDown, ArrowRight, Circle, Cpu, Eye, Network } from 'lucide-react';

const pipeline = [
  ['Sensors', 'Acquire'],
  ['Perception', 'Resolve'],
  ['Intelligence', 'Reason'],
  ['Planning', 'Authorize'],
  ['Autonomy', 'Coordinate'],
  ['Action', 'Execute'],
] as const;

export function AutonomyPipeline() {
  return (
    <div>
      <ol className="grid border border-white/10 bg-white/10 lg:grid-cols-6">
        {pipeline.map(([label, verb], index) => (
          <li
            key={label}
            className="relative flex min-h-32 flex-col justify-between border-b border-white/10 bg-[#0b0d10] p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-red-500">0{index + 1}</span>
              {index < pipeline.length - 1 ? (
                <>
                  <ArrowRight className="hidden size-4 text-white/55 lg:block" />
                  <ArrowDown className="size-4 text-white/55 lg:hidden" />
                </>
              ) : (
                <Circle className="size-3 fill-red-600 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                {label}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
                {verb}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="sr-only">
        Sensors feed perception, intelligence, planning, autonomy and finally authorized
        physical action.
      </p>
    </div>
  );
}

export function EcosystemDiagram() {
  return (
    <div className="relative border border-white/10 bg-[#0c0f13] p-5 sm:p-9">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto w-fit border border-white/15 bg-white/3 px-8 py-4 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            Parent system
          </p>
          <p className="mt-2 text-lg font-black tracking-[0.2em] text-white">ORTZION</p>
        </div>
        <div className="mx-auto h-10 w-px bg-white/15" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-white/10 bg-black/30 p-5">
            <Eye className="size-5 text-red-500" strokeWidth={1.5} />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-white">
              VATES
            </p>
            <p className="mt-2 text-xs leading-5 text-steel">
              Perception and computer vision
            </p>
          </div>
          <div className="border border-white/10 bg-black/30 p-5">
            <Network className="size-5 text-red-500" strokeWidth={1.5} />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-white">
              SOFIA
            </p>
            <p className="mt-2 text-xs leading-5 text-steel">
              AI reasoning, agents and orchestration
            </p>
          </div>
        </div>
        <div className="mx-auto h-10 w-px bg-red-600/60" />
        <div className="border border-red-600/40 bg-red-950/10 p-6 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-400">
            Physical autonomy layer
          </p>
          <p className="mt-2 text-xl font-black tracking-[0.18em] text-white">PRAETORIAN</p>
          <p className="mt-2 text-xs text-steel">Autonomous robotics</p>
        </div>
      </div>
    </div>
  );
}

const stack = [
  ['SOFIA', 'AI / reasoning'],
  ['VATES', 'Perception'],
  ['World model', 'Context'],
  ['Planning', 'Authorized intent'],
  ['Autonomy', 'Coordination'],
  ['Control', 'Execution'],
  ['Robotic platform', 'Machine'],
] as const;

export function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border border-white/10 bg-[#0c0f13] p-5 sm:p-8">
      <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="eyebrow">Conceptual architecture</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white">
            PRAETORIAN platform
          </p>
        </div>
        <Cpu className="size-6 text-red-500" strokeWidth={1.3} />
      </div>
      <ol className={compact ? 'grid gap-2 sm:grid-cols-2' : 'space-y-2'}>
        {stack.map(([label, detail], index) => (
          <li
            key={label}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border border-white/8 bg-black/25 px-4 py-3"
          >
            <span className="font-mono text-[9px] text-red-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
              {label}
            </span>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-white/55 sm:block">
              {detail}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-3 border border-white/10 bg-white/3 p-4 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
        Compute foundation · Rust / Mojo / Zig · Linux · CPU / GPU / Edge
      </div>
    </div>
  );
}
