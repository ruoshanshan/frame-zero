'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { WORK_MEDIA } from './site';
import s from './workGrid.module.css';

type Work = { id: string; award: string; level: number; title: string; team?: string; length?: string; note?: string };
type Group = { id: string; name: string; date: string; items: Work[] };
type Labels = { play: string; noClip: string; duration: string; team: string; close: string; clipNote: string };

export function WorkGrid({ groups, labels }: { groups: Group[]; labels: Labels }) {
  const [open, setOpen] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const media = open ? WORK_MEDIA[open.id] : undefined;

  return (
    <>
      {groups.map((group) => (
        <section key={group.id} className={s.group} aria-labelledby={`works-${group.id}`}>
          <h3 id={`works-${group.id}`} className={s.groupTitle}>
            {group.name}
            <span>{group.date}</span>
          </h3>
          <ul className={s.grid}>
            {group.items.map((work) => {
              const m = WORK_MEDIA[work.id];
              const body = (
                <>
                  <div className={s.thumb}>
                    {m ? (
                      <>
                        <Image src={m.still.src} alt="" width={m.still.width} height={m.still.height} sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 400px" />
                        <span className={s.play} aria-hidden />
                      </>
                    ) : (
                      <div className={s.blank} aria-hidden>
                        <span className={s.blankTitle}>{work.title}</span>
                      </div>
                    )}
                    <span className={`${s.award} ${s[`l${work.level}`]}`}>{work.award}</span>
                  </div>
                  <div className={s.text}>
                    <h4>{work.title}</h4>
                    {(work.team || work.length) && (
                      <p className={s.meta}>
                        {work.team && (
                          <span>
                            {labels.team} · {work.team}
                          </span>
                        )}
                        {work.length && (
                          <span>
                            {labels.duration} {work.length}
                          </span>
                        )}
                      </p>
                    )}
                    {work.note && <p className={s.note}>{work.note}</p>}
                    <span className={s.action}>{m ? labels.play : labels.noClip}</span>
                  </div>
                </>
              );
              return (
                <li key={work.id}>
                  {m ? (
                    <button type="button" className={s.card} onClick={() => setOpen(work)} aria-haspopup="dialog">
                      {body}
                    </button>
                  ) : (
                    <div className={s.card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label={open?.title}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(null);
        }}
      >
        {open && media && (
          <div className={s.player}>
            <video key={media.clip} src={media.clip} poster={media.still.src} controls autoPlay playsInline />
            <div className={s.caption}>
              <div>
                <span className={`${s.award} ${s[`l${open.level}`]}`}>{open.award}</span>
                <strong>{open.title}</strong>
              </div>
              <span>{labels.clipNote}</span>
            </div>
            <button type="button" className={s.close} onClick={() => setOpen(null)} aria-label={labels.close}>
              ×
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
