'use client';

import { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, PCFShadowMap } from 'three';
import { BookshelfScene, type SceneProps } from './BookshelfScene';

export default memo(function BookshelfCanvas(props: SceneProps) {
  return <Canvas shadows={{ type: PCFShadowMap }} dpr={props.compact ? [1, 1.25] : [1, 1.5]} frameloop="demand"
    camera={{ position: [0, 1.59, 5.2], fov: 35 }} onCreated={({ gl }) => gl.domElement.setAttribute('aria-hidden', 'true')}
    gl={{ antialias: !props.compact, alpha: false, powerPreference: 'low-power', toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1 }}
    fallback={<span>{props.copy.fallback}</span>}>
    <Suspense fallback={null}><BookshelfScene {...props} /></Suspense>
  </Canvas>;
});
