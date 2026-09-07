'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const config = {
  cpu: { label: 'CPU', color: '#e0202b' },
  memory: { label: 'Memory', color: '#8e96a3' },
  gpu: { label: 'GPU', color: '#f5f7fa' },
} satisfies ChartConfig;

export function DeviceHealthChart({
  current,
}: {
  current: {
    readonly cpuPercent: number;
    readonly gpuPercent: number | null;
    readonly memoryPercent: number;
  };
}) {
  const data = [
    {
      time: '21:50',
      cpu: Math.max(8, current.cpuPercent - 14),
      memory: Math.max(12, current.memoryPercent - 7),
      gpu: current.gpuPercent === null ? null : Math.max(10, current.gpuPercent - 18),
    },
    {
      time: '22:00',
      cpu: Math.max(8, current.cpuPercent - 4),
      memory: Math.max(12, current.memoryPercent - 5),
      gpu: current.gpuPercent === null ? null : Math.max(10, current.gpuPercent - 9),
    },
    {
      time: '22:10',
      cpu: Math.min(96, current.cpuPercent + 8),
      memory: Math.max(12, current.memoryPercent - 2),
      gpu: current.gpuPercent === null ? null : Math.min(96, current.gpuPercent + 6),
    },
    {
      time: '22:20',
      cpu: Math.min(96, current.cpuPercent + 3),
      memory: current.memoryPercent,
      gpu: current.gpuPercent === null ? null : Math.min(96, current.gpuPercent + 11),
    },
    {
      time: '22:30',
      cpu: Math.max(8, current.cpuPercent - 7),
      memory: Math.min(96, current.memoryPercent + 2),
      gpu: current.gpuPercent === null ? null : Math.max(10, current.gpuPercent - 4),
    },
    {
      time: '22:40',
      cpu: current.cpuPercent,
      memory: current.memoryPercent,
      gpu: current.gpuPercent,
    },
  ];

  return (
    <div>
      <ChartContainer
        config={config}
        className="min-h-[250px] w-full"
        aria-label="Device resource utilization during the last 50 minutes"
      >
        <LineChart
          data={data}
          margin={{ left: -18, right: 8, top: 8, bottom: 0 }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,.08)" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}%`}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="var(--color-cpu)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="var(--color-memory)"
            strokeWidth={2}
            dot={false}
          />
          {current.gpuPercent !== null ? (
            <Line
              type="monotone"
              dataKey="gpu"
              stroke="var(--color-gpu)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          ) : null}
        </LineChart>
      </ChartContainer>
      <p className="mt-3 text-xs leading-5 text-white/55">
        Resource utilization remained within a{' '}
        {Math.max(current.cpuPercent, current.memoryPercent, current.gpuPercent ?? 0)}%
        observed peak in this deterministic development series.
      </p>
    </div>
  );
}
