import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const requiredRoutes = [
  'app/(public)/page.tsx',
  'app/(public)/platform/page.tsx',
  'app/(public)/systems/page.tsx',
  'app/(public)/technology/page.tsx',
  'app/(public)/architecture/page.tsx',
  'app/(public)/company/page.tsx',
  'app/(public)/contact/page.tsx',
  'app/auth/login/page.tsx',
  'app/auth/forgot-password/page.tsx',
  'app/auth/callback/page.tsx',
  'app/portal/page.tsx',
  'app/portal/systems/page.tsx',
  'app/portal/systems/[systemId]/page.tsx',
  'app/portal/devices/page.tsx',
  'app/portal/devices/[deviceId]/page.tsx',
  'app/portal/deployments/page.tsx',
  'app/portal/software/page.tsx',
  'app/portal/documentation/page.tsx',
  'app/portal/support/page.tsx',
  'app/portal/support/new/page.tsx',
  'app/portal/organization/page.tsx',
  'app/portal/settings/page.tsx',
];

test('all required product routes exist', () => {
  for (const route of requiredRoutes) {
    assert.equal(existsSync(route), true, `${route} should exist`);
  }
});

test('authentication provider never uses browser token storage', () => {
  for (const file of sourceFiles(['app', 'components', 'lib', 'services'])) {
    const source = readFileSync(file, 'utf8');
    assert.equal(source.includes('localStorage'), false, `${file} uses localStorage`);
    assert.equal(source.includes('sessionStorage'), false, `${file} uses sessionStorage`);
  }
});

test('portal metadata blocks indexing', () => {
  const portalLayout = readFileSync('app/portal/layout.tsx', 'utf8');
  assert.match(portalLayout, /index:\s*false/);
  assert.match(portalLayout, /follow:\s*false/);

  const robots = readFileSync('app/robots.ts', 'utf8');
  assert.match(robots, /'\/portal'/);
  assert.match(robots, /'\/portal\/'/);
});

test('generated image is available to the public frontend', () => {
  assert.equal(existsSync('public/og.png'), true);
  assert.equal(existsSync('public/praetorian-symbol-v2.png'), true);
});

test('API architecture is adapter-switchable and CSRF-aware', () => {
  const serverFactory = readFileSync('services/index.ts', 'utf8');
  const browserFactory = readFileSync('services/browser.ts', 'utf8');
  const client = readFileSync('lib/api/client.ts', 'utf8');
  const supportForm = readFileSync('components/portal/support-case-form.tsx', 'utf8');

  for (const source of [serverFactory, browserFactory]) {
    assert.match(source, /HttpPraetorianApi/);
    assert.match(source, /MockPraetorianApi/);
  }
  assert.match(client, /'X-CSRF-Token'/);
  assert.match(client, /credentials:\s*'include'/);
  assert.match(supportForm, /support\.create/);
});

test('search, navigation and reduced-motion affordances are implemented', () => {
  const systems = readFileSync('app/portal/systems/page.tsx', 'utf8');
  const documentation = readFileSync('components/portal/documentation-browser.tsx', 'utf8');
  const publicNavigation = readFileSync('components/marketing/public-header.tsx', 'utf8');
  const globalStyles = readFileSync('app/globals.css', 'utf8');

  assert.match(systems, /searchParams/);
  assert.match(systems, /visibleSystems/);
  assert.match(documentation, /article\.sections\.join/);
  assert.match(documentation, /hasMatches/);
  assert.match(publicNavigation, /aria-current/);
  assert.match(globalStyles, /prefers-reduced-motion/);
});

test('authored TypeScript does not introduce explicit any types', () => {
  for (const file of sourceFiles([
    'app',
    'components/auth',
    'components/brand',
    'components/diagrams',
    'components/layout',
    'components/marketing',
    'components/portal',
    'config',
    'hooks',
    'lib',
    'services',
    'types',
  ])) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /:\s*any\b|\bas\s+any\b|<any>/, file);
  }
});

function sourceFiles(roots) {
  const files = [];

  for (const root of roots) {
    const statEntries = readdirSync(root, { withFileTypes: true });
    for (const entry of statEntries) {
      const path = join(root, entry.name);
      if (entry.isDirectory()) files.push(...sourceFiles([path]));
      if (entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name)) files.push(path);
    }
  }

  return files;
}
