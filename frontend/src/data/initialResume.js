export const initialResumeData = {
  id: 'resume-default-01',
  title: 'Principal Engineer Resume',
  lastModified: new Date().toISOString(),
  templateId: 'technical-authority',
  themeColor: '#00685f', // Deep Teal
  fontScale: 'normal',
  
  personalInfo: {
    fullName: 'Shafayat Hossain Masum',
    jobTitle: 'Principal Software Engineer & Cloud Architect',
    email: 'shafayat.masum@example.com',
    phone: '+1 (555) 349-8201',
    location: 'San Francisco, CA',
    website: 'https://shafayat.dev',
    linkedin: 'linkedin.com/in/shafayat-masum',
    github: 'github.com/shafayat-masum',
  },

  summary: 'Authoritative and results-driven Principal Software Engineer with 10+ years of expertise in architecting high-throughput distributed systems, event-driven microservices, and multi-region cloud infrastructures. Proven track record of scaling enterprise platforms from 0 to 10M+ daily active users while mentoring 30+ senior engineers.',

  skills: {
    languages: ['TypeScript', 'Python', 'Go', 'Rust', 'SQL'],
    frameworks: ['React', 'Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
    cloudDevops: ['AWS (ECS, Lambda, RDS)', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD Pipelines', 'Kafka'],
    leadership: ['System Architecture', 'Technical Strategy', 'Cross-functional Mentorship', 'Engineering Standards'],
  },

  experience: [
    {
      id: 'exp-1',
      role: 'Principal Software Engineer',
      company: 'Apex Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      highlights: [
        'Spearheaded the technical roadmap and migration to micro-frontends and event-driven FastAPI microservices, reducing API response times by 42%.',
        'Architected real-time streaming pipelines processing 15,000+ RPS using Apache Kafka and Redis cluster caching.',
        'Mentored 18 cross-functional engineers and established RFC design review standards across 4 distributed squads.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Lead Systems Architect',
      company: 'Nexus Scale Labs',
      location: 'Austin, TX',
      startDate: '2019',
      endDate: '2022',
      current: false,
      highlights: [
        'Designed multi-tenant cloud architectures on AWS with automated Terraform provisioning, reducing cloud spend by $180k/year.',
        'Championed zero-downtime database sharding and migration strategies across 50M+ customer records in PostgreSQL.',
        'Implemented end-to-end telemetry (OpenTelemetry, Prometheus, Grafana) improving incident MTTR by 60%.'
      ]
    },
    {
      id: 'exp-3',
      role: 'Senior Full Stack Engineer',
      company: 'Vanguard Systems',
      location: 'Remote',
      startDate: '2016',
      endDate: '2019',
      current: false,
      highlights: [
        'Built modern single-page dashboard apps using React and WebSocket real-time updates for enterprise analytics.',
        'Optimized core database queries and connection pooling, boosting throughput under peak traffic.'
      ]
    }
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (Distributed Systems)',
      institution: 'Georgia Institute of Technology',
      location: 'Atlanta, GA',
      startDate: '2014',
      endDate: '2016',
      details: 'GPA 3.9/4.0 • Research in Byzantine Fault Tolerant consensus algorithms.'
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'University of Engineering and Technology',
      location: 'Dhaka',
      startDate: '2010',
      endDate: '2014',
      details: 'Dean’s Honor List • President of Competitive Programming Club.'
    }
  ],

  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream: High-Throughput Event Broker',
      techStack: 'Go, Kafka, Docker',
      link: 'github.com/shafayat/omnistream',
      description: 'An open-source low-latency stream processing engine handling 100k events/sec with sub-millisecond p99 latency.'
    },
    {
      id: 'proj-2',
      name: 'ResumePro AI Parser & Engine',
      techStack: 'React, FastAPI, PostgreSQL',
      link: 'github.com/shafayat/resumepro',
      description: 'Full-stack ATS resume builder with automated PDF extraction and vector-rendered PDF document export.'
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation',
      year: '2022'
    }
  ]
};

export const availableTemplates = [
  {
    id: 'technical-authority',
    name: 'Technical Authority',
    badge: 'Stitch Blueprint',
    description: 'Designed specifically for Software Engineers, Architects, and Tech Leads. Features 2-column categorized skill grid, monospace accents, and left-aligned timeline.',
    isAtsOptimized: true,
    thumbnailBg: 'linear-gradient(135deg, #00685f 0%, #002e2a 100%)'
  },
  {
    id: 'modern-clean',
    name: 'Modern Executive',
    badge: 'Popular',
    description: 'Clean single-column executive layout emphasizing leadership, impactful summary metrics, and narrative flow.',
    isAtsOptimized: true,
    thumbnailBg: 'linear-gradient(135deg, #0051d5 0%, #001f5c 100%)'
  },
  {
    id: 'minimal-classic',
    name: 'Minimalist Academic',
    badge: 'ATS Classic',
    description: 'Standard black-and-white minimalist format with high typography density and zero clutter for strict enterprise screening systems.',
    isAtsOptimized: true,
    thumbnailBg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)'
  }
];
