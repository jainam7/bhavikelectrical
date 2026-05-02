import { Award, CheckCircle2, HardHat, Users } from "lucide-react";

const values = [
  {
    title: "Safety-first planning",
    text: "Every project is checked for load, protection, grounding, and future expansion.",
    icon: HardHat,
  },
  {
    title: "Experienced team",
    text: "A trained crew handles residential, commercial, and industrial requirements.",
    icon: Users,
  },
  {
    title: "Accountable finish",
    text: "Clear scope, neat installation, testing, and handover after completion.",
    icon: Award,
  },
];

const milestones = [
  "1993: Started local electrical services in Ahmedabad",
  "2005: Expanded into homes, shops, and commercial spaces",
  "2015: Delivered large-scale projects and industrial support",
  "Today: Complete electrical solutions across Ahmedabad",
];

export default function About() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="container page-hero-content">
          <span className="eyebrow">
            <Award size={16} />
            About Bhavik Electricals
          </span>
          <h1>
            Experienced Electrical Contractors in Ahmedabad You Can Trust.
          </h1>
          <p>
            We combine decades of field experience with careful planning to
            deliver safe, efficient, and long-lasting electrical solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="section-kicker">Our story</span>
            <h2>
              Powering Ahmedabad with trusted electrical expertise for over 30
              years.
            </h2>
            <p>
              Bhavik Electricals started with local repair and wiring services
              in Ahmedabad and has grown into a trusted full-service electrical
              team. For over 30 years, our approach has remained simple —
              understand the site, deliver clean and safe work, and ensure every
              customer gets a more reliable and long-lasting electrical setup.
            </p>
            <div className="check-list">
              {milestones.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={20} className="m-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-stack">
            <img
              src="https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=1000&q=85"
              alt="Technician testing an electrical panel"
            />
            <div className="floating-note">
              <strong>30+</strong>
              <span>Years of trusted electrical service across Ahmedabad</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container value-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article
                className="feature-card interactive-card"
                key={value.title}
              >
                <Icon size={30} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
