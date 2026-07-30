/* ============================================================================
 *  portfolio.ts — THE ONE FILE YOU EDIT
 * ----------------------------------------------------------------------------
 *  Everything a visitor reads on this site is defined below. Fork the repo,
 *  change the values in this file, drop in your own images/resume, and you have
 *  your own portfolio — no need to touch the components.
 *
 *  Sections, top to bottom:
 *    1. site        → browser tab title, meta description, brand name, logo
 *    2. person      → your name, role, bio, skills, location, resume
 *    3. social      → GitHub / X / LinkedIn / email links
 *    4. hero        → the animated intro (terminal, diagram, quote)
 *    5. projects    → "Selected Work" cards
 *    6. essays      → "Technical Writing" gallery
 *    7. testimonials→ "Peer Signal" quotes
 *    8. newsletter  → the closing call-to-action section
 *    9. nav         → header / footer links
 *
 *  Tip: the in-app tour (bottom-right "Customize" button) walks through each of
 *  these live and tells you which key edits what.
 * ========================================================================== */

/* ── 1. Site / SEO ─────────────────────────────────────────────────────────
 * Shown in the browser tab and by search engines & social cards. */
export const site = {
  /** Short brand shown in the header & footer (e.g. a handle or initials). */
  brand: 'vpnsin',
  /** <title> tag. */
  title: 'vpnsin — Engineering Work by Hand',
  /** <meta name="description">. Keep it under ~160 characters. */
  description:
    'The workshop of a devops engineer who ships real things. Projects, essays, and open-source contributions — hand-finished, annotated, and honest.',
  /** Path (in /public) to the logo used in the header, footer and favicon. */
  logo: '/assets/images/app_logo.png',
};

/* ── 2. Person ─────────────────────────────────────────────────────────────
 * Who you are. Drives the hero "name spine", header, and footer. */
export const person = {
  firstName: 'First',
  lastName: 'Name',
  /** The small eyebrow above your name (your title / role). */
  role: 'Senior DevOps Engineer',
  /** One or two sentences under your name in the hero. */
  bio: 'I build systems that run fast and fail gracefully. Terraform, Node.js, distributed infrastructure — I share what I learn as I build.',
  /** City, Country — shown next to the availability dot. */
  location: 'Leeds, United Kingdom',
  /** Short availability line (set to '' to hide the green pulse + text). */
  availability: 'Open to senior / lead roles',
  /** Path (in /public) to your résumé PDF. */
  resumeUrl: 'assets/resume/resume.pdf',
  /** Skill pills under your bio. Add/remove freely. */
  skills: [
    'AEM',
    'Agile',
    'AI',
    'Azure',
    'Azure DevOps',
    'CI/CD',
    'Docker',
    'GitHub Actions',
    'JavaScript',
    'Kubernetes',
    'Mentoring',
    'Next.js',
    'Node.js',
    'React',
    'Terraform',
    'TypeScript',
    'YAML',
  ],
};

/* ── 3. Social links ───────────────────────────────────────────────────────
 * `githubUsername` also powers the live contribution heatmap in "Peer Signal".
 * Leave any URL as '' to hide that icon. */
export const social = {
  githubUsername: 'vpnsin',
  github: 'https://github.com/vpnsin',
  twitter: 'https://twitter.com/vpnsin',
  linkedin: 'https://www.linkedin.com/in/vipin-k-singh/',
  email: '',
};

/* ── 4. Hero ───────────────────────────────────────────────────────────────
 * The scroll-through intro. Three "vignettes" tell a mini story:
 *   0) a terminal (your recent commits)
 *   1) an architecture diagram (something you built)
 *   2) a peer quote
 * All of the *text* lives here; the animation lives in HeroSection.tsx. */
export const hero = {
  /** Label shown in the terminal window's title bar. */
  terminalTitle: `~/${site.brand} — zsh`,
  /** The prompt line, e.g. `~/you`. */
  terminalPrompt: `~/${site.brand}`,
  /** The command that appears to be typed. */
  terminalCommand: 'git log --oneline -5',
  /** Fake `git log` output. Each string = one commit line. */
  terminalCommits: [
    'a3f9c12 fix: resolve race condition in event bus',
    'b81e4d7 feat: add zero-copy ring buffer impl',
    'c92a1f0 refactor: extract scheduler into own crate',
    'd44b3e9 docs: annotate lock-free queue invariants',
    'e7f2c88 perf: 2.4× throughput on hot path',
  ],

  /** The architecture diagram (vignette 2). Nodes + arrows are drawn as SVG. */
  diagram: {
    label: 'arch // event-driven pipeline',
    caption: 'Zero-allocation hot path. 2.4× throughput over previous design.',
    // x/y are SVG coordinates in a 520×280 viewbox.
    nodes: [
      { x: 30, y: 110, label: 'Producer', sub: 'Terraform' },
      { x: 210, y: 50, label: 'Event Bus', sub: 'lock-free' },
      { x: 210, y: 170, label: 'Scheduler', sub: 'tokio' },
      { x: 390, y: 50, label: 'Consumer A', sub: 'async' },
      { x: 390, y: 170, label: 'Consumer B', sub: 'async' },
    ],
    arrows: [
      { d: 'M 130 132 C 170 132 170 72 210 72', delay: '0.6s' },
      { d: 'M 130 132 C 170 132 170 192 210 192', delay: '0.8s' },
      { d: 'M 310 72 L 390 72', delay: '1.0s' },
      { d: 'M 310 192 L 390 192', delay: '1.2s' },
      { d: 'M 260 94 L 260 170', delay: '1.4s' },
    ],
    annotations: [
      { x: 155, y: 100, text: 'mpsc', delay: '1.2s' },
      { x: 155, y: 200, text: 'mpsc', delay: '1.3s' },
      { x: 330, y: 65, text: 'push', delay: '1.4s' },
      { x: 330, y: 185, text: 'push', delay: '1.5s' },
    ],
  },

  /** The peer quote (vignette 3). */
  quote: {
    text: 'The code review was surgical. Every comment was a lesson — not a correction. I have been doing this for twelve years and I still learned something new.',
    name: 'Sumit Kumar',
    title: 'Staff Engineer',
    /** Optional avatar URL (leave '' to hide the photo). */
    avatar: '',
  },
};

