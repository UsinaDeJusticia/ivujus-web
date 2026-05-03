import type { CollectionBeforeChangeHook } from 'payload';

import { slugify } from '../lib/slugify';

const DEFAULT_LOCALE = 'es';

const pickSourceText = (raw: unknown, preferredLocale: string): string | undefined => {
  if (typeof raw === 'string') return raw || undefined;
  if (!raw || typeof raw !== 'object') return undefined;
  const localized = raw as Record<string, unknown>;
  for (const locale of [preferredLocale, DEFAULT_LOCALE, 'en', 'fr']) {
    const value = localized[locale];
    if (typeof value === 'string' && value.length > 0) return value;
  }
  return undefined;
};

export const generateSlug =
  (sourceField: string): CollectionBeforeChangeHook =>
  ({ data, originalDoc, operation, req }) => {
    if (!data) return data;
    if (data.slug && typeof data.slug === 'string' && data.slug.length > 0) {
      return data;
    }
    if (operation === 'update' && originalDoc?.slug) {
      return data;
    }
    const preferredLocale = (req?.locale as string | undefined) ?? DEFAULT_LOCALE;
    const raw = data[sourceField] ?? originalDoc?.[sourceField];
    const source = pickSourceText(raw, preferredLocale);
    if (!source) return data;
    return { ...data, slug: slugify(source) };
  };
