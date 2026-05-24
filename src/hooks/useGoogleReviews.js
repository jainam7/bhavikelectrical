import { useEffect, useState } from "react";

const REVIEWS_ENDPOINT =
  import.meta.env.VITE_REVIEWS_API_URL || "/api/google-reviews";

const localTestimonials = [
  {
    id: "local-rajesh-patel",
    author: "Rajesh Patel",
    rating: 4,
    date: "2 months ago",
    text: "Excellent electrical work! Very professional team. They completed the entire home wiring in 3 days with perfect finishing. Highly recommended!",
    location: "Ahmedabad",
    image: "",
    source: "local",
  },
  {
    id: "local-priya-shah",
    author: "Priya Shah",
    rating: 3,
    date: "3 months ago",
    text: "Outstanding service for my office lighting setup. The team understood our requirements perfectly and delivered on time. Very satisfied!",
    location: "Ahmedabad",
    image: "",
    source: "local",
  },
  {
    id: "local-vikram-singh",
    author: "Vikram Singh",
    rating: 4,
    date: "1 month ago",
    text: "Great experience with panel upgrade. The electricians were knowledgeable and kept the workspace clean. Will definitely hire again!",
    location: "Ahmedabad",
    image: "",
    source: "local",
  },
  {
    id: "local-anjali-verma",
    author: "Anjali Verma",
    rating: 3,
    date: "2 weeks ago",
    text: "Best electrician service in Ahmedabad! Emergency support was quick and efficient. Professional and trustworthy team.",
    location: "Ahmedabad",
    image: "",
    source: "local",
  },
];

const getMergedSummary = ({ googleRating, googleTotalReviews }) => {
  const localTotal = localTestimonials.length;
  const localRatingSum = localTestimonials.reduce(
    (sum, review) => sum + review.rating,
    0,
  );
  const googleTotal = Number(googleTotalReviews) || 0;
  const googleRatingValue = Number(googleRating) || 0;
  const mergedTotal = googleTotal + localTotal;

  if (!mergedTotal) {
    return {
      rating: null,
      totalReviews: localTotal,
    };
  }

  const mergedRating =
    (googleRatingValue * googleTotal + localRatingSum) / mergedTotal;

  return {
    rating: Number(mergedRating.toFixed(1)),
    totalReviews: mergedTotal,
  };
};

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
        const mergedSummary = getMergedSummary({
          googleRating: data.rating,
          googleTotalReviews: data.totalReviews,
        });

        setReviews([...googleReviews, ...localTestimonials]);
        setSummary(mergedSummary);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Error fetching Google reviews:", err);
        setError(err.message || "Failed to load Google reviews");
        setReviews(localTestimonials);
        setSummary(getMergedSummary({}));
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
