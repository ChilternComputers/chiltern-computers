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
  {
    slug: 'emerson-park',
    name: 'Emerson Park',
    region: 'Havering',
    postcode: 'RM11',
    distance: '2.5 miles',
    landmarks: ['Emerson Park Station', 'Nelmes Way', 'Butts Green Road'],
    nearby: ['Hornchurch', 'Gidea Park', 'Ardleigh Green', 'Upminster'],
    faqs: [
      {
        question: 'Do you offer computer repair in Emerson Park?',
        answer:
          'Yes! We provide full computer and laptop repair services to Emerson Park and the RM11 area. We offer free collection and delivery throughout Emerson Park.',
      },
      {
        question: 'How far are you from Emerson Park?',
        answer:
          "We're based in Harold Hill, just 2.5 miles from Emerson Park. We can collect from your door or you can drop off at our workshop on Hilldene Avenue.",
      },
      {
        question: 'Do you repair Apple Macs in Emerson Park?',
        answer:
          'Yes, we repair all brands including MacBooks, iMacs, Dell, HP, Lenovo, and Asus. Both hardware and software repairs for Windows and macOS.',
      },
      {
        question: 'What are your prices for Emerson Park customers?',
        answer:
          'Same competitive prices for all customers. Software repairs from £30, virus removal from £40, screen replacements from £60. Free diagnosis and no fix, no fee.',
      },
    ],
  },
  {
    slug: 'cranham',
    name: 'Cranham',
    region: 'Havering',
    postcode: 'RM14',
    distance: '4 miles',
    landmarks: ['Cranham Hall', 'Front Lane', 'All Saints Church Cranham'],
    nearby: ['Upminster', 'Hornchurch', 'Harold Wood', 'Emerson Park'],
    faqs: [
      {
        question: 'Do you cover Cranham for computer repairs?',
        answer:
          'Yes! We cover Cranham and surrounding RM14 areas. Free collection and delivery available throughout Cranham, including Front Lane and the surrounding residential streets.',
      },
      {
        question: 'How quickly can you collect from Cranham?',
        answer:
          "We can usually collect from Cranham within a few hours of booking. Call 07971 331814 to arrange. We're open 7 days a week, 9AM to 9PM.",
      },
      {
        question: 'Do you fix slow computers?',
        answer:
          "Yes! Slow PC diagnosis is one of our most popular services. We'll identify the cause — whether it's malware, a failing hard drive, or simply needing an SSD upgrade — and get it running fast again.",
      },
      {
        question: 'Can you set up a new computer for me in Cranham?',
        answer:
          'Yes, we offer full setup services for new PCs and laptops. We can transfer your data from your old computer, install your software, and configure everything ready to use.',
      },
    ],
  },
  {
    slug: 'noak-hill',
    name: 'Noak Hill',
    region: 'Romford',
    postcode: 'RM3',
    distance: '1.5 miles',
    landmarks: ['Noak Hill Road', 'Dagnam Park', 'Harold Court Road'],
    nearby: ['Harold Hill', 'Harold Wood', 'Havering-atte-Bower', 'Collier Row'],
    faqs: [
      {
        question: 'Do you offer computer repair in Noak Hill?',
        answer:
          "Yes! Noak Hill is one of our closest areas at just 1.5 miles away. We can often collect and return same day. We're practically on your doorstep.",
      },
      {
        question: 'Is there an extra charge for Noak Hill collection?',
        answer:
          'No! Collection and delivery is completely free for Noak Hill customers. Given how close we are, we can usually be with you within the hour.',
      },
      {
        question: 'Do you repair gaming PCs in Noak Hill?',
        answer:
          'Yes! We specialise in gaming PC repairs and upgrades including graphics card replacements, RAM upgrades, and custom builds to your specifications.',
      },
      {
        question: 'Can you help with data recovery?',
        answer:
          'Yes, we provide data recovery from failed hard drives, SSDs, USB drives, and memory cards. Free assessment to determine recoverability before any charges.',
      },
    ],
  },
  {
    slug: 'chase-cross',
    name: 'Chase Cross',
    region: 'Romford',
    postcode: 'RM5',
    distance: '1 mile',
    landmarks: ['Chase Cross Road', 'Rise Park', 'Havering College'],
    nearby: ['Harold Hill', 'Collier Row', 'Romford', 'Gidea Park'],
    faqs: [
      {
        question: 'How close are you to Chase Cross?',
        answer:
          "We're just 1 mile from Chase Cross — one of the closest areas we serve. Drop off on Hilldene Avenue or we can collect from Chase Cross Road and surrounding streets in minutes.",
      },
      {
        question: 'Do you offer same day repairs for Chase Cross?',
        answer:
          "Absolutely! Given our close proximity, most software repairs and virus removal for Chase Cross customers are completed same day. We're open 7 days a week, 9AM to 9PM.",
      },
      {
        question: 'What laptop brands do you repair?',
        answer:
          'We repair all brands including Dell, HP, Lenovo, Asus, Acer, Apple MacBooks, Samsung, Toshiba, and all other makes. Both Windows and Mac.',
      },
      {
        question: 'Do you sell refurbished computers?',
        answer:
          'Yes! We have a range of quality refurbished PCs and laptops starting from £150, all with Windows 11 installed and a warranty included.',
      },
    ],
  },
  {
    slug: 'south-hornchurch',
    name: 'South Hornchurch',
    region: 'Havering',
    postcode: 'RM13',
    distance: '5 miles',
    landmarks: ['Hornchurch Country Park', 'Sycamore Way', 'Marsh Way'],
    nearby: ['Rainham', 'Elm Park', 'Hornchurch', 'Dagenham'],
    faqs: [
      {
        question: 'Do you cover South Hornchurch?',
        answer:
          'Yes! We provide full computer repair services to South Hornchurch and all RM13 postcodes. Free collection and delivery throughout the area.',
      },
      {
        question: 'How do I get my computer to you from South Hornchurch?',
        answer:
          "We offer free collection and delivery for South Hornchurch customers. Just call 07971 331814 and we'll arrange a convenient time. Or drop off at our Harold Hill workshop.",
      },
      {
        question: 'What services do you offer?',
        answer:
          'Full PC and laptop repairs, virus removal, data recovery, screen and keyboard replacements, SSD upgrades, and more. We also sell new and refurbished computers.',
      },
      {
        question: 'Do you offer a warranty on repairs?',
        answer:
          'Yes, all our repairs come with a warranty. We also operate on a no fix, no fee basis — so you only pay if we successfully resolve your issue.',
      },
    ],
  },
  {
    slug: 'ardleigh-green',
    name: 'Ardleigh Green',
    region: 'Havering',
    postcode: 'RM11',
    distance: '2.5 miles',
    landmarks: ['Ardleigh Green Road', 'Squirrels Heath Lane', 'Emerson Park Station'],
    nearby: ['Hornchurch', 'Emerson Park', 'Gidea Park', 'Harold Wood'],
    faqs: [
      {
        question: 'Do you offer computer repair in Ardleigh Green?',
        answer:
          'Yes! We cover Ardleigh Green and the wider RM11 area. Free collection from Ardleigh Green Road, Squirrels Heath Lane, and all surrounding streets.',
      },
      {
        question: 'How far are you from Ardleigh Green?',
        answer:
          "We're based in Harold Hill, about 2.5 miles from Ardleigh Green. We offer free collection and delivery, or you can drop off at our workshop.",
      },
      {
        question: 'Can you fix a laptop that won\'t turn on?',
        answer:
          "Yes! We diagnose and repair laptops that won't power on. Common causes include faulty chargers, dead batteries, motherboard issues, and power jack problems. Free diagnosis included.",
      },
      {
        question: 'Do you provide IT support for small businesses?',
        answer:
          'Yes, we offer IT support for Ardleigh Green businesses including PC repairs, network setup, ongoing maintenance, and emergency callout services.',
      },
    ],
  },
  {
    slug: 'hainault',
    name: 'Hainault',
    region: 'Redbridge',
    postcode: 'IG7',
    distance: '4 miles',
    landmarks: ['Hainault Forest Country Park', 'Hainault Station', 'New North Road'],
    nearby: ['Collier Row', 'Chadwell Heath', 'Romford', 'Ilford'],
    faqs: [
      {
        question: 'Do you cover Hainault for computer repairs?',
        answer:
          'Yes! We provide computer repair services to Hainault and IG7 postcodes. Free collection and delivery available throughout Hainault.',
      },
      {
        question: 'How far are you from Hainault?',
        answer:
          "We're about 4 miles from Hainault in Harold Hill. We offer free collection — just call 07971 331814 and we can usually be with you within a couple of hours.",
      },
      {
        question: 'Do you remove viruses and malware?',
        answer:
          "Yes! Virus and malware removal is one of our core services. We'll thoroughly clean your system and install protection to prevent future infections. Most virus removals completed same day.",
      },
      {
        question: 'Can you upgrade my old computer?',
        answer:
          'Yes, we offer RAM upgrades, SSD upgrades, graphics card installations, and more. An SSD upgrade alone can make an old PC feel brand new. Free advice on the best upgrades for your budget.',
      },
    ],
  },
  {
    slug: 'barking',
    name: 'Barking',
    region: 'Barking & Dagenham',
    postcode: 'IG11',
    distance: '6 miles',
    landmarks: ['Barking Station', 'Vicarage Field Shopping Centre', 'Barking Park'],
    nearby: ['Dagenham', 'Ilford', 'Chadwell Heath', 'Goodmayes'],
    faqs: [
      {
        question: 'Do you offer computer repair in Barking?',
        answer:
          'Yes! We cover Barking and all IG11 postcodes. Free collection from Barking Station, Vicarage Field, and all surrounding areas.',
      },
      {
        question: 'How much does a repair cost?',
        answer:
          'Software repairs start from just £30, virus removal from £40, and screen replacements from £60. We offer free diagnosis and operate on a no fix, no fee basis.',
      },
      {
        question: 'Do you repair both PCs and laptops in Barking?',
        answer:
          'Yes, we repair all types of computers — desktops, laptops, all-in-ones, and gaming PCs. All brands including Dell, HP, Lenovo, Asus, Acer, and Apple.',
      },
      {
        question: 'How long do repairs take?',
        answer:
          "Most software repairs and virus removal can be completed within 24 hours. Hardware repairs typically take 24-48 hours depending on parts. We're open 7 days a week for your convenience.",
      },
    ],
  },
  {
    slug: 'ilford',
    name: 'Ilford',
    region: 'Redbridge',
    postcode: 'IG1',
    distance: '5 miles',
    landmarks: ['The Exchange Ilford', 'Ilford Station', 'Valentines Park'],
    nearby: ['Barking', 'Goodmayes', 'Chadwell Heath', 'Hainault'],
    faqs: [
      {
        question: 'Do you cover Ilford for computer repairs?',
        answer:
          'Yes! We provide computer repair services to Ilford and all IG1 postcodes. Free collection from Ilford Station, The Exchange, and surrounding areas.',
      },
      {
        question: 'Can you collect from Ilford?',
        answer:
          "Yes, we offer free collection and delivery throughout Ilford. Call 07971 331814 and we'll arrange a convenient time. We're open 7 days a week.",
      },
      {
        question: 'Do you offer data recovery in Ilford?',
        answer:
          'Yes, we provide professional data recovery from failed hard drives, SSDs, USB drives, and memory cards. Free assessment before any charges apply.',
      },
      {
        question: 'Do you support businesses in Ilford?',
        answer:
          'Yes, we provide IT support for Ilford businesses including emergency repairs, ongoing maintenance contracts, network setup, and hardware procurement.',
      },
    ],
  },
  {
    slug: 'havering-atte-bower',
    name: 'Havering-atte-Bower',
    region: 'Havering',
    postcode: 'RM4',
    distance: '2 miles',
    landmarks: ['Havering Village Green', 'Bower House', 'Orange Tree Hill'],
    nearby: ['Harold Hill', 'Noak Hill', 'Collier Row', 'Stapleford Abbotts'],
    faqs: [
      {
        question: 'Do you cover Havering-atte-Bower?',
        answer:
          "Yes! We're just 2 miles from Havering-atte-Bower in Harold Hill. One of the closest areas we serve, with quick collection and delivery available.",
      },
      {
        question: 'Is collection free from Havering-atte-Bower?',
        answer:
          'Yes, collection and delivery is completely free. Given our close proximity, we can usually collect within the hour. Call 07971 331814 to arrange.',
      },
      {
        question: 'Can you fix my internet or Wi-Fi issues?',
        answer:
          "Yes, we can diagnose and resolve connectivity issues including slow Wi-Fi, network dropouts, and router problems. We'll get you back online quickly.",
      },
      {
        question: 'Do you sell new computers?',
        answer:
          'Yes, we sell both new and refurbished PCs and laptops. We can advise on the best machine for your needs and budget, and set it up ready to use.',
      },
    ],
  },
  {
    slug: 'goodmayes',
    name: 'Goodmayes',
    region: 'Redbridge',
    postcode: 'IG3',
    distance: '5 miles',
    landmarks: ['Goodmayes Station', 'Goodmayes Park', 'Barley Lane'],
    nearby: ['Chadwell Heath', 'Ilford', 'Dagenham', 'Barking'],
    faqs: [
      {
        question: 'Do you offer computer repair in Goodmayes?',
        answer:
          'Yes! We cover Goodmayes and all IG3 postcodes. Free collection from Goodmayes Station, Barley Lane, and surrounding areas.',
      },
      {
        question: 'How do I book a repair from Goodmayes?',
        answer:
          "Simply call us on 07971 331814 or visit our contact page. We can arrange free collection from Goodmayes, usually within a few hours of booking. We're open 7 days a week.",
      },
      {
        question: 'What types of computer problems do you fix?',
        answer:
          'We fix everything from virus infections, slow performance, and blue screens to cracked screens, keyboard failures, and data loss. If it has a power button, we can probably fix it!',
      },
      {
        question: 'Do you offer a no fix, no fee guarantee?',
        answer:
          "Yes! We operate on a no fix, no fee basis. If we can't resolve your issue, you don't pay a penny. Free diagnosis included with every repair.",
      },
    ],
  },
  {
    slug: 'pilgrims-hatch',
    name: 'Pilgrims Hatch',
    region: 'Brentwood, Essex',
    postcode: 'CM15',
    distance: '6 miles',
    landmarks: ['Pilgrims Hatch Village', 'Ongar Road', "St Mary's Church"],
    nearby: ['Brentwood', 'Harold Wood', 'Warley', 'Romford'],
    faqs: [
      {
        question: 'Do you cover Pilgrims Hatch for computer repairs?',
        answer:
          'Yes! We provide computer repair services to Pilgrims Hatch and surrounding CM15 areas. Free collection and delivery available.',
      },
      {
        question: 'How far are you from Pilgrims Hatch?',
        answer:
          "We're about 6 miles from Pilgrims Hatch in Harold Hill. We offer free collection — call 07971 331814 and we can usually arrange same day pickup.",
      },
      {
        question: 'Do you repair all computer brands?',
        answer:
          'Yes, we repair Dell, HP, Lenovo, Asus, Acer, Apple MacBooks, Samsung, and all other brands. Both Windows PCs and Apple Macs.',
      },
      {
        question: 'What are your opening hours?',
        answer:
          "We're open 7 days a week, 9AM to 9PM, including weekends and bank holidays. Call anytime to arrange a repair.",
      },
    ],
  },
  {
    slug: 'warley',
    name: 'Warley',
    region: 'Brentwood, Essex',
    postcode: 'CM14',
    distance: '5.5 miles',
    landmarks: ['Warley Hill', 'Essex Regiment Way', 'Brentwood Railway Station'],
    nearby: ['Brentwood', 'Pilgrims Hatch', 'Harold Wood', 'Upminster'],
    faqs: [
      {
        question: 'Do you offer computer repair in Warley?',
        answer:
          'Yes! We cover Warley and surrounding CM14 postcodes. Free collection from Warley Hill, Great Warley, and Little Warley areas.',
      },
      {
        question: 'How quickly can you collect from Warley?',
        answer:
          "We can usually collect from Warley within a few hours of booking. We're open 7 days a week, 9AM to 9PM. Call 07971 331814 to arrange.",
      },
      {
        question: 'Do you offer SSD upgrades?',
        answer:
          "Yes! An SSD upgrade is one of the best ways to speed up an older computer. We'll clone your existing drive so you don't lose any data. Upgrades from £60 including fitting.",
      },
      {
        question: 'Do you offer a warranty on repairs?',
        answer:
          'Yes, all our repairs come with a warranty. We also operate on a no fix, no fee basis — you only pay if we successfully resolve your issue.',
      },
    ],
  },
  {
    slug: 'wennington',
    name: 'Wennington',
    region: 'Havering',
    postcode: 'RM13',
    distance: '6 miles',
    landmarks: ['Wennington Road', 'Wennington Marshes', 'Church Lane'],
    nearby: ['Rainham', 'South Hornchurch', 'Upminster', 'Dagenham'],
    faqs: [
      {
        question: 'Do you cover Wennington?',
        answer:
          'Yes! We provide computer repair services to Wennington and surrounding RM13 areas. Free collection and delivery available.',
      },
      {
        question: 'How do I get my computer to you from Wennington?',
        answer:
          "We offer free collection and delivery for Wennington customers. Call 07971 331814 and we'll come to you. Or drop off at our Harold Hill workshop.",
      },
      {
        question: 'What services do you offer?',
        answer:
          'Full PC and laptop repairs, virus removal, data recovery, screen replacements, SSD upgrades, keyboard repairs, and more. We also sell new and refurbished computers.',
      },
      {
        question: 'Are you open at weekends?',
        answer:
          "Yes! We're open 7 days a week, 9AM to 9PM, including weekends and bank holidays. Call anytime to book a repair.",
      },
    ],
  },
  {
    slug: 'stapleford-abbotts',
    name: 'Stapleford Abbotts',
    region: 'Essex',
    postcode: 'RM4',
    distance: '3.5 miles',
    landmarks: ['Stapleford Road', 'Tysea Hill', 'The Rabbits pub'],
    nearby: ['Havering-atte-Bower', 'Noak Hill', 'Harold Hill', 'Brentwood'],
    faqs: [
      {
        question: 'Do you cover Stapleford Abbotts?',
        answer:
          "Yes! We're just 3.5 miles from Stapleford Abbotts in Harold Hill. Free collection and delivery available throughout the village and surrounding lanes.",
      },
      {
        question: 'Is there a callout charge?',
        answer:
          'No! Collection and delivery is completely free. We also offer free diagnosis on all repairs and operate on a no fix, no fee basis.',
      },
      {
        question: 'Can you fix my laptop screen?',
        answer:
          'Yes! We repair cracked, broken, and flickering laptop screens. We stock screens for most popular models and can often complete the repair within 24 hours.',
      },
      {
        question: 'Do you help with printer and Wi-Fi setup?',
        answer:
          'Yes, we can help with printer setup, Wi-Fi connectivity issues, network configuration, and general IT support for your home or business.',
      },
    ],
  },
  {
    slug: 'becontree',
    name: 'Becontree',
    region: 'Barking & Dagenham',
    postcode: 'RM8/RM9',
    distance: '5.5 miles',
    landmarks: ['Becontree Station', 'Valence Park', 'Parsloes Park'],
    nearby: ['Dagenham', 'Barking', 'Chadwell Heath', 'Rush Green'],
    faqs: [
      {
        question: 'Do you offer computer repair in Becontree?',
        answer:
          'Yes! We cover Becontree and surrounding RM8/RM9 postcodes. Free collection from Becontree Station, Valence Park area, and all surrounding streets.',
      },
      {
        question: 'How much does a repair cost?',
        answer:
          'Software repairs from £30, virus removal from £40, screen replacements from £60. Free diagnosis and no fix, no fee guarantee on all repairs.',
      },
      {
        question: 'How long do repairs take?',
        answer:
          "Most software repairs and virus removal completed within 24 hours. Hardware repairs typically 24-48 hours depending on parts. We're open 7 days a week.",
      },
      {
        question: 'Do you repair gaming PCs?',
        answer:
          'Yes! We specialise in gaming PC repairs and upgrades including graphics card replacements, RAM upgrades, cooling solutions, and custom builds.',
      },
    ],
  },
  {
    slug: 'rush-green',
    name: 'Rush Green',
    region: 'Havering',
    postcode: 'RM7',
    distance: '3.5 miles',
    landmarks: ['Rush Green Road', "Queen's Hospital", 'Rush Green Gardens'],
    nearby: ['Romford', 'Dagenham', 'Hornchurch', 'Elm Park'],
    faqs: [
      {
        question: 'Do you cover Rush Green for computer repairs?',
        answer:
          "Yes! We provide computer repair services to Rush Green and all RM7 postcodes. We're just 3.5 miles away with free collection and delivery.",
      },
      {
        question: 'Can you collect from Rush Green?',
        answer:
          "Yes, free collection and delivery throughout Rush Green. We can usually collect within a couple of hours. Call 07971 331814 to arrange. We're open 7 days.",
      },
      {
        question: 'Do you fix slow computers?',
        answer:
          "Yes! We'll diagnose why your computer is running slow — whether it's malware, a failing drive, or simply needing a cleanup and SSD upgrade. Free diagnosis included.",
      },
      {
        question: 'Do you repair Macs and Apple laptops?',
        answer:
          'Yes, we repair all brands including Apple MacBooks, iMacs, Dell, HP, Lenovo, Asus, and custom-built PCs. Both macOS and Windows systems.',
      },
    ],
  },
  {
    slug: 'seven-kings',
    name: 'Seven Kings',
    region: 'Redbridge',
    postcode: 'IG3',
    distance: '5.5 miles',
    landmarks: ['Seven Kings Station', 'Seven Kings Park', 'High Road'],
    nearby: ['Ilford', 'Goodmayes', 'Chadwell Heath', 'Barking'],
    faqs: [
      {
        question: 'Do you offer computer repair in Seven Kings?',
        answer:
          'Yes! We cover Seven Kings and the wider IG3 area. Free collection from Seven Kings Station, High Road, and all surrounding streets.',
      },
      {
        question: 'How do I book a repair?',
        answer:
          "Call us on 07971 331814 or use our contact form. We can arrange free collection from Seven Kings, usually within a few hours. We're open 7 days, 9AM to 9PM.",
      },
      {
        question: 'What computer problems do you fix?',
        answer:
          'Everything from viruses and slow performance to cracked screens, dead batteries, and data loss. Desktops, laptops, and all-in-ones. All brands repaired.',
      },
      {
        question: 'Do you offer business IT support in Seven Kings?',
        answer:
          'Yes, we provide IT support for Seven Kings businesses including emergency repairs, maintenance contracts, network setup, and hardware procurement.',
      },
    ],
  },
  {
    slug: 'marks-gate',
    name: 'Marks Gate',
    region: 'Barking & Dagenham',
    postcode: 'RM5',
    distance: '3 miles',
    landmarks: ['Marks Gate Community Centre', 'Rose Lane', 'Warren Drive'],
    nearby: ['Chadwell Heath', 'Collier Row', 'Harold Hill', 'Hainault'],
    faqs: [
      {
        question: 'Do you cover Marks Gate?',
        answer:
          "Yes! We're just 3 miles from Marks Gate in Harold Hill. One of our closer service areas with quick collection and same day repairs available.",
      },
      {
        question: 'Is collection free from Marks Gate?',
        answer:
          'Yes, free collection and delivery for all Marks Gate customers. Call 07971 331814 and we can usually be with you within the hour.',
      },
      {
        question: 'What are your prices?',
        answer:
          'Competitive fixed prices with free diagnosis. Software repairs from £30, virus removal from £40, screen replacements from £60. No fix, no fee guarantee.',
      },
      {
        question: 'Do you sell refurbished laptops?',
        answer:
          'Yes! We have a range of quality refurbished PCs and laptops starting from £150, all with Windows 11 installed and a warranty included.',
      },
    ],
  },
  {
    slug: 'harold-park',
    name: 'Harold Park',
    region: 'Havering',
    postcode: 'RM3',
    distance: '1.5 miles',
    landmarks: ['Harold Park Road', 'Harold Court Road', 'Dagnam Park Drive'],
    nearby: ['Harold Hill', 'Harold Wood', 'Noak Hill', 'Romford'],
    faqs: [
      {
        question: 'Do you cover Harold Park for computer repairs?',
        answer:
          "Yes! Harold Park is one of our closest areas at just 1.5 miles away. We're practically neighbours — same day collection and repair available.",
      },
      {
        question: 'Is there a collection charge from Harold Park?',
        answer:
          'No! Collection and delivery is completely free for Harold Park customers. We can usually be with you within the hour given how close we are.',
      },
      {
        question: 'What computer repairs do you offer?',
        answer:
          'Full PC and laptop repairs including virus removal, data recovery, screen replacements, keyboard repairs, SSD upgrades, and more. All brands repaired.',
      },
      {
        question: 'Do you offer same day service?',
        answer:
          "Yes! Given our close proximity to Harold Park, most software repairs and virus removal can be completed same day. We're open 7 days a week, 9AM to 9PM.",
      },
    ],
  },
  {
    slug: 'heath-park',
    name: 'Heath Park',
    region: 'Havering',
    postcode: 'RM2',
    distance: '2.5 miles',
    landmarks: ['Heath Park Road', 'Heath Drive', 'Gidea Park Station'],
    nearby: ['Gidea Park', 'Ardleigh Green', 'Romford', 'Emerson Park'],
    faqs: [
      {
        question: 'Do you offer computer repair in Heath Park?',
        answer:
          'Yes! We cover Heath Park and the wider RM2 area. Free collection from Heath Park Road, Heath Drive, and all surrounding streets.',
      },
      {
        question: 'How far are you from Heath Park?',
        answer:
          "We're about 2.5 miles from Heath Park in Harold Hill. We offer free collection and delivery, or you can drop off at our workshop on Hilldene Avenue.",
      },
      {
        question: 'Can you speed up my old computer?',
        answer:
          "Yes! We specialise in breathing new life into older PCs. An SSD upgrade and RAM increase can transform performance. We'll advise on the most cost-effective upgrades.",
      },
      {
        question: 'Do you repair laptops with water damage?',
        answer:
          'Yes, we can assess and repair liquid-damaged laptops. The sooner you bring it in, the better the chances of recovery. Free diagnosis included.',
      },
    ],
  },
  {
    slug: 'hacton',
    name: 'Hacton',
    region: 'Havering',
    postcode: 'RM12',
    distance: '4 miles',
    landmarks: ['Hacton Lane', 'Hacton Parkway', 'Hornchurch Stadium'],
    nearby: ['Hornchurch', 'Elm Park', 'Upminster', 'Emerson Park'],
    faqs: [
      {
        question: 'Do you cover Hacton for computer repairs?',
        answer:
          'Yes! We provide computer repair services to Hacton and the wider RM12 area. Free collection and delivery available throughout Hacton Lane and surrounding streets.',
      },
      {
        question: 'How quickly can you collect from Hacton?',
        answer:
          "We can usually collect from Hacton within a couple of hours. Call 07971 331814 to arrange. We're open 7 days a week, 9AM to 9PM.",
      },
      {
        question: 'Do you fix desktop PCs as well as laptops?',
        answer:
          'Yes, we repair all types of computers — desktops, laptops, all-in-ones, gaming PCs, and custom builds. All brands including Dell, HP, Lenovo, Asus, and Apple.',
      },
      {
        question: 'What if you can\'t fix my computer?',
        answer:
          "We operate on a no fix, no fee basis. If we can't resolve your issue, you don't pay a penny. We'll also advise on the best next steps if a repair isn't viable.",
      },
    ],
  },
  {
    slug: 'corbets-tey',
    name: 'Corbets Tey',
    region: 'Havering',
    postcode: 'RM14',
    distance: '5 miles',
    landmarks: ['Corbets Tey Road', 'Harwood Hall Lane', 'Fen Lane'],
    nearby: ['Upminster', 'Cranham', 'Rainham', 'Harold Wood'],
    faqs: [
      {
        question: 'Do you cover Corbets Tey?',
        answer:
          'Yes! We provide computer repair services to Corbets Tey and surrounding RM14 areas. Free collection from Corbets Tey Road and all nearby lanes.',
      },
      {
        question: 'How do I get my computer to you from Corbets Tey?',
        answer:
          "We offer free collection and delivery for Corbets Tey customers. Call 07971 331814 and we'll arrange a convenient time, or drop off at our Harold Hill workshop.",
      },
      {
        question: 'Do you offer data recovery?',
        answer:
          'Yes, we provide professional data recovery from failed hard drives, SSDs, USB drives, and memory cards. Free assessment to determine recoverability before any work begins.',
      },
      {
        question: 'Can you set up a new computer for me?',
        answer:
          'Yes, we offer full setup services including data transfer from your old computer, software installation, printer setup, and email configuration. Ready to use when returned.',
      },
    ],
  },
  {
    slug: 'north-ockendon',
    name: 'North Ockendon',
    region: 'Havering',
    postcode: 'RM14',
    distance: '5 miles',
    landmarks: ['North Ockendon Road', 'Church Lane', "St Mary Magdalene's Church"],
    nearby: ['Upminster', 'Cranham', 'Corbets Tey', 'Rainham'],
    faqs: [
      {
        question: 'Do you cover North Ockendon?',
        answer:
          'Yes! We provide computer repair services to North Ockendon and surrounding areas. Free collection and delivery available — we come to you.',
      },
      {
        question: 'Is there an extra charge for rural areas?',
        answer:
          'No! Collection and delivery is free regardless of location. North Ockendon is about 5 miles from our base in Harold Hill. Call 07971 331814 to arrange.',
      },
      {
        question: 'What services do you offer?',
        answer:
          'Full PC and laptop repairs, virus removal, data recovery, screen replacements, SSD upgrades, new computer sales, and more. All brands serviced.',
      },
      {
        question: 'Are you open at weekends?',
        answer:
          "Yes! We're open 7 days a week, 9AM to 9PM, including weekends and bank holidays. Perfect for those who can't get to us during the week.",
      },
    ],
  },
];

// Helper function to get area by slug
export function getAreaBySlug(slug: string): AreaData | undefined {
  return areas.find((area) => area.slug === slug);
}
