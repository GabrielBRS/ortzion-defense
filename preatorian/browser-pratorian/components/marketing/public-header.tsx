'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PraetorianLogo } from '@/components/brand/logos';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const links = [
  ['Platform', '/platform'],
  ['Systems', '/systems'],
  ['Technology', '/technology'],
  ['Architecture', '/architecture'],
  ['Company', '/company'],
] as const;

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition duration-300',
        scrolled
          ? 'border-white/10 bg-[#08090b]/95 shadow-xl shadow-black/20 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <PraetorianLogo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className={cn(
                'text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition hover:text-white',
                pathname === href ? 'text-white' : 'text-white/55',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/contact"
            aria-current={pathname === '/contact' ? 'page' : undefined}
            className={cn(
              'text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition hover:text-white',
              pathname === '/contact' ? 'text-white' : 'text-white/55',
            )}
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            aria-current={pathname === '/auth/login' ? 'page' : undefined}
            className={cn(
              'text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition hover:text-white',
              pathname === '/auth/login' ? 'text-white' : 'text-white/55',
            )}
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="border border-white/20 px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-white transition hover:border-red-500 hover:bg-red-700"
          >
            Request information
          </Link>
        </div>
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                className="border-white/15 bg-black/20 text-white lg:hidden"
                aria-label="Open navigation"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent className="border-white/10 bg-[#0b0d10] text-white" side="right">
            <SheetHeader className="border-b border-white/10 p-6">
              <SheetTitle className="text-left text-sm uppercase tracking-[0.18em]">
                PRAETORIAN
              </SheetTitle>
              <SheetDescription className="text-left text-xs text-white/60">
                Autonomous robotics platform
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-6 py-3" aria-label="Mobile navigation">
              {links.map(([label, href]) => (
                <SheetClose
                  key={href}
                  render={
                    <Link
                      href={href}
                      aria-current={pathname === href ? 'page' : undefined}
                      className={cn(
                        'border-b border-white/8 py-5 text-sm font-semibold uppercase tracking-[0.16em]',
                        pathname === href ? 'text-white' : 'text-white/75',
                      )}
                    />
                  }
                >
                  {label}
                </SheetClose>
              ))}
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    aria-current={pathname === '/contact' ? 'page' : undefined}
                    className="border-b border-white/8 py-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/75"
                  />
                }
              >
                Contact
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    className="mt-5 bg-red-700 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  />
                }
              >
                Request information
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/auth/login"
                    aria-current={pathname === '/auth/login' ? 'page' : undefined}
                    className="mt-3 border border-white/15 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  />
                }
              >
                Sign in
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
