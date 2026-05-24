import { useState, useEffect } from "react";

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
        const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

        if (!placeId || !apiKey) {
          throw new Error("Google Place ID or API Key not configured");
        }

        // Call Google Places API
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error_message) {
          throw new Error(data.error_message);
        }

        // Transform Google API response to our format
        const formattedReviews = (data.result?.reviews || [])
          .sort((a, b) => new Date(b.time * 1000) - new Date(a.time * 1000))
          .map((review) => ({
            id: review.time,
            author: review.author_name,
            rating: review.rating,
            date: formatTimeAgo(review.time),
            text: review.text,
            location: "Ahmedabad",
            image:
              review.profile_photo_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.author_name}`,
          }));

        setReviews(formattedReviews);
        setError(null);
      } catch (err) {
        console.error("Error fetching Google reviews:", err);
        setError(err.message || "Failed to load reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};

// Helper function to format review timestamps
const formatTimeAgo = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  const seconds = diff;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};
