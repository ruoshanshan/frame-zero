// The site's locales. A request with no language preference gets the first one; `defaultLocale` is for
// browsers that ask only for languages the site doesn't have.
export const i18n = {
  defaultLocale: 'zh-CN',
  locales: ['zh-CN', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const hasLocale = (value: string): value is Locale => (i18n.locales as readonly string[]).includes(value);

/** Each language's name in its own script, for the language switch. */
export const localeLabels: Record<Locale, string> = { 'zh-CN': '中文', en: 'EN' };

/** Set by the language switch; an explicit choice wins over the browser's languages. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
