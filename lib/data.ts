import type { Profile, Experience, Certification, Project, Writing } from "./types";
import { getClient } from "./microcms";

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

type MicroCMSTextField = { fieldId: string; name: string };
type MicroCMSImageField = { url: string; width: number; height: number };

type MicroCMSProject = Omit<Project, "skills" | "thumbnail"> & {
  skills: MicroCMSTextField[];
  thumbnail?: string | MicroCMSImageField;
};

type MicroCMSWriting = Writing;

export async function getProjects(): Promise<Project[]> {
  const data = await getClient().getList<MicroCMSProject>({ endpoint: "projects", queries: { limit: 100 } });
  return data.contents.map((item) => ({
    ...item,
    skills: item.skills.map((s) => s.name),
    thumbnail: typeof item.thumbnail === "object" ? item.thumbnail?.url || undefined : item.thumbnail || undefined,
    url: item.url || undefined,
  }));
}

export async function getWritings(): Promise<Writing[]> {
  const data = await getClient().getList<MicroCMSWriting>({ endpoint: "writings", queries: { limit: 100 } });
  return data.contents.map((item) => ({
    ...item,
    url: item.url || undefined,
  }));
}
