import { Bolt, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            <Bolt size={24} />
            <span>Bhavik Electricals</span>
          </Link>
          <p>
            Reliable electrical contracting for residential, commercial, and
            industrial requirements.
          </p>
        </div>

        <div>
          <h3>Pages</h3>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <a href="tel:+919427622474">
            <Phone size={16} />
            +91 94276 22474
          </a>
          <a href="mailto:bhavikelectricals74@gmail.com">
            <Mail size={16} />
            bhavikelectricals74@gmail.com
          </a>
          <span>
            <MapPin size={16} />
            Gujarat, India
          </span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Bhavik Electricals. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
