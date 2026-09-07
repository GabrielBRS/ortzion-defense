import Image from 'next/image';
import Link from 'next/link';

export function PraetorianSymbol({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`relative inline-block ${compact ? 'size-10' : 'size-14'} shrink-0`}
      aria-hidden="true"
    >
      <Image
        src="/praetorian-symbol-v2.png"
        alt=""
        fill
        sizes={compact ? '40px' : '56px'}
        className="object-contain"
      />
    </span>
  );
}

export function PraetorianLogo({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5"
      aria-label="PRAETORIAN home"
    >
      <PraetorianSymbol compact />
      <span>
        <span className="font-display block text-[0.78rem] font-black uppercase leading-none tracking-[0.11em] text-white sm:text-[0.84rem]">
          <span aria-hidden="true">
            PR<span className="text-red-500">A</span>ETORI
            <span className="text-red-500">A</span>N
          </span>
          <span className="sr-only">PRAETORIAN</span>
        </span>
        <span className="mt-1.5 block font-mono text-[0.4rem] uppercase leading-none tracking-[0.3em] text-white/60">
          Autonomous robotics
        </span>
      </span>
    </Link>
  );
}

export function OrtzionLogo() {
  return (
    <span className="text-xs font-black uppercase tracking-[0.28em] text-white">
      ORTZION<span className="text-red-600">.</span>
    </span>
  );
}
