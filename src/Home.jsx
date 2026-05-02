import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Factory,
  Home as HomeIcon,
  Lightbulb,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const heroStats = [
  { value: "30+", label: "Years experience" },
  { value: "Ahmedabad", label: "Local service base" },
  { value: "24 hr", label: "Response window" },
];

const servicePreview = [
  {
    title: "Home Electricals",
    text: "Wiring, repairs, lighting, fans, MCB panels, and safety checks.",
    icon: HomeIcon,
  },
  {
    title: "Commercial Fit-Outs",
    text: "Reliable power planning for shops, offices, showrooms, and warehouses.",
    icon: Building2,
  },
  {
    title: "Industrial Power",
    text: "Panel upgrades, load balancing, machinery wiring, and maintenance.",
    icon: Factory,
  },
];

const workSteps = [
  "Site inspection and load requirement review",
  "Clear estimate with material and labour scope",
  "Neat installation by trained electricians",
  "Final testing, safety handover, and support",
];

const lightingLooks = [
  {
    src: "https://images.unsplash.com/photo-1757817301348-f91ce527b09b?auto=format&fit=crop&w=900&q=85",
    alt: "Modern retail lighting display inside a premium store",
    title: "Retail lighting",
    text: "Bright product-focused lighting for showrooms and counters.",
  },
  {
    src: "https://images.unsplash.com/photo-1770816307611-4147a8be5d2b?auto=format&fit=crop&w=900&q=85",
    alt: "Modern cafe interior with colorful pendant lights",
    title: "Cafe lighting",
    text: "Warm pendant fixtures for restaurants, cafes, and hospitality spaces.",
  },
  {
    src: "https://images.unsplash.com/photo-1766128868192-442b1df0a8db?auto=format&fit=crop&w=900&q=85",
    alt: "Modern interior pendant lights",
    title: "Interior lighting",
    text: "Decorative lighting with clean wiring and balanced power planning.",
  },
  {
    src: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85",
    alt: "Modern chandelier and pendant lighting in an interior",
    title: "Statement fixtures",
    text: "Premium fixtures installed securely with serviceable wiring.",
  },
];

