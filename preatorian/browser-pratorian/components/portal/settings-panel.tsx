'use client';

import { Bell, CheckCircle2, Clock3, LockKeyhole, UserRound } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Switch } from '@/components/ui/switch';

export function SettingsPanel({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-5">
        <SettingsSection
          icon={<UserRound />}
          title="Profile"
          description="Display information comes from the configured identity provider."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name" htmlFor="settings-name">
              <Input
                id="settings-name"
                value={displayName}
                readOnly
                className="h-11 rounded-none border-white/10 bg-black/20 text-white/55"
              />
            </Field>
            <Field label="Email" htmlFor="settings-email">
              <Input
                id="settings-email"
                value={email}
                readOnly
                className="h-11 rounded-none border-white/10 bg-black/20 text-white/55"
              />
            </Field>
          </div>
        </SettingsSection>
        <SettingsSection
          icon={<Bell />}
          title="Notifications"
          description="Choose how non-critical organization events are summarized."
        >
          <div className="divide-y divide-white/8">
            <Preference
              label="Health advisories"
              detail="Notify when an authorized system enters a degraded state."
              defaultChecked
            />
            <Preference
              label="Software releases"
              detail="Notify when a compatible stable release is available."
              defaultChecked
            />
            <Preference
              label="Support updates"
              detail="Notify when a support case status changes."
              defaultChecked
            />
            <Preference
              label="Weekly summary"
              detail="Receive a concise organization activity summary."
            />
          </div>
        </SettingsSection>
      </div>
      <div className="grid content-start gap-5">
        <SettingsSection
          icon={<Clock3 />}
          title="Locale & time"
          description="Timestamps in this preview are presented in UTC."
        >
          <div className="grid gap-4">
            <Field label="Timezone" htmlFor="settings-timezone">
              <NativeSelect
                id="settings-timezone"
                name="timezone"
                className="w-full"
                defaultValue="UTC"
              >
                <NativeSelectOption value="UTC">UTC</NativeSelectOption>
                <NativeSelectOption value="America/Sao_Paulo">
                  America / São Paulo
                </NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field label="Language" htmlFor="settings-language">
              <NativeSelect
                id="settings-language"
                name="language"
                className="w-full"
                defaultValue="en"
              >
                <NativeSelectOption value="en">English</NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>
        </SettingsSection>
        <SettingsSection
          icon={<LockKeyhole />}
          title="Session security"
          description="Authentication and session policy are managed by the identity provider."
        >
          <dl className="space-y-3 text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-white/55">Authentication</dt>
              <dd className="text-white/60">Secure identity provider</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/55">Browser token storage</dt>
              <dd className="text-emerald-300">Disabled</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/55">Session transport</dt>
              <dd className="text-white/60">Secure cookie</dd>
            </div>
          </dl>
        </SettingsSection>
        <div className="flex items-center justify-between gap-4 border border-white/10 bg-[#0e1115] p-5">
          <div>
            {saved ? (
              <p role="status" className="flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="size-4" /> Preferences validated
              </p>
            ) : (
              <p className="text-xs text-white/55">
                Preferences can be validated locally before the settings API is connected.
              </p>
            )}
          </div>
          <Button
            onClick={() => setSaved(true)}
            className="h-10 rounded-none bg-red-700 px-4 text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-red-600"
          >
            Validate preferences
          </Button>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-white/10 bg-[#0e1115]">
      <div className="flex gap-4 border-b border-white/10 p-5">
        <span className="text-red-500 [&_svg]:size-5">{icon}</span>
        <div>
          <h2 className="text-sm font-semibold text-white/75">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-white/55">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[8px] uppercase tracking-[0.13em] text-white/55"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Preference({
  label,
  detail,
  defaultChecked = false,
}: {
  label: string;
  detail: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <span>
        <span className="block text-sm text-white/65">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-white/55">{detail}</span>
      </span>
      <Switch defaultChecked={defaultChecked} aria-label={label} />
    </label>
  );
}
