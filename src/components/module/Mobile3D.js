// "use client"

// import { useState, Suspense, useEffect } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const Mobile3D = () => {
//   const [hover, setHover] = useState(false);

//   const gltf = useLoader(GLTFLoader, "3D_models/Iphone14withScreen.gltf");

//   return (
//     <>
//       <Canvas style={{ height: "80vh" }}>
//         <ambientLight intensity={1.1} />
//         <OrbitControls
//           autoRotate
//           autoRotateSpeed={10}
//           maxPolarAngle={Math.PI / 2}
//         />
//         <Suspense fallback={null}>
//           <mesh
//             scale={[0.18, 0.18, 0.18]}
//             onPointerOver={() => setHover(true)}
//             onPointerOut={() => setHover(false)}
//           >
//             <primitive className="min-h-100 w-100" object={gltf.scene} />
//           </mesh>
//         </Suspense>
//       </Canvas>
//     </>
//   );
// };

// export default Mobile3D;
