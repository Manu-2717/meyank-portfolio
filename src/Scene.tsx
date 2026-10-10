import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function World() {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const { pointer, camera } = useThree()
  const points = useMemo(() => {
    const values: number[] = []
    for (let i = 0; i < 320; i++) {
      const a = i * 2.399963229728653
      const radius = 2.9 + Math.sqrt(i / 320) * 3.5
      values.push(Math.cos(a) * radius, (Math.sin(a * 1.7) * .7) + (i % 7) * .13 - .35, Math.sin(a) * radius - 1.5)
    }
    return new Float32Array(values)
  }, [])
  useFrame((state, delta) => {
    if (!group.current || !core.current || !ring.current) return
    group.current.rotation.y += delta * .035
    core.current.rotation.y += delta * .09
    ring.current.rotation.z += delta * .045
    const t = state.clock.elapsedTime
    core.current.position.y = Math.sin(t * .6) * .08
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .42, .025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * .23, .025)
    camera.lookAt(0, 0, 0)
  })
  return <>
    <color attach="background" args={['#080e19']} />
    <fog attach="fog" args={['#080e19', 8, 19]} />
    <ambientLight intensity={1.1} color="#91b4ff" />
    <pointLight position={[4, 3, 3]} intensity={45} color="#4f87ff" />
    <pointLight position={[-4, -1, 2]} intensity={30} color="#895bff" />
    <group ref={group} rotation={[.22, -.4, -.35]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 3]} />
        <meshPhysicalMaterial color="#a9c7ff" metalness={.75} roughness={.18} transmission={.27} thickness={1.8} clearcoat={1} flatShading />
      </mesh>
      <mesh ref={ring} rotation={[.9, .25, .2]}>
        <torusGeometry args={[2.2, .018, 8, 180]} />
        <meshBasicMaterial color="#8caeff" transparent opacity={.8} />
      </mesh>
      <mesh rotation={[1.25, -.5, .6]}>
        <torusGeometry args={[2.58, .009, 8, 180]} />
        <meshBasicMaterial color="#8a6cff" transparent opacity={.48} />
      </mesh>
      <mesh rotation={[.2, .9, -.3]}>
        <torusGeometry args={[1.92, .008, 8, 180]} />
        <meshBasicMaterial color="#c8d4ff" transparent opacity={.52} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const angle = i * Math.PI * 2 / 9
        return <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle * 1.3) * .55, Math.sin(angle) * 2.2]}>
          <sphereGeometry args={[i % 3 === 0 ? .075 : .04, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#91baff' : '#b398ff'} />
        </mesh>
      })}
    </group>
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry>
      <pointsMaterial color="#adc4ff" size={.025} sizeAttenuation transparent opacity={.55} depthWrite={false} />
    </points>
  </>
}

export default function Scene() {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6.6], fov: 42 }} gl={{ antialias: true, powerPreference: 'low-power' }}>
    <World />
  </Canvas>
}
