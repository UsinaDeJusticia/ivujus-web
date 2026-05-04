const siteUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar';

export function GET() {
  const body = `# IVUJUS — Instituto de Victimologia de Usina de Justicia

> Instituto academico argentino dedicado a la victimologia, el derecho victimal y los derechos de las victimas de homicidio y femicidio.

## Instituto

- [Instituto](https://ivujus.org.ar/es/instituto): presentacion institucional, finalidades y estructura del IVUJUS.
- [Estatuto](https://ivujus.org.ar/es/instituto/estatuto): base institucional, definiciones fundacionales y objetivos del instituto.
- [Consejo Directivo](https://ivujus.org.ar/es/instituto/consejo-directivo): perfiles de conduccion institucional del IVUJUS.
- [Comite Cientifico](https://ivujus.org.ar/es/instituto/comite-cientifico): referentes internacionales y autoridad academica del instituto.

## Simposios

- [Simposios](https://ivujus.org.ar/es/simposios): archivo de encuentros, declaraciones y produccion derivada.
- [Primer Simposio Americano y Europeo de Victimologia Penal (Buenos Aires 2026)](https://ivujus.org.ar/es/simposios/2026-buenos-aires): programa, cobertura y estructura del encuentro.
- [Declaracion de Buenos Aires](https://ivujus.org.ar/es/simposios/2026-buenos-aires#declaracion): documento final del simposio con sus estandares principales.

## Navegacion publica actual

- [Home](https://ivujus.org.ar/es)
- [Instituto](https://ivujus.org.ar/es/instituto)
- [Simposios](https://ivujus.org.ar/es/simposios)

## Nota

Este archivo es una primera version curada. A medida que el contenido del CMS se consolide, debe ampliarse con publicaciones, glosario, indice legislativo y perfiles canonicos.
`;

  return new Response(body.replaceAll('https://ivujus.org.ar', siteUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
