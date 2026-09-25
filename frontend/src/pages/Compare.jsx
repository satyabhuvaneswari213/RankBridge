import { useEffect, useState } from "react";

function Compare() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const stored =
      localStorage.getItem("rankbridge_compare");

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setColleges(parsed);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCollege = (item) => {
    return item?.college || item;
  };

  const getValue = (item, field) => {
    const college = getCollege(item);

    if (item?.[field] !== undefined) {
      return item[field];
    }

    return college?.[field];
  };

  const removeCollege = (index) => {
    const updated = colleges.filter(
      (_, i) => i !== index
    );

    setColleges(updated);

    localStorage.setItem(
      "rankbridge_compare",
      JSON.stringify(updated)
    );
  };

  if (colleges.length === 0) {
    return (
      <div className="compare-empty-page">

        <div className="compare-empty-card">

          <div className="compare-empty-icon">
            ⚖️
          </div>

          <span className="compare-badge">
            COLLEGE COMPARISON
          </span>

          <h1>
            No colleges selected
          </h1>

          <p>
            Select colleges from your results page
            to compare them side by side.
          </p>

          <button
            onClick={() => {
              window.location.href = "/predictor";
            }}
            className="compare-primary-button"
          >
            Find Colleges →
          </button>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="compare-secondary-button"
          >
            ← Back to Home
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="compare-page">

      {/* NAVBAR */}

      <header className="compare-navbar">

        <a
          href="/"
          className="compare-logo"
        >
          🎓 Rank<span>Bridge</span>
        </a>

        <div className="compare-nav-actions">

          <button
            onClick={() =>
              (window.location.href = "/predictor")
            }
          >
            Find Colleges
          </button>

          <button
            onClick={() =>
              (window.location.href = "/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </header>


      {/* HEADER */}

      <main className="compare-main">

        <div className="compare-heading">

          <div>

            <span className="compare-badge">
              COLLEGE COMPARISON
            </span>

            <h1>
              Compare Your Options
            </h1>

            <p>
              Compare important college information
              side by side before making your shortlist.
            </p>

          </div>

          <button
            className="compare-back-button"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>

        </div>


        {/* COLLEGE CARDS */}

        <div
          className={`compare-college-grid count-${colleges.length}`}
        >

          {colleges.map((item, index) => {

            const college = getCollege(item);

            return (
              <div
                className="compare-college-card"
                key={
                  college?._id ||
                  item?.cutoffId ||
                  index
                }
              >

                <button
                  className="remove-compare"
                  onClick={() =>
                    removeCollege(index)
                  }
                  title="Remove college"
                >
                  ×
                </button>

                <div className="compare-college-avatar">
                  {college?.name
                    ?.charAt(0)
                    .toUpperCase() || "C"}
                </div>

                <h2>
                  {college?.name ||
                    "College"}
                </h2>

                <p>
                  📍{" "}
                  {college?.location ||
                    "Location unavailable"}
                </p>

                {college?.collegeCode && (
                  <span className="compare-code">
                    {college.collegeCode}
                  </span>
                )}

              </div>
            );
          })}

        </div>


        {/* COMPARISON */}

        <section className="comparison-section">

          <div className="comparison-section-heading">

            <div>
              <span>
                SIDE-BY-SIDE
              </span>

              <h2>
                College Comparison
              </h2>
            </div>

            <span className="comparison-count">
              {colleges.length} Colleges
            </span>

          </div>


          <div className="comparison-table-wrapper">

            <table className="comparison-table">

              <thead>

                <tr>

                  <th>
                    Feature
                  </th>

                  {colleges.map(
                    (item, index) => {

                      const college =
                        getCollege(item);

                      return (
                        <th
                          key={
                            college?._id ||
                            index
                          }
                        >
                          {college?.name ||
                            "College"}
                        </th>
                      );
                    }
                  )}

                </tr>

              </thead>


              <tbody>

                <ComparisonRow
                  label="Location"
                  colleges={colleges}
                  field="location"
                />

                <ComparisonRow
                  label="College Type"
                  colleges={colleges}
                  field="type"
                />

                <ComparisonRow
                  label="University"
                  colleges={colleges}
                  field="university"
                />

                <ComparisonRow
                  label="Fees"
                  colleges={colleges}
                  field="fees"
                />

                <ComparisonRow
                  label="Placement"
                  colleges={colleges}
                  field="placement"
                />


                <tr className="comparison-divider">
                  <td colSpan={colleges.length + 1}>
                    Admission Information
                  </td>
                </tr>


                <ComparisonRow
                  label="Opening Rank"
                  colleges={colleges}
                  field="openingRank"
                />

                <ComparisonRow
                  label="Closing Rank"
                  colleges={colleges}
                  field="closingRank"
                />

                <ComparisonRow
                  label="Prediction"
                  colleges={colleges}
                  field="prediction"
                  prediction
                />

                <ComparisonRow
                  label="Match"
                  colleges={colleges}
                  field="match"
                  match
                />

              </tbody>

            </table>

          </div>

        </section>


        {/* ACTIONS */}

        <section className="compare-bottom-actions">

          <button
            onClick={() =>
              (window.location.href =
                "/predictor")
            }
            className="compare-primary-button"
          >
            🎯 Find More Colleges
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "/dashboard")
            }
            className="compare-secondary-button"
          >
            ← Dashboard
          </button>

        </section>

      </main>

    </div>
  );
}


function ComparisonRow({
  label,
  colleges,
  field,
  prediction,
  match,
}) {
  return (
    <tr>

      <td className="comparison-label">
        {label}
      </td>

      {colleges.map((item, index) => {

        const college =
          item?.college || item;

        const value =
          item?.[field] !== undefined
            ? item[field]
            : college?.[field];

        let displayValue =
          value ?? "N/A";

        if (field === "match" && value !== undefined) {
          displayValue = `${value}%`;
        }

        return (
          <td
            key={
              college?._id ||
              item?.cutoffId ||
              index
            }
          >

            {prediction ? (

              <span
                className={`prediction-pill ${
                  String(value)
                    .toLowerCase()
                    .replace(/\s/g, "-")
                }`}
              >
                {displayValue}
              </span>

            ) : match ? (

              <strong className="match-value">
                {displayValue}
              </strong>

            ) : (
              displayValue
            )}

          </td>
        );
      })}

    </tr>
  );
}


export default Compare;