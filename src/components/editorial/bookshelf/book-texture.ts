import { CanvasTexture, SRGBColorSpace } from 'three';
import type { BookViewModel } from './types';

function wrapText(context: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && context.measureText(`${line} ${word}`).width > width) { lines.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

export function createBookTexture(book: BookViewModel, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D no disponible');
  context.fillStyle = color;
  context.fillRect(0, 0, 512, 768);
  context.fillStyle = '#00000024';
  context.fillRect(0, 0, 21, 768);
  context.strokeStyle = '#c9a46a';
  context.lineWidth = 2;
  context.strokeRect(40, 42, 432, 684);
  context.fillStyle = '#e8c891';
  context.font = '27px Georgia, serif';
  context.fillText('I V U J U S', 70, 111);
  context.fillRect(70, 149, 75, 2);
  context.fillStyle = '#fff7e7';
  const size = book.title.length > 80 ? 34 : 43;
  context.font = `${size}px Georgia, serif`;
  const titleLines = wrapText(context, book.title, 370).slice(0, 8);
  titleLines.forEach((line, index) => context.fillText(line, 70, 232 + index * size * 1.35));
  context.font = '19px Arial, sans-serif';
  const authorLines = wrapText(context, book.authorsLabel || book.authors.join(' · '), 370).slice(0, 4);
  authorLines.forEach((line, index) => context.fillText(line, 70, 621 + index * 25));
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** La ruta de optimización de Next resuelve CORS y limita las imágenes a 640 px. */
export function loadBookCover(texture: CanvasTexture, url: string, onLoad: () => void) {
  const image = new Image();
  let cancelled = false;
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    if (cancelled) return;
    const canvas = texture.image as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    texture.needsUpdate = true;
    onLoad();
  };
  // La cubierta tipográfica permanece visible si una portada deja de estar disponible.
  image.onerror = () => {};
  image.src = `/_next/image?url=${encodeURIComponent(url)}&w=640&q=75`;
  return () => { cancelled = true; image.onload = null; image.onerror = null; image.src = ''; };
}
