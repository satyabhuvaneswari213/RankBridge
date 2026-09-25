import { ArrowRight, GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <a href="/" className="logo">
          <div className="logo-icon">
            <GraduationCap size={25} />
          </div>

          <span>
            Rank<span>Bridge</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => {
            window.location.href = "/login";
          }}>
            Login
          </button>

          <button className="signup-btn" onClick={() => {
            window.location.href = "/signup";
          }}>
            Get Started
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;