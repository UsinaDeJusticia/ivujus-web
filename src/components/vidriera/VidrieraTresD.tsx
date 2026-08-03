'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { COLOR_ENCUADERNACION, GROSOR_RELATIVO, type PiezaVidriera } from './piezas';

// Escena WebGL de la vidriera. Se monta encima de VidrieraPoster y solo cuando
// VidrieraSlot decidió que corresponde (ver la escalera de arranque ahí).
//
// El canvas es DECORATIVO: va `aria-hidden`, no recibe foco, y no hay ninguna
// información ni ningún enlace que exista solo acá. Todo lo que se ve en la
// escena está también, como texto y enlaces reales, en el listado que sigue
// más abajo en la página. Por eso se puede esconder del árbol de
// accesibilidad sin dejar a nadie afuera.

const ALTO_POR_TIPO = { libro: 2.3, dossier: 2.02, declaracion: 1.86 } as const;
const PROFUNDIDAD = 1.45;
const SEPARACION = 0.045;

// Nogal del estante. Es un color fijo y no un token `--ui-*` por la misma
// razón que las encuadernaciones: el estante es el objeto representado, no la
// interfaz. Una madera no cambia de color según el modo de lectura. Este tono
// medio tiene contraste suficiente tanto sobre el fondo blanco del tema claro
// como sobre el azul del oscuro.
const NOGAL = 0x6b5138;

/** Sombra de apoyo: `box-shadow` no existe en 3D, así que se pinta a mano. */
function crearTexturaSombra(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const degradado = ctx.createRadialGradient(128, 32, 4, 128, 32, 124);
  degradado.addColorStop(0, 'rgba(0,0,0,0.42)');
  degradado.addColorStop(0.55, 'rgba(0,0,0,0.16)');
  degradado.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = degradado;
  ctx.fillRect(0, 0, 256, 64);
  return new THREE.CanvasTexture(canvas);
}

