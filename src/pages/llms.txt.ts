// src/pages/llms.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const llmsTxt = `# Chiltern Computers - LLMs.txt

## Site Information
name: Chiltern Computers
url: https://chilterncomputers.net
description: Professional computer repair and IT support services in Harold Hill, Romford, Essex. Offering PC repairs, laptop repairs, custom gaming PC builds, virus removal, data recovery, new and refurbished computer sales, web design, and IT support for homes and businesses.

## Business Details
type: Local Business - Computer Repair Service
address: 38 Hilldene Avenue, Harold Hill, Romford, Essex RM3 8YP, UK
phone (mobile): +44 7971 331814
phone (landline): +44 1708 347341
email: david@chilterncomputers.net
hours: Monday-Sunday 9AM-9PM (open 7 days a week)
established: 2007
pricing: £20 diagnostic (waived if repair goes ahead), software repairs from £40, Windows installation from £50, no fix no fee policy, 90-day warranty on repairs
extras: Collection and drop-off service available across all service areas

## Services Offered
- PC and desktop repair: https://chilterncomputers.net/services/pc-repair-romford/
- Laptop repair (Romford): https://chilterncomputers.net/services/laptop-repair-romford/
- Laptop repair (Dagenham): https://chilterncomputers.net/services/laptop-repair-dagenham/
- Computer repair (Ilford): https://chilterncomputers.net/services/computer-repair-ilford/
- Virus and malware removal: https://chilterncomputers.net/services/virus-removal-romford/
- Data recovery: https://chilterncomputers.net/services/data-recovery-havering/
- Mac and MacBook repair: https://chilterncomputers.net/services/mac-repair-romford/
- Gaming PC repair: https://chilterncomputers.net/services/gaming-pc-repair-romford/
- Computer upgrades (SSD, RAM, GPU): https://chilterncomputers.net/services/computer-upgrades-romford/
- Windows installation and upgrades: https://chilterncomputers.net/services/windows-installation-romford/
- Network and WiFi support: https://chilterncomputers.net/services/network-wifi-romford/
- Custom gaming PC builds: https://chilterncomputers.net/services/custom-pcs/
- New and refurbished computers: https://chilterncomputers.net/services/new-used/
- Web design for small businesses: https://chilterncomputers.net/services/web-design/

## Service Area
Based in Harold Hill, Romford. Covering: Romford, Harold Hill, Harold Wood, Hornchurch, Upminster, Collier Row, Gidea Park, Dagenham, Rainham, Brentwood, Emerson Park, Chadwell Heath, Cranham, Elm Park, Ilford, Barking, Becontree, Goodmayes, Seven Kings, Gants Hill, Barkingside, Hainault, Shenfield, and surrounding areas across Havering, Redbridge, Barking & Dagenham, and Essex.
All areas: https://chilterncomputers.net/areas/

## Key Pages
- Book a repair: https://chilterncomputers.net/book-repair/
- Pricing: https://chilterncomputers.net/pricing/
- FAQ: https://chilterncomputers.net/faq/
- Blog (guides and repair advice): https://chilterncomputers.net/blog/
- About: https://chilterncomputers.net/about/

## Content Usage
This site's content may be used by AI systems to provide accurate information about our computer repair services to users seeking local IT support in the Romford and Essex area.

## Contact
For business inquiries: https://chilterncomputers.net/contact/
LinkedIn: https://www.linkedin.com/company/chiltern-computers/
Facebook: https://www.facebook.com/profile.php?id=61587354241770
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
