export type Profile = {
  role: string;
  name: string;
  bio: string;
  skills: string[];
  social: {
    x?: string;
    instagram?: string;
    github?: string;
    note?: string;
    zenn?: string;
  };
};

export type Experience = {
  period: string;
  title: string;
  description: string;
  skills?: string[];
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
  skills: string[];
  thumbnail?: string;
  url?: string;
  github?: string;
};

export type Writing = {
  id: string;
  date: string;
  platform: string;
  title: string;
  description: string;
  url?: string;
};
