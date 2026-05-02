import { useState, useRef } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const contactItems = [
  {
    label: "Call us",
    value: "+91 94276 22474",
    href: "tel:+919427622474",
    icon: Phone,
  },
  {
    label: "Email",
    value: "bhavikelectricals74@gmail.com",
    href: "mailto:bhavikelectricals74@gmail.com",
    icon: Mail,
  },
  {
    label: "Service area",
    value: "Gujarat and nearby project sites",
    href: "https://maps.google.com",
    icon: MapPin,
  },
  {
    label: "Working hours",
    value: "Mon - Sat, 9:00 AM - 7:00 PM",
    href: null,
    icon: Clock,
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      await fetch(googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain", // 👈 MUST
        },
        body: JSON.stringify(data),
      });

      setSubmitted(true);
      formRef.current.reset();
    } catch (error) {
      alert("Something went wrong. Please call us directly.", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container page-hero-content">
          <span className="eyebrow">
            <Phone size={16} />
            CONTACT BHAVIK ELECTRICALS
          </span>
          <h1>Tell Us Your Electrical Requirement — We’ll Handle the Rest.</h1>
          <p>
            Share your details and our team will quickly assess your requirement
            and guide you with the safest and most reliable solution for your
            home, shop, office, or factory.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-kicker">Reach us</span>
            <h2>Quick response for electrical work and maintenance.</h2>
            <p>
              Use the form for project requests or call directly for urgent
              electrical issues. Replace these placeholder details with your
              final phone, address, and email before publishing.
            </p>

            <div className="contact-list">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="contact-icon">
                      <Icon size={22} />
                    </span>
                    <span>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>
                  </>
                );

                return item.href ? (
                  <a className="contact-item" href={item.href} key={item.label}>
                    {content}
                  </a>
                ) : (
                  <div className="contact-item" key={item.label}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <form className="quote-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                type="email"
              />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                placeholder="10-digit mobile number"
                required
                type="tel"
                pattern="[6-9][0-9]{9}"
                title="Please enter a valid mobile numberx"
              />
            </div>
            <div className="form-row">
              <label htmlFor="service">Service type</label>
              <select id="service" name="service" defaultValue="Residential">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Safety audit</option>
                <option>Emergency repair</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about the work, location, and timeline."
                rows="5"
                required
              />
            </div>
            <button
              className="button button-primary form-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send inquiry"}
              <Send size={18} />
            </button>
            {submitted && (
              <p className="form-success" role="status">
                <CheckCircle2 size={18} />
                Thank you! Your inquiry has been sent. We will contact you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* <section className="map-section">
        <div className="container">
          <div className="map-container">
            <iframe
              title="Bhavik Electricals Location"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyABTRer76SCtmgteFiJj_eRoUg60sQYXO4&q=Bhavik+Electricals+Ahmedabad"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              // loading="lazy"
            ></iframe>
          </div>
        </div>
      </section> */}
    </>
  );
}
