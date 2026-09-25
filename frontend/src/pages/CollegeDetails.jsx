import { useEffect, useState } from "react";

function CollegeDetails() {
  const collegeId = window.location.pathname.split("/")[2];

  const [college, setCollege] = useState(null);
  const [cutoffs, setCutoffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollege = async () => {
      try {
        setLoading(true);

        const collegeResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/colleges/${collegeId}`
        );

        const collegeData = await collegeResponse.json();

        if (!collegeResponse.ok) {
          throw new Error(
            collegeData.message || "College not found."
          );
        }

        setCollege(collegeData.college);

        const cutoffResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/colleges/${collegeId}/cutoffs`
        );

        const cutoffData = await cutoffResponse.json();

        if (cutoffData.success) {
          setCutoffs(cutoffData.cutoffs);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (collegeId) {
      loadCollege();
    }
  }, [collegeId]);

  if (loading) {
    return (
      <div className="college-loading">
        <div className="college-spinner"></div>
        <h2>Loading college details...</h2>
        <p>Getting information from RankBridge.</p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="college-error-page">
        <div className="college-error-card">
          <div className="college-error-icon">🏫</div>

          <h2>College not found</h2>

          <p>{error || "The requested college could not be found."}</p>

          <button
            onClick={() => {
              window.location.href = "/results";
            }}
            className="college-primary-button"
          >
            ← Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="college-details-page">

      {/* NAVBAR */}

      <nav className="college-navbar">

        <a href="/" className="college-logo">
          🎓 Rank<span>Bridge</span>
        </a>

        <div className="college-nav-links">
          <button onClick={() => (window.location.href = "/")}>
            Home
          </button>

          <button
            onClick={() =>
              (window.location.href = "/predictor")
            }
          >
            Predictor
          </button>

          <button
            onClick={() =>
              (window.location.href = "/dashboard")
            }
          >
            Dashboard
          </button>
        </div>

      </nav>


      {/* HERO */}

      <section className="college-hero">

        <div className="college-hero-inner">

          <button
            className="college-back-button"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>

          <div className="college-hero-content">

            <div className="college-hero-icon">
              🏫
            </div>

            <div className="college-hero-info">

              <div className="college-code">
                {college.collegeCode}
              </div>

              <h1>{college.name}</h1>

              <p>
                📍 {college.location},{" "}
                {college.district},{" "}
                {college.state}
              </p>

              <div className="college-hero-badges">

                <span>
                  {college.type}
                </span>

                {college.autonomous && (
                  <span>
                    ✓ Autonomous
                  </span>
                )}

                {college.verified && (
                  <span>
                    ✓ Verified
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MAIN */}

      <main className="college-details-container">

        {/* OVERVIEW */}

        <section className="college-details-card">

          <div className="college-section-title">

            <div>
              <span>ABOUT THE COLLEGE</span>
              <h2>College Overview</h2>
            </div>

          </div>

          <div className="college-info-grid">

            <Info
              icon="🏛️"
              label="College Type"
              value={college.type || "Not available"}
            />

            <Info
              icon="🎓"
              label="University"
              value={
                college.university ||
                "Not available"
              }
            />

            <Info
              icon="⭐"
              label="Rating"
              value={
                college.rating
                  ? `${college.rating} / 5`
                  : "Not available"
              }
            />

            <Info
              icon="💰"
              label="Fees"
              value={
                college.fees ||
                "Not available"
              }
            />

            <Info
              icon="💼"
              label="Placement"
              value={
                college.placement ||
                "Not available"
              }
            />

            <Info
              icon="🏫"
              label="Campus Status"
              value={
                college.autonomous
                  ? "Autonomous"
                  : "Non-Autonomous"
              }
            />

          </div>

        </section>


        {/* WEBSITE */}

        {college.website && (
          <section className="college-website-card">

            <div className="website-content">

              <div className="website-icon">
                🌐
              </div>

              <div>
                <h3>Official College Website</h3>

                <p>
                  Visit the official website for
                  admission details and college information.
                </p>
              </div>

            </div>

            <a
              href={college.website}
              target="_blank"
              rel="noreferrer"
              className="college-website-button"
            >
              Visit Website →
            </a>

          </section>
        )}


        {/* CUTOFFS */}

        <section className="college-details-card">

          <div className="college-section-title cutoff-heading">

            <div>
              <span>ADMISSION DATA</span>

              <h2>Cutoff Information</h2>

              <p>
                Available RankBridge cutoff records
              </p>
            </div>

            <div className="cutoff-count">
              {cutoffs.length} Records
            </div>

          </div>


          {cutoffs.length === 0 ? (

            <div className="college-empty">
              <div>📊</div>

              <h3>
                No cutoff information available
              </h3>

              <p>
                Cutoff information for this college
                hasn't been added yet.
              </p>
            </div>

          ) : (

            <div className="college-cutoff-wrapper">

              <table className="college-cutoff-table">

                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Year</th>
                    <th>Round</th>
                    <th>Branch</th>
                    <th>Category</th>
                    <th>Opening</th>
                    <th>Closing</th>
                  </tr>
                </thead>

                <tbody>

                  {cutoffs.map((cutoff) => (

                    <tr key={cutoff._id}>

                      <td>
                        <span className="exam-badge">
                          {cutoff.exam}
                        </span>
                      </td>

                      <td>
                        {cutoff.year}
                      </td>

                      <td>
                        {cutoff.round}
                      </td>

                      <td>
                        {cutoff.branch}
                      </td>

                      <td>
                        {cutoff.category}
                      </td>

                      <td>
                        {cutoff.openingRank}
                      </td>

                      <td className="closing-rank">
                        {cutoff.closingRank}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* CTA */}

        <section className="college-cta">

          <div className="college-cta-icon">
            🎯
          </div>

          <div className="college-cta-content">

            <h2>
              Want to check your chances?
            </h2>

            <p>
              Enter your CET rank and discover
              colleges that match your profile.
            </p>

          </div>

          <button
            onClick={() =>
              (window.location.href = "/predictor")
            }
          >
            Try Rank Predictor →
          </button>

        </section>

      </main>

    </div>
  );
}


function Info({ icon, label, value }) {
  return (
    <div className="college-info-box">

      <div className="college-info-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}


export default CollegeDetails;