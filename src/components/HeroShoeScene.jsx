import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { MathUtils } from 'three'

const sceneStages = [
  {
    rotation: [0.18, 0.1, -0.24],
    position: [0, -0.04, 0],
    scale: 1,
    camera: [0, 0.15, 5.6],
  },
  {
    rotation: [0.62, -0.72, -0.28],
    position: [0.1, 0.12, 0],
    scale: 1.08,
    camera: [0.7, 0.6, 4.9],
  },
  {
    rotation: [-0.38, 0.92, 0.18],
    position: [-0.18, -0.06, 0],
    scale: 1.14,
    camera: [-0.85, 0.2, 4.6],
  },
]

function ShoeModel({ progress }) {
  const groupRef = useRef()
  const orbitRef = useRef()
  const leftLaces = useMemo(() => Array.from({ length: 4 }, (_, index) => index), [])
  const rightLaces = useMemo(() => Array.from({ length: 4 }, (_, index) => index), [])

  useFrame((state, delta) => {
    const orbital = orbitRef.current
    const shoe = groupRef.current

    if (!orbital || !shoe) {
      return
    }

    const normalized = MathUtils.clamp(progress, 0, 1)
    const scaled = normalized * (sceneStages.length - 1)
    const fromIndex = Math.floor(scaled)
    const toIndex = Math.min(fromIndex + 1, sceneStages.length - 1)
    const localT = scaled - fromIndex

    const from = sceneStages[fromIndex]
    const to = sceneStages[toIndex]

    const targetRotationX = MathUtils.lerp(from.rotation[0], to.rotation[0], localT)
    const targetRotationY = MathUtils.lerp(from.rotation[1], to.rotation[1], localT)
    const targetRotationZ = MathUtils.lerp(from.rotation[2], to.rotation[2], localT)
    const targetPositionX = MathUtils.lerp(from.position[0], to.position[0], localT)
    const targetPositionY = MathUtils.lerp(from.position[1], to.position[1], localT)
    const targetPositionZ = MathUtils.lerp(from.position[2], to.position[2], localT)
    const targetScale = MathUtils.lerp(from.scale, to.scale, localT)

    orbital.rotation.y = MathUtils.lerp(orbital.rotation.y, targetRotationY + state.clock.elapsedTime * 0.12, delta * 3)
    shoe.rotation.x = MathUtils.lerp(shoe.rotation.x, targetRotationX, delta * 4)
    shoe.rotation.z = MathUtils.lerp(shoe.rotation.z, targetRotationZ, delta * 4)
    shoe.position.x = MathUtils.lerp(shoe.position.x, targetPositionX, delta * 4)
    shoe.position.y = MathUtils.lerp(
      shoe.position.y,
      targetPositionY + Math.sin(state.clock.elapsedTime * 1.8) * 0.04,
      delta * 4,
    )
    shoe.position.z = MathUtils.lerp(shoe.position.z, targetPositionZ, delta * 4)
    shoe.scale.x = MathUtils.lerp(shoe.scale.x, targetScale, delta * 4)
    shoe.scale.y = MathUtils.lerp(shoe.scale.y, targetScale, delta * 4)
    shoe.scale.z = MathUtils.lerp(shoe.scale.z, targetScale, delta * 4)
  })

  return (
    <group ref={orbitRef}>
      <group ref={groupRef}>
        <mesh position={[0, -0.82, 0]} rotation={[0, 0.05, -0.14]} castShadow receiveShadow>
          <boxGeometry args={[2.85, 0.34, 1.02]} />
          <meshStandardMaterial color="#f5fbff" roughness={0.28} metalness={0.18} />
        </mesh>

        <mesh position={[0.35, -0.68, 0]} rotation={[0, 0.12, -0.24]} castShadow>
          <boxGeometry args={[2.55, 0.8, 1.08]} />
          <meshStandardMaterial color="#dce5f4" roughness={0.32} metalness={0.14} />
        </mesh>

        <mesh position={[0.88, -0.42, 0]} rotation={[0, 0.08, -0.26]} castShadow>
          <boxGeometry args={[0.98, 0.82, 0.84]} />
          <meshStandardMaterial color="#eef5ff" roughness={0.26} metalness={0.12} />
        </mesh>

        <mesh position={[-0.88, -0.58, 0.18]} rotation={[0, 0.12, -0.14]} castShadow>
          <boxGeometry args={[0.92, 0.36, 0.58]} />
          <meshStandardMaterial color="#0f1734" roughness={0.38} metalness={0.36} />
        </mesh>

        <mesh position={[-0.38, -0.22, 0]} rotation={[0, 0.12, -0.22]} castShadow>
          <boxGeometry args={[1.25, 0.18, 0.9]} />
          <meshStandardMaterial color="#6d38ff" emissive="#3f1d8c" emissiveIntensity={0.8} roughness={0.22} metalness={0.42} />
        </mesh>

        <mesh position={[0.42, -0.14, 0.28]} rotation={[0.08, 0.12, -0.22]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.08} />
        </mesh>

        <mesh position={[0.42, -0.14, -0.28]} rotation={[-0.08, 0.12, -0.22]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.08} />
        </mesh>

        {leftLaces.map((lace, index) => (
          <mesh
            key={`lace-left-${lace}`}
            position={[0.02 + index * 0.22, 0.04 + index * 0.04, 0.22]}
            rotation={[0.2, 0.08, 0.04]}
            castShadow
          >
            <boxGeometry args={[0.18, 0.03, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.12} metalness={0.05} />
          </mesh>
        ))}

        {rightLaces.map((lace, index) => (
          <mesh
            key={`lace-right-${lace}`}
            position={[0.02 + index * 0.22, 0.04 + index * 0.04, -0.22]}
            rotation={[-0.2, 0.08, -0.04]}
            castShadow
          >
            <boxGeometry args={[0.18, 0.03, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.12} metalness={0.05} />
          </mesh>
        ))}

        <mesh position={[1.22, 0.12, 0]} rotation={[0, 0.08, -0.22]} castShadow>
          <boxGeometry args={[0.32, 0.54, 0.12]} />
          <meshStandardMaterial color="#ff8a2a" emissive="#6a3200" emissiveIntensity={0.75} roughness={0.22} metalness={0.3} />
        </mesh>

        <mesh position={[-0.6, -0.82, 0]} rotation={[0, 0.1, -0.14]} castShadow>
          <capsuleGeometry args={[0.26, 0.6, 6, 10]} />
          <meshStandardMaterial color="#ffa24c" emissive="#7c3a00" emissiveIntensity={0.55} roughness={0.2} metalness={0.42} />
        </mesh>

        <mesh position={[0.82, -0.88, 0]} rotation={[0, 0.12, -0.22]} castShadow>
          <capsuleGeometry args={[0.16, 0.54, 6, 10]} />
          <meshStandardMaterial color="#d2dff0" roughness={0.16} metalness={0.26} />
        </mesh>
      </group>
    </group>
  )
}

function SceneCameraRig({ progress }) {
  useFrame((state, delta) => {
    const normalized = MathUtils.clamp(progress, 0, 1)
    const scaled = normalized * (sceneStages.length - 1)
    const fromIndex = Math.floor(scaled)
    const toIndex = Math.min(fromIndex + 1, sceneStages.length - 1)
    const localT = scaled - fromIndex

    const from = sceneStages[fromIndex]
    const to = sceneStages[toIndex]

    const targetX = MathUtils.lerp(from.camera[0], to.camera[0], localT)
    const targetY = MathUtils.lerp(from.camera[1], to.camera[1], localT)
    const targetZ = MathUtils.lerp(from.camera[2], to.camera[2], localT)

    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, delta * 3)
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, delta * 3)
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, delta * 3)
    state.camera.lookAt(0, -0.1, 0)
  })

  return null
}

export function HeroShoeScene({ progress }) {
  return (
    <Canvas
      camera={{ fov: 28, position: [0, 0.15, 5.6] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      shadows
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#111022', 6, 12]} />
      <ambientLight intensity={1.6} color="#c7d4ff" />
      <directionalLight castShadow intensity={2.8} position={[4, 5, 5]} color="#ffffff" />
      <directionalLight intensity={1.8} position={[-4, 2, 3]} color="#6d38ff" />
      <pointLight intensity={24} position={[0, 1.6, 1.4]} color="#7af5e1" distance={7} />
      <pointLight intensity={18} position={[-2.6, -0.6, 2]} color="#ff8a2a" distance={6} />
      <SceneCameraRig progress={progress} />
      <ShoeModel progress={progress} />
    </Canvas>
  )
}
