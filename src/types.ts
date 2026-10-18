export interface Profile {
  name: string;
  occupation: string;
  bio: string;
  email: string;
  futureGoal?: string;
  avatarUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
  twitterUrl?: string;
}

export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  title?: string;
  isIframe?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Video URL or animated demo preview
  thumbnail: string;
  media?: MediaItem[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design & UX' | 'Tools & Cloud';
  level: number; // 0-100 percentage
  iconName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeUrl?: string;
  description: string;
  scorePercentage: number; // 0-100 score/progress bar
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  boardOrCampus?: string;
  location?: string;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  education: Education[];
  messages: ContactMessage[];
}
