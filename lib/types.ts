export type Profile = {
  role: string;
  name: string;
  bio: string;
  skills: string[];
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
};

export type Experience = {
  period: string;
  company?: string;
  role: string;
  description: string;
  skills: string[];
};

export type Certification = {
  year: string;
  icon?: string;
  name: string;
  description: string;
  tags: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  stars: number;
  skills: string[];
  thumbnail?: string;
  url?: string;
};

export type Writing = {
  id: string;
  date: string;
  platform: string;
  title: string;
  description: string;
  views: number;
  url?: string;
};
