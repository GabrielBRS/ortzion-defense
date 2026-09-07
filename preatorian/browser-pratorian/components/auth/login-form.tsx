'use client';

import { ArrowRight, Eye, EyeOff, KeyRound, LockKeyhole } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const inputClass =
  'h-12 rounded-none border-white/15 bg-black/25 px-4 text-white placeholder:text-white/55 focus-visible:border-red-500';

export function LoginForm({ signInUrl }: { signInUrl: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  return (
    <div>
      <p className="eyebrow">PRAETORIAN portal</p>
      <h2 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.055em] text-white sm:text-5xl">
        Sign in
      </h2>
      <p className="mt-4 text-sm leading-6 text-steel">
        Use your organization-managed identity to access authorized systems.
      </p>
      <form
        className="mt-9 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setNotice(
            'Password authentication requires a configured enterprise identity provider. Use Organization SSO for this preview.',
          );
        }}
      >
        <div className="grid gap-2">
          <label
            htmlFor="login-email"
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55"
          >
            Email{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="username"
            className={inputClass}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55"
            >
              Password{' '}
              <span className="text-red-400" aria-hidden="true">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </label>
            <a
              href="/auth/forgot-password"
              className="text-[10px] text-white/60 transition hover:text-white"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={`${inputClass} pr-12`}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-white/60 hover:bg-white/5 hover:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>
        {notice ? (
          <p
            role="status"
            className="border-l border-amber-400 pl-4 text-xs leading-5 text-amber-100/75"
          >
            {notice}
          </p>
        ) : null}
        <Button
          type="submit"
          className="h-12 rounded-none bg-red-700 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-red-600"
        >
          Sign in <ArrowRight className="size-4" />
        </Button>
      </form>
      <div className="my-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
          Secure identity access
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <a
        href={signInUrl}
        target="_top"
        className="flex h-12 w-full items-center justify-center gap-3 border border-white/15 bg-white/3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/35 hover:bg-white/7"
      >
        <KeyRound className="size-4 text-red-500" /> Continue with secure sign-in
      </a>
      <div className="mt-7 flex gap-3 border-t border-white/10 pt-6">
        <LockKeyhole className="mt-0.5 size-4 shrink-0 text-white/55" />
        <p className="font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-white/55">
          Hosted sign-in is delegated to a secure identity provider. Enterprise OIDC and
          organization SSO integrate through the same AuthProvider boundary; tokens are
          never stored in browser local storage.
        </p>
      </div>
    </div>
  );
}
