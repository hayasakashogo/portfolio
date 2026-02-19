"use client"

import { useRef, useEffect, useState, useMemo, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

// ── 定数 ────────────────────────────────────────────────────────────────
const ICO_RADIUS = 2.2
const CAMERA_Z   = 6.0
const FOV        = 50

// タイピングアニメーション
const TYPING_TEXT  = 'Hello, World.'
const TYPING_SPEED = 100   // 1文字あたりのms
const TYPING_START = 1500   // 最初の文字が出るまでの待機ms
const TYPING_END   = 1500  // 最後の文字の後、3Dが開くまでのms

// 3Dアニメーション
const SPREAD_AMOUNT   = 1.8     // 頂点が広がる距離
const OPEN_LERP       = 0.015   // 60fpsでのlerp速度
const ROTATE_Y        = 0.09    // rad/s  (0.0015 × 60)
const ROTATE_X        = 0.054   // rad/s  (0.0015 × 0.6 × 60)
const MOUSE_SENS      = 0.0003  // スクリーンピクセルあたりのrad
const MOUSE_SMOOTH    = 0.05    // マウスチルトのlerp滑らかさ
const SCROLL_X_SENS   = 0.0005  // スクロールpxあたりのX軸チルト
const SCROLL_ZOOM     = 0.0015  // スクロールpxあたりのカメラZ後退量

// ── 球体ジオメトリ ───────────────────────────────────────────────────────────
const W_SEG = 12  // 経度セグメント数（子午線）
const H_SEG = 8   // 緯度セグメント数（平行線 + 極）
// 内部リング: N = H_SEG - 1 = 7  →  総頂点数: 2 + 7×12 = 86

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

  // 北極
  setVert(0, 0, 1, 0)

  // 内部緯度リング
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

  // 南極
  setVert(numVerts - 1, 0, -1, 0)

  const edgeIndices: number[] = []

  // 北極 → 最初のリング
  for (let w = 0; w < W_SEG; w++) edgeIndices.push(0, 1 + w)

  // 各内部リング内の緯度線
  for (let h = 0; h < N; h++) {
    const base = 1 + h * W_SEG
    for (let w = 0; w < W_SEG; w++) {
      edgeIndices.push(base + w, base + (w + 1) % W_SEG)
    }
  }

  // 隣接リング間の経度線
  for (let h = 0; h < N - 1; h++) {
    for (let w = 0; w < W_SEG; w++) {
      edgeIndices.push(1 + h * W_SEG + w, 1 + (h + 1) * W_SEG + w)
    }
  }

  // 最後のリング → 南極
  const lastBase = 1 + (N - 1) * W_SEG
  for (let w = 0; w < W_SEG; w++) edgeIndices.push(lastBase + w, numVerts - 1)

  return { positions, explosionDirections, edgeIndices }
}

// ── SSRセーフなマウント検知 ─────────────────────────────────────────────────
const subscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

// ── タイピングオーバーレイ ───────────────────────────────────────────────────
function TypingOverlay({ isOpeningRef }: { isOpeningRef: { current: boolean } }) {
  // マウント時にsessionStorageを確認（クライアント専用コンポーネントなので常に安全）
  const alreadyOpened = useRef(!!sessionStorage.getItem('portfolio-opened'))

  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone]           = useState(alreadyOpened.current)

  useEffect(() => {
    // 同一セッションの再訪問: アニメーションをスキップ
    if (alreadyOpened.current) {
      isOpeningRef.current = true
      document.body.classList.add('opening-done')
      return
    }

    // アニメーション中はスクロールを禁止
    document.body.style.overflow = 'hidden'

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
            document.body.style.overflow = ''
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

// ── 3Dシーン ─────────────────────────────────────────────────────────────────
interface SceneProps {
  accentColor:  string
  isOpeningRef: { current: boolean }
}

function IcosahedronScene({ accentColor, isOpeningRef }: SceneProps) {
  const { camera } = useThree()

  // Three.jsオブジェクトを一度だけ生成
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

    // 円形ドットテクスチャ（デフォルトの正方形スプライトを置き換え）
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

  // アンマウント時にリソースを解放
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

  // テーマ変更時にマテリアルカラーを更新
  useEffect(() => {
    geo.lineMat.color.set(accentColor)
    geo.pointMat.color.set(accentColor)
  }, [accentColor, geo])

  // アニメーション用ref
  const outerGroupRef   = useRef<THREE.Group>(null) // マウスチルト + スクロール
  const innerGroupRef   = useRef<THREE.Group>(null) // 自動回転
  const bloomFactorRef  = useRef(0)
  const mouseRef        = useRef({ x: 0, y: 0 })
  const scrollYRef      = useRef(0)

  // グローバルイベントリスナー
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

    // ── ブルーム展開（タイピング後に 0 → SPREAD_AMOUNT） ─────────────────────
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

    // ── インナーグループ: 自動回転 ────────────────────────────────────────
    inner.rotation.x += ROTATE_X * dt
    inner.rotation.y += ROTATE_Y * dt

    // ── アウターグループ: マウスチルト + スクロールX軸チルト ───────────────────────
    const targetX = mouseRef.current.y * MOUSE_SENS + scrollY * SCROLL_X_SENS
    const targetY = mouseRef.current.x * MOUSE_SENS
    outer.rotation.x += (targetX - outer.rotation.x) * MOUSE_SMOOTH
    outer.rotation.y += (targetY - outer.rotation.y) * MOUSE_SMOOTH

    // ── スクロールによるカメラズーム ─────────────────────────────────────
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

// ── デフォルトエクスポート ────────────────────────────────────────────────────
export default function IcosahedronBackground() {
  const { resolvedTheme } = useTheme()
  const isMounted         = useIsMounted()

  if (!isMounted) return null

  const accentColor  = resolvedTheme === 'light' ? '#00b37a' : '#00e5a0'
  // 共有ref: TypingOverlayがセット、IcosahedronSceneがuseFrame内で参照
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
