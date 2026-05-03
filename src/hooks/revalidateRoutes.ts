import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const revalidateOnChange: CollectionAfterChangeHook = ({ doc, collection }) => {
  revalidateTag(`collection:${collection.slug}`, 'max');
  if (doc?.slug && typeof doc.slug === 'string') {
    revalidateTag(`collection:${collection.slug}:${doc.slug}`, 'max');
  }
  return doc;
};

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc, collection }) => {
  revalidateTag(`collection:${collection.slug}`, 'max');
  if (doc?.slug && typeof doc.slug === 'string') {
    revalidateTag(`collection:${collection.slug}:${doc.slug}`, 'max');
  }
  return doc;
};
