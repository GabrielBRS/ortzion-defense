import { ApiError, PraetorianApiClient } from '@/lib/api/client';
import {
  createSupportCaseSchema,
  currentPrincipalSchema,
  deploymentSchema,
  deviceSchema,
  organizationMemberSchema,
  overviewSchema,
  pageSchema,
  releaseSchema,
  supportCaseSchema,
  systemDetailSchema,
  systemSummarySchema,
} from '@/lib/api/schemas';
import type { PraetorianApi } from '@/services/interfaces/praetorian-api';
import type { CreateSupportCaseInput, SystemStatus } from '@/types/praetorian';

async function noCsrfToken(): Promise<string> {
  throw new Error('No CSRF token provider has been configured.');
}

export class HttpPraetorianApi implements PraetorianApi {
  private readonly client: PraetorianApiClient;

  constructor(
    baseUrl: string,
    request: typeof fetch = fetch,
    private readonly csrfTokenProvider: () => Promise<string> = noCsrfToken,
  ) {
    this.client = new PraetorianApiClient(baseUrl, request);
  }

  readonly account = {
    me: async () => this.client.get('/api/v1/me', currentPrincipalSchema),
  };

  readonly overview = {
    get: async () => this.client.get('/api/v1/overview', overviewSchema),
  };

  readonly systems = {
    list: async (input?: { readonly status?: SystemStatus; readonly cursor?: string }) => {
      const query = new URLSearchParams();
      if (input?.status) query.set('status', input.status);
      if (input?.cursor) query.set('cursor', input.cursor);
      const suffix = query.size > 0 ? `?${query.toString()}` : '';
      return this.client.get(`/api/v1/systems${suffix}`, pageSchema(systemSummarySchema));
    },
    get: async (systemId: string) => {
      try {
        return await this.client.get(
          `/api/v1/systems/${encodeURIComponent(systemId)}`,
          systemDetailSchema,
        );
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null;
        throw error;
      }
    },
  };

  readonly devices = {
    list: async (input?: { readonly systemId?: string; readonly cursor?: string }) => {
      const query = new URLSearchParams();
      if (input?.systemId) query.set('systemId', input.systemId);
      if (input?.cursor) query.set('cursor', input.cursor);
      const suffix = query.size > 0 ? `?${query.toString()}` : '';
      return this.client.get(`/api/v1/devices${suffix}`, pageSchema(deviceSchema));
    },
    get: async (deviceId: string) => {
      try {
        return await this.client.get(
          `/api/v1/devices/${encodeURIComponent(deviceId)}`,
          deviceSchema,
        );
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null;
        throw error;
      }
    },
  };

  readonly deployments = {
    list: async () => this.client.get('/api/v1/deployments', pageSchema(deploymentSchema)),
  };

  readonly software = {
    releases: async () =>
      this.client.get('/api/v1/software/releases', releaseSchema.array()),
  };

  readonly support = {
    list: async () =>
      this.client.get('/api/v1/support/cases', pageSchema(supportCaseSchema)),
    create: async (input: CreateSupportCaseInput) => {
      const validInput = createSupportCaseSchema.parse(input);
      const csrfToken = await this.csrfTokenProvider();
      return this.client.post(
        '/api/v1/support/cases',
        validInput,
        supportCaseSchema,
        csrfToken,
      );
    },
  };

  readonly organization = {
    members: async () =>
      this.client.get('/api/v1/organization/members', organizationMemberSchema.array()),
  };
}
