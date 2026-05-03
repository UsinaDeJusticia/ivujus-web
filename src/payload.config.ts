import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { es } from '@payloadcms/translations/languages/es';
import { en } from '@payloadcms/translations/languages/en';
import { fr } from '@payloadcms/translations/languages/fr';

import { Articulos } from './collections/Articulos';
import { Autores } from './collections/Autores';
import { Ciclos } from './collections/Ciclos';
import { Declaraciones } from './collections/Declaraciones';
import { Dossiers } from './collections/Dossiers';
import { FichasGlosario } from './collections/FichasGlosario';
import { IndiceLegislativoEntradas } from './collections/IndiceLegislativoEntradas';
import { Instituciones } from './collections/Instituciones';
import { Media } from './collections/Media';
import { PaginasEstaticas } from './collections/PaginasEstaticas';
import { Publicaciones } from './collections/Publicaciones';
import { Simposios } from './collections/Simposios';
import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — IVUJUS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Articulos,
    Autores,
    Ciclos,
    Declaraciones,
    Dossiers,
    FichasGlosario,
    IndiceLegislativoEntradas,
    Instituciones,
    Media,
    PaginasEstaticas,
    Publicaciones,
    Simposios,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // In bootstrap we need Payload to create the initial tables in Neon;
    // otherwise /admin fails before the first user can be created.
    push: true,
  }),
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es, en, fr },
  },
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, '..', 'schema.graphql'),
  },
});
