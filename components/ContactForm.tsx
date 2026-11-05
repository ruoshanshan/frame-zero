'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendContact, type ContactState, type Field } from '@/app/[lang]/contactAction';
import s from './contactForm.module.css';

type Copy = {
  fields: Record<Field, { label: string; placeholder: string }>;
  submit: string;
  sending: string;
  sent: string;
  invalid: string;
  error: string;
};

const MULTILINE: Field[] = ['message'];

export function ContactForm({ copy }: { copy: Copy }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' });
  const shownAt = useRef<HTMLInputElement>(null);
  // when the form first appeared; kept across failed attempts so a quick retry isn't taken for a bot
  const firstShown = useRef(0);

  useEffect(() => {
    if (!firstShown.current) firstShown.current = Date.now();
    if (shownAt.current) shownAt.current.value = String(firstShown.current);
  }, [state]);

  if (state.status === 'sent') {
    return (
      <div className={s.done} role="status">
        <span className={s.doneMark} aria-hidden />
        <p>{copy.sent}</p>
      </div>
    );
  }

  return (
    // remount after each attempt so the fields show what was submitted (React resets forms after an action)
    <form key={JSON.stringify(state)} action={action} className={s.form}>
      {(Object.keys(copy.fields) as Field[]).map((key) => {
        const field = copy.fields[key];
        const bad = state.invalid?.includes(key);
        const props = {
          id: `contact-${key}`,
          name: key,
          placeholder: field.placeholder,
          required: true,
          defaultValue: state.values?.[key],
          'aria-invalid': bad || undefined,
        };
        return (
          <label key={key} className={`${s.field} ${MULTILINE.includes(key) ? s.wide : ''}`} htmlFor={props.id}>
            <span>{field.label}</span>
            {MULTILINE.includes(key) ? <textarea {...props} rows={6} minLength={10} maxLength={5000} /> : <input {...props} type="text" maxLength={120} />}
          </label>
        );
      })}

      {/* bots fill every field; people never see this one */}
      <input className={s.trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
      <input ref={shownAt} type="hidden" name="t" defaultValue="" />

      <div className={s.actions}>
        <button type="submit" className={s.submit} disabled={pending}>
          {pending ? copy.sending : copy.submit}
        </button>
        <p className={s.message} role="alert">
          {state.status === 'invalid' && copy.invalid}
          {state.status === 'error' && copy.error}
        </p>
      </div>
    </form>
  );
}
