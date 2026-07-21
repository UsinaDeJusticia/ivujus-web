import type { Metadata } from 'next';

import { INSTITUTIONAL_EMAIL, contactoCopy, resolveContactoLocale } from '@/lib/contacto';
import { buildLocalizedMetadata } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal } from '@/components/ui/Buttons';

// Metadata en español fijo para las 3 rutas de locale, igual que
// instituto/page.tsx, simposios/page.tsx y formacion/page.tsx: el cuerpo de
// esta sección no se traduce en v1 (ver docs/CLAUDE.md, "Fase 3: traducción
// automática").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/contacto',
    title: 'Contacto',
    description:
      'Vía de contacto directa y formulario del Instituto de Victimología de Usina de Justicia.',
  });
}

const FIELD_CLASSES =
  'w-full rounded-sm border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-page)] px-4 py-3 text-[15px] leading-6 text-[color:var(--ui-ink-2)] outline-none transition-colors duration-[var(--motion-base)] placeholder:text-[color:var(--ui-ink-4)] focus-visible:border-[color:var(--ui-link)] focus-visible:shadow-[var(--shadow-focus)]';

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveContactoLocale(rawLocale);
  const copy = contactoCopy[locale];

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-14 px-6 py-16 sm:px-10">
        <header className="max-w-3xl space-y-5 border-b border-[color:var(--ui-border)] pb-10">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">{copy.title}</h1>
        </header>

        <section className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
          <SectionHeader eyebrow={copy.directHeading} title={copy.directLead} />
          <p className="mt-6">
            <a
              href={`mailto:${INSTITUTIONAL_EMAIL}`}
              className="text-[length:var(--text-lg)] font-semibold text-[color:var(--ui-link)] underline decoration-dorado-600 decoration-2 underline-offset-4 transition-colors duration-[var(--motion-base)] hover:text-[color:var(--ui-link-hover)]"
            >
              {INSTITUTIONAL_EMAIL}
            </a>
          </p>
        </section>

        <section className="space-y-6">
          <SectionHeader title={copy.formHeading} lead={copy.formLead} />

          {/*
            PENDIENTE Fase 3: POST a /api/contact.
            Este formulario es una maqueta visual sin envío real: no tiene
            `action` ni handler de submit. Cuando exista el endpoint de
            Fase 3, agregar `action="/api/contact"` (o un `onSubmit` en un
            client component) y el manejo de éxito/error correspondiente.
          */}
          <form className="grid gap-5 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
            <div className="grid gap-2">
              <label
                htmlFor="contacto-nombre"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-3)]"
              >
                {copy.labels.nombre}
              </label>
              <input id="contacto-nombre" name="nombre" type="text" autoComplete="name" className={FIELD_CLASSES} />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contacto-email"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-3)]"
              >
                {copy.labels.email}
              </label>
              <input id="contacto-email" name="email" type="email" autoComplete="email" className={FIELD_CLASSES} />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contacto-asunto"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-3)]"
              >
                {copy.labels.asunto}
              </label>
              <input id="contacto-asunto" name="asunto" type="text" className={FIELD_CLASSES} />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contacto-mensaje"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-3)]"
              >
                {copy.labels.mensaje}
              </label>
              <textarea id="contacto-mensaje" name="mensaje" rows={6} className={FIELD_CLASSES} />
            </div>

            <div>
              <ButtonPrincipal type="submit">{copy.labels.enviar}</ButtonPrincipal>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
