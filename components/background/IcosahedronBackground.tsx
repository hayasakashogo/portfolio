"use client"

import { useRef, useEffect, useState, useMemo, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

// ── Constants ────────────────────────────────────────────────────────────────
const ICO_RADIUS = 2.2
const CAMERA_Z   = 6.0
const FOV        = 50

// Typing animation
const TYPING_TEXT  = 'Hello, World.'
const TYPING_SPEED = 100   // ms per char
const TYPING_START = 800   // ms before first char
const TYPING_END   = 1000  // ms after last char before 3D opens

// 3D animation (values mirror index2.html CONFIG)
const SPREAD_AMOUNT   = 1.8     // how far vertices bloom out
const OPEN_LERP       = 0.015   // lerp speed per frame at 60 fps
const ROTATE_Y        = 0.09    // rad/s  (0.0015 × 60)
const ROTATE_X        = 0.054   // rad/s  (0.0015 × 0.6 × 60)
const MOUSE_SENS      = 0.0003  // rad per screen-pixel
const MOUSE_SMOOTH    = 0.05    // lerp smoothness for mouse tilt
const SCROLL_X_SENS   = 0.0005  // objectGroup X-tilt per scroll-px
const SCROLL_ZOOM     = 0.0015  // camera Z retract per scroll-px

// ── Sphere geometry ───────────────────────────────────────────────────────────
const W_SEG = 12  // longitude segments (meridians)
const H_SEG = 8   // latitude segments  (parallels + poles)
// Interior rings: N = H_SEG - 1 = 7  →  total vertices: 2 + 7×12 = 86

function buildSphereData(radius: number) {
  const N       = H_SEG - 1
  const numVerts = 2 + N * W_SEG
  const positions          = new Float32Array(numVerts * 3)
  const explosionDirections = new Float32Array(numVerts * 3)

  const setVert = (idx: number, nx: number, ny: number, nz: number) => {
    positions[idx * 3]     = nx * radius
    positions[idx * 3 + 1] = ny * radius
    positions[idx * 3 + 2] = nz * radius
    const s = 1.5 + Math.random() * 2.5
    explosionDirections[idx * 3]     = nx * s
    explosionDirections[idx * 3 + 1] = ny * s
    explosionDirections[idx * 3 + 2] = nz * s
  }

  // Top pole
  setVert(0, 0, 1, 0)

  // Interior latitude rings
  for (let h = 1; h <= N; h++) {
    const theta = (h / H_SEG) * Math.PI
    const sinT  = Math.sin(theta)
    const cosT  = Math.cos(theta)
    for (let w = 0; w < W_SEG; w++) {
      const phi = (w / W_SEG) * Math.PI * 2
      setVert(
        1 + (h - 1) * W_SEG + w,
        sinT * Math.cos(phi),
        cosT,
        sinT * Math.sin(phi),
      )
    }
  }

  // Bottom pole
  setVert(numVerts - 1, 0, -1, 0)

  const edgeIndices: number[] = []

  // Top pole → first ring
  for (let w = 0; w < W_SEG; w++) edgeIndices.push(0, 1 + w)

  // Latitude lines within each interior ring
  for (let h = 0; h < N; h++) {
    const base = 1 + h * W_SEG
    for (let w = 0; w < W_SEG; w++) {
      edgeIndices.push(base + w, base + (w + 1) % W_SEG)
    }
  }

  // Longitude lines between consecutive rings
  for (let h = 0; h < N - 1; h++) {
    for (let w = 0; w < W_SEG; w++) {
      edgeIndices.push(1 + h * W_SEG + w, 1 + (h + 1) * W_SEG + w)
    }
  }

  // Last ring → bottom pole
  const lastBase = 1 + (N - 1) * W_SEG
  for (let w = 0; w < W_SEG; w++) edgeIndices.push(lastBase + w, numVerts - 1)

  return { positions, explosionDirections, edgeIndices }
}

// ── SSR-safe mount detection ─────────────────────────────────────────────────
const subscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

// ── Typing overlay ───────────────────────────────────────────────────────────
function TypingOverlay({ isOpeningRef }: { isOpeningRef: { current: boolean } }) {
  // Check sessionStorage at mount time (client-only component, always safe)
  const alreadyOpened = useRef(!!sessionStorage.getItem('portfolio-opened'))

  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone]           = useState(alreadyOpened.current)

  useEffect(() => {
    // Same-session revisit: skip animation immediately
    if (alreadyOpened.current) {
      isOpeningRef.current = true
      document.body.classList.add('opening-done')
      return
    }

    let charIndex = 0
    let intervalId: ReturnType<typeof setInterval>

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex++
        setDisplayText(TYPING_TEXT.slice(0, charIndex))

        if (charIndex === TYPING_TEXT.length) {
          clearInterval(intervalId)
          setTimeout(() => {
            setIsDone(true)
            isOpeningRef.current = true
            document.body.classList.add('opening-done')
            sessionStorage.setItem('portfolio-opened', '1')
          }, TYPING_END)
        }
      }, TYPING_SPEED)
    }, TYPING_START)

    return () => {
      clearTimeout(startTimer)
      clearInterval(intervalId)
    }
  }, [isOpeningRef])

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: isDone ? 'translate(-50%, -60%)' : 'translate(-50%, -50%)',
        opacity: isDone ? 0 : 1,
        zIndex: 100,
        pointerEvents: 'none',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: 'var(--text)',
        fontFamily: 'var(--font-geist-mono), monospace',
        whiteSpace: 'nowrap',
      }}
    >
      {displayText}
      <span
        style={{
          color: 'var(--accent)',
          animation: 'cursor-blink 1s step-end infinite',
          opacity: isDone ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        |
      </span>
    </div>
  )
}

