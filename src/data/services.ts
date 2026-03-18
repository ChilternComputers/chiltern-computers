// Service page data for all location-specific service pages
// Used by ServicePage.astro template component

export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  color: 'cyan' | 'green' | 'orange' | 'purple';
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedService {
  iconName: string;
  title: string;
  description: string;
  url: string;
  color: 'cyan' | 'green' | 'orange' | 'purple';
}

export interface ServicePageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    publishedTime: string;
    modifiedTime: string;
    breadcrumbs: { name: string; url: string }[];
  };
  heroTitle: string;
  heroDescription: string;
  heroBadgeIcon: string;
  heroBadgeText: string;
  servicesTitle: string;
  services: ServiceItem[];
  processTitle: string;
  processSteps: ProcessStep[];
  faqs: FAQ[];
  relatedServices: RelatedService[];
  ctaTitle: string;
  ctaDescription: string;
  areasTitle: string;
}

export const servicePages: Record<string, ServicePageData> = {
  'pc-repair-romford': {
    slug: 'pc-repair-romford',
    seo: {
      title: 'PC Repair Romford - Same Day Service',
      description: 'PC repair in Romford. Blue screens, startup failures, hardware faults & overheating fixed. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'pc repair romford, computer repair romford, motherboard repair romford, desktop repair romford, pc not turning on romford, blue screen fix romford, computer not starting romford, pc repair near me',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'PC Repair Romford', url: '/services/pc-repair-romford/' },
      ],
    },
    heroTitle: 'PC REPAIR ROMFORD',
    heroDescription: 'Professional desktop PC repair services in Romford. I fix blue screens, startup failures, hardware faults, overheating, and more. Over 20 years of experience with all PC brands and custom-built systems.',
    heroBadgeIcon: 'desktop',
    heroBadgeText: 'SAME DAY PC REPAIRS',
    servicesTitle: 'COMMON PC ISSUES I FIX',
    services: [
      {
        iconName: 'desktop',
        title: 'BLUE SCREEN ERRORS',
        description: 'Blue screen of death (BSOD) crashes caused by driver conflicts, hardware faults, or corrupted Windows files. I diagnose and fix the root cause.',
        color: 'cyan',
      },
      {
        iconName: 'bolt',
        title: 'STARTUP FAILURES',
        description: "PC won't turn on, stuck on loading screen, or beeping on startup? I identify whether it's a power supply, motherboard, or software issue.",
        color: 'green',
      },
      {
        iconName: 'wrench',
        title: 'HARDWARE FAULTS',
        description: 'Faulty RAM, failing hard drives, dead power supplies, and motherboard issues. I test, diagnose, and replace defective components.',
        color: 'orange',
      },
      {
        iconName: 'cpu',
        title: 'OVERHEATING',
        description: 'PC shutting down from heat? I clean dust build-up, replace thermal paste, fix or replace fans, and improve airflow.',
        color: 'purple',
      },
      {
        iconName: 'database',
        title: 'DATA LOSS & CORRUPTION',
        description: 'Missing files, corrupted drives, or failing hard disks. I recover your data and replace faulty storage devices.',
        color: 'cyan',
      },
      {
        iconName: 'alert',
        title: 'STRANGE NOISES & BEHAVIOUR',
        description: 'Clicking hard drives, grinding fans, or random shutdowns. I diagnose and fix unusual PC behaviour fast.',
        color: 'orange',
      },
    ],
    processTitle: 'MY PC REPAIR PROCESS',
    processSteps: [
      {
        title: '1. £20 DIAGNOSTIC',
        description: 'I run a full diagnostic to pinpoint the exact problem. Just £20 — waived if you go ahead with the repair.',
      },
      {
        title: '2. QUOTE & APPROVAL',
        description: "I explain what's wrong in plain English and give you a clear quote. No jargon, no hidden costs — you decide whether to go ahead.",
      },
      {
        title: '3. REPAIR & TEST',
        description: 'I carry out the repair and thoroughly test everything to make sure the issue is fully resolved before returning your PC.',
      },
      {
        title: '4. 90-DAY WARRANTY',
        description: "All repairs come with a 90-day warranty. If the same issue returns, I'll fix it free of charge. No fix, no fee on unfixable issues.",
      },
    ],
    faqs: [
      {
        question: 'How much does PC repair cost in Romford?',
        answer: 'PC repairs typically start from £40 for software fixes and go up depending on the issue. Hardware replacements depend on parts needed. I always provide a clear quote after my £20 diagnostic — which is waived if you proceed with the repair.',
      },
      {
        question: "My PC won't turn on at all — can you fix it?",
        answer: "Yes, this is one of my most common repairs. A PC that won't turn on could have a faulty power supply, dead motherboard, or loose connections. I diagnose the exact cause and replace the failed component.",
      },
      {
        question: 'Do you repair custom-built gaming PCs?',
        answer: "Absolutely. I repair all types of PCs including custom-built gaming rigs, pre-built systems, and business desktops. I'm experienced with all hardware configurations and component brands.",
      },
      {
        question: 'How quickly can you repair my PC?',
        answer: "Most PC repairs are completed within 24-48 hours. Simple fixes like software issues or component swaps are often done same day. I'm open 7 days a week, 9AM-9PM, and offer collection and drop-off service throughout Romford.",
      },
    ],
    relatedServices: [
      {
        iconName: 'laptop',
        title: 'Laptop Repair Romford',
        description: 'Professional laptop repairs including screen replacement, keyboard fixes, and battery replacement.',
        url: '/services/laptop-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'rocket',
        title: 'Computer Upgrades',
        description: "SSD upgrades, RAM upgrades, and GPU replacements to boost your PC's performance.",
        url: '/services/computer-upgrades-romford/',
        color: 'green',
      },
      {
        iconName: 'wifi',
        title: 'Network & WiFi Fixes',
        description: 'WiFi dead spots, slow speeds, connection dropouts, and router setup.',
        url: '/services/network-wifi-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'PC PROBLEMS IN ROMFORD?',
    ctaDescription: 'Collection and drop-off service available. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.',
    areasTitle: 'PC REPAIR ACROSS HAVERING & ESSEX',
  },

  'laptop-repair-romford': {
    slug: 'laptop-repair-romford',
    seo: {
      title: 'Laptop Repair Romford - Same Day Service',
      description: 'Laptop repair in Romford. Screen, keyboard & battery replacement. Overheating fixes. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'laptop repair romford, laptop screen repair romford, fix slow laptop romford, overheating laptop repair romford, laptop keyboard repair romford, laptop battery replacement romford, laptop not charging romford, broken laptop screen romford',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Laptop Repair Romford', url: '/services/laptop-repair-romford/' },
      ],
    },
    heroTitle: 'LAPTOP REPAIR ROMFORD',
    heroDescription: 'Professional laptop repair services in Romford. I fix all laptop brands including Dell, HP, Lenovo, Asus, Acer, and Apple MacBooks. Screen replacements, keyboard repairs, battery issues, and overheating fixes — most repairs completed same day.',
    heroBadgeIcon: 'laptop',
    heroBadgeText: 'SAME DAY LAPTOP REPAIRS',
    servicesTitle: 'ROMFORD LAPTOP REPAIR SERVICES',
    services: [
      {
        iconName: 'desktop',
        title: 'SCREEN REPLACEMENT',
        description: 'Cracked, broken or damaged laptop screens replaced. All sizes and brands including touchscreen and IPS displays.',
        color: 'cyan',
      },
      {
        iconName: 'tools',
        title: 'KEYBOARD REPAIR',
        description: 'Broken keys, sticky keyboards, liquid damage repair and full keyboard replacement for all laptop models.',
        color: 'green',
      },
      {
        iconName: 'bolt',
        title: 'BATTERY REPLACEMENT',
        description: 'Laptop not holding charge or dying quickly? I replace worn out batteries for all makes and models.',
        color: 'orange',
      },
      {
        iconName: 'bolt',
        title: 'CHARGING PORT REPAIR',
        description: 'Laptop not charging? DC jack and USB-C charging port repairs and replacements for all laptop brands.',
        color: 'purple',
      },
      {
        iconName: 'database',
        title: 'SSD & STORAGE UPGRADE',
        description: 'Upgrade your laptop to a faster SSD for dramatically improved boot times and performance. I clone your existing data across.',
        color: 'cyan',
      },
      {
        iconName: 'repair',
        title: 'OVERHEATING & FAN REPAIR',
        description: 'Laptop running hot or shutting down? I clean dust build-up, replace thermal paste, and fix or replace cooling fans.',
        color: 'orange',
      },
    ],
    processTitle: 'WHY ROMFORD CHOOSES ME FOR LAPTOP REPAIRS',
    processSteps: [
      {
        title: 'SAME DAY SERVICE',
        description: 'Most laptop repairs completed within 24-48 hours. Screen replacements often done same day when I have parts in stock.',
      },
      {
        title: '£20 DIAGNOSTIC CHECK',
        description: 'Full diagnostic for just £20 — waived if you go ahead with the repair. Unfixable? No fix, no fee applies.',
      },
      {
        title: 'WARRANTY INCLUDED',
        description: "All laptop repairs come with a 90-day warranty. If the same issue returns, I'll fix it free of charge.",
      },
      {
        title: '20+ YEARS EXPERIENCE',
        description: "Over two decades of experience repairing laptops of all brands. I've seen and fixed it all — from simple screen swaps to complex motherboard faults.",
      },
    ],
    faqs: [
      {
        question: 'How much does laptop screen replacement cost in Romford?',
        answer: 'Laptop screen replacement typically costs between £60-£120 depending on the screen size and type (standard LCD vs touchscreen). I provide a free quote before any work begins and prices include fitting.',
      },
      {
        question: 'Can you fix a laptop that keeps overheating?',
        answer: 'Yes! Overheating is one of my most common repairs. I clean out dust build-up, replace thermal paste, and repair or replace faulty fans. This usually resolves overheating issues and prevents further damage to your laptop.',
      },
      {
        question: 'My laptop is running really slowly — can you fix it?',
        answer: 'Absolutely. Slow laptops are often caused by a failing hard drive, insufficient RAM, malware, or bloated software. I diagnose the root cause and can upgrade your hard drive to an SSD, add more RAM, or perform a full system cleanup to get it running like new.',
      },
      {
        question: 'What areas of Romford do you cover for laptop repairs?',
        answer: "I cover all of Romford including the town centre, Harold Hill, Collier Row, Gidea Park, Harold Wood, Rush Green, and surrounding areas. Collection and drop-off service available throughout RM postcodes. Open 7 days, 9AM-9PM.",
      },
    ],
    relatedServices: [
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'Desktop PC repairs including hardware faults, blue screens, and startup failures.',
        url: '/services/pc-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'shield',
        title: 'Virus Removal',
        description: 'Same-day virus and malware removal. I clean your laptop and protect against future threats.',
        url: '/services/virus-removal-romford/',
        color: 'green',
      },
      {
        iconName: 'apple',
        title: 'Mac Repair Romford',
        description: 'MacBook and iMac repairs — software fixes, SSD upgrades, screen and battery replacement.',
        url: '/services/mac-repair-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'BROKEN LAPTOP IN ROMFORD?',
    ctaDescription: 'Collection and drop-off service available. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.',
    areasTitle: 'LAPTOP REPAIR ACROSS HAVERING & ESSEX',
  },

  'laptop-repair-dagenham': {
    slug: 'laptop-repair-dagenham',
    seo: {
      title: 'Laptop Repair Dagenham - Same Day Service',
      description: 'Laptop repair in Dagenham. Screen, keyboard & battery replacement. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'laptop repair dagenham, laptop screen repair dagenham, laptop keyboard repair dagenham, laptop battery replacement dagenham, laptop repair near me, laptop screen replacement dagenham, broken laptop screen dagenham, laptop not charging dagenham, laptop repair barking dagenham',
      publishedTime: '2025-01-15',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Laptop Repair Dagenham', url: '/services/laptop-repair-dagenham/' },
      ],
    },
    heroTitle: 'LAPTOP REPAIR DAGENHAM',
    heroDescription: 'Professional laptop repair services for Dagenham and Barking & Dagenham. I fix all laptop brands including Dell, HP, Lenovo, Asus, Acer, and Apple MacBooks. Free collection and delivery.',
    heroBadgeIcon: 'laptop',
    heroBadgeText: 'SAME DAY LAPTOP REPAIRS',
    servicesTitle: 'DAGENHAM LAPTOP REPAIR SERVICES',
    services: [
      {
        iconName: 'desktop',
        title: 'SCREEN REPLACEMENT',
        description: 'Cracked, broken or damaged laptop screens replaced. All sizes and brands.',
        color: 'cyan',
      },
      {
        iconName: 'tools',
        title: 'KEYBOARD REPAIR',
        description: 'Broken keys, sticky keyboards, liquid damage repair and replacement.',
        color: 'green',
      },
      {
        iconName: 'bolt',
        title: 'BATTERY REPLACEMENT',
        description: 'Laptop not holding charge? I replace worn out batteries for all models.',
        color: 'orange',
      },
      {
        iconName: 'bolt',
        title: 'CHARGING PORT REPAIR',
        description: 'Laptop not charging? DC jack and charging port repairs and replacements.',
        color: 'purple',
      },
      {
        iconName: 'database',
        title: 'SSD & STORAGE UPGRADE',
        description: 'Upgrade your laptop to a faster SSD for dramatically improved boot times and performance. I clone your existing data across.',
        color: 'cyan',
      },
      {
        iconName: 'repair',
        title: 'OVERHEATING & FAN REPAIR',
        description: 'Laptop running hot or shutting down? I clean dust build-up, replace thermal paste, and fix or replace cooling fans.',
        color: 'orange',
      },
    ],
    processTitle: 'WHY DAGENHAM CHOOSES ME FOR LAPTOP REPAIRS',
    processSteps: [
      {
        title: 'COLLECTION & DROP-OFF',
        description: 'Collection and drop-off service available throughout Dagenham, Becontree, Dagenham Heathway, and surrounding areas. No need to travel.',
      },
      {
        title: 'FAST TURNAROUND',
        description: 'Most laptop repairs completed within 24-48 hours. Screen replacements often done same day when I have parts in stock.',
      },
      {
        title: '£20 DIAGNOSTIC CHECK',
        description: 'Full diagnostic usually completed within an hour for just £20. If you go ahead with the repair, the £20 is waived. Unfixable? No fix, no fee applies.',
      },
      {
        title: 'WARRANTY INCLUDED',
        description: "All laptop repairs come with a 90-day warranty. If the same issue returns, I'll fix it free of charge.",
      },
    ],
    faqs: [
      {
        question: 'How much does laptop screen replacement cost in Dagenham?',
        answer: 'Laptop screen replacement typically costs between £60-£120 depending on the screen size and type (standard LCD vs touchscreen). I provide a free quote before any work begins and prices include fitting.',
      },
      {
        question: 'Do you repair MacBooks in Dagenham?',
        answer: 'Yes! I repair all Apple MacBooks including MacBook Air and MacBook Pro models. Common repairs include screen replacement, keyboard repair, battery replacement, and SSD upgrades.',
      },
      {
        question: "Can you fix a laptop that won't turn on?",
        answer: "Yes, I diagnose and repair laptops that won't power on. Common causes include faulty power supplies, dead batteries, motherboard issues, or failed components. I offer a £20 diagnostic check to identify the exact problem — waived if you proceed with repair.",
      },
      {
        question: 'What areas of Dagenham do you cover for laptop repairs?',
        answer: 'I cover all of Dagenham including Dagenham Heathway, Becontree, Dagenham Dock, Dagenham East, and the surrounding Barking & Dagenham areas. Collection and drop-off service available throughout the RM8, RM9, and RM10 postcodes.',
      },
    ],
    relatedServices: [
      {
        iconName: 'laptop',
        title: 'Laptop Repair Romford',
        description: 'Professional laptop repairs in Romford — screens, keyboards, batteries, and more.',
        url: '/services/laptop-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'bolt',
        title: 'Computer Upgrades',
        description: 'SSD and RAM upgrades to speed up your laptop. Data cloned so nothing is lost.',
        url: '/services/computer-upgrades-romford/',
        color: 'green',
      },
      {
        iconName: 'shield',
        title: 'Virus Removal',
        description: 'Same-day virus and malware removal. I clean your laptop and protect against future threats.',
        url: '/services/virus-removal-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'BROKEN LAPTOP IN DAGENHAM?',
    ctaDescription: 'Collection and drop-off service available. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.',
    areasTitle: 'LAPTOP REPAIR ACROSS HAVERING & ESSEX',
  },

  'virus-removal-romford': {
    slug: 'virus-removal-romford',
    seo: {
      title: 'Virus Removal Romford - Same Day Service',
      description: 'Virus removal in Romford. Same day malware, spyware & ransomware cleanup. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'virus removal romford, malware removal romford, spyware removal romford, ransomware removal romford, computer virus romford, virus removal near me, same day virus removal, computer virus repair romford, virus cleanup romford, malware scan romford',
      publishedTime: '2025-01-15',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Virus Removal Romford', url: '/services/virus-removal-romford/' },
      ],
    },
    heroTitle: 'VIRUS REMOVAL ROMFORD',
    heroDescription: 'Professional virus and malware removal for Romford residents and businesses. I eliminate all types of malware including viruses, spyware, ransomware, and adware. Same day service available.',
    heroBadgeIcon: 'virus',
    heroBadgeText: 'SAME DAY VIRUS REMOVAL',
    servicesTitle: 'SIGNS YOUR ROMFORD COMPUTER HAS A VIRUS',
    services: [
      {
        iconName: 'clock',
        title: 'SLOW PERFORMANCE',
        description: 'Computer running slowly, taking ages to start up or open programs.',
        color: 'cyan',
      },
      {
        iconName: 'alert',
        title: 'POP-UPS & ADS',
        description: 'Unexpected pop-ups, browser redirects, or unwanted advertisements.',
        color: 'green',
      },
      {
        iconName: 'lock',
        title: 'RANSOMWARE',
        description: 'Files locked or encrypted, demanding payment to unlock.',
        color: 'orange',
      },
      {
        iconName: 'laptop',
        title: 'STRANGE BEHAVIOUR',
        description: 'Programs crashing, settings changing, or unknown programs installed.',
        color: 'purple',
      },
      {
        iconName: 'globe',
        title: 'BROWSER HIJACKING',
        description: 'Homepage changed, unwanted search engines, or redirected to dodgy sites. I remove browser hijackers and restore your settings.',
        color: 'cyan',
      },
      {
        iconName: 'email',
        title: 'EMAIL & ACCOUNT COMPROMISE',
        description: 'Hacked email, suspicious account activity, or phishing attacks. I secure your accounts and remove the threat.',
        color: 'orange',
      },
    ],
    processTitle: 'MY ROMFORD VIRUS REMOVAL PROCESS',
    processSteps: [
      {
        title: '1. £20 DIAGNOSTIC',
        description: 'I scan your computer to identify all viruses, malware, and security threats. Just £20 — waived if you go ahead with the repair.',
      },
      {
        title: '2. COMPLETE REMOVAL',
        description: 'I remove all malware including rootkits, trojans, worms, spyware, and adware using professional tools.',
      },
      {
        title: '3. SYSTEM CLEANUP',
        description: 'I clean up infected files, repair damaged system settings, and optimise your computer for better performance.',
      },
      {
        title: '4. PROTECTION SETUP',
        description: 'I install and configure security software to protect against future infections and advise on safe computing practices.',
      },
    ],
    faqs: [
      {
        question: 'How much does virus removal cost in Romford?',
        answer: 'My virus removal service starts from just £40. This includes full malware scan, removal of all infections, system cleanup, and basic security setup. £20 diagnostic check — waived if you go ahead with the repair. No fix, no fee on unfixable issues.',
      },
      {
        question: 'Can you remove ransomware and recover my files?',
        answer: "Yes, I specialise in ransomware removal. While file recovery depends on the type of ransomware, I have high success rates with many variants. I'll always give you an honest assessment of what's possible.",
      },
      {
        question: 'How long does virus removal take?',
        answer: 'Most virus removals are completed same day or within 24 hours. Severe infections or ransomware cases may take 24-48 hours. I always aim to get your computer back to you as quickly as possible.',
      },
      {
        question: 'Do you cover all of Romford for virus removal?',
        answer: 'Yes! I serve all of Romford including the town centre, Harold Hill, Collier Row, Gidea Park, Harold Wood, and surrounding areas. Collection and drop-off service available throughout RM postcodes.',
      },
    ],
    relatedServices: [
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'Desktop PC repairs including blue screens, startup failures, and hardware faults.',
        url: '/services/pc-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'laptop',
        title: 'Laptop Repair Romford',
        description: 'Professional laptop repairs including screen, keyboard, battery, and charging fixes.',
        url: '/services/laptop-repair-romford/',
        color: 'green',
      },
      {
        iconName: 'repair',
        title: 'Windows Installation',
        description: 'Fresh Windows installs and reinstalls. Get a clean, virus-free system with all your data intact.',
        url: '/services/windows-installation-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'COMPUTER INFECTED IN ROMFORD?',
    ctaDescription: "Don't wait - viruses can steal your data and spread. Call now for same day removal.",
    areasTitle: 'VIRUS REMOVAL ACROSS HAVERING & ESSEX',
  },

  'data-recovery-havering': {
    slug: 'data-recovery-havering',
    seo: {
      title: 'Data Recovery Havering - File Recovery Service',
      description: 'Data recovery in Havering. Recover files from failed hard drives, SSDs & USB drives. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'data recovery havering, hard drive recovery romford, ssd data recovery havering, file recovery havering, data recovery near me, recover deleted files havering, hard drive repair romford, data recovery essex, lost files recovery, failed hard drive recovery',
      publishedTime: '2025-01-15',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Data Recovery Havering', url: '/services/data-recovery-havering/' },
      ],
    },
    heroTitle: 'DATA RECOVERY HAVERING',
    heroDescription: 'Lost important files? I recover data from failed hard drives, SSDs, USB drives, and memory cards. Serving Romford, Harold Hill, Hornchurch, Upminster, and all Havering areas.',
    heroBadgeIcon: 'database',
    heroBadgeText: 'PROFESSIONAL DATA RECOVERY',
    servicesTitle: 'DATA RECOVERY SERVICES',
    services: [
      {
        iconName: 'database',
        title: 'HARD DRIVE RECOVERY',
        description: 'Recover files from failed, clicking, or undetected hard drives. Desktop and laptop HDDs.',
        color: 'purple',
      },
      {
        iconName: 'bolt',
        title: 'SSD DATA RECOVERY',
        description: 'Recover data from failed SSDs including NVMe, SATA, and M.2 drives.',
        color: 'cyan',
      },
      {
        iconName: 'bolt',
        title: 'USB & EXTERNAL DRIVES',
        description: 'Recovery from USB flash drives, external hard drives, and portable SSDs.',
        color: 'green',
      },
      {
        iconName: 'desktop',
        title: 'MEMORY CARD RECOVERY',
        description: 'Recover photos and videos from SD cards, microSD, CF cards, and camera storage.',
        color: 'orange',
      },
      {
        iconName: 'mobile',
        title: 'PHONE & TABLET RECOVERY',
        description: 'Recover photos, contacts, and files from damaged or broken phones and tablets. Android and iOS devices.',
        color: 'purple',
      },
      {
        iconName: 'wifi',
        title: 'RAID & NAS RECOVERY',
        description: 'Multi-drive RAID arrays and NAS devices. I recover data from degraded, failed, or corrupted RAID configurations.',
        color: 'cyan',
      },
    ],
    processTitle: 'COMMON DATA LOSS SCENARIOS I HANDLE',
    processSteps: [
      {
        title: 'ACCIDENTAL DELETION',
        description: 'Accidentally deleted important files or emptied the recycle bin? I can often recover recently deleted data.',
      },
      {
        title: 'DRIVE FAILURE',
        description: 'Hard drive clicking, not spinning, or not detected? I specialise in recovering data from mechanically failed drives.',
      },
      {
        title: 'WATER DAMAGE',
        description: 'Liquid spill on your laptop? I can attempt data recovery from water-damaged storage devices.',
      },
      {
        title: 'RANSOMWARE',
        description: 'Files encrypted by ransomware? I may be able to help recover your data depending on the variant.',
      },
    ],
    faqs: [
      {
        question: 'How much does data recovery cost in Havering?',
        answer: 'Data recovery costs vary depending on the type of failure. Simple logical recoveries (deleted files, formatted drives) start from £60. More complex recoveries from failed drives typically cost £80-£150. I provide a free assessment and quote before any work.',
      },
      {
        question: "What's your success rate for data recovery?",
        answer: "My success rate is approximately 80-90% for logical failures (deleted files, corrupted drives) and 60-70% for physical failures (clicking drives, head crashes). I always provide an honest assessment of recovery chances before starting work.",
      },
      {
        question: 'How long does data recovery take?',
        answer: "Most data recovery jobs are completed within 2-5 days. Simple recoveries can sometimes be done same day. Complex cases requiring specialist techniques may take longer. I'll give you an estimated timeframe after initial assessment.",
      },
      {
        question: 'What areas of Havering do you cover for data recovery?',
        answer: 'I cover all of Havering including Romford, Harold Hill, Hornchurch, Upminster, Rainham, Harold Wood, Gidea Park, Collier Row, and Elm Park. Collection and delivery available throughout the borough.',
      },
    ],
    relatedServices: [
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'Desktop PC repairs including hard drive replacement, upgrades, and system restoration.',
        url: '/services/pc-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'bolt',
        title: 'Computer Upgrades',
        description: 'SSD upgrades with full data cloning. Keep everything, just make it faster.',
        url: '/services/computer-upgrades-romford/',
        color: 'green',
      },
      {
        iconName: 'laptop',
        title: 'Laptop Repair Dagenham',
        description: 'Professional laptop repairs in Dagenham including screen, keyboard, and hardware fixes.',
        url: '/services/laptop-repair-dagenham/',
        color: 'orange',
      },
    ],
    ctaTitle: 'LOST IMPORTANT DATA IN HAVERING?',
    ctaDescription: 'Free assessment. No data, no fee guarantee. Call now for emergency recovery.',
    areasTitle: 'DATA RECOVERY ACROSS HAVERING & ESSEX',
  },

  'mac-repair-romford': {
    slug: 'mac-repair-romford',
    seo: {
      title: 'Mac Repair Romford - Same Day Service',
      description: 'Mac repair in Romford. MacBook, iMac & Mac Mini repairs. SSD upgrades, screen replacement, battery fixes. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'mac repair romford, macbook repair romford, apple repair romford, imac repair romford, macbook screen repair romford, macbook battery replacement romford, mac running slow romford, apple computer repair near me',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Mac Repair Romford', url: '/services/mac-repair-romford/' },
      ],
    },
    heroTitle: 'MAC REPAIR ROMFORD',
    heroDescription: 'Professional Apple Mac repair services in Romford. I fix MacBooks, iMacs, and Mac Minis — software issues, SSD upgrades, screen replacements, battery swaps, and more. A faster, more affordable alternative to the Apple Store.',
    heroBadgeIcon: 'apple',
    heroBadgeText: 'APPLE MAC REPAIRS',
    servicesTitle: 'MAC REPAIR SERVICES',
    services: [
      {
        iconName: 'laptop',
        title: 'SOFTWARE FIXES',
        description: 'macOS reinstallation, system cleanup, slow performance fixes, startup issues, and software troubleshooting.',
        color: 'purple',
      },
      {
        iconName: 'database',
        title: 'SSD UPGRADE',
        description: 'Replace your Mac\'s old hard drive or small SSD with a larger, faster drive. Data cloned so nothing is lost.',
        color: 'cyan',
      },
      {
        iconName: 'desktop',
        title: 'SCREEN REPLACEMENT',
        description: 'Cracked or damaged MacBook screen? I replace MacBook Air and MacBook Pro screens with quality parts.',
        color: 'green',
      },
      {
        iconName: 'bolt',
        title: 'BATTERY REPLACEMENT',
        description: 'MacBook battery swollen, not holding charge, or showing "Service Battery"? I replace batteries for all MacBook models.',
        color: 'orange',
      },
      {
        iconName: 'clipboard',
        title: 'DATA TRANSFER',
        description: 'Moving from PC to Mac or upgrading to a new Mac? I transfer all your files, photos, and documents safely.',
        color: 'cyan',
      },
      {
        iconName: 'repair',
        title: 'SETUP & CONFIGURATION',
        description: 'New Mac setup, email configuration, printer setup, Time Machine backups, and iCloud configuration.',
        color: 'green',
      },
    ],
    processTitle: 'WHY CHOOSE ME OVER THE APPLE STORE?',
    processSteps: [
      {
        title: 'LOWER PRICES',
        description: 'I charge significantly less than Apple for the same repairs. No appointment needed, no waiting weeks for parts.',
      },
      {
        title: 'FASTER TURNAROUND',
        description: 'Most Mac repairs completed within 24-48 hours. No need to book a Genius Bar appointment or wait days for a diagnosis.',
      },
      {
        title: 'LOCAL & CONVENIENT',
        description: 'No need to travel to Stratford or Lakeside. I offer collection and drop-off service throughout Romford and surrounding areas.',
      },
      {
        title: '£20 DIAGNOSTIC',
        description: 'Full diagnostic for just £20 — waived if you proceed with the repair. No fix, no fee on unfixable issues.',
      },
    ],
    faqs: [
      {
        question: 'Which Mac models do you repair?',
        answer: "I repair MacBook Air, MacBook Pro, iMac, and Mac Mini models. I handle software fixes, SSD upgrades, RAM upgrades (where possible), screen replacements, and battery swaps. I don't offer logic board repair, but I can help with most other Mac issues.",
      },
      {
        question: 'My Mac is running really slowly — can you speed it up?',
        answer: 'Yes! A slow Mac is usually caused by a full hard drive, insufficient RAM, or an ageing mechanical drive. I can upgrade to an SSD, add RAM, clean up macOS, and remove unnecessary startup items to dramatically improve speed.',
      },
      {
        question: 'How much does a MacBook screen replacement cost?',
        answer: "MacBook screen replacements vary by model, typically ranging from £120-£250. This is usually significantly cheaper than Apple's out-of-warranty pricing. I provide a clear quote before starting any work.",
      },
      {
        question: "Can you recover data from a Mac that won't start?",
        answer: "In most cases, yes. Even if your Mac won't boot, I can usually remove the drive and recover your files. I offer a free assessment for data recovery — no data, no fee.",
      },
    ],
    relatedServices: [
      {
        iconName: 'laptop',
        title: 'Laptop Repair Romford',
        description: 'Repairs for all laptop brands including screen, keyboard, and battery replacement.',
        url: '/services/laptop-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'database',
        title: 'Data Recovery',
        description: 'Recover files from failed Mac drives. Free assessment, no data no fee.',
        url: '/services/data-recovery-havering/',
        color: 'green',
      },
      {
        iconName: 'rocket',
        title: 'Computer Upgrades',
        description: 'SSD and RAM upgrades for Macs and PCs. Transform your slow computer.',
        url: '/services/computer-upgrades-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'MAC PROBLEMS IN ROMFORD?',
    ctaDescription: 'Faster and cheaper than the Apple Store. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.',
    areasTitle: 'MAC REPAIR ACROSS HAVERING & ESSEX',
  },

  'gaming-pc-repair-romford': {
    slug: 'gaming-pc-repair-romford',
    seo: {
      title: 'Gaming PC Repair Romford - Same Day Service',
      description: 'Gaming PC repair in Romford. GPU failures, overheating, crashes & PSU issues fixed. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'gaming pc repair romford, gpu repair romford, gaming computer fix romford, overheating gaming pc romford, gaming pc crashing romford, graphics card repair romford, gaming pc not turning on romford, pc gaming repair near me',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Gaming PC Repair Romford', url: '/services/gaming-pc-repair-romford/' },
      ],
    },
    heroTitle: 'GAMING PC REPAIR ROMFORD',
    heroDescription: "Expert gaming PC repair in Romford. I fix GPU failures, overheating issues, random crashes, power supply problems, and more. Whether it's a custom build or pre-built gaming rig, I'll get you back in the game.",
    heroBadgeIcon: 'gaming',
    heroBadgeText: 'GAMING PC SPECIALISTS',
    servicesTitle: 'COMMON GAMING PC ISSUES',
    services: [
      {
        iconName: 'desktop',
        title: 'GPU FAILURES',
        description: 'Artefacts on screen, display cutting out, no video output, or driver crashes. I diagnose and replace faulty graphics cards.',
        color: 'cyan',
      },
      {
        iconName: 'cpu',
        title: 'OVERHEATING',
        description: 'Thermal throttling, high temps under load, or shutdowns during gaming. I clean, repaste, and improve cooling for better thermals.',
        color: 'orange',
      },
      {
        iconName: 'alert',
        title: 'CRASHES & FREEZES',
        description: 'Random crashes, blue screens during gaming, or system freezes. Could be RAM, drivers, PSU, or overheating — I find the root cause.',
        color: 'purple',
      },
      {
        iconName: 'bolt',
        title: 'PSU ISSUES',
        description: 'PC shutting off under load, not turning on, or random restarts? Underpowered or failing PSUs are a common gaming PC issue.',
        color: 'cyan',
      },
      {
        iconName: 'database',
        title: 'STORAGE & LOAD TIMES',
        description: 'Games loading slowly or stuttering? I upgrade to NVMe SSDs and optimise your storage for faster load times and smoother gameplay.',
        color: 'green',
      },
      {
        iconName: 'desktop',
        title: 'DISPLAY & MONITOR ISSUES',
        description: 'No display output, flickering, artefacts, or screen tearing. I diagnose GPU, cable, and monitor connection problems.',
        color: 'orange',
      },
    ],
    processTitle: "UPGRADE VS REPAIR — I'LL ADVISE",
    processSteps: [
      {
        title: 'WHEN TO REPAIR',
        description: "If your gaming PC was running fine before — a specific component has failed and just needs replacing. I'll fix the faulty part and get you back online.",
      },
      {
        title: 'WHEN TO UPGRADE',
        description: "If your rig can't handle newer games or you want better performance, targeted upgrades (GPU, CPU, RAM, SSD) can bring new life without a full rebuild.",
      },
      {
        title: 'HONEST ADVICE',
        description: "I won't try to sell you upgrades you don't need. After my £20 diagnostic, I'll give you an honest recommendation — repair, upgrade, or rebuild.",
      },
      {
        title: 'ALL BRANDS & BUILDS',
        description: "Custom builds, pre-built gaming PCs, AMD and Intel systems — I'm experienced with all configurations and hardware brands.",
      },
    ],
    faqs: [
      {
        question: "My gaming PC keeps crashing mid-game — what's wrong?",
        answer: 'Mid-game crashes are usually caused by overheating (GPU or CPU), insufficient PSU wattage, faulty RAM, or driver issues. I run stress tests and diagnostics to find the exact cause. My £20 diagnostic fee is waived if you proceed with the repair.',
      },
      {
        question: 'Can you replace my graphics card?',
        answer: "Yes. I can supply and fit a replacement GPU, or install one you've purchased. I'll also check your PSU can handle the new card and ensure proper driver installation for optimal gaming performance.",
      },
      {
        question: 'My gaming PC is overheating — can you fix it?',
        answer: 'Absolutely. I clean out dust, replace old thermal paste, check fan operation, and can upgrade your cooler if needed. Proper cooling is essential for gaming performance and component longevity.',
      },
      {
        question: 'Do you also build custom gaming PCs?',
        answer: 'Yes! I build custom gaming PCs to any specification and budget. Check out my Custom Gaming PCs page for more details. I also offer upgrade services to improve your existing rig.',
      },
    ],
    relatedServices: [
      {
        iconName: 'gaming',
        title: 'Custom Gaming PCs',
        description: 'Custom-built gaming rigs designed for your budget and performance needs.',
        url: '/services/custom-pcs/',
        color: 'cyan',
      },
      {
        iconName: 'rocket',
        title: 'Computer Upgrades',
        description: "GPU, SSD, RAM, and CPU upgrades to boost your gaming PC's performance.",
        url: '/services/computer-upgrades-romford/',
        color: 'green',
      },
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'General desktop PC repairs including hardware faults and software issues.',
        url: '/services/pc-repair-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'GAMING PC DOWN IN ROMFORD?',
    ctaDescription: 'Get back in the game. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair. No fix, no fee.',
    areasTitle: 'GAMING PC REPAIR ACROSS HAVERING & ESSEX',
  },

  'network-wifi-romford': {
    slug: 'network-wifi-romford',
    seo: {
      title: 'WiFi & Network Repair Romford - Same Day Service',
      description: 'WiFi and network repair in Romford. Dead spots, slow speeds, dropouts & router setup. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'wifi repair romford, network setup romford, wifi problems romford, internet not working romford, router setup romford, slow wifi romford, wifi dead spots romford, network troubleshooting romford',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Network & WiFi Romford', url: '/services/network-wifi-romford/' },
      ],
    },
    heroTitle: 'NETWORK & WIFI ROMFORD',
    heroDescription: "WiFi not working? Slow internet? Dead spots around your home? I fix WiFi and network issues for homes and small businesses across Romford. From router setup to full network troubleshooting — I'll get you connected.",
    heroBadgeIcon: 'wifi',
    heroBadgeText: 'WIFI & NETWORK SUPPORT',
    servicesTitle: 'COMMON WIFI & NETWORK ISSUES',
    services: [
      {
        iconName: 'wifi',
        title: 'WIFI DEAD SPOTS',
        description: "WiFi doesn't reach certain rooms? I optimise router placement, configure mesh systems, or install WiFi extenders to eliminate dead zones.",
        color: 'cyan',
      },
      {
        iconName: 'clock',
        title: 'SLOW SPEEDS',
        description: "Not getting the speeds you're paying for? I diagnose whether it's a router issue, interference, or ISP problem and fix it.",
        color: 'orange',
      },
      {
        iconName: 'signal',
        title: 'DROPOUTS & DISCONNECTIONS',
        description: "Internet keeps dropping out? WiFi disconnecting randomly? I identify the cause — whether it's hardware, interference, or configuration.",
        color: 'green',
      },
      {
        iconName: 'repair',
        title: 'ROUTER & NETWORK SETUP',
        description: 'New router setup, mesh WiFi installation, network security configuration, and connecting all your devices properly.',
        color: 'purple',
      },
      {
        iconName: 'lock',
        title: 'NETWORK SECURITY',
        description: 'Secure your home or business network. Password changes, firewall setup, guest networks, and protection against unauthorised access.',
        color: 'cyan',
      },
      {
        iconName: 'home',
        title: 'SMART HOME & IOT SETUP',
        description: 'Connect smart devices, printers, CCTV, and streaming boxes to your network. I ensure everything works together reliably.',
        color: 'orange',
      },
    ],
    processTitle: 'WHAT I FIX',
    processSteps: [
      {
        title: 'HOME WIFI',
        description: 'Router configuration, WiFi optimisation, mesh system setup, extender placement, and resolving interference from neighbouring networks.',
      },
      {
        title: 'SMALL BUSINESS',
        description: 'Network setup for small offices, shared printers, file sharing, network security, and reliable WiFi for staff and customers.',
      },
      {
        title: 'DEVICE CONNECTIVITY',
        description: "Printers, smart TVs, smart home devices, and other gadgets not connecting? I'll get everything talking to your network.",
      },
      {
        title: 'NETWORK SECURITY',
        description: 'Secure your WiFi network with strong passwords, proper encryption, and firewall configuration to keep unwanted users out.',
      },
    ],
    faqs: [
      {
        question: "My WiFi doesn't reach upstairs — can you fix this?",
        answer: 'Yes! Poor WiFi coverage is very common in multi-storey homes. I can optimise your router placement, set up a mesh WiFi system, or install a WiFi extender to ensure strong coverage throughout your entire home.',
      },
      {
        question: 'My internet keeps disconnecting — is it my router or my ISP?',
        answer: "I'll diagnose whether the problem is your router, your internal wiring, WiFi interference, or your ISP's service. If it's an ISP issue, I'll help you communicate the problem to them with the evidence they need.",
      },
      {
        question: 'Can you set up a new router for me?',
        answer: 'Absolutely. I set up and configure new routers, including WiFi name and password, security settings, port forwarding, and connecting all your devices. I can also recommend the best router for your home and internet plan.',
      },
      {
        question: 'How much does WiFi troubleshooting cost?',
        answer: "My WiFi and network troubleshooting starts with a £20 diagnostic — waived if you proceed with the fix. Most network issues are resolved for £40-£80 depending on complexity. I'm open 7 days, 9AM-9PM, and serve all of Romford.",
      },
    ],
    relatedServices: [
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'Desktop PC repairs including hardware faults, blue screens, and software issues.',
        url: '/services/pc-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'shield',
        title: 'Virus Removal',
        description: 'Malware can cause network issues. I clean infections and secure your system.',
        url: '/services/virus-removal-romford/',
        color: 'green',
      },
      {
        iconName: 'repair',
        title: 'Windows Installation',
        description: 'Fresh Windows install with all network drivers correctly configured.',
        url: '/services/windows-installation-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'WIFI PROBLEMS IN ROMFORD?',
    ctaDescription: "I'll get you connected. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.",
    areasTitle: 'WIFI & NETWORK SUPPORT ACROSS HAVERING & ESSEX',
  },

  'computer-upgrades-romford': {
    slug: 'computer-upgrades-romford',
    seo: {
      title: 'Computer Upgrades Romford - SSD & RAM Upgrades',
      description: 'Computer upgrade service in Romford. SSD upgrades, RAM upgrades, GPU replacements & full rebuilds. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'ssd upgrade romford, pc upgrade romford, computer upgrade service romford, slow computer fix romford, ram upgrade romford, gpu upgrade romford, computer speed upgrade romford, hard drive to ssd romford',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Computer Upgrades Romford', url: '/services/computer-upgrades-romford/' },
      ],
    },
    heroTitle: 'COMPUTER UPGRADES ROMFORD',
    heroDescription: 'Transform your slow computer with professional upgrades. SSD installations, RAM upgrades, GPU replacements, and full system rebuilds. Make your existing PC or laptop feel like new — often for a fraction of the cost of buying new.',
    heroBadgeIcon: 'rocket',
    heroBadgeText: 'SPEED UP YOUR COMPUTER',
    servicesTitle: 'UPGRADE OPTIONS',
    services: [
      {
        iconName: 'database',
        title: 'SSD UPGRADE',
        description: 'The single biggest speed improvement you can make. Replace your old hard drive with an SSD and boot in seconds. I clone your existing data so nothing is lost.',
        color: 'orange',
      },
      {
        iconName: 'cpu',
        title: 'RAM UPGRADE',
        description: 'More RAM means smoother multitasking. If your PC slows down with multiple tabs or programs open, a RAM upgrade will make a noticeable difference.',
        color: 'cyan',
      },
      {
        iconName: 'gaming',
        title: 'GPU UPGRADE',
        description: "Upgrade your graphics card for better gaming, video editing, or multi-monitor setups. I'll recommend the best GPU for your budget and system.",
        color: 'green',
      },
      {
        iconName: 'repair',
        title: 'FULL REBUILD',
        description: 'Complete system overhaul — new motherboard, CPU, RAM, and SSD. Keep your case and peripherals while getting a modern, fast system at a lower cost than buying new.',
        color: 'purple',
      },
      {
        iconName: 'repair',
        title: 'COOLING UPGRADE',
        description: 'Better fans, thermal paste, and airflow improvements. Keep your upgraded components running cool and quiet under load.',
        color: 'cyan',
      },
      {
        iconName: 'bolt',
        title: 'PSU UPGRADE',
        description: 'Upgrading your GPU or adding components? I ensure your power supply can handle the extra demand with a reliable PSU swap.',
        color: 'orange',
      },
    ],
    processTitle: 'BEFORE & AFTER AN SSD UPGRADE',
    processSteps: [
      {
        title: 'BEFORE: SLOW STARTUP',
        description: 'Old hard drives take 2-5 minutes to boot Windows. Opening programs takes 30-60 seconds. General feel: sluggish and frustrating.',
      },
      {
        title: 'AFTER: FAST STARTUP',
        description: 'SSDs boot Windows in 10-20 seconds. Programs open instantly. File transfers up to 10x faster. General feel: fast and responsive.',
      },
      {
        title: 'DATA PRESERVED',
        description: 'I clone your entire hard drive to the new SSD — Windows, programs, files, everything. When you get your computer back, it looks exactly the same, just much faster.',
      },
      {
        title: 'HONEST ASSESSMENT',
        description: "I'll tell you if your system is too old to benefit from upgrades. No upselling — just honest advice on the best path forward for your needs and budget.",
      },
    ],
    faqs: [
      {
        question: 'Is it worth upgrading my old computer or should I buy new?',
        answer: "In most cases, upgrading is much better value. An SSD and RAM upgrade can make a 5-year-old PC feel new for under £100. I'll give you an honest assessment — if your system is too old to benefit from upgrades, I'll tell you.",
      },
      {
        question: 'Will I lose my files during an SSD upgrade?',
        answer: 'No. I clone your entire hard drive to the new SSD — Windows, programs, files, everything. When you get your computer back, it will look exactly the same, just much faster. I always back up your data as a precaution.',
      },
      {
        question: 'Can you upgrade laptops as well as desktops?',
        answer: "Yes! Most laptops can have their SSD and RAM upgraded. Some newer ultra-thin models have soldered components, but I'll check compatibility before quoting. I upgrade all major brands including Dell, HP, Lenovo, Asus, and Acer.",
      },
      {
        question: 'How long does a computer upgrade take?',
        answer: "Most upgrades are completed same day or within 24 hours. SSD cloning can take a few hours depending on the amount of data. I'm open 7 days, 9AM-9PM, and offer collection and drop-off service throughout Romford.",
      },
    ],
    relatedServices: [
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: 'Desktop PC repairs including hardware faults, blue screens, and startup failures.',
        url: '/services/pc-repair-romford/',
        color: 'cyan',
      },
      {
        iconName: 'laptop',
        title: 'Laptop Repair Romford',
        description: 'Professional laptop repairs including screen, keyboard, and battery replacement.',
        url: '/services/laptop-repair-romford/',
        color: 'green',
      },
      {
        iconName: 'gaming',
        title: 'Gaming PC Repair',
        description: 'GPU failures, overheating, crashes, and PSU problems. Expert gaming rig diagnosis.',
        url: '/services/gaming-pc-repair-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'SLOW COMPUTER IN ROMFORD?',
    ctaDescription: 'An SSD upgrade can transform your PC. £20 diagnostic — waived with repair. Collection and drop-off service available. Open 7 days, 9AM-9PM.',
    areasTitle: 'COMPUTER UPGRADES ACROSS HAVERING & ESSEX',
  },

  'windows-installation-romford': {
    slug: 'windows-installation-romford',
    seo: {
      title: 'Windows Installation Romford - Same Day Service',
      description: 'Windows installation in Romford. Fresh installs, upgrades to Windows 11, driver setup & data migration. £20 diagnostic — waived with repair. Call 07971 331814.',
      keywords: 'windows install romford, windows reinstall romford, windows 11 upgrade romford, fresh windows install romford, windows setup romford, format and reinstall romford, windows not working romford, clean install windows romford',
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Repairs & Services', url: '/services/repairs/' },
        { name: 'Windows Installation Romford', url: '/services/windows-installation-romford/' },
      ],
    },
    heroTitle: 'WINDOWS INSTALLATION ROMFORD',
    heroDescription: 'Professional Windows installation and reinstallation in Romford. Fresh installs, Windows 11 upgrades, driver setup, and data migration. Get a clean, fast system without losing your important files.',
    heroBadgeIcon: 'repair',
    heroBadgeText: 'WINDOWS INSTALLATION',
    servicesTitle: 'WINDOWS INSTALLATION SERVICES',
    services: [
      {
        iconName: 'star',
        title: 'FRESH INSTALL',
        description: 'Complete clean installation of Windows 10 or 11. Removes all bloatware and gives you a fresh, fast system. I back up your files first.',
        color: 'cyan',
      },
      {
        iconName: 'rocket',
        title: 'WINDOWS 11 UPGRADE',
        description: 'Upgrade from Windows 10 to Windows 11. I check hardware compatibility first and handle the entire upgrade process for you.',
        color: 'green',
      },
      {
        iconName: 'wrench',
        title: 'DRIVER SETUP',
        description: 'All hardware drivers installed and configured — graphics, audio, network, chipset, and peripherals. Everything working from day one.',
        color: 'orange',
      },
      {
        iconName: 'clipboard',
        title: 'DATA MIGRATION',
        description: 'I back up and restore your documents, photos, music, bookmarks, and email. No important files left behind after the reinstall.',
        color: 'purple',
      },
      {
        iconName: 'lock',
        title: 'SECURITY & UPDATES',
        description: 'Full Windows Update, antivirus installation, firewall configuration, and security hardening included with every install.',
        color: 'cyan',
      },
      {
        iconName: 'repair',
        title: 'SOFTWARE SETUP',
        description: 'I install your essential apps — Office, browsers, email, printers — so your PC is ready to use straight away.',
        color: 'orange',
      },
    ],
    processTitle: 'WHEN TO REINSTALL WINDOWS',
    processSteps: [
      {
        title: 'SLOW PERFORMANCE',
        description: 'If your PC has become painfully slow over time, a fresh Windows install removes years of accumulated bloat, temporary files, and registry clutter.',
      },
      {
        title: 'AFTER VIRUS INFECTION',
        description: 'After a severe virus or malware infection, a clean install is sometimes the best way to ensure every trace of the infection is removed.',
      },
      {
        title: 'NEW SSD INSTALLED',
        description: 'When upgrading to a new SSD, a fresh Windows install gives you the fastest possible experience. I can also clone if you prefer to keep everything as-is.',
      },
      {
        title: 'WINDOWS ERRORS',
        description: "Constant blue screens, boot loops, or corrupted system files that can't be repaired? A fresh install resolves all software-related issues.",
      },
    ],
    faqs: [
      {
        question: 'Will I lose my files if you reinstall Windows?',
        answer: 'No. I always back up your important files — documents, photos, music, and desktop items — before doing a fresh install. After Windows is set up, I restore everything back to where it was. Your data is safe with me.',
      },
      {
        question: 'Can my PC run Windows 11?',
        answer: "Windows 11 requires specific hardware (TPM 2.0, Secure Boot, compatible CPU). I check your system's compatibility before recommending an upgrade. If your PC doesn't meet the requirements, Windows 10 is still fully supported and a great option.",
      },
      {
        question: 'How much does a Windows reinstall cost?',
        answer: 'A fresh Windows installation including driver setup, Windows Update, and basic configuration starts from £50. Data backup and restoration is included. My £20 diagnostic fee is waived if you proceed. No fix, no fee on unfixable issues.',
      },
      {
        question: 'How long does a Windows installation take?',
        answer: "A typical Windows installation takes 2-4 hours including driver setup and updates. With data backup and restoration, it's usually completed same day or within 24 hours. I'm open 7 days, 9AM-9PM, with collection and drop-off available.",
      },
    ],
    relatedServices: [
      {
        iconName: 'rocket',
        title: 'Computer Upgrades',
        description: 'Pair a fresh Windows install with an SSD upgrade for the ultimate speed boost.',
        url: '/services/computer-upgrades-romford/',
        color: 'cyan',
      },
      {
        iconName: 'shield',
        title: 'Virus Removal',
        description: "Sometimes a clean install is the best cure for a severe infection. I'll advise.",
        url: '/services/virus-removal-romford/',
        color: 'green',
      },
      {
        iconName: 'desktop',
        title: 'PC Repair Romford',
        description: "Hardware repairs for PCs that won't boot or have component failures.",
        url: '/services/pc-repair-romford/',
        color: 'orange',
      },
    ],
    ctaTitle: 'NEED WINDOWS INSTALLED IN ROMFORD?',
    ctaDescription: 'Fresh install, upgrade, or repair. Open 7 days, 9AM-9PM. £20 diagnostic — waived with repair.',
    areasTitle: 'WINDOWS INSTALLATION ACROSS HAVERING & ESSEX',
  },
};
