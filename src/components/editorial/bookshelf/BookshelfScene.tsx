'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { packBooks } from '@/lib/publicaciones/bookshelf-layout';
import { BlenderShelf } from './BlenderShelf';
import { DecorativeBooks } from './DecorativeBooks';
import { Book3D } from './Book3D';
import { CameraRig } from './CameraRig';
import type { BookViewModel } from './types';
import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';

export type SceneProps = { books: BookViewModel[]; selectedId: string | null; compact: boolean; reducedMotion: boolean;
  copy: BookshelfCopy; onSelect: (id: string) => void; onReady: () => void; onFailure: () => void };

export function BookshelfScene({ books, selectedId, compact, reducedMotion, copy, onSelect, onReady, onFailure }: SceneProps) {
  const placements = useMemo(() => packBooks(books, compact), [books, compact]);
  const placementById = useMemo(() => new Map(placements.map((placement) => [placement.id, placement])), [placements]);
  const { gl, invalidate } = useThree();
  const reported = useRef(false);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    const move = () => { if (!reducedMotion) invalidate(); };
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('pointermove', move);
    return () => { canvas.removeEventListener('webglcontextlost', lost); canvas.removeEventListener('pointermove', move); };
  }, [gl, onFailure, invalidate, reducedMotion]);
  useFrame(() => { if (!reported.current) { reported.current = true; onReady(); } });
  return <>
    <color attach="background" args={['#443d33']} />
    <ambientLight intensity={selectedId ? .68 : .95} color="#e7d6bf" />
    <hemisphereLight args={['#f2dec0', '#6b503d', 1.35]} />
    <directionalLight position={[-2.7, 4.6, 3.5]} intensity={selectedId ? 2.0 : 2.7} color="#ffe2b9" castShadow
      shadow-mapSize={compact ? [512, 512] : [1024, 1024]} shadow-camera-left={-3.5} shadow-camera-right={3.5}
      shadow-camera-top={3.6} shadow-camera-bottom={-1} shadow-camera-near={.1} shadow-camera-far={12} shadow-bias={-.0005} shadow-normalBias={.015} />
    <directionalLight position={[3, 2.5, 2]} intensity={.75} color="#d8e2eb" />
    {selectedId && <pointLight position={[-.7, 2.5, 3.5]} intensity={5} distance={5} color="#ffe4c0" />}
    <BlenderShelf />
    <DecorativeBooks placements={placements} />
    {books.map((book) => <Book3D key={book.id} book={book} placement={placementById.get(book.id)!} selected={selectedId === book.id}
      dimmed={Boolean(selectedId && selectedId !== book.id)} compact={compact} reducedMotion={reducedMotion}
      featured={books.length === 1} copy={copy} onSelect={onSelect} />)}
    <CameraRig compact={compact} reducedMotion={reducedMotion} selected={Boolean(selectedId)} />
  </>;
}
