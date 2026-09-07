'use client';

import { z } from 'zod';

import { HttpPraetorianApi } from '@/services/http/http-praetorian-api';
import type { PraetorianApi } from '@/services/interfaces/praetorian-api';
import { MockPraetorianApi } from '@/services/mock/mock-praetorian-api';

const csrfResponseSchema = z.object({ token: z.string().min(16) });

let browserApi: PraetorianApi | null = null;

async function requestCsrfToken(): Promise<string> {
  const response = await fetch('/api/v1/csrf', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('The CSRF service could not issue a request token.');
  }

  const payload: unknown = await response.json();
  return csrfResponseSchema.parse(payload).token;
}

/**
 * Browser-side adapter factory for interactive mutations. The public environment values
 * select transport only; credentials continue to travel in secure, same-site cookies.
 */
export function getBrowserPraetorianApi(): PraetorianApi {
  if (browserApi) return browserApi;

  if (process.env.NEXT_PUBLIC_PRAETORIAN_API_MODE === 'http') {
    const baseUrl = process.env.NEXT_PUBLIC_PRAETORIAN_API_ORIGIN ?? '';
    browserApi = new HttpPraetorianApi(baseUrl, fetch, requestCsrfToken);
  } else {
    browserApi = new MockPraetorianApi();
  }

  return browserApi;
}
