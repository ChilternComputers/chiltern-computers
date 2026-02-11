// Area data for all service locations
import { siteConfig } from '../config';

export interface AreaFAQ {
  question: string;
  answer: string;
}

export interface AreaData {
  slug: string;
  name: string;
  region: string;
  postcode: string;
  distance: string;
  landmarks: string[];
  nearby: string[];
  faqs: AreaFAQ[];
}

export const areas: AreaData[] = [
  {
    slug: 'harold-hill',
    name: 'Harold Hill',
    region: 'Romford, Essex',
    postcode: 'RM3',
    distance: '0 miles',
    landmarks: ['Harold Hill Library', 'Hilldene Shopping Centre', 'Dagnam Park'],
    nearby: ['Harold Wood', 'Collier Row', 'Romford', 'Noak Hill'],
    faqs: [
      {
        question: 'Where is your computer repair shop in Harold Hill?',
        answer:
          "We're based at 38 Hilldene Avenue, Harold Hill, RM3 8YP. We're right in the heart of Harold Hill, easily accessible from Hilldene Shopping Centre and Harold Hill Library.",
      },
      {
        question: 'What computer repair services do you offer in Harold Hill?',
        answer:
          'We offer full PC and laptop repairs including virus removal, data recovery, screen replacements, keyboard repairs, hardware upgrades, and more. We also sell new and refurbished computers.',
      },
      {
        question: 'Do you offer same day repairs in Harold Hill?',
        answer:
          "Yes! As we're based in Harold Hill, most software repairs and virus removal can be completed same day. Hardware repairs typically take 24-48 hours depending on parts availability.",
      },
      {
        question: 'What are your opening hours?',
        answer:
          "We're open 7 days a week, 9AM to 9PM. You can drop off your computer or call us on 07971 331814 to arrange a convenient time.",
      },
    ],
  },
  {
    slug: 'romford',
    name: 'Romford',
    region: 'Essex',
    postcode: 'RM1',
    distance: '2 miles',
    landmarks: ['The Liberty Shopping Centre', 'Romford Market', 'Romford Station'],
    nearby: ['Harold Hill', 'Gidea Park', 'Collier Row', 'Hornchurch'],
    faqs: [
      {
        question: 'Where is your nearest computer repair shop to Romford town centre?',
        answer:
          "We're based just 2 miles from Romford town centre in Harold Hill. Whether you're near The Liberty, Romford Market, or Romford Station, we offer quick collection or you can drop off at our workshop on Hilldene Avenue.",
      },
      {
        question: 'How much does computer repair cost in Romford?',
        answer:
          'Our repairs start from just £30 for software fixes, with hardware repairs typically £50-£80. We offer free diagnosis and operate on a no fix, no fee basis - so you only pay if we solve your problem.',
      },
      {
        question: 'Do you offer same day computer repairs in Romford?',
        answer:
          "Yes! Most software repairs and virus removal for Romford customers can be completed same day. Hardware repairs typically take 24-48 hours depending on parts availability. We're open 7 days a week for your convenience.",
      },
      {
        question: 'Do you repair Macs and Apple laptops in Romford?',
        answer:
          "We repair all computer brands including MacBooks, iMacs, Dell, HP, Lenovo, Asus, and custom-built PCs. Whether it's a Windows PC or Apple Mac, we can diagnose and fix the issue.",
      },
    ],
  },
  {
    slug: 'harold-wood',
    name: 'Harold Wood',
    region: 'Romford',
    postcode: 'RM3',
    distance: '1.5 miles',
    landmarks: ['Harold Wood Station', 'Harold Wood Park', 'Gubbins Lane'],
    nearby: ['Harold Hill', 'Romford', 'Gidea Park', 'Brentwood'],
    faqs: [
      {
        question: 'Do you offer computer repair in Harold Wood?',
        answer:
          "Yes! We're just 1.5 miles from Harold Wood, making us one of the closest computer repair shops. Drop off near Harold Wood Station or we can collect from your home.",
      },
      {
        question: 'How much does laptop repair cost in Harold Wood?',
        answer:
          'Laptop repairs start from £30 for software issues. Screen replacements from £60, keyboard repairs from £50. We offer free diagnosis on all repairs.',
      },
      {
        question: 'Can you fix my computer the same day?',
        answer:
          'Most software repairs and virus removal can be completed same day. For Harold Wood customers, we offer priority service due to our close proximity.',
      },
      {
        question: 'Do you sell computers in Harold Wood?',
        answer:
          'Yes, we sell both new and refurbished PCs and laptops. We can deliver to Harold Wood or you can collect from our Harold Hill workshop.',
      },
    ],
  },
  {
    slug: 'hornchurch',
    name: 'Hornchurch',
    region: 'Havering',
    postcode: 'RM11/RM12',
    distance: '3 miles',
    landmarks: ['Hornchurch Country Park', 'Queens Theatre', 'High Street'],
    nearby: ['Upminster', 'Emerson Park', 'Elm Park', 'Romford'],
    faqs: [
      {
        question: 'Do you cover Hornchurch for computer repairs?',
        answer:
          'Yes! We provide full computer repair services to Hornchurch and all RM11/RM12 postcodes. We offer free collection and delivery throughout Hornchurch.',
      },
      {
        question: 'How quickly can you repair my computer in Hornchurch?',
        answer:
          'Most repairs are completed within 24-48 hours. We offer same-day service for urgent repairs. Collection from Hornchurch is typically within a few hours of booking.',
      },
      {
        question: 'What brands do you repair?',
        answer:
          'We repair all brands including Dell, HP, Lenovo, Asus, Acer, Apple MacBooks, and custom-built PCs. Both Windows and Mac systems.',
      },
      {
        question: 'Do you offer business IT support in Hornchurch?',
        answer:
          'Yes, we provide IT support for Hornchurch businesses including ongoing maintenance contracts, emergency repairs, and network support.',
      },
    ],
  },
  {
    slug: 'upminster',
    name: 'Upminster',
    region: 'Havering',
    postcode: 'RM14',
    distance: '4 miles',
    landmarks: ['Upminster Windmill', 'Upminster Bridge Station', 'Upminster Park'],
    nearby: ['Cranham', 'Hornchurch', 'Rainham', 'Harold Wood'],
    faqs: [
      {
        question: 'Do you offer computer repair in Upminster?',
        answer:
          'Yes! We provide full computer and laptop repair services to Upminster and surrounding RM14 areas. Free collection and delivery available.',
      },
      {
        question: 'How far is your shop from Upminster?',
        answer:
          "We're based in Harold Hill, about 4 miles from Upminster. We offer free collection from Upminster or you can drop off at our workshop.",
      },
      {
        question: "What's your turnaround time for Upminster customers?",
        answer:
          "Most repairs completed within 24-48 hours. Same-day service available for urgent repairs. We're open 7 days a week, 9AM-9PM.",
      },
      {
        question: 'Do you repair gaming PCs?',
        answer:
          'Yes! We specialise in gaming PC repairs and upgrades. We can also build custom gaming PCs to your specifications.',
      },
    ],
  },
  {
    slug: 'dagenham',
    name: 'Dagenham',
    region: 'East London',
    postcode: 'RM8/RM9/RM10',
    distance: '5 miles',
    landmarks: ['Dagenham Heathway', 'Eastbrookend Country Park', 'Dagenham Dock'],
    nearby: ['Barking', 'Chadwell Heath', 'Rainham', 'Romford'],
    faqs: [
      {
        question: 'Do you offer computer repair in Dagenham?',
        answer:
          'Yes! We provide full computer and laptop repair services to all Dagenham postcodes including RM8, RM9, and RM10. We offer free collection and delivery throughout Dagenham, Becontree, and surrounding areas.',
      },
      {
        question: 'How much does computer repair cost in Dagenham?',
        answer:
          'We offer competitive fixed prices with free diagnosis. Virus removal starts from £40, screen replacements from £60, and most software repairs from £30. Call us for a free quote on 07971 331814.',
      },
      {
        question: 'How quickly can you repair my computer?',
        answer:
          "Most repairs are completed within 24-48 hours. For urgent repairs, we offer same-day service for Dagenham customers. We're open 7 days a week, 9AM to 9PM.",
      },
      {
        question: 'Do you repair Macs and Apple laptops in Dagenham?',
        answer:
          'Yes, we repair all computer brands including Apple MacBooks, iMacs, Dell, HP, Lenovo, Asus, Acer, and custom-built PCs. We have experience with both Windows and macOS systems.',
      },
    ],
  },
  {
    slug: 'rainham',
    name: 'Rainham',
    region: 'Havering',
    postcode: 'RM13',
    distance: '5 miles',
    landmarks: ['Rainham Station', 'Rainham Marshes', 'Ferry Lane'],
    nearby: ['Dagenham', 'South Hornchurch', 'Wennington', 'Upminster'],
    faqs: [
      {
        question: 'Do you cover Rainham for computer repairs?',
        answer:
          'Yes! We provide computer repair services to Rainham and all RM13 postcodes. Free collection and delivery available throughout Rainham.',
      },
      {
        question: 'How do I get my computer to you from Rainham?',
        answer:
          'We offer free collection and delivery for Rainham customers, or you can drop off at our Harold Hill workshop. Call 07971 331814 to arrange.',
      },
      {
        question: 'What services do you offer in Rainham?',
        answer:
          'Full PC and laptop repairs, virus removal, data recovery, screen replacements, upgrades, and more. We also sell new and refurbished computers.',
      },
      {
        question: 'Are you open weekends?',
        answer: "Yes! We're open 7 days a week, 9AM to 9PM, including weekends and bank holidays.",
      },
    ],
  },
  {
    slug: 'brentwood',
    name: 'Brentwood',
    region: 'Essex',
    postcode: 'CM13/CM14/CM15',
    distance: '5 miles',
    landmarks: ['Brentwood High Street', 'Brentwood Station', 'Shenfield'],
    nearby: ['Harold Wood', 'Romford', 'Pilgrims Hatch', 'Warley'],
    faqs: [
      {
        question: 'Do you offer computer repair in Brentwood?',
        answer:
          'Yes! We cover Brentwood and all CM13, CM14, CM15 postcodes. Free collection from Brentwood High Street, Shenfield, and surrounding areas.',
      },
      {
        question: 'How far are you from Brentwood?',
        answer:
          "We're based in Harold Hill, about 5 miles from Brentwood town centre. We offer free collection and delivery for Brentwood customers.",
      },
      {
        question: 'Do you support businesses in Brentwood?',
        answer:
          'Yes, we provide IT support for Brentwood businesses including repairs, maintenance, and ongoing support contracts.',
      },
      {
        question: "What's the fastest way to get my computer repaired?",
        answer:
          'Call us on 07971 331814 and we can often collect same day. Most repairs completed within 24-48 hours.',
      },
    ],
  },
  {
    slug: 'gidea-park',
    name: 'Gidea Park',
    region: 'Romford',
    postcode: 'RM2',
    distance: '2.5 miles',
    landmarks: ['Gidea Park Station', 'Raphael Park', 'Main Road'],
    nearby: ['Romford', 'Harold Wood', 'Hornchurch', 'Emerson Park'],
    faqs: [
      {
        question: 'Where is your nearest computer shop to Gidea Park?',
        answer:
          "We're just 2.5 miles from Gidea Park in Harold Hill. Easy access from Gidea Park Station or Main Road. Drop off or we can collect.",
      },
      {
        question: 'Do you offer laptop screen repair for Gidea Park residents?',
        answer:
          'Yes! Laptop screen replacements from £60. We stock screens for most popular laptop models and can often complete same day.',
      },
      {
        question: 'Can you upgrade my computer?',
        answer:
          'Yes, we offer RAM upgrades, SSD upgrades, graphics card installations, and more. We can advise on the best upgrades for your needs and budget.',
      },
      {
        question: 'Do you offer data recovery in Gidea Park?',
        answer:
          "Yes, we provide data recovery services for failed hard drives, SSDs, and USB drives. We've helped many Gidea Park residents recover precious photos and documents.",
      },
    ],
  },
  {
    slug: 'collier-row',
    name: 'Collier Row',
    region: 'Romford',
    postcode: 'RM5',
    distance: '2 miles',
    landmarks: ['Collier Row Recreation Ground', 'Collier Row Road', 'Chase Cross'],
    nearby: ['Harold Hill', 'Romford', 'Chadwell Heath', 'Hainault'],
    faqs: [
      {
        question: 'How close are you to Collier Row?',
        answer:
          "We're just 2 miles from Collier Row in Harold Hill. One of the closest computer repair shops to Collier Row Road and Chase Cross.",
      },
      {
        question: 'Do you fix virus-infected computers?',
        answer:
          "Yes! Virus and malware removal is one of our specialties. We'll clean your computer and install protection to prevent future infections.",
      },
      {
        question: 'Can I drop off my computer out of hours?',
        answer:
          "We're open 9AM-9PM, 7 days a week. Call ahead on 07971 331814 and we can arrange a convenient time for you.",
      },
      {
        question: 'Do you sell refurbished laptops?',
        answer:
          'Yes! We have a range of quality refurbished laptops starting from £150, all with Windows 11 and a warranty.',
      },
    ],
  },
  {
    slug: 'chadwell-heath',
    name: 'Chadwell Heath',
    region: 'Barking & Dagenham',
    postcode: 'RM6',
    distance: '4 miles',
    landmarks: ['Chadwell Heath Station', 'Chadwell Heath Lane', 'High Road'],
    nearby: ['Dagenham', 'Collier Row', 'Romford', 'Goodmayes'],
    faqs: [
      {
        question: 'Do you cover Chadwell Heath?',
        answer:
          'Yes! We provide computer repair services to Chadwell Heath and all RM6 postcodes. Free collection from Chadwell Heath Station and surrounding areas.',
      },
      {
        question: "What's your pricing for Chadwell Heath customers?",
        answer:
          'Same competitive prices for all customers. Software repairs from £30, virus removal from £40, screen repairs from £60. Free diagnosis on all repairs.',
      },
      {
        question: 'How do I book a repair?',
        answer:
          'Call us on 07971 331814 or visit our contact page. We can usually arrange collection within a few hours.',
      },
      {
        question: 'Do you repair all laptop brands?',
        answer:
          'Yes, we repair Dell, HP, Lenovo, Asus, Acer, Apple MacBooks, Samsung, and all other brands.',
      },
    ],
  },
  {
    slug: 'elm-park',
    name: 'Elm Park',
    region: 'Havering',
    postcode: 'RM12',
    distance: '4 miles',
    landmarks: ['Elm Park Station', 'Elm Park Library', 'Coronation Drive'],
    nearby: ['Hornchurch', 'Rainham', 'Dagenham', 'Romford'],
    faqs: [
      {
        question: 'Do you offer computer repair in Elm Park?',
        answer:
          'Yes! We cover Elm Park and all RM12 postcodes. Free collection from Elm Park Station and surrounding areas.',
      },
      {
        question: 'Can you fix my laptop screen?',
        answer:
          'Yes! We repair cracked and broken laptop screens. Most common screens in stock for quick turnaround.',
      },
      {
        question: 'Do you offer home visits to Elm Park?',
        answer:
          "For most repairs, it's quicker and more cost-effective to bring your computer to us or arrange collection. However, we can arrange home visits for certain issues.",
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          "We accept cash, card, and bank transfer. Payment is only due once your repair is complete and you're satisfied.",
      },
    ],
  },
];

// Helper function to get area by slug
export function getAreaBySlug(slug: string): AreaData | undefined {
  return areas.find((area) => area.slug === slug);
}

// Get all area slugs for static path generation
export function getAllAreaSlugs(): string[] {
  return areas.map((area) => area.slug);
}
