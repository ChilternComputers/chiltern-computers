// Centralized business configuration
// Update values here to change them across the entire site

export const siteConfig = {
  name: "Chiltern Computers",
  alternateName: "Chiltern Computer Repair",
  tagline: "Expert IT Support in Romford & Havering",
  foundingDate: "2007",

  // URLs
  baseUrl: "https://chilterncomputers.net",

  // Contact Information
  phone: {
    mobile: "+447971331814",
    mobileDisplay: "07971 331814",
    landline: "+441708347341",
    landlineDisplay: "01708 347341",
  },
  email: "david@chilterncomputers.net",
  whatsapp: "https://wa.me/447971331814",

  // Social Media
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61587354241770",
    twitter: "https://twitter.com/chilterncomputers",
    google: "https://g.page/chilterncomputers",
  },

  // Address
  address: {
    street: "38 Hilldene Avenue",
    locality: "Harold Hill",
    city: "Romford",
    region: "Essex",
    postcode: "RM3 8YP",
    country: "GB",
    full: "38 Hilldene Avenue, Harold Hill, Romford, Essex RM3 8YP",
  },

  // Geographic Coordinates
  geo: {
    latitude: 51.60589,
    longitude: 0.23353,
  },

  // Operating Hours
  hours: {
    display: "9AM - 9PM Daily",
    open: 9,  // 24-hour format
    close: 21,
    schema: "Mo-Su 09:00-21:00",
  },

  // Service Areas
  serviceAreas: [
    "Harold Hill",
    "Romford",
    "Harold Wood",
    "Hornchurch",
    "Collier Row",
    "Dagenham",
    "Rainham",
    "Brentwood",
    "Gidea Park",
    "Emerson Park",
    "Chadwell Heath",
    "Upminster",
    "Cranham",
    "Elm Park",
  ],

  // Business Details
  priceRange: "££",
  paymentMethods: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
  currency: "GBP",

  // SEO Defaults
  seo: {
    defaultTitle: "Computer Repair Harold Hill, Romford | Chiltern",
    defaultDescription: "Professional PC repair in Harold Hill, Romford. Expert laptop repairs, virus removal & data recovery. Call 07971 331814.",
    defaultKeywords: "computer repair harold hill, computer repair romford, pc repair near me, laptop repair essex",
  },
} as const;

// Helper functions
export function getMapUrl(): string {
  const { street, locality, city, region, postcode } = siteConfig.address;
  return `https://www.google.com/maps/search/${encodeURIComponent(`Chiltern Computers ${street} ${locality} ${city} ${postcode}`)}`;
}

export function isBusinessOpen(): boolean {
  const hour = new Date().getHours();
  return hour >= siteConfig.hours.open && hour < siteConfig.hours.close;
}

export function getAvailabilityStatus(): { text: string; available: boolean } {
  if (isBusinessOpen()) {
    return { text: "Available Now", available: true };
  }
  return { text: "Call Tomorrow 9AM", available: false };
}
