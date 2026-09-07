import type { PraetorianApi } from '@/services/interfaces/praetorian-api';
import type {
  CreateSupportCaseInput,
  CurrentPrincipal,
  Deployment,
  Device,
  OrganizationMember,
  OverviewSnapshot,
  SoftwareRelease,
  SupportCase,
  SystemDetail,
} from '@/types/praetorian';

const systems: readonly SystemDetail[] = [
  {
    id: 'sys-001',
    name: 'Integration System 01',
    model: 'Ground systems integration',
    serialNumber: 'PR-DEV-0018',
    softwareVersion: '2.8.1',
    status: 'ONLINE',
    lastContactAt: '2026-09-06T22:41:00.000Z',
    hardware: [
      { component: 'Compute module', value: 'Edge GPU module', state: 'NOMINAL' },
      { component: 'Sensor bus', value: '4 sources linked', state: 'NOMINAL' },
      { component: 'Power subsystem', value: 'External supply', state: 'NOMINAL' },
    ],
    connectivity: {
      link: 'Authenticated edge link',
      latencyMs: 24,
      lastHandshakeAt: '2026-09-06T22:40:52.000Z',
    },
    nextMaintenanceAt: '2026-10-14T13:00:00.000Z',
    auditEvents: [
      {
        id: 'audit-01',
        action: 'Health review acknowledged',
        actor: 'Operations',
        occurredAt: '2026-09-06T21:12:00.000Z',
      },
      {
        id: 'audit-02',
        action: 'Software 2.8.1 validated',
        actor: 'Engineering',
        occurredAt: '2026-09-05T18:30:00.000Z',
      },
    ],
  },
  {
    id: 'sys-002',
    name: 'Edge Validation Rig',
    model: 'Edge compute system',
    serialNumber: 'PR-DEV-0024',
    softwareVersion: '2.8.1',
    status: 'DEGRADED',
    lastContactAt: '2026-09-06T22:37:00.000Z',
    hardware: [
      { component: 'Compute module', value: 'Edge GPU module', state: 'NOMINAL' },
      { component: 'Thermal subsystem', value: 'Inspection requested', state: 'ATTENTION' },
    ],
    connectivity: {
      link: 'Authenticated edge link',
      latencyMs: 41,
      lastHandshakeAt: '2026-09-06T22:36:48.000Z',
    },
    nextMaintenanceAt: '2026-09-08T12:00:00.000Z',
    auditEvents: [
      {
        id: 'audit-03',
        action: 'Thermal advisory opened',
        actor: 'System',
        occurredAt: '2026-09-06T22:21:00.000Z',
      },
    ],
  },
  {
    id: 'sys-003',
    name: 'Perception Bench',
    model: 'Sensor integration system',
    serialNumber: 'PR-DEV-0031',
    softwareVersion: '2.7.6',
    status: 'MAINTENANCE',
    lastContactAt: '2026-09-06T18:15:00.000Z',
    hardware: [
      { component: 'Compute module', value: 'Bench GPU module', state: 'NOMINAL' },
      { component: 'Sensor bus', value: 'Maintenance isolated', state: 'ATTENTION' },
    ],
    connectivity: {
      link: 'Service network',
      latencyMs: null,
      lastHandshakeAt: '2026-09-06T18:15:00.000Z',
    },
    nextMaintenanceAt: '2026-09-07T14:00:00.000Z',
    auditEvents: [
      {
        id: 'audit-04',
        action: 'Maintenance window started',
        actor: 'Engineering',
        occurredAt: '2026-09-06T18:15:00.000Z',
      },
    ],
  },
];

