import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import logo from "./assets/logo.svg";
import "./styles.css";

function App() {
  return (
    <Router>
      {/* React 19 hoisted metadata */}
      <title>Bhavik Electricals | Ahmedabad Electrical Contractor</title>
      <link rel="icon" href={logo} type="image/svg+xml" />
      <meta
        name="description"
        content="Expert electrical solutions for Ahmedabad homes, shops, and industries. Reliable wiring, modern lighting, and safety audits with 18+ years of experience."
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
