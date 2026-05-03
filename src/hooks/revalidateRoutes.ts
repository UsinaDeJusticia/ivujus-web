import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const safeRevalidateTag = (tag: string) => {
  try {
    revalidateTag(tag, 'max');
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Esperado al usar Local API fuera de un request Next (seeds, scripts).
    if (message.includes('static generation store')) return;
    console.warn(`[revalidateRoutes] revalidateTag(${tag}) falló:`, err);
  }
};

export const revalidateOnChange: CollectionAfterChangeHook = ({ doc, collection, req }) => {
  if (req?.context?.disableRevalidate) return doc;
  safeRevalidateTag(`collection:${collection.slug}`);
  if (doc?.slug && typeof doc.slug === 'string') {
    safeRevalidateTag(`collection:${collection.slug}:${doc.slug}`);
  }
  return doc;
};

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc, collection, req }) => {
  if (req?.context?.disableRevalidate) return doc;
  safeRevalidateTag(`collection:${collection.slug}`);
  if (doc?.slug && typeof doc.slug === 'string') {
    safeRevalidateTag(`collection:${collection.slug}:${doc.slug}`);
  }
  return doc;
};
