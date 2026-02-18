import type { Profile, Experience, Certification, Project, Writing } from "./types";

export const profile: Profile = {
  role: "Frontend Engineer",
  name: "Shogo Hayasaka",
  bio: "モダンで高品質なWebフロントエンドの開発を専門とするフリーランスエンジニアです。React / Next.js を中心に、パフォーマンスとアクセシビリティを意識したUI実装が得意です。",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js"],
  social: {
    github: "https://github.com/taro-yamada",
    twitter: "https://twitter.com/taro_yamada",
    linkedin: "https://linkedin.com/in/taro-yamada",
    email: "hello@taro-yamada.dev",
  },
};

export const experiences: Experience[] = [
  {
    period: "2022 — 現在",
    company: "フリーランス",
    role: "フロントエンドエンジニア",
    description:
      "複数のスタートアップや中規模企業のフロントエンド開発を担当。Next.js App Router への移行、デザインシステム構築、パフォーマンス改善（Core Web Vitals）などを手がける。",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Storybook"],
  },
  {
    period: "2020 — 2022",
    company: "株式会社テックスタジオ",
    role: "フロントエンドエンジニア",
    description:
      "BtoB SaaS プロダクトのフロントエンドを担当。React + Redux から React Query へのリアーキテクチャを主導し、API コール数を 40% 削減。",
    skills: ["React", "TypeScript", "React Query", "Jest"],
  },
  {
    period: "2018 — 2020",
    company: "合同会社ウェブクラフト",
    role: "Webエンジニア",
    description:
      "コーポレートサイトやECサイトの実装。WordPress テーマ開発から React への移行期を経験し、モダンフロントエンドの基礎を習得。",
    skills: ["React", "JavaScript", "WordPress", "SCSS"],
  },
];

export const certifications: Certification[] = [
  {
    year: "2023",
    name: "AWS Certified Solutions Architect – Associate",
    description:
      "AWSのアーキテクチャ設計に関する知識を証明する認定資格。フロントエンドのデプロイ基盤設計にも活用。",
    tags: ["AWS", "クラウド", "インフラ"],
  },
  {
    year: "2022",
    name: "Google Lighthouse Performance 専門研修修了",
    description:
      "Core Web Vitals の計測・改善手法を体系的に学習。LCP / CLS / INP の最適化を実務に応用。",
    tags: ["パフォーマンス", "Web最適化"],
  },
  {
    year: "2021",
    name: "情報処理技術者試験（応用情報技術者）",
    description:
      "IPA が主催する国家試験。ネットワーク・データベース・セキュリティなど幅広いIT知識を習得。",
    tags: ["IPA", "国家資格"],
  },
];

export const projects: Project[] = [
  {
    id: "portfolio",
    name: "Portfolio v3",
    description:
      "Next.js App Router + Tailwind CSS v4 で構築した本ポートフォリオサイト。ダークモード・アニメーション・SEO 最適化を含む。",
    stars: 42,
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "framer-motion"],
    thumbnail: "/projects/portfolio.svg",
    url: "https://github.com/taro-yamada/portfolio",
  },
  {
    id: "ui-kit",
    name: "React UI Kit",
    description:
      "Storybook ドキュメント付きのコンポーネントライブラリ。アクセシビリティ（WAI-ARIA）に準拠し、CI でビジュアルリグレッションテストを実施。",
    stars: 128,
    skills: ["React", "TypeScript", "Storybook", "Chromatic"],
    thumbnail: "/projects/ui-kit.svg",
    url: "https://github.com/taro-yamada/react-ui-kit",
  },
  {
    id: "saas-dashboard",
    name: "SaaS Dashboard Starter",
    description:
      "Next.js + Prisma + Tailwind CSS で構築したマルチテナント SaaS のスターターキット。認証・権限管理・課金連携を含む。",
    stars: 256,
    skills: ["Next.js", "Prisma", "NextAuth.js", "Stripe"],
    thumbnail: "/projects/saas-dashboard.svg",
    url: "https://github.com/taro-yamada/saas-dashboard",
  },
  {
    id: "markdown-editor",
    name: "Markdown Live Editor",
    description:
      "リアルタイムプレビュー付きの Markdown エディタ。Codemirror 6 + remark で実装し、localStorage に自動保存する。",
    stars: 87,
    skills: ["React", "Codemirror", "remark", "TypeScript"],
    thumbnail: "/projects/markdown-editor.svg",
    url: "https://github.com/taro-yamada/markdown-editor",
  },
  {
    id: "cli-tool",
    name: "create-app CLI",
    description:
      "プロジェクトの雛形を対話的に生成する CLI ツール。Next.js / Vite / Remix のテンプレートを選択可能。",
    stars: 63,
    skills: ["Node.js", "TypeScript", "Inquirer.js"],
    url: "https://github.com/taro-yamada/create-app",
  },
  {
    id: "animation-lib",
    name: "Scroll Animation Hooks",
    description:
      "Intersection Observer をラップした React カスタムフックライブラリ。スクロール連動アニメーションを宣言的に実装できる。",
    stars: 34,
    skills: ["React", "TypeScript", "Rollup"],
    url: "https://github.com/taro-yamada/scroll-animation-hooks",
  },
];