// ── 3D Scene ─────────────────────────────────────────────────────────────────
interface SceneProps {
  accentColor:  string
  isOpeningRef: { current: boolean }
}

function IcosahedronScene({ accentColor, isOpeningRef }: SceneProps) {
  const { camera } = useThree()

  // All Three.js objects created once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geo = useMemo(() => {
    const data = buildSphereData(ICO_RADIUS)
    const positions = data.positions
    const posAttr   = new THREE.BufferAttribute(positions, 3)

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', posAttr)
    lineGeo.setIndex(data.edgeIndices)

    const pointGeo = new THREE.BufferGeometry()
    pointGeo.setAttribute('position', posAttr)

    const originalPos = new Float32Array(positions)

    // Circular dot texture (replaces default square sprite)
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.beginPath()
    ctx.arc(32, 32, 30, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    const dotTexture = new THREE.CanvasTexture(canvas)

    const lineMat  = new THREE.LineBasicMaterial({
      color: accentColor, transparent: true, opacity: 0.2,
    })
    const pointMat = new THREE.PointsMaterial({
      color: accentColor, size: 0.12, sizeAttenuation: true,
      map: dotTexture, alphaTest: 0.5,
    })

    const lineSegs = new THREE.LineSegments(lineGeo, lineMat)
    const pts      = new THREE.Points(pointGeo, pointMat)

    return {
      positions, posAttr, originalPos,
      explosionDirections: data.explosionDirections,
      lineSegs, pts, lineMat, pointMat, dotTexture,
    }
  }, [])

  // Dispose on unmount
  useEffect(() => {
    const { lineSegs, pts, lineMat, pointMat, dotTexture } = geo
    return () => {
      lineSegs.geometry.dispose()
      pts.geometry.dispose()
      lineMat.dispose()
      pointMat.dispose()
      dotTexture.dispose()
    }
  }, [geo])

  // Update material colors on theme change
  useEffect(() => {
    geo.lineMat.color.set(accentColor)
    geo.pointMat.color.set(accentColor)
  }, [accentColor, geo])

  // Animation refs
  const outerGroupRef   = useRef<THREE.Group>(null) // mouse tilt + scroll
  const innerGroupRef   = useRef<THREE.Group>(null) // auto-rotation
  const bloomFactorRef  = useRef(0)
  const mouseRef        = useRef({ x: 0, y: 0 })
  const scrollYRef      = useRef(0)

  // Global event listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - window.innerWidth  / 2
      mouseRef.current.y = e.clientY - window.innerHeight / 2
    }
    const onTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0].clientX - window.innerWidth  / 2
      mouseRef.current.y = e.touches[0].clientY - window.innerHeight / 2
    }
    const onScroll = () => { scrollYRef.current = window.scrollY }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useFrame((_, delta) => {
    const outer = outerGroupRef.current
    const inner = innerGroupRef.current
    if (!outer || !inner) return

    const dt      = Math.min(delta, 0.1)
    const scrollY = scrollYRef.current
    const { positions, posAttr, originalPos, explosionDirections } = geo

    // ── Bloom spread (0 → SPREAD_AMOUNT after typing) ─────────────────────
    const targetBloom = isOpeningRef.current ? SPREAD_AMOUNT : 0
    if (Math.abs(bloomFactorRef.current - targetBloom) > 0.001) {
      bloomFactorRef.current += (targetBloom - bloomFactorRef.current) *
        Math.min(OPEN_LERP * dt * 60, 1)

      const f = bloomFactorRef.current
      for (let i = 0; i < positions.length; i++) {
        positions[i] = originalPos[i] + explosionDirections[i] * f
      }
      posAttr.needsUpdate = true
    }

    // ── Inner group: auto-rotation ────────────────────────────────────────
    inner.rotation.x += ROTATE_X * dt
    inner.rotation.y += ROTATE_Y * dt

    // ── Outer group: mouse tilt + scroll X-tilt ───────────────────────────
    const targetX = mouseRef.current.y * MOUSE_SENS + scrollY * SCROLL_X_SENS
    const targetY = mouseRef.current.x * MOUSE_SENS
    outer.rotation.x += (targetX - outer.rotation.x) * MOUSE_SMOOTH
    outer.rotation.y += (targetY - outer.rotation.y) * MOUSE_SMOOTH

    // ── Camera zoom on scroll ─────────────────────────────────────────────
    const targetZ = CAMERA_Z - scrollY * SCROLL_ZOOM
    camera.position.z += (Math.max(targetZ, 2.0) - camera.position.z) * 0.05
  })

  return (
    <group ref={outerGroupRef}>
      <group ref={innerGroupRef}>
        <primitive object={geo.lineSegs} />
        <primitive object={geo.pts} />
      </group>
    </group>
  )
}

// ── Default export ────────────────────────────────────────────────────────────
export default function IcosahedronBackground() {
  const { resolvedTheme } = useTheme()
  const isMounted         = useIsMounted()

  if (!isMounted) return null

  const accentColor  = resolvedTheme === 'light' ? '#00b37a' : '#00e5a0'
  // Shared ref: TypingOverlay sets it, IcosahedronScene reads it in useFrame
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isOpeningRef = useRef(false)

  return (
    <>
      <TypingOverlay isOpeningRef={isOpeningRef} />
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <Canvas
          frameloop="always"
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 100 }}
          style={{ background: 'transparent' }}
        >
          <IcosahedronScene accentColor={accentColor} isOpeningRef={isOpeningRef} />
        </Canvas>
      </div>
    </>
  )
}
