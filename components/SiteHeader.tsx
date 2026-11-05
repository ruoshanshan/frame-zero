'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LOCALE_COOKIE, i18n, localeLabels, type Locale } from '@/i18n-config';
import { Wordmark } from './Wordmark';
import s from './siteHeader.module.css';

type Props = {
  lang: Locale;
  nav: { id: string; label: string }[];
  langLabel: string;
};

export function SiteHeader({ lang, nav, langLabel }: Props) {
  // the bar is transparent over the hero and turns solid once the page scrolls
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${s.bar} ${solid ? s.solid : ''}`}>
      <div className={s.inner}>
        <Link href={`/${lang}`} className={s.brand} aria-label="FRAME ZERO">
          <Wordmark lang={lang} />
        </Link>
        <nav className={s.nav} aria-label="FRAME ZERO">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={s.langs} role="group" aria-label={langLabel}>
          {i18n.locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              hrefLang={locale}
              aria-current={locale === lang ? 'true' : undefined}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
              }}
            >
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
