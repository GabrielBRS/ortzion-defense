'use client';

import {
  Bell,
  BookOpen,
  Boxes,
  Building2,
  CircleGauge,
  Cpu,
  Headphones,
  Menu,
  PackageCheck,
  Rocket,
  Settings,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

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
import type { CurrentPrincipal, Permission } from '@/types/praetorian';

const navigation = [
  { label: 'Overview', href: '/portal', icon: CircleGauge, permission: 'overview:read' },
  { label: 'Systems', href: '/portal/systems', icon: Boxes, permission: 'systems:read' },
  { label: 'Devices', href: '/portal/devices', icon: Cpu, permission: 'devices:read' },
  {
    label: 'Deployments',
    href: '/portal/deployments',
    icon: Rocket,
    permission: 'deployments:read',
  },
  {
    label: 'Software',
    href: '/portal/software',
    icon: PackageCheck,
    permission: 'software:read',
  },
  {
    label: 'Documentation',
    href: '/portal/documentation',
    icon: BookOpen,
    permission: 'documentation:read',
  },
  {
    label: 'Support',
    href: '/portal/support',
    icon: Headphones,
    permission: 'support:read',
  },
  {
    label: 'Organization',
    href: '/portal/organization',
    icon: Building2,
    permission: 'organization:read',
  },
  {
    label: 'Settings',
    href: '/portal/settings',
    icon: Settings,
    permission: 'settings:manage',
  },
] as const;

function PortalNavigation({
  closeOnSelect = false,
  permissions,
}: {
  closeOnSelect?: boolean;
  permissions: readonly Permission[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Portal navigation" className="grid gap-1">
      {navigation
        .filter((item) => permissions.includes(item.permission))
        .map((item) => {
          const active =
            item.href === '/portal'
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const link = (
            <Link
              href={item.href}
              className={cn(
                'group flex min-h-11 items-center gap-3 border-l-2 px-4 text-xs font-semibold uppercase tracking-[0.1em] transition',
                active
                  ? 'border-red-500 bg-white/6 text-white'
                  : 'border-transparent text-white/55 hover:bg-white/3 hover:text-white/78',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon
                className={cn('size-4', active ? 'text-red-500' : 'text-white/55')}
                strokeWidth={1.5}
              />
              {item.label}
            </Link>
          );

          return closeOnSelect ? (
            <SheetClose key={item.href} render={link} />
          ) : (
            <div key={item.href}>{link}</div>
          );
        })}
    </nav>
  );
}

export function PortalShell({
  principal,
  signOutUrl,
  environment,
  children,
}: {
  principal: CurrentPrincipal;
  signOutUrl: string;
  environment: 'Development' | 'Connected';
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-white/10 bg-[#0b0d10] lg:flex lg:flex-col">
        <div className="flex h-[76px] items-center border-b border-white/10 px-6">
          <PraetorianLogo href="/portal" />
        </div>
        <div className="border-b border-white/10 px-6 py-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">
            Organization
          </p>
          <p className="mt-2 truncate text-xs font-semibold text-white/75">
            {principal.organization.name}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <PortalNavigation permissions={principal.permissions} />
        </div>
        <div className="border-t border-white/10 p-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
            Authenticated session
          </p>
          <p className="mt-2 truncate text-xs text-white/55">{principal.user.email}</p>
          <a
            href={signOutUrl}
            target="_top"
            className="mt-3 inline-flex text-[10px] font-semibold uppercase tracking-[0.12em] text-red-400 transition hover:text-red-300"
          >
            Sign out
          </a>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/10 bg-[#0a0c0f]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-lg"
                    className="rounded-none border-white/12 bg-white/3 text-white lg:hidden"
                    aria-label="Open portal navigation"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] border-white/10 bg-[#0b0d10] p-0 text-white"
              >
                <SheetHeader className="border-b border-white/10 p-6">
                  <SheetTitle className="text-left">
                    <PraetorianLogo href="/portal" />
                  </SheetTitle>
                  <SheetDescription className="text-left text-white/55">
                    Operations portal navigation
                  </SheetDescription>
                </SheetHeader>
                <div className="px-3 py-4">
                  <PortalNavigation closeOnSelect permissions={principal.permissions} />
                </div>
                <div className="mt-auto border-t border-white/10 p-6">
                  <p className="truncate text-xs font-semibold text-white/75">
                    {principal.organization.name}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-white/55">
                    {principal.user.email}
                  </p>
                  <a
                    href={signOutUrl}
                    target="_top"
                    className="mt-4 inline-flex min-h-11 items-center text-[10px] font-semibold uppercase tracking-[0.12em] text-red-400"
                  >
                    Sign out
                  </a>
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden border-l border-white/10 pl-4 md:block">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">
                Organization
              </p>
              <p className="mt-1 max-w-36 truncate text-[10px] font-semibold text-white/75">
                {principal.organization.name}
              </p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <p className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/55 sm:block">
                Environment
              </p>
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
                <span className="size-1.5 rounded-full bg-emerald-400" /> {environment}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-none text-white/60 hover:bg-white/5 hover:text-white"
              aria-label="Notifications: no unread items"
              title="No unread notifications"
              disabled
            >
              <Bell className="size-4" />
            </Button>
            <div className="hidden h-7 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center border border-white/12 bg-white/4">
                <UserRound className="size-4 text-white/60" />
              </span>
              <div className="hidden sm:block">
                <p className="max-w-40 truncate text-xs font-semibold text-white/75">
                  {principal.user.displayName}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                  Authorized user
                </p>
              </div>
            </div>
          </div>
        </header>
        <main
          id="main-content"
          className="min-h-[calc(100vh-76px)] px-4 py-7 sm:px-6 lg:px-8 lg:py-9"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
