export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
        {locale.toUpperCase()}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        IVUJUS
      </h1>
      <p className="text-lg leading-relaxed text-neutral-700">
        Instituto de Victimología de Usina de Justicia. El sitio está en construcción.
      </p>
      <p className="text-sm text-neutral-500">
        Acceso de administración:{' '}
        <a className="underline decoration-dotted underline-offset-4" href="/admin">
          /admin
        </a>
      </p>
    </main>
  );
}
