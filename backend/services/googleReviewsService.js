const GOOGLE_PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";

const DEFAULT_CACHE_TTL_MS = 1000 * 60 * 30;

const cache = {
  expiresAt: 0,
  data: null,
};

const getCacheTtl = () => {
  const ttl = Number(process.env.GOOGLE_REVIEWS_CACHE_TTL_MS);

  return Number.isFinite(ttl) && ttl >= 0 ? ttl : DEFAULT_CACHE_TTL_MS;
};

const formatTimeAgo = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, now - timestamp);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (diff < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};

const getReviewerImage = (review) => {
  return review.profile_photo_url || review.image || "";
};

const formatReview = (review) => ({
  id: `${review.author_name || "review"}-${review.time || Date.now()}`,
  author: review.author_name || "Google reviewer",
  rating: Number(review.rating) || 5,
  date: review.relative_time_description || formatTimeAgo(review.time),
  text: review.text || `Rated ${Number(review.rating) || 5} stars on Google.`,
  hasText: Boolean(review.text),
  location: process.env.BUSINESS_CITY || "Ahmedabad",
  image: getReviewerImage(review),
});

const buildPlacesUrl = () => {
  const placeId = process.env.GOOGLE_PLACE_ID || process.env.VITE_GOOGLE_PLACE_ID;
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!placeId || !apiKey) {
    throw new Error("GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY are required");
  }

  const url = new URL(GOOGLE_PLACE_DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  return url;
};

export const getGoogleReviews = async ({ forceRefresh = false } = {}) => {
  const now = Date.now();

  if (!forceRefresh && cache.data && cache.expiresAt > now) {
    return {
      ...cache.data,
      cached: true,
    };
  }

  const response = await fetch(buildPlacesUrl());

  if (!response.ok) {
    throw new Error(`Google Places request failed with ${response.status}`);
  }

  const data = await response.json();

  if (data.status && data.status !== "OK") {
    throw new Error(data.error_message || `Google Places status: ${data.status}`);
  }

  const result = data.result || {};
  const reviews = (result.reviews || [])
    .sort((a, b) => (b.time || 0) - (a.time || 0))
    .map(formatReview);

  const payload = {
    reviews,
    rating: result.rating || null,
    totalReviews: result.user_ratings_total || null,
    cached: false,
    fetchedAt: new Date().toISOString(),
  };

  cache.data = payload;
  cache.expiresAt = now + getCacheTtl();

  return payload;
};
