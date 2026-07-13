// Per-service "Guides & Advice" links — internal links from service pages
// into the blog. Keyed by the service page's pathname (with trailing slash,
// matching trailingSlash: 'always'). ServicePage.astro looks itself up via
// Astro.url.pathname; the three bespoke service pages (repairs, new-used,
// custom-pcs) import their entries directly.
//
// SEO purpose: the blog's money posts (repair costs, best-repair-near,
// build tips) previously had no internal links from outside the blog silo —
// GSC had them "Crawled – currently not indexed". Every post here gets
// descriptive-anchor links from the service pages Google already ranks.

export interface GuideLink {
  title: string;
  description: string;
  url: string;
}

const POSTS = {
  cost: {
    title: 'How Much Does Computer Repair Cost in Romford?',
    description:
      'Transparent breakdown of typical repair costs — from the £20 diagnostic to hardware repairs. Know what to expect before you book.',
    url: '/blog/computer-repair-cost-romford/',
  },
  bestNear: {
    title: 'Best Computer Repair Near Romford — Local Guide',
    description:
      'What makes a great local repair service, and how to find trusted technicians in Havering.',
    url: '/blog/best-computer-repair-near-romford/',
  },
  worthRepairing: {
    title: 'Is My Computer Worth Repairing?',
    description:
      'Honest advice on when repair makes sense, when to replace, and typical costs in Romford.',
    url: '/blog/is-my-computer-worth-repairing-romford/',
  },
  choosingShop: {
    title: 'How to Choose a Reliable Repair Shop in Essex',
    description:
      'What to look for, red flags to avoid, and how to find a trustworthy computer technician.',
    url: '/blog/choosing-computer-repair-shop-essex/',
  },
  laptopSigns: {
    title: '5 Warning Signs Your Laptop Needs Repair',
    description:
      'Slow performance, overheating, strange noises? The key signs your laptop needs expert attention.',
    url: '/blog/signs-laptop-needs-repairing/',
  },
  laptopSlow: {
    title: 'Why Your Laptop is Running Slow',
    description:
      'The most common causes of slow laptop performance — and how to get it running like new again.',
    url: '/blog/why-laptop-running-slow-romford-guide/',
  },
  ssdUpgrade: {
    title: 'SSD Upgrade Guide: New Life for Your Old PC',
    description:
      'The single best upgrade for a slow computer — how it works, what it costs, why it feels brand new.',
    url: '/blog/ssd-upgrade-guide-old-pc/',
  },
  virusGuide: {
    title: 'Virus & Malware Removal — Complete Guide',
    description:
      "The warning signs of malware infection, what to do if you're infected, and how to stay protected.",
    url: '/blog/virus-malware-removal-romford-guide/',
  },
  maintenance: {
    title: 'Computer Maintenance Tips for Businesses',
    description:
      'Essential IT maintenance advice to keep business computers in Romford running smoothly year-round.',
    url: '/blog/computer-maintenance-tips-romford-businesses/',
  },
  gamingBuild: {
    title: 'Gaming PC Build Tips for Essex Gamers',
    description:
      'Expert advice on components, budgets, and where to find local support for your custom build.',
    url: '/blog/gaming-pc-build-tips-essex/',
  },
  gamingHeat: {
    title: 'Gaming PC Overheating? Change That Coolant',
    description:
      'Old thermal paste, gunked-up coolant and dust all trap heat — repastes and full thermal services.',
    url: '/blog/gaming-pc-overheating-summer-romford/',
  },
  sliRig: {
    title: 'A Rare Beast — Dual-GPU SLI Rig In For Service',
    description:
      "Why multi-GPU builds are increasingly rare and what they're still good for today.",
    url: '/blog/rare-dual-gpu-sli-pc-romford/',
  },
  macBootcamp: {
    title: 'Windows 11 Pro on a 2017 MacBook Air',
    description:
      "Even Apple's older Macs can run modern Windows via Boot Camp — don't bin that old MacBook.",
    url: '/blog/windows-11-macbook-air-2017-bootcamp-romford/',
  },
  win11Unsupported: {
    title: 'Windows 11 Upgrades for "Unsupported" PCs',
    description:
      "Microsoft says your PC can't run Windows 11? How to safely upgrade unsupported computers.",
    url: '/blog/upgrade-old-pc-windows-11-unsupported/',
  },
  win10Ending: {
    title: 'Windows 10: The Final Safety Net Ends This October',
    description:
      'Extended security updates stop for good on 13 October 2026. Your options: upgrade, refurbish or replace.',
    url: '/blog/windows-10-extended-security-updates-ending-2026/',
  },
} satisfies Record<string, GuideLink>;

export const serviceGuides: Record<string, GuideLink[]> = {
  '/services/pc-repair-romford/': [POSTS.cost, POSTS.worthRepairing, POSTS.bestNear],
  '/services/laptop-repair-romford/': [POSTS.laptopSigns, POSTS.laptopSlow, POSTS.cost],
  '/services/laptop-repair-dagenham/': [POSTS.laptopSigns, POSTS.laptopSlow, POSTS.bestNear],
  '/services/virus-removal-romford/': [POSTS.virusGuide, POSTS.laptopSlow, POSTS.maintenance],
  '/services/data-recovery-havering/': [POSTS.worthRepairing, POSTS.ssdUpgrade, POSTS.cost],
  '/services/mac-repair-romford/': [POSTS.macBootcamp, POSTS.cost, POSTS.bestNear],
  '/services/gaming-pc-repair-romford/': [POSTS.gamingHeat, POSTS.gamingBuild, POSTS.sliRig],
  '/services/network-wifi-romford/': [POSTS.maintenance, POSTS.laptopSlow, POSTS.bestNear],
  '/services/computer-upgrades-romford/': [POSTS.ssdUpgrade, POSTS.win11Unsupported, POSTS.win10Ending],
  '/services/windows-installation-romford/': [POSTS.win10Ending, POSTS.win11Unsupported, POSTS.macBootcamp],
  '/services/computer-repair-ilford/': [POSTS.bestNear, POSTS.cost, POSTS.choosingShop],
};

// Direct exports for the bespoke (non-ServicePage) service pages
export const repairsGuides: GuideLink[] = [POSTS.cost, POSTS.worthRepairing, POSTS.choosingShop];
export const newUsedGuides: GuideLink[] = [POSTS.win10Ending, POSTS.worthRepairing, POSTS.choosingShop];
export const customPcsGuides: GuideLink[] = [POSTS.gamingBuild, POSTS.gamingHeat, POSTS.sliRig];

// Homepage "latest advice" strip
export const homepageGuides: GuideLink[] = [POSTS.win10Ending, POSTS.cost, POSTS.bestNear];
