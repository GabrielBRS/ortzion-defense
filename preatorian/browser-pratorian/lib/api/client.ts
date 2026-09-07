import type { ZodType } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly requestId: string | null,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class PraetorianApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly request: typeof fetch = fetch,
  ) {
    if (baseUrl && !baseUrl.startsWith('https://')) {
      throw new Error('PRAETORIAN API origins must use HTTPS.');
    }
  }

  async get<TResult>(
    path: string,
    schema: ZodType<TResult>,
    signal?: AbortSignal,
  ): Promise<TResult> {
    return this.execute(path, schema, { method: 'GET', signal });
  }

  async post<TBody extends object, TResult>(
    path: string,
    body: TBody,
    schema: ZodType<TResult>,
    csrfToken: string,
    signal?: AbortSignal,
  ): Promise<TResult> {
    if (!csrfToken) throw new Error('A CSRF token is required for mutations.');
    return this.execute(path, schema, {
      method: 'POST',
      signal,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });
  }

  private async execute<TResult>(
    path: string,
    schema: ZodType<TResult>,
    init: RequestInit,
  ): Promise<TResult> {
    if (!path.startsWith('/api/v1/')) {
      throw new Error('API requests must use the versioned /api/v1 boundary.');
    }

    const response = await this.request(`${this.baseUrl}${path}`, {
      ...init,
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        ...init.headers,
      },
    });
    const requestId = response.headers.get('x-request-id');

    if (!response.ok) {
      throw new ApiError(
        'The PRAETORIAN service rejected the request.',
        response.status,
        requestId,
      );
    }

    const payload: unknown = await response.json();
    return schema.parse(payload);
  }
}