export const writings: Writing[] = [
  {
    id: "nextjs-app-router-tips",
    date: "2024-01-15",
    platform: "Zenn",
    title: "Next.js App Router 移行で学んだ10のこと",
    description:
      "Pages Router から App Router へ実案件を移行した際のつまずきポイントと解決策をまとめた記事。Server Components の思考モデルを中心に解説。",
    views: 12400,
    url: "https://zenn.dev/taro_yamada/articles/nextjs-app-router-tips",
  },
  {
    id: "tailwind-v4-guide",
    date: "2024-03-08",
    platform: "Zenn",
    title: "Tailwind CSS v4 移行ガイド：v3との違いと新機能まとめ",
    description:
      "CSS-first 設定や @theme ディレクティブなど、v4 の破壊的変更を実例付きで解説。プロジェクトへの段階的導入方法も紹介。",
    views: 8700,
    url: "https://zenn.dev/taro_yamada/articles/tailwind-v4-guide",
  },
  {
    id: "core-web-vitals-2024",
    date: "2024-05-20",
    platform: "note",
    title: "Core Web Vitals 改善実録：LCP を 4.2s → 1.1s にした方法",
    description:
      "実際のプロジェクトで LCP を 75% 改善した手順を公開。画像最適化・フォント戦略・Server Components 活用の三本柱で達成。",
    views: 6200,
    url: "https://note.com/taro_yamada/n/core-web-vitals-2024",
  },
  {
    id: "typescript-patterns",
    date: "2024-07-10",
    platform: "Zenn",
    title: "フロントエンドで使う TypeScript 型パターン集",
    description:
      "discriminated union・branded types・satisfies など、フロントエンド開発で実際に役立つ型テクニックをユースケース別に整理。",
    views: 9800,
    url: "https://zenn.dev/taro_yamada/articles/typescript-patterns",
  },
  {
    id: "accessibility-checklist",
    date: "2024-09-05",
    platform: "Qiita",
    title: "フロントエンドエンジニアのアクセシビリティ実装チェックリスト",
    description:
      "WAI-ARIA・キーボード操作・色コントラストなど、実装時に確認すべき項目を網羅したチェックリスト。スクリーンリーダーテスト手順も含む。",
    views: 5400,
    url: "https://qiita.com/taro_yamada/items/accessibility-checklist",
  },
  {
    id: "react-server-components",
    date: "2024-11-18",
    platform: "Zenn",
    title: "React Server Components 完全理解ガイド",
    description:
      "RSC の動作原理から実装パターン、よくある落とし穴まで。useState が使えない理由から始まり、データフェッチの最適化まで詳しく解説。",
    views: 15600,
    url: "https://zenn.dev/taro_yamada/articles/react-server-components",
  },
];
