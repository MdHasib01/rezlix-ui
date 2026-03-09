"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ScrollControls,
  Scroll,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import gsap from "gsap";

const FLOOR_HEIGHT = 2.3;
const NB_FLOORS = 3;

function Office(props) {
  const { nodes, materials } = useGLTF("/models/WawaOffice.glb");
  const ref = useRef();
  const tl = useRef();
  const libraryRef = useRef();
  const atticRef = useRef();

  const scroll = useScroll();

  useFrame(() => {
    if (!tl.current) return;
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    const timeline = gsap.timeline();
    tl.current = timeline;

    timeline.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0,
    );

    timeline.to(
      ref.current.rotation,
      { duration: 1, x: 0, y: Math.PI / 6, z: 0 },
      0,
    );
    timeline.to(
      ref.current.rotation,
      { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
      1,
    );

    timeline.to(
      ref.current.position,
      {
        duration: 1,
        x: -1,
        z: 2,
      },
      0,
    );
    timeline.to(
      ref.current.position,
      {
        duration: 1,
        x: 1,
        z: 2,
      },
      1,
    );

    timeline.from(
      libraryRef.current.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5,
    );
    timeline.from(
      libraryRef.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      0,
    );

    timeline.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 2,
      },
      0,
    );

    timeline.from(
      atticRef.current.rotation,
      {
        duration: 0.5,
        y: Math.PI / 2,
      },
      1,
    );

    timeline.from(
      atticRef.current.position,
      {
        duration: 0.5,
        z: -2,
      },
      1.5,
    );
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0.5, -1, -1]}
      rotation={[0, -Math.PI / 3, 0]}
    >
      <mesh geometry={nodes["01_office"].geometry} material={materials["01"]} />
      <group position={[0, 2.11, -2.23]}>
        <group ref={libraryRef}>
          <mesh
            geometry={nodes["02_library"].geometry}
            material={materials["02"]}
          />
        </group>
      </group>
      <group position={[-1.97, 4.23, -2.2]}>
        <group ref={atticRef}>
          <mesh
            geometry={nodes["03_attic"].geometry}
            material={materials["03"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/WawaOffice.glb");

const Section = ({ children, right, opacity }) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        right ? "items-end" : "items-start"
      }`}
      style={{
        opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-lg px-8 py-12">{children}</div>
        </div>
      </div>
    </section>
  );
};

function Overlay() {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div className="w-screen">
        <Section opacity={opacityFirstSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Hello, I'm Wawa Sensei
          </h1>
          <p className="text-gray-500">Welcome to my beautiful portfolio</p>
          <p className="mt-3">I know:</p>
          <ul className="leading-9">
            <li>🧑‍💻 How to code</li>
            <li>🧑‍🏫 How to learn</li>
            <li>📦 How to deliver</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        <Section right opacity={opacitySecondSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Here are my skillsets 🔥
          </h1>
          <p className="text-gray-500">PS: I never test</p>
          <p className="mt-3">
            <b>Frontend 🚀</b>
          </p>
          <ul className="leading-9">
            <li>ReactJS</li>
            <li>React Native</li>
            <li>VueJS</li>
            <li>Tailwind</li>
          </ul>
          <p className="mt-3">
            <b>Backend 🔬</b>
          </p>
          <ul className="leading-9">
            <li>NodeJS</li>
            <li>tRPC</li>
            <li>NestJS</li>
            <li>PostgreSQL</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        <Section opacity={opacityLastSection}>
          <h1 className="font-semibold font-serif text-2xl">
            🤙 Call me maybe?
          </h1>
          <p className="text-gray-500">
            I'm very expensive but you won't regret it
          </p>
          <p className="mt-6 p-3 bg-slate-200 rounded-lg">
            📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p>
        </Section>
      </div>
    </Scroll>
  );
}

function Experience() {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        <Overlay />
        <Office />
      </ScrollControls>
    </>
  );
}

export default function ThreeDHomeObject() {
  return (
    <section
      data-skip-tilt="true"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#d9afd9",
        backgroundImage: "linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)",
      }}
    >
      <Canvas
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <Experience />
      </Canvas>
    </section>
  );
}
