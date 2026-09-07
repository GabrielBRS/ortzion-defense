import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { PraetorianLogo } from '@/components/brand/logos';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="grid min-h-screen bg-[#08090b] lg:grid-cols-[1.05fr_0.95fr]"
    >
      <section className="technical-grid relative hidden min-h-screen overflow-hidden border-r border-white/10 lg:block">
        <Image
          src="/og.png"
          alt="Concept artwork of a PRAETORIAN autonomous ground platform"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[74%_center] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/80 via-[#08090b]/45 to-[#08090b]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/65" />
        <div className="absolute inset-x-0 top-0 z-10 flex h-24 items-center px-10 xl:px-14">
          <PraetorianLogo />
        </div>
        <div className="absolute bottom-12 left-10 z-10 max-w-md xl:left-14">
          <p className="eyebrow">Authorized access</p>
          <h1 className="mt-5 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-white xl:text-6xl">
            Operations begin with identity.
          </h1>
          <p className="mt-6 text-sm leading-7 text-white/52">
            Secure access to customer-authorized systems, software, documentation and
            support resources.
          </p>
        </div>
      </section>
      <section className="flex min-h-screen flex-col">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-9 lg:justify-end">
          <div className="lg:hidden">
            <PraetorianLogo />
          </div>
          <Link
            href="/"
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
          >
            Return to public site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
          ORTZION Technology · Secure access boundary
        </div>
      </section>
    </main>
  );
}
