import { useState } from "react";

function RankPredictor() {
  const params = new URLSearchParams(window.location.search);
  const examFromUrl = params.get("exam");

  const [exam, setExam] = useState(examFromUrl || "");

  const [rank, setRank] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!exam || !rank || !branch || !category) {
      alert("Please fill all the details.");
      return;
    }

    if (Number(rank) <= 0) {
      alert("Please enter a valid rank.");
      return;
    }

    const query = new URLSearchParams({
      exam,
      rank,
      branch,
      category,
    });

    window.location.href = `/results?${query.toString()}`;
  };

  const getExamDescription = () => {
    switch (exam) {
      case "EAMCET":
        return "For Engineering & Agriculture admissions";
      case "ECET":
        return "For Diploma holders seeking B.Tech admission";
      case "PGECET":
        return "For postgraduate engineering admissions";
      case "POLYCET":
        return "For Polytechnic admissions";
      default:
        return "Select your entrance exam";
    }
  };

  return (
    <div className="predictor-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="predictor-header">

        <a href="/" className="predictor-logo">
          <span className="logo-icon">🎓</span>

          <span>
            Rank<span className="logo-highlight">Bridge</span>
          </span>
        </a>

        <a href="/" className="back-home">
          ← Back to Home
        </a>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="predictor-main">

        {/* Heading */}

        <section className="predictor-heading">

          <span className="heading-badge">
            RANK PREDICTOR
          </span>

          <h1>
            Find Colleges That
            <span> Match Your Rank</span>
          </h1>

          <p>
            Enter your entrance exam details and preferences
            to discover colleges that match your rank.
          </p>

        </section>


        {/* =========================
            FORM CARD
        ========================= */}

        <form
          className="predictor-card"
          onSubmit={handleSubmit}
        >

          {/* Progress */}

          <div className="form-progress">

            <div className="progress-step active">
              <span>1</span>
              Exam
            </div>

            <div className="progress-line"></div>

            <div className="progress-step">
              <span>2</span>
              Rank
            </div>

            <div className="progress-line"></div>

            <div className="progress-step">
              <span>3</span>
              Preferences
            </div>

          </div>


          {/* =========================
              EXAM
          ========================= */}

          <div className="form-group">

            <label htmlFor="exam">
              Entrance Exam
            </label>

            <select
              id="exam"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            >

              <option value="">
                Choose your exam
              </option>

              <option value="EAMCET">
                EAMCET
              </option>

              <option value="ECET">
                ECET
              </option>

              <option value="PGECET">
                PGECET
              </option>

              <option value="POLYCET">
                POLYCET
              </option>

            </select>

            <small className="field-help">
              {getExamDescription()}
            </small>

          </div>


          {/* =========================
              RANK
          ========================= */}

          <div className="form-group">

            <label htmlFor="rank">
              Your Rank
            </label>

            <div className="rank-input-wrapper">

              <span className="rank-icon">
                #
              </span>

              <input
                id="rank"
                type="number"
                placeholder="Example: 1250"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                min="1"
              />

            </div>

            <small className="field-help">
              Enter your actual entrance exam rank
            </small>

          </div>


          {/* =========================
              BRANCH
          ========================= */}

          <div className="form-group">

            <label htmlFor="branch">
              Preferred Branch
            </label>

            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >

              <option value="">
                Choose your branch
              </option>

              <option value="CSE">
                Computer Science & Engineering
              </option>

              <option value="ECE">
                Electronics & Communication Engineering
              </option>

              <option value="EEE">
                Electrical & Electronics Engineering
              </option>

              <option value="MECH">
                Mechanical Engineering
              </option>

              <option value="CIVIL">
                Civil Engineering
              </option>

              <option value="IT">
                Information Technology
              </option>

              <option value="AI-DS">
                Artificial Intelligence & Data Science
              </option>

            </select>

          </div>


          {/* =========================
              CATEGORY
          ========================= */}

          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              <option value="">
                Select category
              </option>

              <option value="OC">
                OC
              </option>

              <option value="BC-A">
                BC-A
              </option>

              <option value="BC-B">
                BC-B
              </option>

              <option value="BC-C">
                BC-C
              </option>

              <option value="BC-D">
                BC-D
              </option>

              <option value="BC-E">
                BC-E
              </option>

              <option value="SC">
                SC
              </option>

              <option value="ST">
                ST
              </option>

            </select>

          </div>


          {/* =========================
              SELECTION SUMMARY
          ========================= */}

          {(exam || rank || branch || category) && (
            <div className="selection-summary">

              <div className="summary-title">
                Your Selection
              </div>

              <div className="summary-items">

                <div>
                  <span>Exam</span>
                  <strong>
                    {exam || "—"}
                  </strong>
                </div>

                <div>
                  <span>Rank</span>
                  <strong>
                    {rank || "—"}
                  </strong>
                </div>

                <div>
                  <span>Branch</span>
                  <strong>
                    {branch || "—"}
                  </strong>
                </div>

                <div>
                  <span>Category</span>
                  <strong>
                    {category || "—"}
                  </strong>
                </div>

              </div>

            </div>
          )}


          {/* =========================
              SUBMIT
          ========================= */}

          <button
            type="submit"
            className="predictor-button"
          >

            <span>
              Find My Colleges
            </span>

            <span className="button-arrow">
              →
            </span>

          </button>


          <p className="button-note">
            Takes just a few seconds
          </p>

        </form>


        {/* =========================
            TRUST INFORMATION
        ========================= */}

        <div className="predictor-info">

          <div className="info-icon">
            ✓
          </div>

          <div>
            <strong>
              Your information is safe
            </strong>

            <p>
              Your rank and preferences are used only
              to generate relevant college results.
            </p>
          </div>

        </div>


        {/* =========================
            FEATURES
        ========================= */}

        <div className="predictor-features">

          <div className="feature-card">

            <span>🎯</span>

            <div>
              <strong>
                Rank-based matching
              </strong>

              <p>
                Compare your rank with available cutoff data.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <span>🏫</span>

            <div>
              <strong>
                Multiple entrance exams
              </strong>

              <p>
                EAMCET, ECET, PGECET and POLYCET.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <span>⚡</span>

            <div>
              <strong>
                Quick results
              </strong>

              <p>
                Get your college matches in seconds.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default RankPredictor;