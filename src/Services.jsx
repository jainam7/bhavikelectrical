import { useState } from "react";
import {
  ArrowRight,
  CircuitBoard,
  Factory,
  HousePlug,
  Lightbulb,
  PlugZap,
  ToggleLeft,
  UtilityPole,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Electrician Working",
    category: "Repair",
    desc: "On-site troubleshooting, repairs, testing, and service calls handled by trained electricians.",
    icon: PlugZap,
    image:
      "https://images.unsplash.com/photo-1741388222137-c0d3007ec173?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Residential Electrical Work",
    category: "Residential",
    desc: "Home wiring, rewiring, sockets, switchboards, fans, lights, MCB panels, and safety checks.",
    icon: HousePlug,
    image:
      "https://images.unsplash.com/photo-1751486289943-0428133c367c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Industrial Electrical Work",
    category: "Industrial",
    desc: "Factory wiring, machinery power, load distribution, cable routing, and preventive maintenance.",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1748002645678-7f9c04263315?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Power Transformer",
    category: "Industrial",
    desc: "Transformer-side coordination, power distribution planning, high-load checks, and infrastructure support.",
    icon: UtilityPole,
    image:
      "https://images.unsplash.com/photo-1693013112835-5f3128bb555f?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Interior Lighting",
    category: "Lighting",
    desc: "Modern lighting layouts for homes, cafes, offices, retail counters, and premium interiors.",
    icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1770816307611-4147a8be5d2b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Safety Electrician",
    category: "Safety",
    desc: "Electrical safety checks, earthing review, overload risk inspection, and fault-prevention service.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Switches Electrical",
    category: "Residential",
    desc: "Switches, sockets, dimmers, modular plates, and clean power-point installation or replacement.",
    icon: ToggleLeft,
    image:
      "https://images.unsplash.com/photo-1761479373576-ad4c1c5bb9af?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Panel Wiring",
    category: "Safety",
    desc: "DB panels, control panels, MCB/RCCB upgrades, labeling, load balancing, and neat cable management.",
    icon: CircuitBoard,
    image:
      "https://images.unsplash.com/photo-1744113439895-14529bb2f6e6?auto=format&fit=crop&w=900&q=85",
  },
];

const filters = [
  "All",
  "Repair",
  "Residential",
  "Industrial",
  "Lighting",
  "Safety",
];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedService, setSelectedService] = useState(services[0]);

  const visibleServices =
    activeFilter === "All"
      ? services
      : services.filter((service) => service.category === activeFilter);

  return (
    <>
      <section className="page-hero services-hero">
        <div className="container page-hero-content">
          <span className="eyebrow">
            <Zap size={16} />
            Ahmedabad electrical solutions
          </span>
          <h1>
            Reliable Electrical Services in Ahmedabad for Homes, Businesses &
            Industrial Sites.
          </h1>
          <p>
            Choose a category to explore how Bhavik Electricals supports
            apartments, bungalows, cafes, retail spaces, factories, and new
            projects across Ahmedabad.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container filter-row" aria-label="Filter services">
          {filters.map((filter) => (
            <button
              className={
                activeFilter === filter
                  ? "filter-button active"
                  : "filter-button"
              }
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="container service-grid">
          {visibleServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService.title === service.title;

            return (
              <button
                className={isSelected ? "service-card active" : "service-card"}
                key={service.title}
                onClick={() => setSelectedService(service)}
                type="button"
              >
                <img src={service.image} alt={`${service.title} service`} />
                <span className="service-icon">
                  <Icon size={24} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container selected-service">
          <img
            src={selectedService.image}
            alt={`${selectedService.title} work preview`}
          />
          <div>
            <span className="section-kicker">Selected service</span>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.desc}</p>
            <Link className="button button-primary" to="/contact">
              Discuss this service
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
