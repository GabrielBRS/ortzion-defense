import type {
  CreateSupportCaseInput,
  CurrentPrincipal,
  Deployment,
  Device,
  OrganizationMember,
  OverviewSnapshot,
  Page,
  SoftwareRelease,
  SupportCase,
  SystemDetail,
  SystemStatus,
  SystemSummary,
} from '@/types/praetorian';

export interface AccountService {
  me(): Promise<CurrentPrincipal>;
}

export interface OverviewService {
  get(): Promise<OverviewSnapshot>;
}

export interface SystemsService {
  list(input?: {
    readonly status?: SystemStatus;
    readonly cursor?: string;
  }): Promise<Page<SystemSummary>>;
  get(systemId: string): Promise<SystemDetail | null>;
}

export interface DevicesService {
  list(input?: {
    readonly systemId?: string;
    readonly cursor?: string;
  }): Promise<Page<Device>>;
  get(deviceId: string): Promise<Device | null>;
}

export interface DeploymentsService {
  list(): Promise<Page<Deployment>>;
}

export interface SoftwareService {
  releases(): Promise<readonly SoftwareRelease[]>;
}

export interface SupportService {
  list(): Promise<Page<SupportCase>>;
  create(input: CreateSupportCaseInput): Promise<SupportCase>;
}

export interface OrganizationService {
  members(): Promise<readonly OrganizationMember[]>;
}

export interface PraetorianApi {
  readonly account: AccountService;
  readonly overview: OverviewService;
  readonly systems: SystemsService;
  readonly devices: DevicesService;
  readonly deployments: DeploymentsService;
  readonly software: SoftwareService;
  readonly support: SupportService;
  readonly organization: OrganizationService;
}
