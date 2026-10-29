import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Props = { active: boolean; onReady: () => void; onError: () => void };

function panelShape(width: number, height: number) {
  const x = -width / 2,
    y = -height / 2,
    radius = 0.075;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

export default function HeroScene({ active, onReady, onError }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const runtime = useRef<{ play: () => void; pause: () => void } | null>(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.15, 9.7);
    camera.lookAt(0, 0, 0);
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.AmbientLight(0xe6ebff, 1.3));
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const edge = new THREE.DirectionalLight(0x749dff, 2.5);
    edge.position.set(4, -1, 3);
    scene.add(edge);

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const cream = new THREE.MeshPhysicalMaterial({
      color: 0xe6e9e7,
      roughness: 0.29,
      metalness: 0.08,
      clearcoat: 0.4,
    });
    const blue = new THREE.MeshPhysicalMaterial({
      color: 0x285bea,
      roughness: 0.25,
      metalness: 0.12,
      clearcoat: 0.65,
    });
    const ghost = new THREE.MeshPhysicalMaterial({
      color: 0x8291a3,
      roughness: 0.32,
      metalness: 0.1,
      transparent: true,
      opacity: 0.27,
      depthWrite: false,
    });
    const whiteDetail = new THREE.MeshStandardMaterial({
      color: 0xf6f8f4,
      roughness: 0.5,
    });
    const blueDetail = new THREE.MeshStandardMaterial({
      color: 0x244ede,
      roughness: 0.4,
    });
    const mutedDetail = new THREE.MeshStandardMaterial({
      color: 0xadb7c6,
      roughness: 0.5,
    });

    function slab(width: number, height: number, material: THREE.Material) {
      const group = new THREE.Group();
      const geometry = new THREE.ExtrudeGeometry(panelShape(width, height), {
        depth: 0.065,
        bevelEnabled: true,
        bevelThickness: 0.016,
        bevelSize: 0.016,
        bevelSegments: 2,
        steps: 1,
        curveSegments: 5,
      });
      group.add(new THREE.Mesh(geometry, material));
      const outline = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 35),
        new THREE.LineBasicMaterial({
          color: 0xc4d2ed,
          transparent: true,
          opacity: 0.28,
        }),
      );
      group.add(outline);
      sculpture.add(group);
      return group;
    }
    function block(
      parent: THREE.Group,
      x: number,
      y: number,
      width: number,
      height: number,
      material: THREE.Material,
      depth = 0.022,
    ) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        material,
      );
      mesh.position.set(x, y, 0.09 + depth / 2);
      parent.add(mesh);
      return mesh;
    }
    const rear = slab(2.38, 2.82, ghost);
    rear.position.set(0.65, 0.39, -0.66);
    rear.rotation.z = -0.045;
    block(rear, -0.62, 0.99, 0.74, 0.07, mutedDetail);
    block(rear, 0, 0.23, 1.94, 0.85, ghost);
    block(rear, -0.18, -0.53, 1.58, 0.065, mutedDetail);
    block(rear, -0.36, -0.76, 1.21, 0.065, mutedDetail);

    const center = slab(2.45, 2.42, blue);
    center.position.set(-0.08, 0.12, 0.05);
    center.rotation.z = -0.045;
    block(center, -0.58, 0.83, 0.75, 0.08, whiteDetail);
    block(center, 0.61, 0.83, 0.31, 0.035, whiteDetail);
    block(center, -0.49, 0.17, 0.91, 0.62, whiteDetail);
    block(center, 0.59, 0.34, 0.67, 0.06, whiteDetail);
    block(center, 0.52, 0.13, 0.54, 0.04, mutedDetail);
    block(center, 0.44, -0.06, 0.38, 0.04, mutedDetail);
    block(center, -0.16, -0.59, 1.58, 0.045, whiteDetail);
    block(center, -0.45, -0.79, 1.0, 0.045, mutedDetail);

    const front = slab(2.15, 1.61, cream);
    front.position.set(-0.53, -0.83, 0.86);
    front.rotation.z = -0.045;
    block(front, -0.51, 0.43, 0.65, 0.065, blueDetail);
    block(front, 0.6, 0.43, 0.16, 0.065, mutedDetail);
    block(front, -0.5, -0.12, 0.63, 0.52, blueDetail);
    block(front, 0.24, 0.07, 0.51, 0.065, mutedDetail);
    block(front, 0.31, -0.15, 0.66, 0.055, mutedDetail);
    block(front, 0.15, -0.37, 0.35, 0.055, blueDetail);

    const satellite = slab(0.61, 0.61, blue);
    satellite.position.set(1.66, -0.81, 0.21);
    satellite.rotation.z = -0.045;
    block(satellite, 0, 0, 0.19, 0.19, whiteDetail, 0.04);
    const small = slab(0.45, 0.45, cream);
    small.position.set(-1.49, 1.22, 0.37);
    small.rotation.z = -0.045;
    block(small, 0, 0, 0.08, 0.08, blueDetail, 0.02);
    for (const points of [
      [
        new THREE.Vector3(0.85, -0.8, 0.25),
        new THREE.Vector3(1.36, -0.8, 0.25),
      ],
      [
        new THREE.Vector3(-1.49, 0.99, 0.39),
        new THREE.Vector3(-1.49, 0.63, 0.39),
        new THREE.Vector3(-1.25, 0.63, 0.39),
      ],
    ])
      sculpture.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({
            color: 0x8194bd,
            transparent: true,
            opacity: 0.6,
          }),
        ),
      );

    const baseRotation = { x: -0.14, y: -0.5, z: 0.055 };
    sculpture.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
    const pointer = new THREE.Vector2();
    const smoothed = new THREE.Vector2();
    const entranceDuration = 4.5;
    let frame = 0,
      enabled = false,
      elapsed = 0,
      previous = 0;
    const render = (now: number) => {
      frame = 0;
      if (!enabled) return;
      const frameDelta = previous ? Math.max((now - previous) / 1000, 0) : 0;
      const delta = Math.min(frameDelta, 0.05);
      previous = now;
      elapsed = Math.min(elapsed + frameDelta, entranceDuration);
      const entrance = 1 - elapsed / entranceDuration;
      smoothed.lerp(pointer, 1 - Math.exp(-delta * 3));
      sculpture.rotation.x =
        baseRotation.x +
        Math.sin(elapsed * 0.22) * 0.035 * entrance +
        smoothed.y * 0.035;
      sculpture.rotation.y =
        baseRotation.y +
        Math.sin(elapsed * 0.18) * 0.045 * entrance +
        smoothed.x * 0.065;
      sculpture.position.y = Math.sin(elapsed * 0.42) * 0.045 * entrance;
      renderer.render(scene, camera);
      if (
        elapsed < entranceDuration ||
        smoothed.distanceToSquared(pointer) > 0.000001
      ) {
        frame = requestAnimationFrame(render);
      }
    };
    const requestRender = () => {
      if (!enabled || frame) return;
      previous = 0;
      frame = requestAnimationFrame(render);
    };
    runtime.current = {
      play: () => {
        enabled = true;
        requestRender();
      },
      pause: () => {
        enabled = false;
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      },
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    onReady();
    const onPointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.set(
        THREE.MathUtils.clamp(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -1,
          1,
        ),
        THREE.MathUtils.clamp(
          ((event.clientY - rect.top) / rect.height) * 2 - 1,
          -1,
          1,
        ),
      );
      requestRender();
    };
    const onLeave = () => {
      pointer.set(0, 0);
      requestRender();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      runtime.current?.pause();
      onError();
    };
    container.addEventListener("pointermove", onPointer, { passive: true });
    container.addEventListener("pointerleave", onLeave);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    return () => {
      runtime.current?.pause();
      runtime.current = null;
      observer.disconnect();
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material)
          for (const material of Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material])
            materials.add(material);
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onReady, onError]);

  useEffect(() => {
    if (active) runtime.current?.play();
    else runtime.current?.pause();
  }, [active]);

  return <div ref={host} className="hero-scene" />;
}
