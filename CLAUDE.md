# CLAUDE.md

このファイルはリポジトリで作業する際の Claude Code (claude.ai/code) へのガイダンスです。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint 実行
npm run start    # 本番サーバー起動（要ビルド）
```

## アーキテクチャ

**Next.js 16 App Router** + **React 19** + **TypeScript** で構築したポートフォリオサイト。

### ページ別レイアウト方針

| ページ | レイアウト | 備考 |
|---|---|---|
| `/` | `PageLayout`（3カラム固定） | 左Hero固定・中央スクロール・右ナビ固定 |
| `/projects` | 独立レイアウト（サイドバーなし） | `max-w-6xl` 中央寄せ・sm:2カラム/lg:3カラムグリッド |
| `/writing` | 独立レイアウト（サイドバーなし） | `max-w-5xl` 中央寄せ・sm:2カラムカードグリッド |

### ディレクトリ構成

```
app/
  layout.tsx          — ルートレイアウト：metadata・ThemeProvider (next-themes)・フォント
  page.tsx            — トップページ：PageLayout + 全セクションの組み立て
  globals.css         — CSS変数（dark/light）・ベーススタイル
  projects/page.tsx   — プロジェクト一覧（独立レイアウト・lg:3カラムグリッド）
  writing/page.tsx    — 記事一覧（独立レイアウト・sm:2カラムカードグリッド）

components/
  layout/
    PageLayout.tsx    — 3カラム共通ラッパー（トップページ専用）
                        左・右 aside は lg:justify-center で垂直中央揃え
    HeroPanel.tsx     — 左固定：名前・bio・スキル・SNSリンク・ThemeToggle
    NavPanel.tsx      — 右固定：セクションナビ（Intersection Observer でアクティブ検知）
    MobileMenu.tsx    — SP用：固定ヘッダー + ハンバーガーオーバーレイメニュー
    ThemeToggle.tsx   — ダーク/ライト切り替えボタン（マウント検知に useSyncExternalStore 使用）
  sections/
    Experience.tsx    — タイムライン形式（期間・役職・バッジ）
    Certifications.tsx — カード形式（年・資格名・説明・タグ）
    Projects.tsx      — 上位4件：next/image サムネイル + "View more →" (/projects へ)
    Writing.tsx       — 上位5件：記事リスト + "View more →" (/writing へ)
    Contact.tsx       — メール CTA + フッター
  ui/
    Badge.tsx         — ティール枠のスキルバッジ
    SectionLabel.tsx  — セクション見出し（EXPERIENCE 等）

lib/
  types.ts            — 全コンテンツの TypeScript 型定義（microCMS 移行対応設計）
  data.ts             — 静的ダミーデータ（types.ts の型を import）

public/
  projects/           — SVG プレースホルダーサムネイル（portfolio, ui-kit, saas-dashboard, markdown-editor）
```

### スタイリング：Tailwind CSS v4
- `app/globals.css` に `@import "tailwindcss"` で設定（`tailwind.config.js` なし）
- `@theme inline { ... }` でフォントエイリアス（`--font-sans`/`--font-mono`）と `--color-*` Tailwind トークンを定義
- PostCSS プラグインは `@tailwindcss/postcss`（`tailwindcss` ではない）
- **ダーク/ライトの色** は CSS カスタムプロパティで管理（`--bg`・`--text`・`--accent` 等）
  - `:root` = ダークのデフォルト値、`.light` クラスでライトパレットに上書き
- **重要**: 全コンポーネントは色にTailwindユーティリティクラスを使わず、`style={{ color: "var(--accent)" }}` のようなインラインCSS変数パターンを統一使用

### ダークモード（next-themes）
- `app/layout.tsx` で `<ThemeProvider attribute="class" defaultTheme="dark">` を設定
- next-themes が `<html>` に `class="dark"` または `class="light"` を付与
- CSS: `:root {}` (ダーク) + `.light {}` (ライト) — Tailwind の `dark:` バリアントは未使用
- `ThemeToggle.tsx` はマウント検知に `useSyncExternalStore` を使用（`useEffect+setState` だと ESLint の `react-hooks/set-state-in-effect` エラーになるため）

### アニメーション（framer-motion v12）
- 全セクションコンポーネントは `"use client"` で `motion.div` / `motion.a` を使用
- パターン: `initial={{ opacity: 0, y: 16 }}` + `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`

### パスエイリアス
`@/*` はプロジェクトルート（`./`）に解決される。例: `import Foo from "@/components/Foo"`

### ESLint
`eslint.config.mjs` のフラット設定形式で `eslint-config-next/core-web-vitals` と `eslint-config-next/typescript` を使用。

### フォント
Geist Sans と Geist Mono を `app/layout.tsx` で `next/font/google` から読み込み、CSS 変数 `--font-geist-sans` / `--font-geist-mono` として公開。

### データ層（microCMS 移行パス）
- `lib/types.ts` — コンテンツ型のみ（`Profile`・`Experience`・`Certification`・`Project`・`Writing`）
- `lib/data.ts` — その型を import して静的配列をエクスポート（projects: 6件、writings: 6件）
  - トップページの各セクションは先頭4件（Projects）・5件（Writing）のみ表示
- microCMS 移行時: `lib/data.ts` のエクスポートを SDK フェッチに置き換えるだけでよい設計

### next/image と SVG
`public/projects/` の SVG サムネイルは `<Image unoptimized />` で描画し、Next.js の画像最適化をバイパスしている。