const devices: readonly Device[] = [
  {
    id: 'dev-101',
    systemId: 'sys-001',
    name: 'Primary compute',
    kind: 'EDGE_COMPUTE',
    softwareVersion: '2.8.1',
    networkStatus: 'CONNECTED',
    health: 'ONLINE',
    metrics: {
      cpuPercent: 38,
      gpuPercent: 54,
      memoryPercent: 61,
      storagePercent: 43,
      temperatureCelsius: 58,
    },
    lastContactAt: '2026-09-06T22:41:00.000Z',
  },
  {
    id: 'dev-102',
    systemId: 'sys-001',
    name: 'Sensor gateway',
    kind: 'GATEWAY',
    softwareVersion: '1.9.4',
    networkStatus: 'CONNECTED',
    health: 'ONLINE',
    metrics: {
      cpuPercent: 21,
      gpuPercent: null,
      memoryPercent: 34,
      storagePercent: 28,
      temperatureCelsius: 42,
    },
    lastContactAt: '2026-09-06T22:40:55.000Z',
  },
  {
    id: 'dev-201',
    systemId: 'sys-002',
    name: 'Validation compute',
    kind: 'EDGE_COMPUTE',
    softwareVersion: '2.8.1',
    networkStatus: 'LIMITED',
    health: 'DEGRADED',
    metrics: {
      cpuPercent: 67,
      gpuPercent: 72,
      memoryPercent: 76,
      storagePercent: 59,
      temperatureCelsius: 78,
    },
    lastContactAt: '2026-09-06T22:37:00.000Z',
  },
  {
    id: 'dev-301',
    systemId: 'sys-003',
    name: 'Vision sensor array',
    kind: 'SENSOR',
    softwareVersion: '2.7.6',
    networkStatus: 'DISCONNECTED',
    health: 'MAINTENANCE',
    metrics: {
      cpuPercent: 0,
      gpuPercent: null,
      memoryPercent: 0,
      storagePercent: 46,
      temperatureCelsius: null,
    },
    lastContactAt: '2026-09-06T18:15:00.000Z',
  },
];

const deployments: readonly Deployment[] = [
  {
    id: 'dep-01',
    target: 'Integration System 01',
    version: '2.8.1',
    environment: 'PRODUCTION',
    status: 'COMPLETED',
    initiatedBy: 'Engineering',
    startedAt: '2026-09-05T18:12:00.000Z',
    completedAt: '2026-09-05T18:27:00.000Z',
    progress: 100,
  },
  {
    id: 'dep-02',
    target: 'Edge Validation Rig',
    version: '2.9.0-rc.2',
    environment: 'VALIDATION',
    status: 'IN_PROGRESS',
    initiatedBy: 'Release manager',
    startedAt: '2026-09-06T22:18:00.000Z',
    completedAt: null,
    progress: 68,
  },
  {
    id: 'dep-03',
    target: 'Perception Bench',
    version: '2.8.1',
    environment: 'VALIDATION',
    status: 'PLANNED',
    initiatedBy: 'Engineering',
    startedAt: '2026-09-08T14:00:00.000Z',
    completedAt: null,
    progress: 0,
  },
];

const releases: readonly SoftwareRelease[] = [
  {
    id: 'rel-281',
    version: '2.8.1',
    channel: 'STABLE',
    publishedAt: '2026-08-28T14:00:00.000Z',
    releaseNotes: [
      'Improved edge runtime supervision',
      'Expanded device health telemetry',
      'Maintenance update to secure communications',
    ],
    compatibleModels: [
      'Ground systems integration',
      'Edge compute system',
      'Sensor integration system',
    ],
    installed: true,
  },
  {
    id: 'rel-276',
    version: '2.7.6',
    channel: 'MAINTENANCE',
    publishedAt: '2026-07-10T14:00:00.000Z',
    releaseNotes: ['Runtime stability and observability updates'],
    compatibleModels: ['Sensor integration system'],
    installed: false,
  },
];

const supportCases: readonly SupportCase[] = [
  {
    id: 'case-01',
    reference: 'SUP-1042',
    subject: 'Thermal advisory review',
    category: 'Hardware health',
    severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    systemId: 'sys-002',
    updatedAt: '2026-09-06T22:29:00.000Z',
  },
  {
    id: 'case-02',
    reference: 'SUP-1038',
    subject: 'Compatibility clarification for 2.8.1',
    category: 'Software',
    severity: 'LOW',
    status: 'WAITING',
    systemId: 'sys-003',
    updatedAt: '2026-09-05T16:20:00.000Z',
  },
];

