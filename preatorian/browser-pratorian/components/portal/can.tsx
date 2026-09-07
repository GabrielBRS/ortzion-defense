import type { ReactNode } from 'react';

import type { Permission } from '@/types/praetorian';

export function Can({
  permission,
  permissions,
  children,
  fallback = null,
}: {
  permission: Permission;
  permissions: readonly Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return permissions.includes(permission) ? children : fallback;
}
