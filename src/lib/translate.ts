import Anthropic from '@anthropic-ai/sdk';

const TRANSLATION_MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 8192;

export class MissingApiKeyError extends Error {
  constructor() {
    super('ANTHROPIC_API_KEY no configurada; traducción automática deshabilitada.');
    this.name = 'MissingApiKeyError';
  }
}

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new MissingApiKeyError();
  if (!client) client = new Anthropic();
  return client;
}

const SYSTEM_PROMPT = `Sos un traductor profesional español → inglés especializado en contenido editorial sobre derecho, victimología, derechos humanos y políticas públicas.

Vas a recibir un objeto JSON con la propiedad "source_es": un array de strings en español. Devolvé un objeto JSON con la propiedad "translations": un array de strings en inglés, de la misma longitud y en el mismo orden.

Reglas:
- Preservá el sentido, registro académico y estilo
- Mantené nombres propios y citas textuales entre comillas en su forma original cuando corresponda
- Mantené términos técnicos especializados (ej. "victimología" → "victimology", "derecho victimal" → "victimal law")
- No agregues ni quites información
- Si un string viene vacío, devolvé string vacío en la misma posición
- Si un string es solo whitespace o un fragmento sin contenido semántico, devolvé el mismo valor sin modificar`;

const TRANSLATION_SCHEMA = {
  type: 'object',
  properties: {
    translations: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['translations'],
  additionalProperties: false,
} as const;

export async function translateBatchEsToEn(items: string[]): Promise<string[]> {
  if (items.length === 0) return [];

  const c = getClient();
  const response = await c.messages.create({
    model: TRANSLATION_MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: JSON.stringify({ source_es: items }),
      },
    ],
    output_config: {
      format: { type: 'json_schema', schema: TRANSLATION_SCHEMA },
    },
  });

  const textBlock = response.content.find(
    (b): b is Anthropic.TextBlock => b.type === 'text',
  );
  if (!textBlock) {
    throw new Error('Respuesta de traducción sin bloque de texto');
  }

  let parsed: { translations: unknown };
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error('La respuesta de traducción no es JSON válido');
  }

  if (!Array.isArray(parsed.translations)) {
    throw new Error('La respuesta no contiene un array translations');
  }
  if (parsed.translations.length !== items.length) {
    throw new Error(
      `Mismatch de longitudes: ${items.length} entradas vs ${parsed.translations.length} traducciones`,
    );
  }
  if (!parsed.translations.every((t): t is string => typeof t === 'string')) {
    throw new Error('La respuesta contiene elementos que no son strings');
  }

  return parsed.translations;
}
