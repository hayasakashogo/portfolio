import type { Profile, Experience, Certification, Project, Writing } from "./types";
import { getClient } from "./microcms";

export const profile: Profile = {
  role: "Webエンジニア/宅地建物取引士",
  name: "Shogo Hayasaka",
  bio: "フロントエンドエンジニアとして、UI/UXにこだわったWebの設計・実装に日々向き合っています。2025年には宅地建物取引士を取得。技術の枠にとどまらず、異分野にも手を伸ばしながら、自分だけの視座を持つエンジニアでありたいと考えています。",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js"],
  social: {
    x: "",
    instagram: "",
    github: "https://github.com/hayasakashogo",
    note: "https://note.com/shogo_freelance",
    zenn: "https://zenn.dev/hayasakashogo",
  },
};

export const experiences: Experience[] = [
  {
    period: "2022 — 2025",
    title: "新卒でデジタルマーケティング企業（東証プライム上場）に入社",
    description: "Reactを用いた顧客管理ツールの開発、WordPressサイトの構築、ECサイトの運用など、多様な技術領域を横断的に経験。フロントエンドエンジニアとしての土台を築いた。",
    skills: [
      "HTML",
      "CSS",
      "Sass",
      "JavaScript",
      "JQuery",
      "React",
      "TypeScript",
      "WordPress",
      "Smarty",
    ],
  },
  {
    period: "2025",
    title: "フリーランスとして独立",
    description:
      "ECサイトのフロントエンド開発を中心に、新機能実装・新サービス立ち上げ・UI/UX改善・リアーキテクチャなど幅広く担当。個人開発でもAIや最新技術を積極的に取り込み、技術の幅を広げている。",
    skills: ["JavaScript", "TypeScript", "Next.js", "Claude Code"],
  },
  {
    period: "2025-現在",
    title: "宅地建物取引士を取得",
    description:
      "今後はエンジニアリングとの掛け合わせに加え、SEOの知見を不動産領域の記事執筆に展開するなど、技術と異分野の接点を探っている。",
  },
];

export const certifications: Certification[] = [
  {
    year: "2025",
    name: "宅地建物取引士",
    description:
      "不動産取引の専門家として、法律・税制・実務など幅広い知識を習得。",
    tags: ["国家資格", "国土交通省"],
  },
  {
    year: "2024",
    name: "Webライティング能力検定 1級",
    description:
      "SEOを意識したWebコンテンツの企画・執筆能力を認定する資格。",
    tags: [
      "日本Webライティング協会",
      "SEO", 
    ],
  },
];

type MicroCMSTextField = { fieldId: string; name: string };
type MicroCMSImageField = { url: string; width: number; height: number };

type MicroCMSProject = Omit<Project, "skills" | "thumbnail"> & {
  skills: MicroCMSTextField[];
  thumbnail?: string | MicroCMSImageField;
  github?: string;
};

type MicroCMSWriting = Writing;

export async function getProjects(): Promise<Project[]> {
  const data = await getClient().getList<MicroCMSProject>({ endpoint: "projects", queries: { limit: 100 } });
  return data.contents.map((item) => ({
    ...item,
    skills: item.skills.map((s) => s.name),
    thumbnail: typeof item.thumbnail === "object" ? item.thumbnail?.url || undefined : item.thumbnail || undefined,
    url: item.url || undefined,
    github: item.github || undefined,
  }));
}

export async function getWritings(): Promise<Writing[]> {
  const data = await getClient().getList<MicroCMSWriting>({ endpoint: "writings", queries: { limit: 100 } });
  return data.contents.map((item) => ({
    ...item,
    url: item.url || undefined,
  }));
}
