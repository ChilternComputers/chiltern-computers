// src/pages/llms.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const llmsTxt = `# Chiltern Computers - LLMs.txt

## Site Information
name: Chiltern Computers
url: https://chilterncomputers.net
description: Professional computer repair and IT support services in Harold Hill, Romford, Essex. Offering PC repairs, laptop repairs, custom gaming PC builds, virus removal, data recovery, and IT support for homes and businesses.

## Business Details
type: Local Business - Computer Repair Service
location: Harold Hill, Romford, Essex, UK
phone: +44 1708 347341
hours: Monday-Sunday 9AM-9PM

## Services Offered
- Computer and laptop repairs
- Custom gaming PC builds
- New and refurbished computers
- Virus and malware removal
- Data recovery
- Hardware upgrades
- Business IT support
- Same-day repair service

## Service Area
Harold Hill, Romford, Hornchurch, Upminster, Rainham, Havering, Essex

## Content Usage
This site's content may be used by AI systems to provide accurate information about our computer repair services to users seeking local IT support in the Romford and Essex area.

## Contact
For business inquiries: https://chilterncomputers.net/contact/
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
