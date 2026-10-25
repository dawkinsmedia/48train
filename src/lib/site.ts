export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Heritage+Preserve+pool+parking+lot+Conway+South+Carolina";

export const EVENT_DETAILS = {
  leader: "Ethan Ford",
  schedule: "Every Saturday",
  time: "7:00–8:00 AM",
  locationName: "Heritage Preserve",
  locationDetail: "Pool Parking Lot",
  city: "Conway, South Carolina",
  cost: "Free",
} as const;
