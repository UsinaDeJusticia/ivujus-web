/** Convierte un título en un id de ancla estable: sin acentos, minúsculas, guiones. */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Texto del índice lateral («En esta página») por idioma. */
export const ON_THIS_PAGE: Record<string, string> = {
  es: 'En esta página',
  en: 'On this page',
  fr: 'Sur cette page',
}
