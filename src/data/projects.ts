export interface Project {
  id: string;
  slug: string;
  index: string;
  name: string;
  desc: string;
  icon: string;
  tags: string[];
  stack?: string[];
  size: 'large' | 'medium' | 'half' | 'third';
  role: string;
  timeline: string;
  client: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  keyFeatures: string[];
  images: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    id: 'flowboard',
    slug: 'flowboard',
    index: '01',
    name: 'FlowBoard',
    desc: 'Real-time project management SaaS — from zero to 2,000 active teams in 6 months.',
    icon: 'Zap',
    tags: ['Full-stack', 'SaaS'],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    size: 'large',
    role: 'Lead Full-Stack Engineer',
    timeline: 'Jan 2025 — Jun 2025',
    client: 'FlowBoard Inc.',
    overview: 'FlowBoard is a real-time project management platform designed for fast-moving teams. It combines kanban boards, sprint planning, and team analytics into a single workspace that updates in real-time across all connected clients.',
    challenge: 'The team needed a project management tool that could handle real-time collaboration for distributed teams without the bloat of legacy tools. Existing solutions were either too simple or too complex, with no middle ground for teams of 5–50 people.',
    approach: 'I architected a Next.js application with Supabase for real-time subscriptions and auth, building a custom presence system that shows who is viewing or editing each board. Stripe integration handles tiered billing, and the entire app deploys to Vercel with edge functions for low-latency global access.',
    outcome: 'Grew from launch to 2,000 active teams in 6 months with zero downtime. Average session duration of 47 minutes. 94% monthly retention rate for paid teams.',
    keyFeatures: [
      'Real-time kanban boards with live cursors and presence indicators',
      'Sprint planning with velocity tracking and burndown charts',
      'Team analytics dashboard with productivity insights',
      'Stripe-powered billing with usage-based tiers',
      'SSO integration for enterprise customers',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Team collaboration dashboard' },
      { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Sprint planning interface' },
      { src: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Analytics overview' },
    ],
  },
  {
    id: 'forge-cli',
    slug: 'forge-cli',
    index: '02',
    name: 'Forge CLI',
    desc: 'A developer toolchain that scaffolds production-ready repos in under 30 seconds.',
    icon: 'Wrench',
    tags: ['API', 'CLI'],
    size: 'medium',
    role: 'Creator & Maintainer',
    timeline: 'Mar 2024 — Present',
    client: 'Open Source',
    overview: 'Forge CLI is an open-source command-line tool that generates production-ready project scaffolds with CI/CD, testing, linting, and deployment configs baked in. It supports React, Next.js, Express, and FastAPI templates.',
    challenge: 'Developers waste hours on boilerplate setup for every new project. Existing generators produce minimal scaffolds that still need CI/CD, testing, linting, Docker, and deployment configs manually added — often inconsistently.',
    approach: 'Built a Node.js CLI with a plugin architecture where each template is a self-contained module. Templates include GitHub Actions workflows, Docker configs, ESLint/Prettier setups, and environment variable management out of the box. Interactive prompts let developers pick exactly what they need.',
    outcome: '800+ weekly npm downloads. 340 GitHub stars. Adopted by 3 startup teams as their standard project bootstrapping tool. Average scaffold time: 22 seconds.',
    keyFeatures: [
      'Interactive project generator with 12 framework templates',
      'Built-in CI/CD pipeline generation for GitHub Actions',
      'Docker and docker-compose configs included by default',
      'Environment variable management with .env validation',
      'Plugin system for custom template authoring',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Terminal workflow' },
      { src: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Code scaffolding' },
    ],
  },
  {
    id: 'kira-ai',
    slug: 'kira-ai',
    index: '03',
    name: 'Kira AI',
    desc: 'AI-powered health journaling app built with React Native and GPT-4.',
    icon: 'Brain',
    tags: ['Mobile', 'AI'],
    size: 'half',
    role: 'Mobile & AI Engineer',
    timeline: 'Aug 2024 — Dec 2024',
    client: 'Kira Health',
    overview: 'Kira AI is a mobile health journaling app that uses GPT-4 to analyze daily entries, identify health patterns, and provide personalized wellness insights. Users log meals, sleep, mood, and symptoms — Kira connects the dots.',
    challenge: 'Traditional health journaling apps are passive — they store data but don not help users understand it. The client wanted an app that could actively surface correlations between lifestyle habits and health outcomes.',
    approach: 'I built the React Native frontend with a clean, calming UI optimized for daily journaling. The backend uses a RAG pipeline that retrieves a user\'s historical entries and feeds them to GPT-4 alongside new entries, generating personalized insights about patterns the user might not notice.',
    outcome: '15,000 downloads in first 3 months. Users report 40% improvement in health awareness. Average 4.8-star rating on App Store. Featured in "Health & Fitness" category.',
    keyFeatures: [
      'Natural language health journaling with voice input',
      'AI-powered pattern recognition across diet, sleep, and mood',
      'Weekly health summaries with actionable recommendations',
      'Privacy-first architecture with on-device data encryption',
      'Export reports for healthcare providers',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/4056899/pexels-photo-4056899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Mobile health tracking' },
      { src: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'AI insights dashboard' },
    ],
  },
  {
    id: 'vaultkey',
    slug: 'vaultkey',
    index: '04',
    name: 'VaultKey',
    desc: 'Open-source secrets manager with end-to-end encryption. 1.2k GitHub stars.',
    icon: 'Shield',
    tags: ['Backend', 'OSS'],
    size: 'half',
    role: 'Creator & Lead Developer',
    timeline: 'Nov 2023 — Present',
    client: 'Open Source',
    overview: 'VaultKey is a lightweight, self-hosted secrets manager designed for small teams. It provides end-to-end encrypted storage for API keys, credentials, and certificates with a clean REST API and CLI for integration into any workflow.',
    challenge: 'Small teams either use plaintext .env files (insecure) or enterprise secret managers (overkill and expensive). There was no middle ground — a simple, self-hosted, encrypted vault that any team could deploy in minutes.',
    approach: 'Built with Node.js and SQLite for zero-config deployment. Secrets are encrypted client-side before transmission using AES-256-GCM. The server never sees plaintext. I designed a simple REST API and companion CLI for CI/CD integration.',
    outcome: '1,200 GitHub stars. 50+ community contributors. Used in production by 200+ teams. Featured in multiple "awesome-self-hosted" lists.',
    keyFeatures: [
      'End-to-end AES-256-GCM encryption',
      'Zero-config SQLite storage with optional PostgreSQL',
      'REST API with fine-grained access control',
      'CLI tool for CI/CD pipeline integration',
      'Audit logging and secret rotation policies',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/60504/security-hacker-technology-internet-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Security infrastructure' },
      { src: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Encrypted data vault' },
    ],
  },
  {
    id: 'pulse',
    slug: 'pulse',
    index: '05',
    name: 'Pulse',
    desc: 'Analytics dashboard for e-commerce stores, handling 50M events/day.',
    icon: 'BarChart3',
    tags: ['Data'],
    size: 'third',
    role: 'Data Engineer',
    timeline: 'Apr 2024 — Jul 2024',
    client: 'Pulse Analytics',
    overview: 'Pulse is a real-time analytics platform built for e-commerce businesses. It ingests clickstream, purchase, and inventory events to deliver live dashboards with conversion funnels, revenue tracking, and customer segmentation.',
    challenge: 'The client\'s existing analytics pipeline had 24-hour data latency and could not handle their growing event volume. They needed sub-minute dashboards that scaled to 50M daily events without exploding infrastructure costs.',
    approach: 'Designed a streaming pipeline using Kafka for event ingestion, with Redis for real-time aggregation and PostgreSQL for historical queries. The dashboard is a Next.js app with WebSocket subscriptions for live updates. I implemented rollup tables that pre-aggregate common queries.',
    outcome: 'Reduced data latency from 24 hours to under 30 seconds. Handles 50M events/day at 60% lower infra cost than the previous system. Dashboard loads in under 2 seconds.',
    keyFeatures: [
      'Real-time conversion funnel visualization',
      'Customer cohort analysis and segmentation',
      'Revenue tracking with multi-currency support',
      'Custom event tracking SDK for storefronts',
      'Automated anomaly detection and alerting',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Analytics dashboard' },
    ],
  },
  {
    id: 'edgemesh',
    slug: 'edgemesh',
    index: '06',
    name: 'EdgeMesh',
    desc: 'CDN-first image processing platform with on-the-fly transforms.',
    icon: 'Globe',
    tags: ['Platform'],
    size: 'third',
    role: 'Platform Engineer',
    timeline: 'Jun 2024 — Sep 2024',
    client: 'EdgeMesh Corp',
    overview: 'EdgeMesh is an image processing platform that runs transforms at the CDN edge. Resize, crop, format conversion, and compression happen in milliseconds at 300+ global PoPs, eliminating the need for pre-generated image variants.',
    challenge: 'E-commerce sites serve thousands of product images in multiple sizes and formats. Pre-generating every variant wastes storage and slows down content updates. The client needed on-the-fly image processing that was fast enough to serve directly from the edge.',
    approach: 'Built edge workers using Cloudflare Workers that intercept image requests, apply transforms (resize, crop, WebP/AVIF conversion), cache the result, and serve it. Origin fetch only happens once per unique transform. I designed a URL-based API for specifying transforms.',
    outcome: 'Average image transform time: 18ms at the edge. 85% reduction in image storage costs. Page load times improved by 40% for mobile users. Serves 200M images/month.',
    keyFeatures: [
      'On-the-fly resize, crop, and format conversion at CDN edge',
      'WebP and AVIF auto-negotiation based on browser support',
      'URL-based transform API with signed URLs for security',
      'Cache invalidation API for content updates',
      'Real-time usage analytics and bandwidth reporting',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'CDN edge network' },
    ],
  },
  {
    id: 'chainverify',
    slug: 'chainverify',
    index: '07',
    name: 'ChainVerify',
    desc: 'Blockchain-based document verification for legal firms.',
    icon: 'Link2',
    tags: ['Web3'],
    size: 'third',
    role: 'Full-Stack & Blockchain Developer',
    timeline: 'Oct 2024 — Jan 2025',
    client: 'ChainVerify Legal',
    overview: 'ChainVerify provides tamper-proof document verification for legal firms using blockchain technology. Documents are hashed and anchored on-chain, creating an immutable proof of existence and integrity that can be independently verified.',
    challenge: 'Legal firms need to prove document authenticity and timestamp integrity. Traditional methods rely on trusted third parties and are vulnerable to tampering. The client wanted a solution that provided cryptographic proof without requiring legal professionals to understand blockchain.',
    approach: 'Built a Next.js web app with a Solidity smart contract on Polygon for low-cost anchoring. Documents are SHA-256 hashed client-side, and only the hash is stored on-chain. I designed a verification page where anyone can check a document against the blockchain record by uploading it.',
    outcome: 'Deployed for 12 law firms in the first quarter. 50,000 documents anchored. Verification process takes under 3 seconds. Reduced document dispute resolution time by 70%.',
    keyFeatures: [
      'One-click document anchoring with SHA-256 hashing',
      'Public verification page requiring no account',
      'Batch anchoring for high-volume document workflows',
      'Polygon integration for low-cost, fast confirmations',
      'Compliance-ready audit trail export',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/373570/pexels-photo-373570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Blockchain verification' },
    ],
  },
];

export const skills = [
  { category: 'Frontend', list: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'] },
  { category: 'Backend', list: ['Node.js', 'Python / FastAPI', 'GraphQL', 'REST APIs'] },
  { category: 'Data & Infra', list: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes'] },
  { category: 'Cloud & DevOps', list: ['AWS', 'Vercel', 'CI/CD', 'Terraform'] },
  { category: 'AI / ML', list: ['OpenAI API', 'LangChain', 'Embeddings', 'RAG pipelines'] },
  { category: 'Other', list: ['Open source', 'Technical writing', 'System design', 'Mentorship'] },
];

export const techStack = [
  'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Next.js',
  'Docker', 'AWS', 'GraphQL', 'Python', 'Redis', 'Kubernetes',
];