const carouselSlides = [
  {
    src: "https://images.unsplash.com/photo-1757817301348-f91ce527b09b?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern retail store with warm display lighting",
    eyebrow: "Showroom lighting",
    title: "Modern lighting for shops and retail counters",
    text: "Clean lighting layouts for showrooms, counters, signage, product displays, and customer-facing spaces.",
  },
  {
    src: "https://images.unsplash.com/photo-1665832966717-238c3a7e2bf7?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern cafe interior with pendant lights",
    eyebrow: "Cafe and restaurant",
    title: "Warm interiors that feel active and premium",
    text: "Pendant lights, wall lights, ambient fixtures, and power points installed for daily business use.",
  },
  {
    src: "https://images.unsplash.com/photo-1766128868192-442b1df0a8db?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern interior with glowing pendant lights",
    eyebrow: "Home and office",
    title: "Clean decorative lighting with safe wiring behind it",
    text: "Modern fixtures need proper load planning, neat routing, secure fittings, and easy maintenance access.",
  },
  {
    src: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=1400&q=85",
    alt: "Electrician testing an industrial electrical panel",
    eyebrow: "Panel and safety work",
    title: "Real technical work, not just decoration",
    text: "Control panels, DB work, fault checks, and safety testing handled by trained technicians.",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeLighting, setActiveLighting] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % carouselSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = carouselSlides[activeSlide];
  const currentLighting = lightingLooks[activeLighting];

  function showPreviousSlide() {
    setActiveSlide((current) =>
      current === 0 ? carouselSlides.length - 1 : current - 1,
    );
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % carouselSlides.length);
  }

  return (
    <>
      {/* <section className="hero-section">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="hero-copy reveal-up">
            <span className="eyebrow">
              <ShieldCheck size={16} />
              Ahmedabad electrical contractor
            </span>
            <h1>
              Trusted Electrical Contractor in Ahmedabad Fast, Safe & Certified
              Electrical Services for Homes & Businesses
            </h1>
            <p>
              Bhavik Electricals handles wiring, modern lighting, panel
              upgrades, and maintenance for local homes, showrooms, cafes,
              offices, and industrial sites.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                Request a quote
                <ArrowRight size={18} />
              </Link>
              <a className="button button-glass" href="tel:+919427622474">
                <Phone size={18} />
                Call +91 94276 22474
              </a>
            </div>
          </div>

          <div className="hero-visual reveal-up delay-1">
            <img
              className="hero-visual-main"
              src="https://images.unsplash.com/photo-1757817301348-f91ce527b09b?auto=format&fit=crop&w=1000&q=85"
              alt="Modern retail lighting display inside a premium store"
            />
            <img
              className="hero-visual-side"
              src="https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=700&q=85"
              alt="Electrician testing a control panel"
            />
            <div className="hero-card">
              <div className="hero-card-top">
                <Zap size={26} />
                <div>
                  <strong>Emergency-ready team</strong>
                  <span>
                    Ahmedabad repairs, fault finding, and urgent support.
                  </span>
                </div>
              </div>
              <div className="stat-grid">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="hero-section">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="hero-copy reveal-up">
            <span className="eyebrow">
              <ShieldCheck size={16} />
              Trusted electrical contractor in Ahmedabad
            </span>

            <h1>
              {/* Need an Electrician in Ahmedabad?
              <br /> */}
              Fast, Safe & Reliable Electrical Services
            </h1>

            <p>
              30+ years of experience in wiring, panel upgrades, lighting, and
              electrical maintenance for homes, shops, offices, and factories.
              <br />
              Same-day service available.
            </p>

            {/* 🔥 NEW TRUST POINTS */}
            <div className="hero-trust-points">
              <span>✔ 30+ Years Experience</span>
              <span>✔ Emergency Support</span>
              <span>✔ Ahmedabad Based</span>
            </div>

            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                Get Free Quote
                <ArrowRight size={18} />
              </Link>

              <a className="button button-glass" href="tel:+919427622474">
                <Phone size={18} />
                Call Now
              </a>
            </div>

            {/* 🔥 SOCIAL PROOF */}
            <div className="hero-proof">
              ⭐ Trusted by 500+ customers across Ahmedabad
            </div>
          </div>

          <div className="hero-visual reveal-up delay-1">
            <img
              className="hero-visual-main"
              src="https://images.unsplash.com/photo-1757817301348-f91ce527b09b?auto=format&fit=crop&w=1000&q=85"
              alt="Electrical lighting work"
            />
            <img
              className="hero-visual-side"
              src="https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=700&q=85"
              alt="Electrician working on panel"
            />

            <div className="hero-card">
              <div className="hero-card-top">
                <Zap size={26} />
                <div>
                  <strong>Emergency Electrical Support</strong>
                  <span>Available across Ahmedabad</span>
                </div>
              </div>

              <div className="stat-grid">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section carousel-section">
        <div className="container carousel-shell">
          <div className="carousel-copy">
            <span className="section-kicker">Ahmedabad business feel</span>
            <h2>Lighting and electrical setups that suit Indian spaces.</h2>
            <p>
              Local businesses need practical wiring, visible finish quality,
              serviceable panels, and lighting that looks inviting without
              wasting power.
            </p>
            <div className="location-pill">
              <MapPin size={18} />
              Serving Ahmedabad and nearby Gujarat sites
            </div>
          </div>

          <div
            className="image-carousel"
            aria-label="Ahmedabad lighting carousel"
          >
            <img src={currentSlide.src} alt={currentSlide.alt} />
            <div className="carousel-panel">
              <span>{currentSlide.eyebrow}</span>
              <strong>{currentSlide.title}</strong>
              <p>{currentSlide.text}</p>
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Previous carousel image"
                onClick={showPreviousSlide}
                type="button"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                aria-label="Next carousel image"
                onClick={showNextSlide}
                type="button"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            <div className="carousel-dots" aria-label="Choose carousel image">
              {carouselSlides.map((slide, index) => (
                <button
                  aria-label={`Show ${slide.title}`}
                  className={activeSlide === index ? "active" : ""}
                  key={slide.title}
                  onClick={() => setActiveSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-heading">
          <div>
            <span className="section-kicker">Services</span>
            <h2>
              Everything your Ahmedabad property needs to stay powered safely.
            </h2>
          </div>
          <Link className="text-link" to="/services">
            View all services
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="container service-preview-grid">
          {servicePreview.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                className="feature-card interactive-card"
                to="/services"
                key={service.title}
              >
                <Icon size={30} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container process-grid">
          <div className="process-image">
            <img
              src="https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=1200&q=85"
              alt="Electrician testing an electrical panel with a multimeter"
            />
          </div>
          <div className="process-copy">
            <span className="section-kicker">Our method</span>
            <h2>Planned for real usage, proper load, and long-term safety.</h2>
            <p>
              Every job starts with the site reality: sanctioned load, usage,
              cable routing, earthing, safety, and future expansion. That keeps
              work tidy and avoids expensive rework.
            </p>
            <div className="check-list">
              {workSteps.map((step) => (
                <div key={step}>
                  <CheckCircle2 size={20} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section lighting-section">
        <div className="container split-heading">
          <div>
            <span className="section-kicker">Lighting and execution</span>
            <h2>
              Click through modern lighting styles for real business spaces.
            </h2>
          </div>
          <div className="mini-badge">
            <Lightbulb size={18} />
            Lights, wiring, panels, safety
          </div>
        </div>

        <div className="container lighting-studio">
          <div className="lighting-main">
            <img src={currentLighting.src} alt={currentLighting.alt} />
            <div>
              <span>Lighting preview</span>
              <strong>{currentLighting.title}</strong>
              <p>{currentLighting.text}</p>
            </div>
          </div>

          <div className="lighting-thumbs" aria-label="Choose lighting style">
            {lightingLooks.map((look, index) => (
              <button
                className={activeLighting === index ? "active" : ""}
                key={look.title}
                onClick={() => setActiveLighting(index)}
                type="button"
              >
                <img src={look.src} alt={look.alt} />
                <span>{look.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container trust-band">
          <div>
            <BadgeCheck size={28} />
            <strong>Licensed technicians</strong>
            <span>Trained team with safety-first execution.</span>
          </div>
          <div>
            <Clock3 size={28} />
            <strong>Reliable timelines</strong>
            <span>Clear scheduling and accountable handover.</span>
          </div>
          <div>
            <Wrench size={28} />
            <strong>Clean finish</strong>
            <span>Neat routing, labeling, and final testing.</span>
          </div>
          <div>
            <Sparkles size={28} />
            <strong>Modern lighting</strong>
            <span>Warm, efficient lighting for polished interiors.</span>
          </div>
        </div>
      </section>
    </>
  );
}
