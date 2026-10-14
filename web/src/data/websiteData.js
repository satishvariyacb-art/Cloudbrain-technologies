export const METRICS_DATA = [
  { value: "7+", label: "Years of Experience" },
  { value: "30+", label: "IT Experts" },
  { value: "20+", label: "Apps Published" },
  { value: "4.6★", label: "Average Rating" }
];

export const SERVICES_DATA = [
  {
    id: "android-dev",
    category: "Mobile Engineering",
    title: "Android App Development",
    // tagline: "We build fast, scalable Android apps using Kotlin and modern architecture, designed to perform seamlessly across devices and deliver real user value.",
    description: "We build fast, scalable Android apps using Kotlin and modern architecture, designed to perform seamlessly across devices and deliver real user value.",
    icon: "Smartphone",
    badge: "Play Store Ready",
    techStack: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Dagger Hilt", "Gradle", "Google Play Vitals"],
    deliverables: [
      "Modular Kotlin Architecture",
      "Jetpack Compose UI Engine",
      "Play Store AAB Package & Store Listing",
      "Automated CI/CD Pipeline via Fastlane",
      "Deep Linking & Push Notification Engine"
    ]
  },
  {
    id: "ios-dev",
    category: "Mobile Engineering",
    title: "iOS App Development",
    // tagline: "From concept to App Store, we craft intuitive iOS apps using Swift, focused on smooth performance, clean design, and a seamless user experience.",
    description: "From concept to App Store, we craft intuitive iOS apps using Swift, focused on smooth performance, clean design, and a seamless user experience.",
    icon: "Apple",
    badge: "App Store Ready",
    techStack: ["Swift 6", "SwiftUI", "Combine", "CoreData/SwiftData", "Metal", "TestFlight", "App Store Connect"],
    deliverables: [
      "SwiftUI Modular App Architecture",
      "CoreML On-Device AI Models",
      "App Store Connect Provisioning & TestFlight",
      "Biometric Security & Keychain Auth",
      "In-App Purchases & Apple Pay Integration"
    ]
  },
  {
    id: "ai-ml",
    category: "Intelligence",
    title: "AI & ML Development",
    // tagline: "We develop intelligent AI and machine learning solutions that automate processes, unlock insights, and give your products a competitive edge.",
    description: "We develop intelligent AI and machine learning solutions that automate processes, unlock insights, and give your products a competitive edge.",
    icon: "Cpu",
    badge: "AI & ML Solutions",
    techStack: ["CoreML", "TensorFlow", "PyTorch", "OpenAI APIs", "LangChain", "Vector DBs"],
    deliverables: [
      "On-Device Low-Latency Machine Learning",
      "Custom LLM Agents & RAG Knowledge Pipelines",
      "Predictive Analytics & Recommendation Engines",
      "Automated Process Intelligence",
      "AI Safety & Guardrails Engine"
    ]
  },
  {
    id: "ui-ux-design",
    category: "Product Experience",
    title: "UI/UX Design",
    // tagline: "We design user-centric interfaces that blend aesthetics with usability, creating experiences that are intuitive, engaging, and built to convert.",
    description: "We design user-centric interfaces that blend aesthetics with usability, creating experiences that are intuitive, engaging, and built to convert.",
    icon: "Palette",
    badge: "User-Centric Design",
    techStack: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping", "Usability Testing"],
    deliverables: [
      "Empirical User Research & Persona Mapping",
      "Figma Component Libraries & Design Systems",
      "Low & High-Fidelity Wireframes",
      "Interactive Prototypes & Friction Audits",
      "Conversion Rate Optimization (CRO) Funnels"
    ]
  },
  {
    id: "web-dev",
    category: "Web Engineering",
    title: "Web Design & Development",
    // tagline: "We build responsive, high-performance websites that combine strong design with clean code, helping your brand stand out and scale online.",
    description: "We build responsive, high-performance websites that combine strong design with clean code, helping your brand stand out and scale online.",
    icon: "Globe",
    badge: "High-Performance Web",
    techStack: ["React 19", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    deliverables: [
      "Responsive UI/UX Web Layouts",
      "Server-Side Rendered (SSR) Next.js Architecture",
      "Node.js Microservices REST & GraphQL APIs",
      "Lighthouse 95+ Performance Scoring",
      "Automated Vercel & AWS Cloud Deployments"
    ]
  },
  {
    id: "digital-marketing",
    category: "Growth & Visibility",
    title: "Digital Marketing",
    // tagline: "We help your products get discovered through data-driven strategies — SEO, ASO, social media, and paid campaigns that drive real growth.",
    description: "We help your products get discovered through data-driven strategies with SEO, ASO, social media, and paid campaigns that drive real growth.",
    icon: "TrendingUp",
    badge: "High ROI Growth",
    techStack: ["SEO", "ASO", "Google Ads", "Meta Ads", "App Store Marketing", "Social Media"],
    deliverables: [
      "App Store Optimization (ASO) Metadata & Graphics",
      "Search Engine Optimization (SEO) & Technical Audits",
      "Google & Apple Search Paid Ads Setup",
      "Social Media Campaign Management",
      "Conversion & ROAS Performance Dashboards"
    ]
  }
];

export const TECHNOLOGIES_DATA = {
  Mobile: [
    { name: "Kotlin", icon: "Code2", desc: "Native Android Development" },
    { name: "Swift", icon: "Code", desc: "Native iOS & macOS Development" },
    { name: "Jetpack Compose", icon: "Layers", desc: "Modern Android Declarative UI" },
    { name: "SwiftUI", icon: "LayoutGrid", desc: "Modern Apple Declarative UI" },
    { name: "Flutter", icon: "Boxes", desc: "Cross-Platform Mobile" },
    { name: "React Native", icon: "Smartphone", desc: "Cross-Platform Native Modules" }
  ],
  Frontend: [
    { name: "React 19", icon: "Atom", desc: "Modern UI Component Library" },
    { name: "Next.js 15", icon: "Globe", desc: "Server Components & Edge SSR" },
    { name: "TypeScript", icon: "FileCode", desc: "Strict Type Safety" },
    { name: "CSS Modules / Vanilla", icon: "Sparkles", desc: "Zero-runtime performant styling" },
    { name: "Vite", icon: "Zap", desc: "Next-gen lightning fast build tool" }
  ],
  Backend: [
    { name: "Node.js", icon: "Server", desc: "Event-driven asynchronous backend runtime" },
    { name: "Express / Fastify", icon: "Cpu", desc: "High-throughput API frameworks" },
    { name: "PostgreSQL", icon: "Database", desc: "ACID compliant relational database" },
    { name: "Redis", icon: "Zap", desc: "In-memory caching and message broker" },
    { name: "GraphQL", icon: "Network", desc: "Typed query language for APIs" },
    { name: "Docker / K8s", icon: "Container", desc: "Containerized deployment & scaling" }
  ],
  "AI & Data": [
    { name: "CoreML", icon: "Brain", desc: "Apple On-device Hardware Accelerated ML" },
    { name: "TensorFlow Lite", icon: "Cpu", desc: "Android Mobile Edge ML Engine" },
    { name: "PyTorch", icon: "Flame", desc: "Custom Neural Network Training" },
    { name: "OpenAI / Claude", icon: "Bot", desc: "LLM API Integration & Fine-tuning" },
    { name: "Pinecone / Qdrant", icon: "Database", desc: "High-performance Vector DBs" },
    { name: "Mixpanel / Segment", icon: "BarChart", desc: "Product Analytics & Event Streams" }
  ],
  "Cloud & DevOps": [
    { name: "AWS", icon: "Cloud", desc: "ECS, Lambda, S3, CloudFront Infrastructure" },
    { name: "Google Cloud (GCP)", icon: "CloudSun", desc: "BigQuery, Vertex AI, Firebase" },
    { name: "Fastlane", icon: "Rocket", desc: "Automated Store Deployment CI/CD" },
    { name: "Automated CI/CD", icon: "GitBranch", desc: "Automated Testing & Build Pipelines" }
  ]
};

export const COMPARISON_DATA = [
  {
    feature: "Ownership & Mindset",
    cloudBrain: "Product Co-Engineers who care about product metrics & retention",
    traditionalAgency: "Outsourced code factory focused only on billable hours"
  },
  {
    feature: "Mobile Native Execution",
    cloudBrain: "Native Kotlin & Swift 6 with 60 FPS performance & low battery footprint",
    traditionalAgency: "Sluggish web wrappers and unoptimized cross-platform templates"
  },
  {
    feature: "Store Deployment",
    cloudBrain: "Guaranteed Play Store & App Store approval with Fastlane CI/CD",
    traditionalAgency: "Hands off after delivery; leaves app store rejection to client"
  },
  {
    feature: "Architecture & Code",
    cloudBrain: "Modular Clean Architecture, 99.9% crash-free SLA, zero security tech debt",
    traditionalAgency: "Monolithic spaghetti code with missing unit tests"
  },
  {
    feature: "Intelligence Integration",
    cloudBrain: "Built-in AI/ML (CoreML, TFLite, RAG) for personalized user experience",
    traditionalAgency: "Basic CRUD features without intelligent automation"
  }
];

export const PROCESS_DATA = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by understanding your idea, users, and goals inside out. This helps us define the right scope and approach before writing a single line of code."
  },
  {
    number: "02",
    title: "Design (UI/UX)",
    description: "We turn ideas into wireframes and prototypes that are simple to use and easy to navigate. Every screen is designed around how real users will actually interact with it."
  },
  {
    number: "03",
    title: "Development",
    description: "Our team builds your product using the right tech stack for your platform. Clean code and scalable architecture are non-negotiable at this stage."
  },
  {
    number: "04",
    title: "Testing & Refine",
    description: "We break things on purpose before your users get the chance to. Bugs, slow load times, weird edge cases - better we find them than someone leaves a 1-star review."
  },
  {
    number: "05",
    title: "Launch & Grow",
    description: "We handle deployment to the app store or web, and support you through the early growth phase. Launch isn't the finish line - it's where the real learning begins."
  }
];

