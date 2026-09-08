'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { Color, InstancedMesh, Object3D } from 'three';
import { makeDecorations } from '@/lib/publicaciones/bookshelf-layout';
import type { BookPlacement } from './types';

export function DecorativeBooks({ placements }: { placements: BookPlacement[] }) {
  const books = useMemo(() => makeDecorations(placements), [placements]);
  const bindings = useRef<InstancedMesh>(null);
  const pages = useRef<InstancedMesh>(null);
  const bands = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!bindings.current || !pages.current || !bands.current) return;
    const object = new Object3D();
    const color = new Color();
    books.forEach((book, index) => {
      object.position.set(...book.position);
      object.scale.set(book.width, book.height, book.thickness);
      object.updateMatrix();
      bindings.current!.setMatrixAt(index, object.matrix);
      bindings.current!.setColorAt(index, color.set(book.color));
      object.position.y += book.height / 2 - .005;
      object.scale.set(book.width * .70, .004, book.thickness * .94);
      object.updateMatrix();
      pages.current!.setMatrixAt(index, object.matrix);
      [-.34, .34].forEach((ratio, band) => {
        object.position.set(book.position[0], book.position[1] + book.height * ratio, book.position[2] + book.thickness / 2 + .001);
        object.scale.set(book.width * .83, .004, .002);
        object.updateMatrix();
        bands.current!.setMatrixAt(index * 2 + band, object.matrix);
      });
    });
    for (const mesh of [bindings.current, pages.current, bands.current]) {
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
    if (bindings.current.instanceColor) bindings.current.instanceColor.needsUpdate = true;
  }, [books]);
  return <group name="DecorativeBooks" userData={{ decorative: true }}>
    <instancedMesh ref={bindings} args={[undefined, undefined, books.length]} castShadow receiveShadow><boxGeometry /><meshStandardMaterial roughness={.82} /></instancedMesh>
    <instancedMesh ref={pages} args={[undefined, undefined, books.length]}><boxGeometry /><meshStandardMaterial color="#b6aa8b" roughness={.95} /></instancedMesh>
    <instancedMesh ref={bands} args={[undefined, undefined, books.length * 2]}><boxGeometry /><meshStandardMaterial color="#b19464" roughness={.66} metalness={.22} /></instancedMesh>
  </group>;
}
