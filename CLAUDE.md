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
  layout.tsx          — ルートレイアウト：metadata・ThemeProvider・SmoothScroll・BackgroundWrapper・MobileMenu・フォント
  page.tsx            — トップページ：PageLayout + 全セクションの組み立て
  globals.css         — CSS変数（dark/light）・ベーススタイル・オープニングアニメーション
  projects/page.tsx   — プロジェクト一覧（独立レイアウト・lg:3カラムグリッド）
  writing/page.tsx    — 記事一覧（独立レイアウト・sm:2カラムカードグリッド）

components/
  SmoothScroll.tsx          — Lenis 慣性スクロール初期化（layout.tsx から全ページに適用）
  background/
    BackgroundWrapper.tsx     — dynamic import ラッパー（SSR: false で3D背景を読み込み）
    IcosahedronBackground.tsx — Three.js + react-three/fiber 3D正二十面体シーン
                                 タイピングオーバーレイ・ブルーム展開・マウストラッキング・
                                 スクロール追従・テーマ対応・アニメーション中スクロールロック
  layout/
    PageLayout.tsx    — 3カラム共通ラッパー（トップページ専用）
                        SP: HeroPanel を min-h-screen + justify-center で全画面表示
                        MobileMenu は layout.tsx に移動済み（.page-content の外）
    HeroPanel.tsx     — 左固定：名前・bio・SNSリンク（accent色）・ThemeToggle
    NavPanel.tsx      — 右固定：セクションナビ（Intersection Observer でアクティブ検知）
                        NAV_SECTIONS: experience / skills / certifications / projects / writing / contact
    MobileMenu.tsx    — SP用ハンバーガーメニュー（layout.tsx で .page-content 外にレンダリング）
                        開閉時 framer-motion アニメーション・開放中 body.overflow:hidden
    ThemeToggle.tsx   — ダーク/ライト切り替えボタン（マウント検知に useSyncExternalStore 使用）
  projects/
    ProjectGrid.tsx   — /projects 専用グリッド（sm:2/lg:3カラム・サムネイルホバー・ExternalLink アイコン）
  sections/
    Experience.tsx    — タイムライン形式（期間・役職・バッジ）
    Skills.tsx        — 3カテゴリ（Languages / Frameworks / Tools）スキルチップ表示
                        react-icons/si（Simple Icons）+ react-icons/vsc でアイコン付きバッジ
    Certifications.tsx — カード形式（年・資格名・説明・タグ）
    Projects.tsx      — 上位4件：SP=1カラムカードグリッド / lg=横並びリスト + "View more →"
    Writing.tsx       — 上位4件：記事リスト + "View more →" (/writing へ)
    Contact.tsx       — メール CTA + フッター
  ui/
    Badge.tsx         — ティール枠のスキルバッジ
    SectionLabel.tsx  — セクション見出し（EXPERIENCE 等）
  writing/
    WritingGrid.tsx   — /writing 専用グリッド（sm:2カラム・日付・プラットフォームタグ）

lib/
  types.ts            — 全コンテンツの TypeScript 型定義
                        Project: id/name/description/skills[]/thumbnail?/url?（stars 削除済み）
                        Writing: id/date/platform/title/description/url?（views 削除済み）
  microcms.ts         — microCMS SDK クライアントファクトリー（getClient() を遅延生成）
  data.ts             — 静的データ + microCMS フェッチ関数
                        静的: profile・experiences・certifications
                        async: getProjects()・getWritings()

public/
  projects/           — SVG プレースホルダーサムネイル（portfolio, ui-kit, saas-dashboard, markdown-editor）
