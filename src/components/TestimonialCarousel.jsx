import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Star, Quote, MapPin, Calendar } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../styles/testimonials.css";

export default function TestimonialCarousel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample testimonials - Replace with actual Google API data
  const sampleTestimonials = [
    {
      id: 1,
      author: "Rajesh Patel",
      rating: 5,
      date: "2 months ago",
      text: "Excellent electrical work! Very professional team. They completed the entire home wiring in 3 days with perfect finishing. Highly recommended!",
      location: "Ahmedabad",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    {
      id: 2,
      author: "Priya Shah",
      rating: 5,
      date: "3 months ago",
      text: "Outstanding service for my office lighting setup. The team understood our requirements perfectly and delivered on time. Very satisfied!",
      location: "Ahmedabad",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: 3,
      author: "Vikram Singh",
      rating: 5,
      date: "1 month ago",
      text: "Great experience with panel upgrade. The electricians were knowledgeable and kept the workspace clean. Will definitely hire again!",
      location: "Ahmedabad",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    {
      id: 4,
      author: "Anjali Verma",
      rating: 5,
      date: "2 weeks ago",
      text: "Best electrician service in Ahmedabad! Emergency support was quick and efficient. Professional and trustworthy team.",
      location: "Ahmedabad",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    },
    {
      id: 5,
      author: "Deepak Gupta",
      rating: 5,
      date: "3 weeks ago",
      text: "Factory electrical setup was done perfectly. Load balancing and panel work exceeded expectations. Highly reliable service!",
      location: "Ahmedabad",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak",
    },
  ];

  useEffect(() => {
    // Fetch Google reviews - Replace with actual API call
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual Google Places API call
        // const response = await fetch('/api/reviews');
        // const data = await response.json();
        // setReviews(data);

        // For now, use sample testimonials
        setReviews(sampleTestimonials);
        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
        setReviews(sampleTestimonials); // Fallback to sample data
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    // sampleTestimonials is constant and defined in component, safe to exclude
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "filled" : "empty"}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="testimonials-header">
          <span className="section-kicker">Customer Reviews</span>
          <h2>What our customers say</h2>
          <p>
            Trusted by hundreds of satisfied customers across Ahmedabad for
            electrical services.
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel-wrapper">
          {loading && !reviews.length ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : error && !reviews.length ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              loop={true}
              className="testimonials-swiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  coverflowEffect: {
                    rotate: 25,
                    stretch: 0,
                    depth: 80,
                    modifier: 1,
                  },
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                  coverflowEffect: {
                    rotate: 35,
                    stretch: 0,
                    depth: 90,
                    modifier: 1,
                  },
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 40,
                  coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                  },
                },
              }}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="testimonial-card">
                    {/* Quote Icon */}
                    <div className="quote-icon">
                      <Quote size={24} />
                    </div>

                    {/* Star Rating */}
                    <StarRating rating={review.rating} />

                    {/* Review Text */}
                    <p className="review-text">{review.text}</p>

                    {/* Author Info */}
                    <div className="author-section">
                      <img
                        src={review.image}
                        alt={review.author}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <h4 className="author-name">{review.author}</h4>
                        <div className="author-meta">
                          <span className="location">
                            <MapPin size={14} />
                            {review.location}
                          </span>
                          <span className="date">
                            <Calendar size={14} />
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation Buttons */}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>

              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </Swiper>
          )}
        </div>

        {/* Trust Stats */}
        <div className="trust-stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24hr</div>
            <div className="stat-label">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