/* ── 5. Projects ("Selected Work") ─────────────────────────────────────────
 * Each project is a full-width row. `embed` picks the decorative demo shown
 * beside the text: 'code' | 'cli' | 'metrics' (the visuals live in
 * ProjectSpotlight.tsx — swap them for screenshots if you prefer). */
export interface Project {
  id: string;
  number: string; // display index, e.g. '01'
  title: string;
  tagline: string;
  tags: string[];
  annotation: string; // first-person story; blank line = new paragraph
  year: string;
  embed: 'code' | 'cli' | 'metrics';
  repoUrl: string;
  reversed?: boolean; // flip the row layout
}

export const projects: Project[] = [
  {
    id: 'modmesh',
    number: '01',
    title: 'Terraform Module Mesh',
    tagline:
      'A composable infrastructure-as-code framework for multi-environment Azure provisioning — 40% faster deployments.',
    tags: ['Terraform', 'Azure', 'platform-engineering', 'open-source'],
    annotation: `Started as a 2am frustration: every Terraform setup I inherited was either copy-pasted spaghetti or had hardcoded values buried in modules. So I built a mesh architecture that doesn't.

It uses a hierarchical composition pattern with environment-aware variable injection — no duplication, just DRY modules and clean separation of concerns. Ships with built-in validation, drift detection, and automated documentation generation.`,
    year: '2025',
    embed: 'code',
    repoUrl: 'https://github.com/vpnsin',
    reversed: false,
  },
  {
    id: 'cicdscheduler',
    number: '02',
    title: 'GitHub Actions Pipeline Orchestrator',
    tagline:
      'Event-driven CI/CD scheduler with matrix strategy optimization and GitHub Copilot integration.',
    tags: ['Terraform', 'GitHub-Actions', 'YAML', 'automation'],
    annotation: `The problem: a monorepo where build times were unpredictable. Downstream jobs were queuing for hours or failing due to resource contention depending on the day.

The orchestrator uses Terraform to provision dynamic runner pools based on queue depth, with intelligent matrix splitting and reusable workflow composition. Build times dropped from 45 minutes to 8 minutes average.`,
    year: '2025',
    embed: 'cli',
    repoUrl: 'https://github.com/vpnsin',
    reversed: true,
  },
  {
    id: 'ghasguard',
    number: '03',
    title: 'GHAS Security Automation',
    tagline:
      'GitHub Advanced Security implementation with policy-as-code — vulnerabilities caught in minutes, not months.',
    tags: ['Terraform', 'GHAS', 'security', 'policy-as-code'],
    annotation: `What's next. Still evolving — the policy engine is solid, the reporting dashboards are in progress.

Terraform-managed GHAS rollout across 200+ repos with custom CodeQL queries, secret scanning alerts routed to Slack, and dependency review gates in PRs. The part I'm most proud of: the policy framework that auto-remediates common issues without human intervention.`,
    year: '2026 ↗',
    embed: 'metrics',
    repoUrl: 'https://github.com/vpnsin',
    reversed: false,
  },
];

/* ── 6. Essays ("Technical Writing") ───────────────────────────────────────
 * The rotated card grid. `rotate`/`translateY` are Tailwind classes that give
 * each card its hand-pinned tilt — leave them or tweak for a different feel. */
export interface Essay {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  href: string; // where the card links to
  rotate: string;
  translateY: string;
  color: string; // accent bar color
}

/** Heading + intro for the essays section. */
export const essaysMeta = {
  eyebrow: 'Technical Writing',
  heading: 'Essays from the experience',
  intro:
    'Long-form writing on systems design, Terraform internals, and the craft of building software that lasts.',
  /** Text + link for the "read all" footer (set label to '' to hide). */
  allLabel: 'Read all essays',
  allHref: '#',
};

