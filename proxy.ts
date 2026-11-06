import { NextResponse, type NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n, hasLocale, LOCALE_COOKIE, type Locale } from '@/i18n-config';

function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  // Negotiator expects a plain object of headers
  const headers = Object.fromEntries(request.headers);
  const locales = [...i18n.locales];
  const languages = new Negotiator({ headers }).languages(locales);
  return matchLocale(languages, locales, i18n.defaultLocale) as Locale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return;

  // e.g. / → /zh-CN, /products → /zh-CN/products
  request.nextUrl.pathname = `/${getLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // skip Next internals, API routes and files (anything with an extension, e.g. /img/poster.jpg)
  matcher: ['/((?!_next|api/|.*\\..*).*)'],
};
