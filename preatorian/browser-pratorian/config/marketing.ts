import {
  Activity,
  BrainCircuit,
  Cpu,
  Eye,
  Gauge,
  Navigation,
  Network,
  RadioTower,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Signal,
  WifiOff,
} from 'lucide-react';

export const platformCapabilities = [
  {
    title: 'Autonomy',
    description:
      'Robotic systems capable of operating with configurable levels of autonomous behavior.',
    icon: BrainCircuit,
  },
  {
    title: 'Perception',
    description: 'Integration with visual, spatial and multimodal sensor inputs.',
    icon: Eye,
  },
  {
    title: 'Navigation',
    description: 'Localization, mapping and movement through complex environments.',
    icon: Navigation,
  },
  {
    title: 'Sensor fusion',
    description:
      'Multiple sensor sources correlated into a coherent environment representation.',
    icon: Network,
  },
  {
    title: 'Edge AI',
    description: 'Local inference positioned close to the robotic platform.',
    icon: Cpu,
  },
  {
    title: 'Fleet systems',
    description:
      'Lifecycle visibility and coordination across authorized autonomous platforms.',
    icon: RadioTower,
  },
  {
    title: 'Resilient compute',
    description:
      'Software designed for constrained, intermittent and unreliable environments.',
    icon: Gauge,
  },
  {
    title: 'Secure communications',
    description: 'Authenticated and encrypted communications across system boundaries.',
    icon: Signal,
  },
] as const;

export const reliabilityCapabilities = [
  { title: 'System health', icon: Activity },
  { title: 'Fault detection', icon: ShieldCheck },
  { title: 'Observability', icon: Eye },
  { title: 'Telemetry', icon: Signal },
  { title: 'Redundancy', icon: RefreshCw },
  { title: 'Offline capability', icon: WifiOff },
  { title: 'Secure updates', icon: Cpu },
  { title: 'Audit logs', icon: ScrollText },
] as const;

export const systemTypes = [
  {
    number: '01',
    title: 'Ground systems',
    status: 'Integration capability',
    description: 'Autonomous and remotely supervised ground robotic platform integration.',
  },
  {
    number: '02',
    title: 'Aerial system integration',
    status: 'Integration capability',
    description:
      'Integration with unmanned aerial platforms and distributed sensor systems.',
  },
  {
    number: '03',
    title: 'Autonomous support systems',
    status: 'Conceptual capability',
    description:
      'Robotic platforms conceived to assist complex field operations under human authority.',
  },
  {
    number: '04',
    title: 'Edge compute systems',
    status: 'Platform capability',
    description: 'Compact high-performance computing foundations for autonomous platforms.',
  },
] as const;
