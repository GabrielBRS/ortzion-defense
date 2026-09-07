import { z } from 'zod';

const isoDateTimeSchema = z.string().datetime();
export const systemStatusSchema = z.enum(['ONLINE', 'DEGRADED', 'OFFLINE', 'MAINTENANCE']);

export const currentPrincipalSchema = z.object({
  user: z.object({ id: z.string(), email: z.string().email(), displayName: z.string() }),
  organization: z.object({ id: z.string(), name: z.string() }),
  permissions: z.array(
    z.enum([
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
    ]),
  ),
});

export const systemSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  softwareVersion: z.string(),
  status: systemStatusSchema,
  lastContactAt: isoDateTimeSchema.nullable(),
});

export const systemDetailSchema = systemSummarySchema.extend({
  hardware: z.array(
    z.object({
      component: z.string(),
      value: z.string(),
      state: z.enum(['NOMINAL', 'ATTENTION']),
    }),
  ),
  connectivity: z.object({
    link: z.string(),
    latencyMs: z.number().nullable(),
    lastHandshakeAt: isoDateTimeSchema.nullable(),
  }),
  nextMaintenanceAt: isoDateTimeSchema,
  auditEvents: z.array(
    z.object({
      id: z.string(),
      action: z.string(),
      actor: z.string(),
      occurredAt: isoDateTimeSchema,
    }),
  ),
});

export const deviceSchema = z.object({
  id: z.string(),
  systemId: z.string(),
  name: z.string(),
  kind: z.enum(['ROBOTIC_PLATFORM', 'EDGE_COMPUTE', 'SENSOR', 'GATEWAY']),
  softwareVersion: z.string(),
  networkStatus: z.enum(['CONNECTED', 'LIMITED', 'DISCONNECTED']),
  health: systemStatusSchema,
  metrics: z.object({
    cpuPercent: z.number().min(0).max(100),
    gpuPercent: z.number().min(0).max(100).nullable(),
    memoryPercent: z.number().min(0).max(100),
    storagePercent: z.number().min(0).max(100),
    temperatureCelsius: z.number().nullable(),
  }),
  lastContactAt: isoDateTimeSchema.nullable(),
});

export const deploymentSchema = z.object({
  id: z.string(),
  target: z.string(),
  version: z.string(),
  environment: z.enum(['PRODUCTION', 'VALIDATION']),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELED']),
  initiatedBy: z.string(),
  startedAt: isoDateTimeSchema,
  completedAt: isoDateTimeSchema.nullable(),
  progress: z.number().min(0).max(100),
});

export const releaseSchema = z.object({
  id: z.string(),
  version: z.string(),
  channel: z.enum(['STABLE', 'MAINTENANCE']),
  publishedAt: isoDateTimeSchema,
  releaseNotes: z.array(z.string()),
  compatibleModels: z.array(z.string()),
  installed: z.boolean(),
});

export const supportCaseSchema = z.object({
  id: z.string(),
  reference: z.string(),
  subject: z.string(),
  category: z.string(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED']),
  systemId: z.string().nullable(),
  updatedAt: isoDateTimeSchema,
});

export const createSupportCaseSchema = z.object({
  subject: z.string().trim().min(6).max(160),
  category: z.string().trim().min(1).max(80),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  systemId: z.string().nullable(),
  description: z.string().trim().min(20).max(10_000),
});

export const overviewSchema = z.object({
  authorizedSystems: z.number().int().min(0),
  onlineDevices: z.number().int().min(0),
  totalDevices: z.number().int().min(0),
  softwareVersion: z.string(),
  systemHealth: z.enum(['NOMINAL', 'ATTENTION']),
  openSupportCases: z.number().int().min(0),
  activity: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      detail: z.string(),
      occurredAt: isoDateTimeSchema,
      tone: z.enum(['INFO', 'SUCCESS', 'ATTENTION']),
    }),
  ),
});

export const organizationMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['Organization Admin', 'Engineer', 'Operator', 'Viewer']),
  status: z.enum(['ACTIVE', 'INVITED']),
});

export function pageSchema<TSchema extends z.ZodType>(itemSchema: TSchema) {
  return z.object({ items: z.array(itemSchema), nextCursor: z.string().nullable() });
}
