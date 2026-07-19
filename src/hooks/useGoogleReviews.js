import { useEffect, useState } from "react";

const REVIEWS_ENDPOINT =
  import.meta.env.VITE_REVIEWS_API_URL || "/api/google-reviews";

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    rating: null,
    totalReviews: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(REVIEWS_ENDPOINT, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Failed to load Google reviews");
        }

        const googleReviews = Array.isArray(data.reviews) ? data.reviews : [];

        setReviews(googleReviews);

        setSummary({
          rating:
            data.rating !== undefined && data.rating !== null
              ? Number(data.rating)
              : null,
          totalReviews:
            data.totalReviews !== undefined && data.totalReviews !== null
              ? Number(data.totalReviews)
              : googleReviews.length,
        });
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Error fetching Google reviews:", err);

        setError(err.message || "Failed to load Google reviews");

        // Don't show any fallback reviews
        setReviews([]);

        setSummary({
          rating: null,
          totalReviews: null,
        });
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => controller.abort();
  }, []);

  return {
    reviews,
    loading,
    error,
    ...summary,
  };
};
