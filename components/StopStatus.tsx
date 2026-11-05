'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** "Held" or "Upcoming", decided in the visitor's browser so a static build never goes stale. */
export function StopStatus({ date, done, upcoming, className }: { date: string; done: string; upcoming: string; className?: string }) {
  // dates are written 2026.11.07; an edition counts as held from the day after it
  const held = useSyncExternalStore(
    noop,
    () => Date.now() >= new Date(`${date.replaceAll('.', '-')}T23:59:59+08:00`).getTime(),
    () => null,
  );
  if (held === null) return null;
  return (
    <span className={className} data-held={held}>
      {held ? done : upcoming}
    </span>
  );
}
