import { getPayload } from 'payload';

import config from '../src/payload.config';
import { slugify } from '../src/lib/slugify';

type RolIvujus = 'consejo_directivo' | 'comite_cientifico' | 'invitado';

interface AutorSeed {
  nombre_completo: string;
  pais: string;
  rol_ivujus: RolIvujus;
  cargo?: string;
  orden: number;
}

// Fuente: docs/ARQUITECTURA.md, sección "Sobre IVUJUS" (líneas 30-31).
const consejoDirectivo: AutorSeed[] = [
  { nombre_completo: 'María Jimena Molina', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Directora', orden: 1 },
  { nombre_completo: 'Diana Cohen Agrest', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Directora honoraria', orden: 2 },
  { nombre_completo: 'Daniel Roggero', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Consejero académico', orden: 3 },
  { nombre_completo: 'Noelia Juárez', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Secretaria', orden: 4 },
  { nombre_completo: 'Mariana Romano', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Relaciones Institucionales', orden: 5 },
  { nombre_completo: 'Patricia Borras', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Tecnología y comunicación', orden: 6 },
  { nombre_completo: 'Jair Castillo', pais: 'Argentina', rol_ivujus: 'consejo_directivo', cargo: 'Tecnología y comunicación', orden: 7 },
];

const comiteCientifico: AutorSeed[] = [
  { nombre_completo: 'Irvin Waller', pais: 'Canadá', rol_ivujus: 'comite_cientifico', orden: 1 },
  { nombre_completo: 'Hilda Marchiori', pais: 'Argentina', rol_ivujus: 'comite_cientifico', orden: 2 },
  { nombre_completo: 'Beatrice Coscas-Williams', pais: 'Israel', rol_ivujus: 'comite_cientifico', orden: 3 },
  { nombre_completo: 'Marcelo Aebi', pais: 'Argentina-Suiza', rol_ivujus: 'comite_cientifico', orden: 4 },
  { nombre_completo: 'María de la Luz Lima Malvido', pais: 'México', rol_ivujus: 'comite_cientifico', orden: 5 },
  { nombre_completo: 'Darío Solís García', pais: 'Panamá', rol_ivujus: 'comite_cientifico', orden: 6 },
  { nombre_completo: 'Catherine Rossi', pais: 'Canadá', rol_ivujus: 'comite_cientifico', orden: 7 },
  { nombre_completo: 'Pierre-Marie Sève', pais: 'Francia', rol_ivujus: 'comite_cientifico', orden: 8 },
];

async function seed() {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('Faltan DATABASE_URI o PAYLOAD_SECRET en el entorno.');
  }

  const dbHost = new URL(process.env.DATABASE_URI).host;
  console.log(`[seed-autores] conectando a ${dbHost}`);

  const payload = await getPayload({ config });

  const todos: AutorSeed[] = [...consejoDirectivo, ...comiteCientifico];

  let creados = 0;
  let existentes = 0;

  for (const autor of todos) {
    const slug = slugify(autor.nombre_completo);
    const found = await payload.find({
      collection: 'autores',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });

    if (found.docs.length > 0) {
      existentes += 1;
      console.log(`  · ya existe: ${autor.nombre_completo} (${slug})`);
      continue;
    }

    await payload.create({
      collection: 'autores',
      data: {
        nombre_completo: autor.nombre_completo,
        slug,
        pais: autor.pais,
        rol_ivujus: autor.rol_ivujus,
        cargo: autor.cargo,
        orden: autor.orden,
        activo: true,
      },
      context: { disableRevalidate: true },
    });
    creados += 1;
    console.log(`  + creado: ${autor.nombre_completo} (${slug})`);
  }

  console.log(`\n[seed-autores] ${creados} creados, ${existentes} ya existentes.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed-autores] error:', err);
  process.exit(1);
});
