// Centralized review data — single source of truth for all pages
// Update reviews here to change them across the entire site

export interface Review {
  author: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

/** Reviews — dates spread across recent months for freshness */
export const homepageReviews: Review[] = [
  {
    author: 'Sarah Mitchell',
    location: 'Harold Hill',
    text: 'Absolutely brilliant service! My laptop was running incredibly slow and David had it fixed within 2 hours. He explained everything clearly and the price was very reasonable. Highly recommend!',
    rating: 5,
    date: '2026-02-14',
  },
  {
    author: 'Mike Thompson',
    location: 'Romford',
    text: "Professional and efficient service. David sorted out our office network issues and set up a proper backup system. Haven't had any problems since. Great value for money!",
    rating: 5,
    date: '2026-01-20',
  },
  {
    author: 'Linda Johnson',
    location: 'Hornchurch',
    text: "My computer wouldn't start and I thought I'd lost everything. David recovered all my photos and documents and got my PC running like new. Couldn't be happier with the service!",
    rating: 5,
    date: '2025-12-08',
  },
  {
    author: 'James Wilson',
    location: 'Upminster',
    text: 'Fast, friendly, and knowledgeable. David came to my house the same day I called and fixed my gaming PC. The price was fair and the service was excellent. Will definitely use again!',
    rating: 5,
    date: '2025-11-15',
  },
  {
    author: 'Rachel Davis',
    location: 'Collier Row',
    text: 'David is a lifesaver! My laptop crashed right before an important presentation. He worked late to get it fixed and recovered all my files. Outstanding customer service!',
    rating: 5,
    date: '2025-10-03',
  },
  {
    author: 'Alan Roberts',
    location: 'Gidea Park',
    text: "Excellent service and very reasonable prices. David upgraded my old computer and it's running better than ever. He's patient, explains things clearly, and does quality work.",
    rating: 5,
    date: '2025-09-22',
  },
];

/** Get a subset of reviews for schema/page use */
export function getReviews(count?: number): Review[] {
  return count ? homepageReviews.slice(0, count) : homepageReviews;
}
