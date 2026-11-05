import 'server-only';
import type { Locale } from '@/i18n-config';
import type zhCN from './dictionaries/zh-CN.json';

// Site copy, one file per language. The English restates what the Chinese means for an English-language
// reader rather than translating it word for word.
export type Dictionary = typeof zhCN;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