export const INDUSTRIES_DATA = [
  {
    title: "FinTech & Banking",
    desc: "Biometric auth, PCI-DSS compliance, real-time transaction telemetry & instant payments.",
    icon: "CreditCard"
  },
  {
    title: "HealthTech & Fitness",
    desc: "HIPAA-compliant data pipelines, Apple HealthKit / Google Fit integration, live telemetry.",
    icon: "Activity"
  },
  {
    title: "AI SaaS & Productivity",
    desc: "LLM agents, vector semantic search, linear-style desktop & web apps with keyboard shortcuts.",
    icon: "Sparkles"
  },
  {
    title: "E-Commerce & Retail",
    desc: "1-click checkout, native AR product previews, personalized ML recommendation engines.",
    icon: "ShoppingBag"
  },
  {
    title: "Logistics & Mobility",
    desc: "Real-time GPS tracking, offline-first mobile sync, route optimization algorithms.",
    icon: "Navigation"
  },
  {
    title: "EdTech & Learning",
    desc: "Gamified learning loops, offline video caching, interactive quiz widgets & progress sync.",
    icon: "GraduationCap"
  }
];

export const PRINCIPLES_DATA = [
  {
    title: "Speed is a Feature",
    desc: "Every interaction should respond within 100ms. Sub-second load times across mobile and web."
  },
  {
    title: "Native First Precision",
    desc: "We respect platform design languages—iOS feels native to Apple, Android feels native to Android."
  },
  {
    title: "Telemetry Driven Iteration",
    desc: "We don't guess user preferences; we measure event flows and optimize based on real behavior data."
  },
  {
    title: "Zero Security Compromise",
    desc: "End-to-end encryption, OAuth2 / OIDC security standard, strict biometric authentication."
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "Cloudbrain rebuilt our flagship iOS and Android apps from scratch. Our Play Store crash rate dropped to 0.02% and App Store ratings rose from 3.8 to 4.9 stars within 60 days.",
    author: "Elena Rostova",
    role: "VP of Engineering at FinScale Global",
    storeMetrics: "4.9 ★ (42,000 reviews)"
  },
  {
    quote: "Unlike traditional development agencies, Cloudbrain operates like our internal product team. Their AI/ML recommendations increased our app user 30-day retention by 44%.",
    author: "David Chen",
    role: "Co-Founder & CTO, PulseHealth AI",
    storeMetrics: "1M+ Play Store Downloads"
  },
  {
    quote: "The team handled our App Store submission effortlessly—navigating complex Apple privacy guidelines on the first pass while delivering a jaw-dropping Linear-style web dashboard.",
    author: "Sarah Jenkins",
    role: "Chief Product Officer, NovaSaaS",
    storeMetrics: "Featured on App Store Today"
  }
];

