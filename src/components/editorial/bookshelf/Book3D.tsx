'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import type { BookPlacement, BookViewModel } from './types';
import { createBookTexture, loadBookCover } from './book-texture';
import s from './bookshelf.module.css';

type Props = { book: BookViewModel; placement: BookPlacement; selected: boolean; dimmed: boolean; compact: boolean;
  reducedMotion: boolean; featured: boolean; copy: BookshelfCopy; onSelect: (id: string) => void };

export const Book3D = memo(function Book3D({ book, placement, selected, dimmed, compact, reducedMotion, featured, copy, onSelect }: Props) {
  const group = useRef<Group>(null);
  const progress = useRef(0);
  const hoverProgress = useRef(0);
  const [hovered, setHovered] = useState(false);
  const invalidate = useThree((state) => state.invalidate);
  const texture = useMemo(() => createBookTexture(book, placement.color), [book, placement.color]);
  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => book.coverUrl ? loadBookCover(texture, book.coverUrl, invalidate) : undefined, [book.coverUrl, texture, invalidate]);
  useEffect(() => { invalidate(); }, [selected, hovered, compact, placement, invalidate]);

  useFrame((_, delta) => {
    const object = group.current;
    if (!object) return;
    const target = selected ? 1 : 0;
    const amount = reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, .05) * 8);
    progress.current = MathUtils.lerp(progress.current, target, amount);
    hoverProgress.current = MathUtils.lerp(hoverProgress.current, hovered && !dimmed ? 1 : 0, amount);
    if (Math.abs(progress.current - target) < .0005) progress.current = target;
    const p = progress.current;
    // Primero se despega del fondo; recién después se desplaza hacia el espacio de lectura.
    const lateral = MathUtils.smoothstep(p, .12, 1);
    object.position.set(
      MathUtils.lerp(placement.position[0], compact ? 0 : -.70, lateral),
      MathUtils.lerp(placement.position[1], compact ? 2.26 : 1.57, lateral) + hoverProgress.current * .007 * (1 - p),
      MathUtils.lerp(placement.position[2], compact ? 1.20 : 1.9, p) + hoverProgress.current * .055 * (1 - p),
    );
    object.rotation.y = MathUtils.lerp(placement.rotation, -.15, lateral);
    const scale = MathUtils.lerp(1, compact ? 2.35 : 2.8, lateral);
    object.scale.setScalar(scale);
    if (progress.current !== target || Math.abs(hoverProgress.current - (hovered && !dimmed ? 1 : 0)) > .001) invalidate();
  });
  const { width, height, thickness, color } = placement;
  return <group ref={group} position={placement.position} rotation={[0, placement.rotation, 0]} name={`Book_${book.id}`}
    onPointerOver={(event) => { if (dimmed) return; event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)} onClick={(event) => { if (dimmed) return; event.stopPropagation(); onSelect(book.id); }}>
    <mesh castShadow receiveShadow><boxGeometry args={[width - .013, height - .014, thickness * .77]} /><meshStandardMaterial color="#ded3b9" roughness={.92} /></mesh>
    <mesh castShadow position={[0, 0, -thickness / 2]}><boxGeometry args={[width, height, .005]} /><meshStandardMaterial color={color} roughness={.68} /></mesh>
    <mesh castShadow position={[0, 0, thickness / 2]}><boxGeometry args={[width, height, .005]} /><meshStandardMaterial color={color} roughness={.67} /></mesh>
    <mesh position={[0, 0, thickness / 2 + .003]}><planeGeometry args={[width, height]} /><meshStandardMaterial map={texture} roughness={.63} /></mesh>
    <mesh castShadow position={[-width / 2 + .003, 0, 0]}><boxGeometry args={[.008, height, thickness]} /><meshStandardMaterial color={color} roughness={.75} /></mesh>
    {[-.37, .37].map((ratio) => <mesh key={ratio} position={[-width / 2 - .0015, height * ratio, 0]}>
      <boxGeometry args={[.002, .009, thickness + .003]} /><meshStandardMaterial color="#c9a46a" metalness={.4} roughness={.55} /></mesh>)}
    <Html center position={[0, -height / 2 - .025, .06]} zIndexRange={[12, 1]} style={{ opacity: selected || dimmed ? 0 : 1, pointerEvents: selected || dimmed ? 'none' : 'auto' }}>
      <button className={s.hotspot} type="button" tabIndex={selected || dimmed ? -1 : 0} aria-hidden={selected || dimmed} aria-label={`${copy.open}: ${book.title}`} data-featured={featured}
        onFocus={() => setHovered(true)} onBlur={() => setHovered(false)} onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} onClick={(event) => { event.stopPropagation(); onSelect(book.id); }}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
        <span className={s.hotspotLabel}>{book.title}</span>
      </button>
    </Html>
  </group>;
});
