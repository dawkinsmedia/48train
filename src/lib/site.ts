export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Pool parking loop at the end of Yellow Dot Ln (Heritage Preserve), off US-90. */
export const MEETING_SPOT = {
  latitude: 33.83075,
  longitude: -78.88935,
  street: "Yellow Dot Ln",
  neighborhood: "Heritage Preserve",
  city: "Conway, SC 29526",
  landmark: "Pool parking lot · off US Hwy 90 & Long Leaf Pine Dr",
} as const;

export const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${MEETING_SPOT.latitude},${MEETING_SPOT.longitude}`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MEETING_SPOT.latitude},${MEETING_SPOT.longitude}`;

export const EVENT_DETAILS = {
  leader: "Ethan Ford",
  schedule: "Every Saturday",
  time: "7:00–8:00 AM",
  locationName: MEETING_SPOT.neighborhood,
  locationDetail: "Pool parking lot · Yellow Dot Ln",
  city: "Conway, South Carolina",
  cost: "Free",
} as const;
