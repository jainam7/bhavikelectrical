import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import logo from "./assets/logo.svg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="Bhavik Electricals home">
          <span className="brand-mark">
            <img src={logo} alt="Bhavik Electricals logo" />
          </span>
          <span>Bhavik Electricals</span>
        </Link>

        <div className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              key={link.path}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <a className="button button-small" href="tel:+919427622474">
            <Phone size={17} />
            Call now
          </a>
          <button
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="icon-button menu-button"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className={isOpen ? "mobile-nav open" : "mobile-nav"}>
        <div className="container mobile-nav-inner">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "mobile-link active" : "mobile-link"
              }
              key={link.path}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
