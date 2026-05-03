import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const safeRevalidateTag = (tag: string) => {
  try {
    revalidateTag(tag, 'max');
  } catch {
    // Fuera del contexto App Router (seeds, scripts, Local API)
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
