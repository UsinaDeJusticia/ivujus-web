import type { CollectionBeforeChangeHook } from 'payload';

import { slugify } from '../lib/slugify';

export const generateSlug =
  (sourceField: string): CollectionBeforeChangeHook =>
  ({ data, originalDoc, operation }) => {
    if (!data) return data;
    if (data.slug && typeof data.slug === 'string' && data.slug.length > 0) {
      return data;
    }
    const source = data[sourceField] ?? originalDoc?.[sourceField];
    if (typeof source !== 'string' || source.length === 0) {
      return data;
    }
    if (operation === 'update' && originalDoc?.slug) {
      return data;
    }
    return { ...data, slug: slugify(source) };
  };
