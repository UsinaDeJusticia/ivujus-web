'use client';
/* eslint-disable react-hooks/immutability -- La cámara de Three es un objeto imperativo, no estado de React. */

import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, PerspectiveCamera, Vector3 } from 'three';

export function CameraRig({ compact, reducedMotion, selected }: { compact: boolean; reducedMotion: boolean; selected: boolean }) {
  const { camera, size, invalidate } = useThree();
  const target = useMemo(() => new Vector3(), []);
  // Encuadra la cornisa y el zócalo del mueble completo, también en retrato.
  const height = Math.max(3.75, 2.62 / (size.width / size.height));
  const distance = height / (2 * Math.tan(35 * Math.PI / 360)) + .40;
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) { camera.fov = 35; camera.near = .05; camera.far = 30; camera.updateProjectionMatrix(); }
    camera.position.set(0, 1.67, distance);
    camera.lookAt(0, 1.62, 0);
    invalidate();
  }, [camera, compact, distance, invalidate]);
  useFrame(({ pointer }, delta) => {
    const parallax = !compact && !reducedMotion && !selected;
    target.set(parallax ? pointer.x * .042 : 0, 1.67 + (parallax ? pointer.y * .018 : 0), distance);
    if (camera.position.distanceToSquared(target) > .0000001) {
      camera.position.lerp(target, Math.min(1, delta * 5));
      camera.lookAt(0, 1.62, 0);
      invalidate();
    }
    camera.position.x = MathUtils.clamp(camera.position.x, -.05, .05);
  });
  return null;
}
