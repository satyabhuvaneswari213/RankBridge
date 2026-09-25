function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">
              🎓
            </div>

            <span>
              Rank<span>Bridge</span>
            </span>
          </div>

          <p>
            Helping students find the right college
            based on their rank, preferences and goals.
          </p>

          <div className="social-icons">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Email</a>
          </div>
        </div>

        {/* Platform */}
        <div className="footer-column">
          <h4>Platform</h4>
          <a href="#">Find Colleges</a>
          <a href="#">Rank Predictor</a>
          <a href="#">Compare Colleges</a>
          <a href="#">Shortlist</a>
        </div>

        {/* Exams */}
        <div className="footer-column">
          <h4>Exams</h4>
          <a href="#">EAMCET</a>
          <a href="#">ECET</a>
          <a href="#">PGCET</a>
          <a href="#">POLYCET</a>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RankBridge. Built for students.</p>
      </div>
    </footer>
  );
}

export default Footer;