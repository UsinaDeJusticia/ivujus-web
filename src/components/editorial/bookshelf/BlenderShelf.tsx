'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Mesh } from 'three';

const MODEL_URL = '/models/ivujus-bookshelf.glb?v=compact-institute-3';

export function clearBlenderShelfCache() { useGLTF.clear(MODEL_URL); }

export function BlenderShelf() {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object) => { if (object instanceof Mesh) { object.castShadow = true; object.receiveShadow = true; } });
    return clone;
  }, [scene]);
  // useGLTF conserva un único asset compartido al alternar entre lista y biblioteca.
  return <primitive object={model} dispose={null} />;
}
