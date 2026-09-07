import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { OrtzionLogo, PraetorianLogo } from '@/components/brand/logos';

const groups = [
  {
    label: 'Platform',
    links: [
      ['Overview', '/platform'],
      ['Systems', '/systems'],
      ['Architecture', '/architecture'],
    ],
  },
  {
    label: 'Organization',
    links: [
      ['Technology', '/technology'],
      ['Company', '/company'],
      ['Contact', '/contact'],
    ],
  },
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.5fr_0.8fr_0.8fr] md:py-20">
        <div>
          <PraetorianLogo />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">
            Autonomous robotics engineered by ORTZION Technology for complex,
            high-reliability environments.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:text-red-400"
          >
            Request information <ArrowUpRight className="size-4" />
          </Link>
        </div>
        {groups.map((group) => (
          <nav key={group.label} aria-label={`${group.label} links`}>
            <p className="eyebrow">{group.label}</p>
            <ul className="mt-5 space-y-3">
              {group.links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <OrtzionLogo />
            <span className="h-4 w-px bg-white/15" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/55">
              Defense ecosystem
            </span>
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
            © 2026 ORTZION Technology · PRAETORIAN Autonomous Robotics
          </p>
        </div>
      </div>
    </footer>
  );
}
