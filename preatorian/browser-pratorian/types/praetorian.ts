export type IsoDateTime = string;

export type SystemStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE' | 'MAINTENANCE';

export type DeviceKind = 'ROBOTIC_PLATFORM' | 'EDGE_COMPUTE' | 'SENSOR' | 'GATEWAY';

export type NetworkStatus = 'CONNECTED' | 'LIMITED' | 'DISCONNECTED';

export type DeploymentStatus =
  'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELED';

export type SupportCaseStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Permission =
  | 'overview:read'
  | 'systems:read'
  | 'devices:read'
  | 'deployments:read'
  | 'software:read'
  | 'documentation:read'
  | 'support:read'
  | 'support:create'
  | 'organization:read'
  | 'organization:manage'
  | 'settings:manage';

export interface CurrentPrincipal {
  readonly user: {
    readonly id: string;
    readonly email: string;
    readonly displayName: string;
  };
  readonly organization: {
    readonly id: string;
    readonly name: string;
  };
  readonly permissions: readonly Permission[];
}

export interface SystemSummary {
  readonly id: string;
  readonly name: string;
  readonly model: string;
  readonly serialNumber: string;
  readonly softwareVersion: string;
  readonly status: SystemStatus;
  readonly lastContactAt: IsoDateTime | null;
}

export interface AuditEvent {
  readonly id: string;
  readonly action: string;
  readonly actor: string;
  readonly occurredAt: IsoDateTime;
}

export interface SystemDetail extends SystemSummary {
  readonly hardware: readonly {
    readonly component: string;
    readonly value: string;
    readonly state: 'NOMINAL' | 'ATTENTION';
  }[];
  readonly connectivity: {
    readonly link: string;
    readonly latencyMs: number | null;
    readonly lastHandshakeAt: IsoDateTime | null;
  };
  readonly nextMaintenanceAt: IsoDateTime;
  readonly auditEvents: readonly AuditEvent[];
}

export interface DeviceMetrics {
  readonly cpuPercent: number;
  readonly gpuPercent: number | null;
  readonly memoryPercent: number;
  readonly storagePercent: number;
  readonly temperatureCelsius: number | null;
}

export interface Device {
  readonly id: string;
  readonly systemId: string;
  readonly name: string;
  readonly kind: DeviceKind;
  readonly softwareVersion: string;
  readonly networkStatus: NetworkStatus;
  readonly health: SystemStatus;
  readonly metrics: DeviceMetrics;
  readonly lastContactAt: IsoDateTime | null;
}

export interface Deployment {
  readonly id: string;
  readonly target: string;
  readonly version: string;
  readonly environment: 'PRODUCTION' | 'VALIDATION';
  readonly status: DeploymentStatus;
  readonly initiatedBy: string;
  readonly startedAt: IsoDateTime;
  readonly completedAt: IsoDateTime | null;
  readonly progress: number;
}

export interface SoftwareRelease {
  readonly id: string;
  readonly version: string;
  readonly channel: 'STABLE' | 'MAINTENANCE';
  readonly publishedAt: IsoDateTime;
  readonly releaseNotes: readonly string[];
  readonly compatibleModels: readonly string[];
  readonly installed: boolean;
}

export interface SupportCase {
  readonly id: string;
  readonly reference: string;
  readonly subject: string;
  readonly category: string;
  readonly severity: Severity;
  readonly status: SupportCaseStatus;
  readonly systemId: string | null;
  readonly updatedAt: IsoDateTime;
}

export interface ActivityEvent {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly occurredAt: IsoDateTime;
  readonly tone: 'INFO' | 'SUCCESS' | 'ATTENTION';
}

export interface OverviewSnapshot {
  readonly authorizedSystems: number;
  readonly onlineDevices: number;
  readonly totalDevices: number;
  readonly softwareVersion: string;
  readonly systemHealth: 'NOMINAL' | 'ATTENTION';
  readonly openSupportCases: number;
  readonly activity: readonly ActivityEvent[];
}

export interface OrganizationMember {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: 'Organization Admin' | 'Engineer' | 'Operator' | 'Viewer';
  readonly status: 'ACTIVE' | 'INVITED';
}

export interface Page<T> {
  readonly items: readonly T[];
  readonly nextCursor: string | null;
}

export interface CreateSupportCaseInput {
  readonly subject: string;
  readonly category: string;
  readonly severity: Severity;
  readonly systemId: string | null;
  readonly description: string;
}
