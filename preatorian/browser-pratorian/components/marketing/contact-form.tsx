'use client';

import { ArrowRight, CheckCircle2, Paperclip } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

const fieldClass =
  'h-12 rounded-none border-white/15 bg-black/25 px-4 text-white placeholder:text-white/55 focus-visible:border-red-500';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="border border-emerald-500/25 bg-emerald-950/10 p-7"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-7 text-emerald-400" />
        <h2 className="mt-7 text-xl font-semibold uppercase tracking-[-0.02em] text-white">
          Inquiry prepared
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-steel">
          Your inquiry has been validated in this interface. Secure delivery is enabled when
          the approved ORTZION inquiry endpoint is connected.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 rounded-none border-white/15 bg-transparent text-white"
          onClick={() => setSubmitted(false)}
        >
          Return to form
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            required
          />
        </Field>
        <Field label="Work email" htmlFor="contact-email" required>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            required
          />
        </Field>
        <Field label="Organization" htmlFor="contact-organization" required>
          <Input
            id="contact-organization"
            name="organization"
            autoComplete="organization"
            className={fieldClass}
            required
          />
        </Field>
        <Field label="Role / title" htmlFor="contact-role">
          <Input
            id="contact-role"
            name="role"
            autoComplete="organization-title"
            className={fieldClass}
          />
        </Field>
      </div>
      <Field label="Area of interest" htmlFor="contact-interest" required>
        <NativeSelect
          id="contact-interest"
          name="interest"
          className="h-12 w-full rounded-none border-white/15 bg-black/25 px-4 text-white"
          required
          defaultValue=""
        >
          <NativeSelectOption value="" disabled>
            Select an area
          </NativeSelectOption>
          <NativeSelectOption value="platform">Platform</NativeSelectOption>
          <NativeSelectOption value="integration">System integration</NativeSelectOption>
          <NativeSelectOption value="technology">Technology</NativeSelectOption>
          <NativeSelectOption value="other">Other inquiry</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field label="Message" htmlFor="contact-message" required>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          className="min-h-36 rounded-none border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-white/55 focus-visible:border-red-500"
          required
        />
      </Field>
      <p className="flex items-start gap-3 border-y border-white/10 py-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-white/55">
        <Paperclip className="mt-0.5 size-4 shrink-0" />
        Secure handling notice: do not include classified, controlled or operationally
        sensitive information. No data is transmitted in the current interface release.
      </p>
      <Button
        type="submit"
        className="h-12 w-fit rounded-none bg-red-700 px-6 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-red-600"
      >
        Prepare inquiry <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  required = false,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55"
      >
        {label}
        {required ? (
          <>
            <span className="text-red-400" aria-hidden="true">
              {' '}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="text-white/55"> (optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}
