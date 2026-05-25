import * as THREE from "three";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const colors = [
  "#2c3e50",
  "#e74c3c",
  "#ecf0f1",
  "#3498db",
  "#f1c40f",
  "#9b59b6",
  "#1abc9c",
  "#e67e22",
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture?: THREE.Texture;
  color?: string;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  color,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        rotation={[0.3, 1, 1]}
      >
        {texture ? (
          <meshPhysicalMaterial
            map={texture}
            roughness={0.15}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            metalness={0.1}
            roughness={0.1}
            transmission={0.6}
            thickness={1.2}
            clearcoat={1.0}
          />
        )}
      </mesh>
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function TechScene({ isActive, colors }: { isActive: boolean; colors: string[] }) {
  const textures = useTexture([
    "/images/TECHNICAL SKILL/1.jpg",
    "/images/TECHNICAL SKILL/10.jpg",
    "/images/TECHNICAL SKILL/11.jpg",
    "/images/TECHNICAL SKILL/12.jpg",
    "/images/TECHNICAL SKILL/13.jpg",
    "/images/TECHNICAL SKILL/14.jpg",
    "/images/TECHNICAL SKILL/15.jpg",
    "/images/TECHNICAL SKILL/16.jpg",
    "/images/TECHNICAL SKILL/17.jpg",
  ]);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer isActive={isActive} />
      {spheres.map((props, i) => {
        const isTexture = i % 2 === 0;
        const texture = isTexture ? textures[Math.floor(i / 2) % textures.length] : undefined;
        const color = !isTexture ? colors[i % colors.length] : undefined;

        return (
          <SphereGeo
            key={i}
            scale={props.scale}
            texture={texture}
            color={color}
            isActive={isActive}
          />
        );
      })}
    </Physics>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="techstack">
      <h2>Technical Skills</h2>
      <div style={{ textAlign: "center", color: "#fff", zIndex: 10, position: "relative", padding: "0 20px" }}>
        <p><b>Engineering & Simulation:</b> AutoCAD | STAAD.Pro | SketchUp 3D | QGIS | Primavera | Revit</p>
        <p><b>Data Analysis & Visualization:</b> Microsoft Excel | MATLAB | Minitab</p>
        <p><b>Other Tools:</b> MS Office | Adobe Photoshop | Canva | Filmora | Capcut</p>
      </div>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        
        <Suspense fallback={null}>
          <TechScene isActive={isActive} colors={colors} />
        </Suspense>

        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
