export type Blog = {
  content: string;
  metadata: {
    publishedAt: string;
    summary: string;
    title: string;
    image?: string;
  };
  slug: string;
};

export type Skill = {
  category: string;
  name: string;
  level: string;
  icon: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  slug: string;
  featured?: boolean;
  year: string;
};
