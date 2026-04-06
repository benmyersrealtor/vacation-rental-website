'use client';

import { useFormStatus } from 'react-dom';

export function InquirySubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? 'Sending inquiry…' : 'Send booking inquiry'}
    </button>
  );
}
