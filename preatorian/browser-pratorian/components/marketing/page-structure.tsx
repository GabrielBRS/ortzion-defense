import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export function PublicPageHero({
  eyebrow,
  title,
  description,
  index,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  index: string;
  aside?: ReactNode;
}) {
  return (
    <section className="technical-grid relative overflow-hidden border-b border-white/10 bg-[#08090b] pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="absolute right-[-12rem] top-[-14rem] size-[36rem] rounded-full bg-red-950/20 blur-[120px]" />
      <div className="shell relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-red-600" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h1 className="mt-8 max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.07em] text-white">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-steel sm:text-lg">
            {description}
          </p>
        </div>
        <div className="lg:justify-self-end">
          {aside ?? (
            <div className="w-fit border-l border-red-600 pl-5 font-mono text-[9px] uppercase leading-6 tracking-[0.2em] text-white/55">
              PRAETORIAN platform
              <br />
              ORTZION Technology
            </div>
          )}
        </div>
      </div>
      <div className="shell mt-16 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/55">
        <span>Institutional overview</span>
        <span>{index}</span>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-5 max-w-4xl">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-xl text-sm leading-7 text-steel lg:justify-self-end">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryBand({
  title = 'Discuss a PRAETORIAN integration.',
}: {
  title?: string;
}) {
  return (
    <section className="technical-grid bg-[#08090b] py-20 sm:py-24">
      <div className="shell flex flex-col gap-8 border border-white/10 bg-[#0d1014]/90 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Technical inquiry</p>
          <h2 className="mt-4 text-3xl font-semibold uppercase tracking-[-0.045em] text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        <Link href="/contact" className="action-primary w-fit">
          Request information <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
