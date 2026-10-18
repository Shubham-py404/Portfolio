import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Shubham Bansal",
    occupation: "Computer Science Student & AI Developer",
    bio: "Dynamic Computer Science student with strong Data Structures & Algorithms expertise. Proficient in C/C++, Java, Python, and SQL, leveraging AI tools to accelerate development and build innovative applications.",
    location: "Delhi-NCR, India",
    email: "bansalshubham0105@gmail.com",
    avatarUrl: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com/in/Shubham/",
    twitterUrl: "https://x.com"
  },
  projects: [
    {
      id: "proj-1",
      title: "Text to Image Generator",
      description: "Generates descriptive visual content from text prompts by interfacing with Hugging Face's generative models via API calls, then processing and saving returned image data directly to local directory.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      tags: ["Hugging Face API", "Python", "Generative AI", "API Integration"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-2",
      title: "Command Shell in C++",
      description: "Built a custom Unix-style command-line shell with a robust REPL, leveraging low-level system calls like fork() and execvp() for process management.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      tags: ["C++", "Unix/Linux", "Systems Programming", "POSIX System Calls"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true
    }
  ],
  skills: [
    { id: "sk-1", name: "Data Structures & Algorithms", category: "Backend", level: 95, iconName: "Code" },
    { id: "sk-2", name: "C / C++ Programming", category: "Backend", level: 92, iconName: "FileCode" },
    { id: "sk-3", name: "Python & Machine Learning Tools", category: "Backend", level: 90, iconName: "Server" },
    { id: "sk-4", name: "Java & Object-Oriented Design", category: "Backend", level: 88, iconName: "Server" },
    { id: "sk-5", name: "HTML, CSS, JavaScript, React & Next.js", category: "Frontend", level: 88, iconName: "Layout" },
    { id: "sk-6", name: "Google Cloud Platform & Vertex AI", category: "Tools & Cloud", level: 89, iconName: "Database" },
    { id: "sk-7", name: "Git/GitHub, Unix/Linux & Docker", category: "Tools & Cloud", level: 87, iconName: "Activity" },
    { id: "sk-8", name: "Hugging Face & Supabase", category: "Tools & Cloud", level: 86, iconName: "Sparkles" }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Secured 8th Rank in Hack India Hackathon",
      issuer: "Hack India National Hackathon",
      issueDate: "2024",
      description: "Secured 8th rank nationwide in Hack India Hackathon for constructing innovative AI-driven software applications.",
      scorePercentage: 98
    },
    {
      id: "ach-2",
      title: "Secured 2nd Rank in Code Fusion Intercollege Competition",
      issuer: "Code Fusion (DSA + Aptitude)",
      issueDate: "2024",
      description: "Secured 2nd rank across intercollege coding competition testing Data Structures, Algorithms, and logical problem-solving aptitude.",
      scorePercentage: 99
    },
    {
      id: "ach-3",
      title: "300+ Solved DSA Problems on LeetCode",
      issuer: "LeetCode Platform",
      issueDate: "2024",
      credentialUrl: "https://leetcode.com",
      description: "Solved over 300 algorithm problems across LeetCode demonstrating mastery in Dynamic Programming, Graphs, Trees, and Logic.",
      scorePercentage: 95
    },
    {
      id: "ach-4",
      title: "OCI Generative AI Professional",
      issuer: "Oracle University",
      issueDate: "2024",
      credentialUrl: "https://education.oracle.com",
      description: "Oracle certified professional in Generative AI, Large Language Models (LLMs), RAG pipelines, and model deployment.",
      scorePercentage: 96
    },
    {
      id: "ach-5",
      title: "IBM - Project-Based Experiential Learning (PBEL) Generative AI",
      issuer: "IBM Virtual Internship",
      issueDate: "2024",
      description: "Hands-on internship credential building real-world enterprise Generative AI workflows, prompts, and model pipelines.",
      scorePercentage: 94
    },
    {
      id: "ach-6",
      title: "C++ Essentials 1 Certificate",
      issuer: "Cisco Networking Academy",
      issueDate: "2024",
      credentialUrl: "https://netacad.com",
      description: "Certified in core C++ object-oriented principles, memory management, pointers, and standard algorithms.",
      scorePercentage: 95
    },
    {
      id: "ach-7",
      title: "Prompt Design in Vertex AI Skill Badge",
      issuer: "Google Cloud Platform",
      issueDate: "2024",
      credentialUrl: "https://cloud.google.com",
      description: "Earned Google Cloud skill badge for prompt design, multimodal AI, and tuning Vertex AI models.",
      scorePercentage: 96
    }
  ],
  messages: []
};

