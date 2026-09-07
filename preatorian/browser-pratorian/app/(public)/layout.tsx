import type { ReactNode } from 'react';

import { PublicFooter } from '@/components/layout/public-footer';
import { PublicHeader } from '@/components/marketing/public-header';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
