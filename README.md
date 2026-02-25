# Portfolio — Shogo Hayasaka

個人ポートフォリオサイト。Next.js 16 App Router + React 19 + TypeScript で構築。

![mock](./public/mock.jpg)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript / React 19
- **Styling**: Tailwind CSS v4
- **3D**: Three.js + react-three/fiber
- **Animation**: framer-motion v12 / Lenis (慣性スクロール)
- **CMS**: microCMS
- **Font**: Geist Sans / Geist Mono

## Getting Started

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint 実行
npm run start    # 本番サーバー起動（要ビルド）
```

## Environment Variables

`.env.local` に以下を設定：

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
SLACK_WEBHOOK_URL=your-webhook-url   # コンタクトフォーム、slack通知用
```

## Project Structure

```
app/
  layout.tsx            — ルートレイアウト
  page.tsx              — トップページ
  globals.css           — CSS変数・ベーススタイル
  projects/page.tsx     — プロジェクト一覧
  writing/page.tsx      — 記事一覧
  api/contact/route.ts  — コンタクトフォーム API

components/
  background/           — Three.js 3D背景（IcosahedronBackground）
  layout/               — PageLayout / HeroPanel / NavPanel / MobileMenu / Footer
  sections/             — Experience / Skills / Certifications / Projects / Writing / Contact
  projects/             — ProjectGrid / ProjectLinkButton
  writing/              — WritingGrid
  ui/                   — Badge / SectionLabel / SlideButton

lib/
  types.ts              — 型定義
  microcms.ts           — microCMS クライアント
  data.ts               — データフェッチ関数
  contactSchema.ts      — Zod バリデーション
```

## Pages

| ページ | レイアウト |
|---|---|
| `/` | 3カラム固定（左Hero・中央コンテンツ・右ナビ） |
| `/projects` | 独立レイアウト・lg:3カラムグリッド |
| `/writing` | 独立レイアウト・sm:2カラムカードグリッド |
