// Footer.tsx — footer institucional sobre azul-900 (superficie de marca:
// no cambia con temas, siempre azul institucional pleno).
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/Footer.jsx.
//
// Sin interactividad propia (los hovers de los links son CSS puro) →
// server component, sin 'use client'.

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  /** Ruta del logo/home. Default '/': el layout de [locale] resuelve el prefijo real. */
  homeHref?: string
  tagline?: string
  about?: string
  columns?: FooterColumn[]
  contactEmail?: string
  /** Ej.: "www.ivujus.org.ar" — se muestra en negrita junto al mail de contacto. */
  siteLabel?: string
  /** Línea legal (copyright). Se recibe como nodo para no fijar el año ni el idioma acá. */
  legal?: ReactNode
  /**
   * Redes sociales reales del IVUJUS (LinkedIn, Instagram, Facebook,
   * YouTube). Deliberadamente SIN valor por defecto: las URLs oficiales
   * todavía no están confirmadas (ver docs/reference/design-system-oficial/
   * README.md, sección "Contacto", y el UI kit de referencia, que usa
   * iniciales como placeholder por el mismo motivo). Cablear esta prop
   * recién cuando Jair confirme los links reales; no inventarlos.
   */
  socialLinks?: FooterLink[]
}

export function Footer({
  homeHref = '/',
  tagline,
  about,
  columns = [],
  contactEmail,
  siteLabel,
  legal,
  socialLinks,
}: FooterProps) {
  return (
    <footer className="bg-azul-900 pt-[72px] text-white">
      <div className="mx-auto max-w-[var(--container-default)] px-8">
        <div
          className={[
            'grid gap-12 border-b border-white/10 pb-14',
            columns.length > 0
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(auto-fit,minmax(140px,1fr))]'
              : 'grid-cols-1',
          ].join(' ')}
        >
          <div className="flex flex-col gap-[18px]">
            <Link href={homeHref} className="self-start">
              <Image
                src="/logos/logo-ivujus-negativo.png"
                alt="IVUJUS"
                width={270}
                height={180}
                className="h-24 w-auto"
              />
            </Link>
            {tagline ? (
              <p className="m-0 max-w-[30ch] text-[13px] italic leading-[1.6] text-dorado-300">{tagline}</p>
            ) : null}
            {about ? (
              <p className="m-0 max-w-[34ch] text-xs leading-[1.6] text-azul-200">{about}</p>
            ) : null}
          </div>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3.5">
              <h4 className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-dorado-400">
                {column.title}
              </h4>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-azul-200 no-underline transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 py-8 text-[11px] tracking-[0.04em] text-azul-300">
          <div>
            {siteLabel ? <strong className="text-white">{siteLabel}</strong> : null}
            {siteLabel && contactEmail ? <span className="mx-3 text-white/20">·</span> : null}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="text-dorado-300 no-underline">
                {contactEmail}
              </a>
            ) : null}
          </div>

          {socialLinks && socialLinks.length > 0 ? (
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold uppercase tracking-[0.04em] text-azul-200 no-underline transition-colors duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:border-dorado-600 hover:text-dorado-400"
                >
                  {social.label.slice(0, 2)}
                </a>
              ))}
            </div>
          ) : null}

          {legal ? <div>{legal}</div> : null}
        </div>
      </div>
    </footer>
  )
}