/** Compone el lomo tipográficamente: no hay imagen de tapa real de ninguna pieza. */
function crearTexturaLomo(pieza: PiezaVidriera, grosor: number, alto: number): THREE.CanvasTexture {
  const anchoPx = 168;
  const altoPx = Math.min(1024, Math.round((anchoPx * alto) / grosor));

  const canvas = document.createElement('canvas');
  canvas.width = anchoPx;
  canvas.height = altoPx;
  const ctx = canvas.getContext('2d')!;

  const { lomo, texto } = COLOR_ENCUADERNACION[pieza.tipo];

  ctx.fillStyle = lomo;
  ctx.fillRect(0, 0, anchoPx, altoPx);

  // Bisagra a la izquierda y filo claro a la derecha: es lo que da la lectura
  // de "lomo" y no de "rectángulo de color".
  const bisagra = ctx.createLinearGradient(0, 0, anchoPx, 0);
  bisagra.addColorStop(0, 'rgba(0,0,0,0.38)');
  bisagra.addColorStop(0.09, 'rgba(0,0,0,0.05)');
  bisagra.addColorStop(0.85, 'rgba(255,255,255,0.03)');
  bisagra.addColorStop(1, 'rgba(255,255,255,0.14)');
  ctx.fillStyle = bisagra;
  ctx.fillRect(0, 0, anchoPx, altoPx);

  ctx.save();
  ctx.translate(anchoPx / 2, altoPx / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = texto;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // El título entra achicando la tipografía; si aun así no entra, se corta con
  // puntos suspensivos. Nunca se reescribe ni se abrevia el título real.
  const largoUtil = altoPx * 0.86;
  let cuerpo = 30;
  let titulo = pieza.titulo;
  const fuente = (px: number) => `600 ${px}px Georgia, 'Times New Roman', serif`;

  ctx.font = fuente(cuerpo);
  while (ctx.measureText(titulo).width > largoUtil && cuerpo > 15) {
    cuerpo -= 1;
    ctx.font = fuente(cuerpo);
  }
  while (ctx.measureText(titulo).width > largoUtil && titulo.length > 8) {
    titulo = `${titulo.slice(0, -2).trimEnd()}…`;
  }
  ctx.fillText(titulo, 0, 1);

  ctx.font = `600 13px 'Segoe UI', system-ui, sans-serif`;
  ctx.globalAlpha = 0.62;
  ctx.fillText(pieza.anio, -largoUtil / 2 - 26, 1);
  ctx.restore();

  const textura = new THREE.CanvasTexture(canvas);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
}

export function VidrieraTresD({ piezas }: { piezas: PiezaVidriera[] }) {
  const montajeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // El handler de click vive en un ref para que el efecto de la escena no
  // dependa del router y no se remonte la escena entera en cada navegación.
  const irARef = useRef((href: string) => router.push(href));
  irARef.current = (href: string) => router.push(href);

  useEffect(() => {
    const montaje = montajeRef.current;
    if (!montaje) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // Sin WebGL la página se queda con la versión plana.
    }

    const desechables: Array<{ dispose: () => void }> = [];
    const escena = new THREE.Scene();

    // Canvas transparente: el fondo lo pone la página, así los tres temas de
    // lectura funcionan sin tener que replicar ningún color acá.
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.tabIndex = -1;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
    montaje.appendChild(renderer.domElement);

    const camara = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const controles = new OrbitControls(camara, renderer.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.08;
    controles.enablePan = false;
    controles.enableZoom = false; // No robarle el scroll a la página.
    controles.minPolarAngle = Math.PI * 0.36;
    controles.maxPolarAngle = Math.PI * 0.54;
    controles.minAzimuthAngle = -Math.PI * 0.16;
    controles.maxAzimuthAngle = Math.PI * 0.16;
    controles.autoRotate = false;

    // --- Piezas ---------------------------------------------------------
    const grupo = new THREE.Group();
    const libros: Array<{ malla: THREE.Mesh; href: string; xReposo: number; zReposo: number }> = [];

    const anchos = piezas.map((p) => GROSOR_RELATIVO[p.tipo] * 0.34 + 0.12);
    const anchoTotal = anchos.reduce((a, b) => a + b, 0) + SEPARACION * (piezas.length - 1);

    let cursorX = -anchoTotal / 2;
    piezas.forEach((pieza, i) => {
      const grosor = anchos[i];
      const alto = ALTO_POR_TIPO[pieza.tipo];

      const textura = crearTexturaLomo(pieza, grosor, alto);
      desechables.push(textura);

      const colorCuerpo = new THREE.Color(COLOR_ENCUADERNACION[pieza.tipo].lomo);
      const papel = new THREE.MeshStandardMaterial({ color: 0xd8d0be, roughness: 0.95 });
      const tapa = new THREE.MeshStandardMaterial({ color: colorCuerpo, roughness: 0.72 });
      const lomo = new THREE.MeshStandardMaterial({ map: textura, roughness: 0.62 });
      desechables.push(papel, tapa, lomo);

      // Orden de caras de BoxGeometry: +X, -X, +Y, -Y, +Z, -Z.
      // El lomo mira a la cámara (+Z); los cantos de papel son los laterales.
      const geometria = new THREE.BoxGeometry(grosor, alto, PROFUNDIDAD);
      desechables.push(geometria);
      const malla = new THREE.Mesh(geometria, [papel, papel, papel, papel, lomo, tapa]);

      const x = cursorX + grosor / 2;
      malla.position.set(x, alto / 2, 0);
      // Una inclinación mínima y determinista (según el índice) evita la fila
      // perfectamente alineada, que es lo que delata que es una maqueta.
      malla.rotation.z = (i % 3 === 1 ? 1 : -1) * 0.012 * ((i % 4) + 1);

      grupo.add(malla);
      libros.push({ malla, href: pieza.href, xReposo: x, zReposo: 0 });
      cursorX += grosor + SEPARACION;
    });

    // --- Estante --------------------------------------------------------
    // Se extiende bastante más allá de los libros para que salga por los dos
    // bordes del encuadre: así se lee como un estante continuo y no como una
    // tablita flotando debajo de cinco libros.
    const maderaGeo = new THREE.BoxGeometry(anchoTotal + 16, 0.16, PROFUNDIDAD + 0.5);
    const maderaMat = new THREE.MeshStandardMaterial({ color: NOGAL, roughness: 0.82 });
    desechables.push(maderaGeo, maderaMat);
    const madera = new THREE.Mesh(maderaGeo, maderaMat);
    madera.position.y = -0.08;
    grupo.add(madera);

    const sombraTex = crearTexturaSombra();
    const sombraGeo = new THREE.PlaneGeometry(anchoTotal + 1.4, PROFUNDIDAD + 0.3);
    const sombraMat = new THREE.MeshBasicMaterial({
      map: sombraTex,
      transparent: true,
      depthWrite: false,
    });
    desechables.push(sombraTex, sombraGeo, sombraMat);
    const sombra = new THREE.Mesh(sombraGeo, sombraMat);
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = 0.012;
    grupo.add(sombra);

    escena.add(grupo);

    // --- Luces ----------------------------------------------------------
    const ambiente = new THREE.AmbientLight(0xffffff, 1.6);
    const principal = new THREE.DirectionalLight(0xffffff, 2.1);
    principal.position.set(2.4, 4.2, 5);
    const relleno = new THREE.DirectionalLight(0xffffff, 0.75);
    relleno.position.set(-3.2, 1.6, 2.4);
    escena.add(ambiente, principal, relleno);

    const altoMayor = Math.max(...piezas.map((p) => ALTO_POR_TIPO[p.tipo]));
    camara.position.set(0, 1.5, 5);
    controles.target.set(0, altoMayor / 2, 0);
    controles.update();

    // --- Tema -----------------------------------------------------------
    // No se emite ningún evento al cambiar de tema, así que se observa el
    // atributo que escribe ThemeSwitcher sobre <html>.
    // El canvas es transparente, así que el fondo de la escena ya es el de la
    // página y los tres temas funcionan solos. Lo único que se ajusta es la
    // luz: con el fondo oscuro, la misma iluminación quema los lomos.
    const aplicarTema = () => {
      const oscuro = document.documentElement.dataset.theme === 'dark';
      ambiente.intensity = oscuro ? 1.1 : 1.6;
      principal.intensity = oscuro ? 1.5 : 2.1;
      relleno.intensity = oscuro ? 0.5 : 0.75;
    };
    const observadorTema = new MutationObserver(() => {
      aplicarTema();
      pedirCuadro();
    });
    observadorTema.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    aplicarTema();

    // --- Interacción ----------------------------------------------------
    const puntero = new THREE.Vector2();
    const rayo = new THREE.Raycaster();
    let apuntado: THREE.Mesh | null = null;

    const alMover = (evento: PointerEvent) => {
      const caja = renderer.domElement.getBoundingClientRect();
      puntero.x = ((evento.clientX - caja.left) / caja.width) * 2 - 1;
      puntero.y = -((evento.clientY - caja.top) / caja.height) * 2 + 1;
      rayo.setFromCamera(puntero, camara);
      const tocados = rayo.intersectObjects(libros.map((l) => l.malla), false);
      apuntado = (tocados[0]?.object as THREE.Mesh) ?? null;
      renderer.domElement.style.cursor = apuntado ? 'pointer' : 'grab';
      pedirCuadro();
    };

    const alClickear = () => {
      if (!apuntado) return;
      const libro = libros.find((l) => l.malla === apuntado);
      if (libro) irARef.current(libro.href);
    };

    const alSalir = () => {
      apuntado = null;
      renderer.domElement.style.cursor = 'grab';
      pedirCuadro();
    };

    renderer.domElement.addEventListener('pointermove', alMover);
    renderer.domElement.addEventListener('click', alClickear);
    renderer.domElement.addEventListener('pointerleave', alSalir);

    // --- Bucle ----------------------------------------------------------
    // El bucle no corre siempre: se activa cuando hay algo que animar
    // (damping, hover) y se apaga cuando la escena se quedó quieta, sale del
    // viewport o la pestaña pasa a segundo plano.
    let quietoDesde = 0;
    let corriendo = false;
    let visible = true;

    const cuadro = () => {
      controles.update();

      let enMovimiento = false;
      for (const libro of libros) {
        const objetivo = libro.malla === apuntado ? 0.42 : 0;
        const actual = libro.malla.position.z;
        const siguiente = actual + (objetivo - actual) * 0.16;
        if (Math.abs(siguiente - actual) > 0.0006) {
          libro.malla.position.z = siguiente;
          enMovimiento = true;
        } else if (actual !== objetivo) {
          libro.malla.position.z = objetivo;
          enMovimiento = true;
        }
      }

      renderer.render(escena, camara);

      if (enMovimiento) quietoDesde = 0;
      else quietoDesde += 1;
      // 45 cuadros de margen: alcanza para que termine el damping de
      // OrbitControls después de soltar el arrastre.
      if (quietoDesde > 45) detener();
    };

    const pedirCuadro = () => {
      quietoDesde = 0;
      if (corriendo || !visible) return;
      corriendo = true;
      renderer.setAnimationLoop(cuadro);
    };

    const detener = () => {
      if (!corriendo) return;
      corriendo = false;
      renderer.setAnimationLoop(null);
    };

    controles.addEventListener('change', pedirCuadro);

    const redimensionar = () => {
      const { clientWidth, clientHeight } = montaje;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camara.aspect = clientWidth / clientHeight;

      // La distancia se recalcula en cada resize en vez de fijarse una vez.
      // La franja es muy ancha y baja, así que con una distancia fija los
      // libros quedan como un grupito perdido en el medio: hay que encuadrar
      // contra la dimensión que realmente limita, que según el ancho de
      // pantalla puede ser el alto o el ancho.
      const mitadFov = THREE.MathUtils.degToRad(camara.fov) / 2;
      const porAlto = altoMayor / 0.82 / 2 / Math.tan(mitadFov);
      const porAncho = (anchoTotal + 0.8) / 2 / (Math.tan(mitadFov) * camara.aspect);
      const distancia = Math.max(porAlto, porAncho);

      // Se mueve solo la distancia y se conservan los ángulos, para no
      // recolocar la cámara si el usuario ya orbitó.
      const direccion = camara.position.clone().sub(controles.target).normalize();
      camara.position.copy(controles.target).addScaledVector(direccion, distancia);
      camara.updateProjectionMatrix();
      controles.update();
      pedirCuadro();
    };

    const observadorTamano = new ResizeObserver(redimensionar);
    observadorTamano.observe(montaje);
    redimensionar();

    const observadorVista = new IntersectionObserver((entradas) => {
      visible = entradas.some((e) => e.isIntersecting);
      if (visible) pedirCuadro();
      else detener();
    });
    observadorVista.observe(montaje);

    const alCambiarVisibilidad = () => {
      if (document.visibilityState === 'hidden') detener();
      else pedirCuadro();
    };
    document.addEventListener('visibilitychange', alCambiarVisibilidad);

    return () => {
      detener();
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      renderer.domElement.removeEventListener('pointermove', alMover);
      renderer.domElement.removeEventListener('click', alClickear);
      renderer.domElement.removeEventListener('pointerleave', alSalir);
      controles.removeEventListener('change', pedirCuadro);
      observadorTamano.disconnect();
      observadorVista.disconnect();
      observadorTema.disconnect();
      controles.dispose();
      for (const cosa of desechables) cosa.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [piezas]);

  return <div ref={montajeRef} className="h-full w-full" role="presentation" />;
}
