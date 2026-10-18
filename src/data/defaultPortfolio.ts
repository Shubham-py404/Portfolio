import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Shubham Bansal",
    occupation: "Computer Science Student & AI Developer",
    bio: "Dynamic Computer Science student with strong Data Structures & Algorithms expertise. Proficient in C/C++, Java, Python, and SQL, leveraging AI tools to accelerate development and build innovative applications.",
    email: "bansalshubham0105@gmail.com",
    futureGoal: "Pursue a Master's in Computer Science",
    avatarUrl: "",
    githubUrl: "https://github.com/Shubham-py404",
    linkedinUrl: "https://www.linkedin.com/in/shubham-bansal404",
    leetcodeUrl: "https://leetcode.com/u/Shubham-py404/",
    twitterUrl: "https://x.com"
  },
  projects: [
    {
      id: "proj-cpp-shell",
      title: "UNIX-Style Command Shell in C++",
      description: "A custom UNIX-style terminal shell engineered from the ground up in modern C++ to master low-level systems programming. Features a robust REPL workflow with process spawning, memory replacement, and process synchronization using POSIX syscalls (fork, execvp, waitpid). Implements custom native built-ins mapped via function pointers and a modular multi-file architecture.",
      videoUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7451518574310998016?compact=1",
      thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      media: [
        {
          type: "video",
          url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7451518574310998016?compact=1",
          title: "C++ Shell Demonstration Video",
          isIframe: true
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
          title: "POSIX Systems Architecture"
        }
      ],
      tags: ["C++", "POSIX Syscalls", "Systems Programming", "Unix/Linux", "REPL"],
      demoUrl: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7451518574310998016/",
      githubUrl: "https://github.com/Shubham-py404",
      featured: true
    },
    {
      id: "proj-get-me-coffee",
      title: "Get Me A Chai / Coffee (Patreon Clone)",
      description: "A full-stack creator crowdfunding and patronage platform designed to support digital creators with seamless micro-donations. Built with Next.js dynamic routing and server workflows, secure authentication with NextAuth, and custom MongoDB schemas. Fully integrated with the Razorpay payment gateway to process real-time supporter payments securely and reliably.",
      videoUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7405689588985389056?compact=1",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800",
      media: [
        {
          type: "video",
          url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7405689588985389056?compact=1",
          title: "Patreon Clone Demo Video",
          isIframe: true
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800",
          title: "Full-Stack Dashboard & Payments"
        }
      ],
      tags: ["Next.js", "MongoDB", "Razorpay", "NextAuth", "Full-Stack"],
      demoUrl: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7405689588985389056/",
      githubUrl: "https://github.com/Shubham-py404",
      featured: true
    },
    {
      id: "proj-janseva",
      title: "JanSeva AI – Conversational Public Services",
      description: "A centralized conversational AI digital assistant built to eliminate bureaucratic friction across fragmented government portals. Replaces complex, multi-step public service applications with dynamic interactive forms and persistent context directly inside the chat interface. Employs a secure wrapper layer over existing departmental infrastructure to fetch status and process requests effortlessly.",
      thumbnail: "local:janseva-1",
      media: [
        {
          type: "image",
          url: "local:janseva-1",
          title: "JanSeva Conversational Interface"
        },
        {
          type: "image",
          url: "local:janseva-2",
          title: "Departmental Portal Simulation"
        }
      ],
      tags: ["Conversational AI", "Next.js", "Context Architecture", "GovTech", "React"],
      demoUrl: "https://github.com/Shubham-py404",
      githubUrl: "https://github.com/Shubham-py404",
      featured: true
    },
    {
      id: "proj-text-to-image",
      title: "AI Text-to-Image Generator (Stable Diffusion)",
      description: "A generative AI application that synthesizes high-fidelity visual artwork from descriptive natural language prompts using Stable Diffusion v1.5. Built using PyTorch, Hugging Face diffusers, and safetensors, optimized with GPU acceleration for rapid inference. Encapsulated in a modern, interactive Gradio web interface featuring custom prompt presets and themes.",
      thumbnail: "local:text-to-image-1",
      media: [
        {
          type: "image",
          url: "local:text-to-image-1",
          title: "Stable Diffusion Gradio Web UI"
        }
      ],
      tags: ["Stable Diffusion", "PyTorch", "Hugging Face", "Gradio", "Python"],
      demoUrl: "https://github.com/Shubham-py404",
      githubUrl: "https://github.com/Shubham-py404",
      featured: true
    }
  ],
  skills: [
    { id: "sk-1", name: "Data Structures & Algorithms", category: "Backend", level: 95, iconName: "Code" },
    { id: "sk-2", name: "C / C++ Programming", category: "Backend", level: 92, iconName: "FileCode" },
    { id: "sk-3", name: "Python & Machine Learning Tools", category: "Backend", level: 90, iconName: "Server" },
    { id: "sk-4", name: "Java & Object-Oriented Design", category: "Backend", level: 88, iconName: "Server" },
    { id: "sk-5", name: "HTML, CSS, JavaScript, React & Next.js", category: "Frontend", level: 88, iconName: "Layout" },
    { id: "sk-6", name: "SQL & Relational Database Architecture", category: "Backend", level: 89, iconName: "Database" },
    { id: "sk-7", name: "NumPy, Pandas & Data Analysis", category: "Backend", level: 88, iconName: "Server" },
    { id: "sk-8", name: "Google Cloud Platform & Vertex AI", category: "Tools & Cloud", level: 89, iconName: "Database" },
    { id: "sk-9", name: "Git/GitHub, Unix/Linux & Docker", category: "Tools & Cloud", level: 87, iconName: "Activity" },
    { id: "sk-10", name: "Hugging Face & Supabase", category: "Tools & Cloud", level: 86, iconName: "Sparkles" }
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
      credentialUrl: "https://leetcode.com/u/Shubham-py404/",
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
  education: [
    {
      id: "edu-1",
      institution: "Dr. A. P. J. Abdul Kalam Technical University (AKTU)",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      boardOrCampus: "LIET",
      period: "2024 - 2028",
      location: "Delhi-NCR, India",
      description: "Specializing in Data Structures, Algorithms, Low-Level Systems Programming, and Applied AI Models."
    },
    {
      id: "edu-2",
      institution: "Lovely Public Sr. Sec. School",
      degree: "Senior Secondary (PCM - Physics, Chemistry, Mathematics)",
      boardOrCampus: "Central Board of Secondary Education (CBSE)",
      period: "2024",
      location: "Delhi, India",
      description: "Completed secondary education with high rigor in advanced mathematics, analytical sciences, and computational foundations."
    },
    {
      id: "edu-3",
      institution: "Kl Mehta Dayanand Public School",
      degree: "High School (Secondary Education)",
      boardOrCampus: "Central Board of Secondary Education (CBSE)",
      period: "2022",
      location: "Delhi, India",
      description: "Built strong foundation in scientific inquiry, mathematical reasoning, logic, and early programming."
    }
  ],
  messages: []
};

