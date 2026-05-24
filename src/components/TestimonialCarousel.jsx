import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Star,
  Quote,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGoogleReviews } from "../hooks/useGoogleReviews";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/testimonials.css";

export default function TestimonialCarousel() {
  const { reviews, loading, error, rating, totalReviews } = useGoogleReviews();
  const hasReviews = reviews.length > 0;

  const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const initials = words.slice(0, 2).map((word) => word[0]).join("");

    return initials || "G";
  };

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
          <h2>What Our Customers Say</h2>
          <p>
            Trusted by customers for reliable electrical services.
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel-wrapper">
          {loading && !hasReviews ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : error && !hasReviews ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : !hasReviews ? (
            <div className="error-message">
              <p>No reviews available right now.</p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              grabCursor={true}
              centeredSlides={false}
              slidesPerView={1}
              spaceBetween={24}
              speed={760}
              threshold={8}
              watchSlidesProgress={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 5200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={reviews.length > 3}
              className="testimonials-swiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 22,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
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
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.author}
                          className="author-avatar"
                          onError={(event) => {
                            const fallback =
                              event.currentTarget.nextElementSibling;

                            event.currentTarget.style.display = "none";
                            if (fallback) {
                              fallback.hidden = false;
                              fallback.setAttribute("aria-hidden", "false");
                            }
                          }}
                        />
                      ) : null}
                      <span
                        className="author-avatar author-avatar-fallback"
                        hidden={Boolean(review.image)}
                        aria-hidden={Boolean(review.image)}
                      >
                        {getInitials(review.author)}
                      </span>
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
              <button
                className="swiper-button-prev"
                type="button"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <button
                className="swiper-button-next"
                type="button"
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>

              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </Swiper>
          )}
        </div>

        {/* Trust Stats */}
        <div className="trust-stats-grid">
          <div className="stat-item">
            <div className="stat-number">
              {totalReviews ? `${totalReviews}+` : "500+"}
            </div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{rating ? `${rating}★` : "4.9★"}</div>
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
