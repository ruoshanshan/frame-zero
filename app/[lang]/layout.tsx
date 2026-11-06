import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter_Tight } from 'next/font/google';
import 'misans/lib/Normal/MiSans-Regular.min.css';
import 'misans/lib/Normal/MiSans-Medium.min.css';
import 'misans/lib/Normal/MiSans-Semibold.min.css';
import 'misans/lib/Normal/MiSans-Bold.min.css';
import '@fontsource/silkscreen/latin-400.css';
import '@fontsource/silkscreen/latin-700.css';
import '../globals.css';
import { i18n, hasLocale } from '@/i18n-config';
import { getDictionary } from './dictionaries';

// All faces ship with the site (Google Fonts is unreachable from mainland China): Inter Tight for Latin text,
// MiSans for Chinese, Silkscreen for the pixel wordmark and big figures.
const latin = Inter_Tight({ subsets: ['latin'], variable: '--font-latin', display: 'swap' });

export const dynamicParams = false;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    metadataBase: new URL('https://framezero.cn'),
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: '/icon.svg' },
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(i18n.locales.map((locale) => [locale, `/${locale}`])), 'x-default': '/' },
    },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ['/img/poster.jpg'] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={latin.variable}>
      <body>{children}</body>
    </html>
  );
}
