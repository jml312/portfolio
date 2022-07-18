import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, memo } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

function ThreeJ({ theme }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.5], fov: 15 }}
      className={"bg-transparent"}
    >
      <ambientLight
        color={theme === "light" ? "rgb(28,29,37)" : "rgb(255,255,245)"}
      />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={1}
      />
    </Canvas>
  );
}

const Model = memo(() => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/assets/J.glb");
  let frame = 0;
  useFrame(() => {
    if (++frame <= 100) {
      groupRef.current.rotation.y =
        -Math.sqrt(1 - Math.pow(frame / 300 - 1, 15)) * Math.PI * 8;
    } else {
      groupRef.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        geometry={nodes.Text.geometry}
        material={materials["Material.001"]}
        position={[-0.05, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.93}
      />
    </group>
  );
});
Model.displayName = "Model";

useGLTF.preload("/assets/J.glb");

export default ThreeJ;