const members: readonly OrganizationMember[] = [
  {
    id: 'mem-01',
    name: 'Alex Morgan',
    email: 'alex@example.test',
    role: 'Organization Admin',
    status: 'ACTIVE',
  },
  {
    id: 'mem-02',
    name: 'Jordan Lee',
    email: 'jordan@example.test',
    role: 'Engineer',
    status: 'ACTIVE',
  },
  {
    id: 'mem-03',
    name: 'Taylor Kim',
    email: 'taylor@example.test',
    role: 'Operator',
    status: 'ACTIVE',
  },
  {
    id: 'mem-04',
    name: 'Casey Singh',
    email: 'casey@example.test',
    role: 'Viewer',
    status: 'INVITED',
  },
];

const principal: CurrentPrincipal = {
  user: {
    id: 'development-user',
    email: 'operator@example.test',
    displayName: 'Operations User',
  },
  organization: { id: 'org-development', name: 'Development Organization' },
  permissions: [
    'overview:read',
    'systems:read',
    'devices:read',
    'deployments:read',
    'software:read',
    'documentation:read',
    'support:read',
    'support:create',
    'organization:read',
    'organization:manage',
    'settings:manage',
  ],
};

const overview: OverviewSnapshot = {
  authorizedSystems: systems.length,
  onlineDevices: devices.filter((device) => device.health === 'ONLINE').length,
  totalDevices: devices.length,
  softwareVersion: '2.8.1',
  systemHealth: 'ATTENTION',
  openSupportCases: supportCases.filter((item) => item.status !== 'RESOLVED').length,
  activity: [
    {
      id: 'activity-01',
      title: 'Validation rollout progressing',
      detail: 'Release 2.9.0-rc.2 reached 68% on Edge Validation Rig.',
      occurredAt: '2026-09-06T22:38:00.000Z',
      tone: 'INFO',
    },
    {
      id: 'activity-02',
      title: 'Thermal advisory acknowledged',
      detail: 'Operations opened a support review for Validation compute.',
      occurredAt: '2026-09-06T22:29:00.000Z',
      tone: 'ATTENTION',
    },
    {
      id: 'activity-03',
      title: 'Secure link verified',
      detail: 'Integration System 01 completed its scheduled connectivity check.',
      occurredAt: '2026-09-06T21:48:00.000Z',
      tone: 'SUCCESS',
    },
  ],
};

export class MockPraetorianApi implements PraetorianApi {
  readonly account = { me: async () => principal };
  readonly overview = { get: async () => overview };
  readonly systems = {
    list: async () => ({ items: systems, nextCursor: null }),
    get: async (systemId: string) =>
      systems.find((system) => system.id === systemId) ?? null,
  };
  readonly devices = {
    list: async (input?: { readonly systemId?: string; readonly cursor?: string }) => ({
      items: input?.systemId
        ? devices.filter((device) => device.systemId === input.systemId)
        : devices,
      nextCursor: null,
    }),
    get: async (deviceId: string) =>
      devices.find((device) => device.id === deviceId) ?? null,
  };
  readonly deployments = { list: async () => ({ items: deployments, nextCursor: null }) };
  readonly software = { releases: async () => releases };
  readonly support = {
    list: async () => ({ items: supportCases, nextCursor: null }),
    create: async (input: CreateSupportCaseInput): Promise<SupportCase> => ({
      id: 'case-development',
      reference: 'SUP-PENDING',
      subject: input.subject,
      category: input.category,
      severity: input.severity,
      status: 'OPEN',
      systemId: input.systemId,
      updatedAt: new Date().toISOString(),
    }),
  };
  readonly organization = { members: async () => members };
}