```

### スタイリング：Tailwind CSS v4
- `app/globals.css` に `@import "tailwindcss"` で設定（`tailwind.config.js` なし）
- `@theme inline { ... }` でフォントエイリアス（`--font-sans`/`--font-mono`）と `--color-*` Tailwind トークンを定義
- PostCSS プラグインは `@tailwindcss/postcss`（`tailwindcss` ではない）
- **ダーク/ライトの色** は CSS カスタムプロパティで管理（`--bg`・`--text`・`--accent` 等）
  - `:root` = ダークのデフォルト値、`.light` クラスでライトパレットに上書き
- **グラスモーフィズム変数**: `--glass-bg`・`--glass-border`（`backdropFilter: blur(4px)` と組み合わせて使用、全コンポーネント統一）
- **重要**: 全コンポーネントは色にTailwindユーティリティクラスを使わず、`style={{ color: "var(--accent)" }}` のようなインラインCSS変数パターンを統一使用

### ダークモード（next-themes）
- `app/layout.tsx` で `<ThemeProvider attribute="class" defaultTheme="dark">` を設定
- next-themes が `<html>` に `class="dark"` または `class="light"` を付与
- CSS: `:root {}` (ダーク) + `.light {}` (ライト) — Tailwind の `dark:` バリアントは未使用
- `ThemeToggle.tsx` はマウント検知に `useSyncExternalStore` を使用（`useEffect+setState` だと ESLint の `react-hooks/set-state-in-effect` エラーになるため）

### 慣性スクロール（Lenis）
- `components/SmoothScroll.tsx` で Lenis を初期化し、`app/layout.tsx` から全ページに適用
- `duration: 1.2`・指数関数的イージングで自然な慣性感
- `scroll-behavior: smooth`（globals.css）は Lenis と競合するため削除済み
- `window.scrollY` はネイティブ互換で更新されるため、3D背景のスクロール追従もそのまま動作

### アニメーション（framer-motion v12）
- 全セクションコンポーネントは `"use client"` で `motion.div` / `motion.a` を使用
- パターン: `initial={{ opacity: 0, y: 16 }}` + `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`

### 3D 背景（Three.js + react-three/fiber）
- `components/background/BackgroundWrapper.tsx`: `dynamic(() => import('./IcosahedronBackground'), { ssr: false })` でSSRを無効化しハイドレーションエラーを防ぐ
- `components/background/IcosahedronBackground.tsx`:
  - `useFrame` フックでフレームごとのアニメーション
  - `BufferGeometry` / `BufferAttribute` でカスタム正二十面体ジオメトリ
  - ブルーム展開・マウストラッキング（リアルタイムチルト）・スクロール追従ズーム・自動回転
  - `sessionStorage` で初回のみタイピングアニメーションを再生、再訪問時はスキップ
  - `body` に `'opening-done'` クラスを付与してCSSトランジションと連携
  - テーマ検知も `useSyncExternalStore` を使用

### オープニングシーケンス
- 初回訪問時: `IcosahedronBackground` 内の `TypingOverlay` がタイピングアニメーションを表示
- **アニメーション中は `body.overflow: hidden` でスクロールをロック**、完了時に解除
- アニメーション完了後 → 3Dシーンのブルーム展開 → `body.opening-done` クラス付与 → `.page-content` フェードイン
- `app/globals.css` に `.page-content` のフェードイン用キーフレームを定義
- 再訪問時: `sessionStorage` のフラグを検知してアニメーションをスキップ

### アイコン
- **lucide-react**: `ProjectGrid.tsx` / `Projects.tsx` / `Writing.tsx` / `WritingGrid.tsx` — `ExternalLink`（外部リンク表示）
- **react-icons**: `Skills.tsx` — `react-icons/si`（Simple Icons）+ `react-icons/vsc` でスキルバッジにブランドロゴを表示

### パスエイリアス
`@/*` はプロジェクトルート（`./`）に解決される。例: `import Foo from "@/components/Foo"`

### ESLint
`eslint.config.mjs` のフラット設定形式で `eslint-config-next/core-web-vitals` と `eslint-config-next/typescript` を使用。

### フォント
Geist Sans と Geist Mono を `app/layout.tsx` で `next/font/google` から読み込み、CSS 変数 `--font-geist-sans` / `--font-geist-mono` として公開。

### データ層（microCMS 統合済み）
- `lib/microcms.ts` — `getClient()` 関数でモジュール初期化時ではなくリクエスト時にクライアントを生成（環境変数未設定でも build が通る）
- `lib/data.ts`:
  - **静的**: `profile`・`experiences`・`certifications`（配列をそのままエクスポート）
  - **動的**: `getProjects()` / `getWritings()` — microCMS SDK でフェッチし `Project[]` / `Writing[]` を返す
- **microCMS レスポンス正規化**（`getProjects()` 内）:
  - `skills`: `{fieldId, name}[]` → `string[]`（`.name` を抽出）
  - `thumbnail`: テキスト型（string）・画像型（`{url,width,height}`）の両方に対応
  - `thumbnail` / `url`: 空文字 → `undefined` に正規化
- **全ページ `export const dynamic = "force-dynamic"`**: microCMS フェッチを伴うページは静的生成をオプトアウト
- **環境変数**: `.env.local` に `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を設定

### next/image
- 全サムネイルは `<Image unoptimized />` で描画し、Next.js の画像最適化・ドメイン検証をバイパス
- サムネイルは `object-top`（上部中央基準）でトリミング表示
- `public/projects/` に SVG プレースホルダーサムネイルあり（portfolio, ui-kit, saas-dashboard, markdown-editor）
