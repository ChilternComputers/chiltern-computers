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
export const homepageReviews: Review[] = [];

/** Get a subset of reviews for schema/page use */
export function getReviews(count?: number): Review[] {
  return count ? homepageReviews.slice(0, count) : homepageReviews;
}
