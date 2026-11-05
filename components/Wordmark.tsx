import type { Locale } from '@/i18n-config';
import s from './wordmark.module.css';

/** Three pixel squares, FRAME ZERO in the pixel face, and the Chinese name on the Chinese site. */
export function Wordmark({ lang, inverse = false }: { lang: Locale; inverse?: boolean }) {
  return (
    <span className={`${s.mark} ${inverse ? s.inverse : ''}`}>
      <span className={s.pixels} aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className={s.word}>FRAME ZERO</span>
      {lang === 'zh-CN' && <span className={s.zh}>第零帧</span>}
    </span>
  );
}
