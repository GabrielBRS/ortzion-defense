'use client';

import { ArrowRight, CheckCircle2, Paperclip, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { createSupportCaseSchema } from '@/lib/api/schemas';
import { getBrowserPraetorianApi } from '@/services/browser';
import type { SupportCase } from '@/types/praetorian';

const inputClass =
  'h-11 rounded-none border-white/12 bg-black/20 px-3 text-white focus-visible:border-red-500';

export function SupportCaseForm() {
  const [createdCase, setCreatedCase] = useState<SupportCase | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (createdCase) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-emerald-500/20 bg-emerald-950/10 p-7"
      >
        <CheckCircle2 className="size-7 text-emerald-400" />
        <h2 className="mt-6 text-xl font-semibold uppercase tracking-[-0.02em] text-white">
          Case created
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Reference {createdCase.reference} is now open. In development mode this record is
          returned by the typed mock adapter; HTTP mode uses POST /api/v1/support/cases.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 rounded-none border-white/15 bg-transparent text-white"
          onClick={() => setCreatedCase(null)}
        >
          Create another case
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setError('');
        const formData = new FormData(event.currentTarget);
        const parsed = createSupportCaseSchema.safeParse({
          subject: formData.get('subject'),
          category: formData.get('category'),
          severity: formData.get('severity'),
          systemId: formData.get('system') || null,
          description: formData.get('description'),
        });

        if (!parsed.success) {
          setError(
            'Review the required fields and provide a complete technical description.',
          );
          return;
        }

        setSubmitting(true);
        try {
          setCreatedCase(await getBrowserPraetorianApi().support.create(parsed.data));
        } catch {
          setError(
            'The support service could not create this case. Try again or contact an administrator.',
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Subject" htmlFor="case-subject" required>
          <Input
            id="case-subject"
            name="subject"
            className={inputClass}
            required
            minLength={6}
          />
        </Field>
        <Field label="Category" htmlFor="case-category" required>
          <NativeSelect
            id="case-category"
            name="category"
            className="w-full"
            required
            defaultValue=""
          >
            <NativeSelectOption value="" disabled>
              Select category
            </NativeSelectOption>
            <NativeSelectOption value="software">Software</NativeSelectOption>
            <NativeSelectOption value="hardware">Hardware health</NativeSelectOption>
            <NativeSelectOption value="network">Connectivity</NativeSelectOption>
            <NativeSelectOption value="access">Access</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Severity" htmlFor="case-severity" required>
          <NativeSelect
            id="case-severity"
            name="severity"
            className="w-full"
            required
            defaultValue="MEDIUM"
          >
            <NativeSelectOption value="LOW">Low</NativeSelectOption>
            <NativeSelectOption value="MEDIUM">Medium</NativeSelectOption>
            <NativeSelectOption value="HIGH">High</NativeSelectOption>
            <NativeSelectOption value="CRITICAL">Critical</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="System" htmlFor="case-system">
          <NativeSelect id="case-system" name="system" className="w-full" defaultValue="">
            <NativeSelectOption value="">No system selected</NativeSelectOption>
            <NativeSelectOption value="sys-001">Integration System 01</NativeSelectOption>
            <NativeSelectOption value="sys-002">Edge Validation Rig</NativeSelectOption>
            <NativeSelectOption value="sys-003">Perception Bench</NativeSelectOption>
          </NativeSelect>
        </Field>
      </div>
      <Field label="Description" htmlFor="case-description" required>
        <Textarea
          id="case-description"
          name="description"
          rows={7}
          className="min-h-40 rounded-none border-white/12 bg-black/20 px-3 py-3 text-white focus-visible:border-red-500"
          required
          minLength={20}
        />
      </Field>
      <Field label="Attachment" htmlFor="case-attachment">
        <Input
          id="case-attachment"
          name="attachment"
          type="file"
          className={`${inputClass} file:text-white/55`}
          accept=".txt,.log,.pdf,.png,.jpg,.jpeg"
        />
        <p className="mt-1 flex items-center gap-2 text-[10px] text-white/55">
          <Paperclip className="size-3" /> Accepted for UI validation: TXT, LOG, PDF, PNG or
          JPG. Production limits are backend-enforced.
        </p>
      </Field>
      <div className="flex items-start gap-3 border-y border-white/8 py-4 text-xs leading-5 text-amber-100/55">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-400" /> Do not include
        credentials, private keys, classified information or internal infrastructure
        secrets.
      </div>
      {error ? (
        <p
          role="alert"
          className="border-l-2 border-red-500 pl-4 text-xs leading-5 text-red-200"
        >
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={submitting}
        className="h-12 w-fit rounded-none bg-red-700 px-6 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-red-600"
      >
        {submitting ? 'Creating case…' : 'Create support case'}{' '}
        <ArrowRight className="size-4" />
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
        className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/60"
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
