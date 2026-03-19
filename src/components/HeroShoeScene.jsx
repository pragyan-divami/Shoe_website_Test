import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Box3, Color, MathUtils, Vector3 } from 'three'
import { DRACOLoader, GLTFLoader, MeshoptDecoder } from 'three-stdlib'

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

function animateStage({ orbitRef, progress, shoeRef }) {
  return (state, delta) => {
    const orbital = orbitRef.current
    const shoe = shoeRef.current

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
    shoe.scale.setScalar(MathUtils.lerp(shoe.scale.x, targetScale, delta * 4))
  }
}

function PlaceholderModel({ progress }) {
  const groupRef = useRef()
  const orbitRef = useRef()

  useFrame(animateStage({ orbitRef, progress, shoeRef: groupRef }))

  return (
    <group ref={orbitRef}>
      <group ref={groupRef}>
        <mesh position={[0, -0.48, 0]} rotation={[0.06, 0.06, -0.16]} castShadow receiveShadow>
          <capsuleGeometry args={[0.72, 2.5, 10, 20]} />
          <meshStandardMaterial color="#eef5ff" roughness={0.18} metalness={0.22} />
        </mesh>
        <mesh position={[-0.18, -0.18, 0.08]} rotation={[0.08, 0.1, -0.22]} castShadow>
          <capsuleGeometry args={[0.26, 1.24, 10, 18]} />
          <meshStandardMaterial color="#6d38ff" emissive="#4a22b8" emissiveIntensity={1.25} roughness={0.14} metalness={0.46} />
        </mesh>
        <mesh position={[-0.72, -0.95, 0]} rotation={[0.02, 0.08, -0.18]} castShadow>
          <capsuleGeometry args={[0.22, 0.82, 8, 14]} />
          <meshStandardMaterial color="#ff9b3a" emissive="#7b3e00" emissiveIntensity={0.8} roughness={0.18} metalness={0.34} />
        </mesh>
      </group>
    </group>
  )
}

function ShoeModel({ modelScene, progress }) {
  const groupRef = useRef()
  const orbitRef = useRef()

  useFrame(animateStage({ orbitRef, progress, shoeRef: groupRef }))

  return (
    <group ref={orbitRef}>
      <group ref={groupRef}>
        <primitive object={modelScene} />
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

export function HeroShoeScene({ modelUrl, progress }) {
  const [modelScene, setModelScene] = useState(null)

  useEffect(() => {
    let mounted = true
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
    loader.setDRACOLoader(dracoLoader)
    loader.setMeshoptDecoder(MeshoptDecoder)

    loader.load(
      modelUrl,
      (gltf) => {
        if (!mounted) {
          return
        }

        const nextScene = gltf.scene.clone(true)

        nextScene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        const box = new Box3().setFromObject(nextScene)
        const size = box.getSize(new Vector3())
        const center = box.getCenter(new Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z) || 1
        const normalizedScale = 3.2 / maxDimension

        nextScene.position.sub(center)
        nextScene.scale.setScalar(normalizedScale)
        nextScene.rotation.set(0, 0.22, 0)

        setModelScene(nextScene)
      },
      undefined,
      () => {
        if (mounted) {
          setModelScene(null)
        }
      },
    )

    return () => {
      mounted = false
      dracoLoader.dispose()
    }
  }, [modelUrl])

  return (
    <Canvas
      camera={{ fov: 28, position: [0, 0.15, 5.6] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      shadows
      onCreated={({ gl, scene }) => {
        scene.background = null
        gl.setClearColor(new Color('#000000'), 0)
      }}
    >
      <ambientLight intensity={2.5} color="#dfe9ff" />
      <directionalLight castShadow intensity={3.8} position={[4, 5, 5]} color="#ffffff" />
      <directionalLight intensity={2.4} position={[-4, 2, 3]} color="#6d38ff" />
      <directionalLight intensity={1.8} position={[0, -2, 2]} color="#ff8a2a" />
      <pointLight intensity={28} position={[0, 1.6, 1.4]} color="#7af5e1" distance={9} />
      <pointLight intensity={20} position={[-2.6, -0.6, 2]} color="#ff8a2a" distance={8} />
      <SceneCameraRig progress={progress} />
      {modelScene ? <ShoeModel modelScene={modelScene} progress={progress} /> : <PlaceholderModel progress={progress} />}
    </Canvas>
  )
}
