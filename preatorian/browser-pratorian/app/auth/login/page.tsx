import type { Metadata } from 'next';

import { LoginForm } from '@/components/auth/login-form';
import { getAuthProvider } from '@/lib/auth/provider';

export const metadata: Metadata = { title: 'Sign in | PRAETORIAN Portal' };

export default function LoginPage() {
  const signInUrl = getAuthProvider().getSignInUrl('/portal');
  return <LoginForm signInUrl={signInUrl} />;
}
