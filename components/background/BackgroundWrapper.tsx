"use client"

import dynamic from "next/dynamic"

const IcosahedronBackground = dynamic(
  () => import("@/components/background/IcosahedronBackground"),
  { ssr: false }
)

export function BackgroundWrapper() {
  return <IcosahedronBackground />
}