export const essays: Essay[] = [
  {
    id: 1,
    title: 'Terraform State: The Silent Killer of Velocity',
    excerpt:
      "Three years of platform engineering taught me that state management isn't just about locking — it's about team boundaries, blast radius, and the art of refactoring without downtime.",
    tags: ['Terraform', 'Azure', 'platform-engineering'],
    readTime: '8 min',
    date: 'Jan 2026',
    href: '#',
    rotate: '-rotate-2',
    translateY: 'translate-y-4',
    color: '#6E8CA0',
  },
  {
    id: 2,
    title: 'The Lie of "Simple" GitHub Actions',
    excerpt:
      'Everyone says "just use reusable workflows." Nobody talks about what happens at 3am when a matrix strategy fails halfway through a production deployment.',
    tags: ['GitHub-Actions', 'YAML', 'DevOps'],
    readTime: '12 min',
    date: 'Nov 2025',
    href: '#',
    rotate: 'rotate-1',
    translateY: 'translate-y-8',
    color: '#C2785C',
  },
  {
    id: 3,
    title: 'GHAS Is Not a Checkbox',
    excerpt:
      "The hidden cost of security automation: alert fatigue, false positives that train teams to ignore warnings, and the CodeQL queries that don't catch what matters.",
    tags: ['GHAS', 'CodeQL', 'security'],
    readTime: '15 min',
    date: 'Sep 2025',
    href: '#',
    rotate: '-rotate-1',
    translateY: 'translate-y-2',
    color: '#3B3B3B',
  },
  {
    id: 4,
    title: 'Writing Terraform That Reads Like Documentation',
    excerpt:
      "Variable names and module structures are the cheapest documentation you'll ever write. A case for naming resources as carefully as you name functions.",
    tags: ['Terraform', 'craft', 'readability'],
    readTime: '6 min',
    date: 'Jul 2025',
    href: '#',
    rotate: 'rotate-3',
    translateY: 'translate-y-6',
    color: '#6E8CA0',
  },
  {
    id: 5,
    title: 'On Building Pipelines That Outlast You',
    excerpt:
      'A meditation on CI/CD workflows that run in production for years. What decisions made them maintainable, and why I now obsess over drift detection.',
    tags: ['DevOps', 'architecture', 'GitHub-Actions'],
    readTime: '10 min',
    date: 'May 2025',
    href: '#',
    rotate: '-rotate-3',
    translateY: 'translate-y-0',
    color: '#C2785C',
  },
  {
    id: 6,
    title: 'The Copilot Trap',
    excerpt:
      "When AI code generation became mainstream, we all reached for it reflexively. Here's when writing your own modules and understanding your infrastructure is still the right answer.",
    tags: ['AI', 'Claude', 'Terraform'],
    readTime: '9 min',
    date: 'Mar 2025',
    href: '#',
    rotate: 'rotate-2',
    translateY: 'translate-y-3',
    color: '#3B3B3B',
  },
];

/* ── 7. Testimonials ("Peer Signal") ───────────────────────────────────────
 * The first entry fills the big dark card; the rest stack beside it. */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  linkedin: string;
  avatar: string; // URL or '' to hide
  context: string; // small tag, e.g. "After a conference talk"
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "His deep dive on GitHub Advanced Security integration was eye-opening. He doesn't just implement tools — he architects secure-by-default pipelines. The way he explained GHAS to our team made adoption immediate.",
    name: 'Sumit Kumar',
    title: 'Senior Application Engineer',
    company: 'SAP Labs',
    linkedin: 'https://www.linkedin.com/in/vipin-k-singh/',
    avatar: '',
    context: 'After a conference talk',
  },
];

/* ── 8. Newsletter / closing CTA ───────────────────────────────────────────
 * The dark section at the bottom. It's a demo form (no backend) — wire it to
 * your provider in WaitlistSection.tsx, or repurpose it as a plain contact CTA. */
export const newsletter = {
  eyebrow: 'Coming Soon',
  /** Starting count shown in the animated counter (set to 0 to keep it simple). */
  startCount: 847,
  countLabel: 'engineers already subscribed',
  headlineTop: 'The build log.',
  headlineBottom: 'One per month.',
  promise:
    "One build log per month — no spam, no fluff, just the notebook. Deep dives into whatever I'm building, annotated with decisions, mistakes, and the parts that took three rewrites to get right.",
  bullets: [
    "The architecture decision that didn't make the README",
    'Benchmark results, including the ones that were embarrassing',
    'One recommended read that changed how I think',
  ],
  formLabel: 'Reserve your spot',
  ctaLabel: 'Subscribe',
  ctaLoadingLabel: 'Subscribing…',
  finePrint: 'Unsubscribe any time. No dark patterns, no upsells.',
  /** The "star the repo" alternative CTA. Set repoUrl '' to hide it. */
  repoUrl: 'https://github.com/vpnsin',
  repoStars: '2.1k',
};

/* ── 9. Navigation ─────────────────────────────────────────────────────────
 * Header + footer links. `href` values starting with `#` scroll to a section. */
export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Findings', href: '#writing' },
  ],
  /** Header call-to-action button (label '' hides it). */
  cta: { label: 'Subscribe', href: '#newsletter' },
};