export const BLOG_DATA = [
  {
    id: "app-store-optimization-2026",
    tag: "ASO & Growth",
    title: "Mastering App Store & Play Store Publishing in 2026",
    excerpt: "Key strategies to pass Apple App Store Review on the first submit and optimize Google Play Vitals for top organic ranking.",
    date: "July 20, 2026",
    readTime: "5 min read"
  },
  {
    id: "kotlin-jetpack-compose-vs-swiftui",
    tag: "Mobile Architecture",
    title: "Declarative Native Mobile: SwiftUI 6 & Jetpack Compose",
    excerpt: "Why native declarative UI frameworks outperform cross-platform wrappers for enterprise mobile applications.",
    date: "July 12, 2026",
    readTime: "7 min read"
  },
  {
    id: "on-device-ai-coreml-tflite",
    tag: "AI & ML",
    title: "On-Device AI: Running CoreML & TFLite Models Efficiently",
    excerpt: "How to deploy sub-100MB LLMs and vision models directly on mobile devices without exhausting battery life.",
    date: "June 28, 2026",
    readTime: "6 min read"
  }
];

export const CAREERS_DATA = [
  {
    id: "ios-architect",
    role: "Senior iOS Architect",
    team: "Mobile Engineering",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "5+ Years",
    desc: "Lead native iOS architecture using Swift 6, SwiftUI, and CoreML for high-scale apps."
  },
  {
    id: "android-lead",
    role: "Lead Android Engineer",
    team: "Mobile Engineering",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "5+ Years",
    desc: "Build mission-critical Kotlin & Jetpack Compose mobile experiences with automated CI/CD pipelines."
  },
  {
    id: "aiml-engineer",
    role: "AI/ML Product Specialist",
    team: "Intelligence",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "3+ Years",
    desc: "Integrate LLMs, vector search, and on-device CoreML/TFLite models into web and mobile platforms."
  },
  {
    id: "uiux-designer",
    role: "Lead UI/UX Product Designer",
    team: "Product Design",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "4+ Years",
    desc: "Craft Linear-inspired design systems, high-fidelity Figma components, and micro-interactions."
  }
];
