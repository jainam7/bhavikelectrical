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
  "2006: Started local Ahmedabad service work",
  "2014: Expanded into shops, offices, and showrooms",
  "2020: Added industrial and safety audit support",
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
          <h1>Ahmedabad electricians with a practical, safety-led approach.</h1>
          <p>
            We combine field experience with careful planning so homes,
            businesses, and factories across Ahmedabad get electrical systems
            that work cleanly from day one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="section-kicker">Our story</span>
            <h2>
              Powering Ahmedabad spaces with trust for more than 18 years.
            </h2>
            <p>
              Bhavik Electricals began with local repair and wiring work in
              Ahmedabad and grew into a full-service electrical team. The focus
              has stayed the same: understand the site, do the work neatly, and
              leave the customer with a safer setup than before.
            </p>
            <div className="timeline">
              {milestones.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={18} />
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
              <strong>2,500+</strong>
              <span>Completed service and project visits</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container value-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article className="feature-card" key={value.title}>
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
