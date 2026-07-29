// Centralized review data — single source of truth for all pages
// Update reviews here to change them across the entire site

export interface Review {
  author: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

/**
 * REAL reviews only.
 *
 * Emptied 2026-07-28. The six entries previously here (Sarah Mitchell, Mike
 * Thompson, Linda Johnson, James Wilson, Rachel Davis, Alan Roberts) were
 * invented placeholders, not customers — publishing them as genuine reviews is
 * misleading and a CAP/ASA risk.
 *
 * TO ADD REAL ONES: copy the wording from an actual Google/Trustpilot/Yell
 * review, use the reviewer's real display name, and set the real date. The
 * section on the page fills itself back in automatically — and until it has
 * something true to show, it invites reviews instead of inventing them.
 *
 * Do NOT re-add invented entries to make the grid look full.
 */
export const homepageReviews: Review[] = [
  // Verbatim from the public listings on 2026-07-29. Do not tidy the wording —
  // polished reviews read like copywriting, which is the opposite of the point.
  // `location` carries the SOURCE rather than a town: the reviewers didn't state
  // where they live, and inventing that would be the same sin as inventing the
  // review. Dates for the Google ones are approximate — Google shows "3 months
  // ago", not a date — and aren't rendered anywhere, they're metadata only.
  {
    author: 'PeterW-251560',
    location: 'Yell review',
    text: 'Outstanding service in all respects. I have been using Chiltern Computers for 10 years and have found David skilful, reliable and competent. Highly competent.',
    rating: 5,
    date: '2024-10-08',
  },
  {
    author: 'Chris Colson',
    location: 'Google review',
    text: 'I couldn’t thank Chiltern computers enough my pc was corrupted and fixed my pc in a quick turnaround of less then 24 hours and set it back up for me specifically for gaming , knowledgeable man and very patient when customer asking questions , highly recommend',
    rating: 5,
    date: '2026-04-01',
  },
  {
    author: 'Kate Maisey',
    location: 'Google review',
    text: 'Highly recommend Dave. Very helpful. Supplied me with a refurbished laptop after mine failed. Really pleased with it.',
    rating: 5,
    date: '2026-04-01',
  },
  {
    author: 'MarkB-3431',
    location: 'Yell review',
    text: "Had a fan replaced. It took 'Dave' 1 hour, and I had my laptop returned. Excellent service, HIGHLY recommended. Fairly priced.",
    rating: 5,
    date: '2021-12-18',
  },
  {
    author: 'Lisa_Romford',
    location: 'Yell review',
    text: "Excellent service, value for money, efficient and with a depth of knowledge. Thanks for your advice and for fixing everything I've given you over the last couple of years. Lisa.",
    rating: 5,
    date: '2014-04-16',
  },
  {
    author: 'MikeFisher',
    location: 'Yell review',
    text: 'Fantastic work, always on time. Would use again without a doubt.',
    rating: 5,
    date: '2013-08-08',
  },
];

/** Get a subset of reviews for schema/page use */
export function getReviews(count?: number): Review[] {
  return count ? homepageReviews.slice(0, count) : homepageReviews;
}
