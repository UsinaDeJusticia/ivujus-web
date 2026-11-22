// Preguntas frecuentes como acordeón de `<details>` nativos.
//
// Sigue la guía «accordion» de Modern Web Guidance: `<details>`/`<summary>`
// nativos (teclado, lectores de pantalla y «Buscar en la página» sin
// JavaScript), varias respuestas abiertas a la vez (un acordeón exclusivo
// impide comparar y desplaza el contenido), sin títulos dentro del
// `summary`, sin flechas de teclado propias y el marcador junto al texto.
// La estética toma la del estudio «FAQ panel» (microinteractions.dev, MIT):
// la pregunta abierta se apoya en un panel y su chevron gira. Estilos en
// globals.css (`.faq`). La apertura se desliza donde el navegador lo permite.
import type { ReactNode } from 'react'

import type { FaqItem, FaqSegmento } from '@/lib/formacion/types'

function Segmento({ segmento, locale }: { segmento: FaqSegmento; locale: string }): ReactNode {
  if (typeof segmento === 'string') return segmento
  const { texto, url } = segmento
  if (url.startsWith('/')) return <a href={`/${locale}${url}`}>{texto}</a>
  if (url.startsWith('mailto:')) return <a href={url}>{texto}</a>
  return (
    <a href={url} target="_blank" rel="noopener">
      {texto}
    </a>
  )
}

/** Texto plano de una respuesta (para el JSON-LD FAQPage). */
export function faqRespuestaTexto(item: FaqItem): string {
  return item.respuesta
    .map((parrafo) => parrafo.map((s) => (typeof s === 'string' ? s : s.texto)).join(''))
    .join(' ')
}

export function FaqAccordion({ items, locale, labelledBy }: { items: FaqItem[]; locale: string; labelledBy: string }) {
  return (
    <div className="faq space-y-2" role="group" aria-labelledby={labelledBy}>
      {items.map((item) => (
        <details key={item.pregunta} className="faq__item">
          <summary className="faq__question">{item.pregunta}</summary>
          <div className="faq__answer">
            {item.respuesta.map((parrafo, index) => (
              <p key={index}>
                {parrafo.map((segmento, i) => (
                  <Segmento key={i} segmento={segmento} locale={locale} />
                ))}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
