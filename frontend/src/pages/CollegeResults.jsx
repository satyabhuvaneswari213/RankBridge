import { useEffect, useState } from "react";

const API_URL = "${import.meta.env.VITE_API_URL}";

function CollegeResults() {
  const [colleges, setColleges] = useState([]);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [predictionFilter, setPredictionFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Shortlist / Compare
  const [shortlisted, setShortlisted] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const [shortlistLoading, setShortlistLoading] = useState(null);

  // ==============================
  // FETCH COLLEGE RESULTS
  // ==============================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const rank = params.get("rank");
    const exam = params.get("exam") || "EAMCET";
    const branch = params.get("branch") || "CSE";
    const category = params.get("category") || "OC";

    if (!rank) {
      setError("Rank information is missing.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/colleges/predict?rank=${rank}&exam=${exam}&branch=${branch}&category=${category}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch college results."
          );
        }

        setStudent(data.student || null);
        setColleges(data.colleges || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // ==============================
  // LOAD SHORTLIST
  // ==============================

  useEffect(() => {
    const loadShortlist = async () => {
      const token = localStorage.getItem("rankbridge_token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/shortlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        const ids = (data.colleges || []).map(
          (college) => college._id
        );

        setShortlisted(ids);
      } catch (error) {
        console.error(
          "Failed to load shortlist:",
          error
        );
      }
    };

    loadShortlist();
  }, []);

  // ==============================
  // FILTER OPTIONS
  // ==============================

  const locations = [
    "All",
    ...new Set(
      colleges
        .map((item) => item.college?.location)
        .filter(Boolean)
    ),
  ];

  const collegeTypes = [
    "All",
    ...new Set(
      colleges
        .map((item) => item.college?.type)
        .filter(Boolean)
    ),
  ];

  // ==============================
  // FILTER COLLEGES
  // ==============================

  const filteredColleges = colleges.filter((item) => {
    const collegeName =
      item.college?.name?.toLowerCase() || "";

    const location =
      item.college?.location || "";

    const type =
      item.college?.type || "";

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      collegeName.includes(searchText) ||
      location.toLowerCase().includes(searchText);

    const matchesPrediction =
      predictionFilter === "All" ||
      item.prediction === predictionFilter;

    const matchesType =
      typeFilter === "All" ||
      type === typeFilter;

    const matchesLocation =
      locationFilter === "All" ||
      location === locationFilter;

    return (
      matchesSearch &&
      matchesPrediction &&
      matchesType &&
      matchesLocation
    );
  });

  // ==============================
  // CLEAR FILTERS
  // ==============================

  const clearFilters = () => {
    setSearch("");
    setPredictionFilter("All");
    setTypeFilter("All");
    setLocationFilter("All");
  };

  // ==============================
  // SHORTLIST
  // ==============================

  const toggleShortlist = async (collegeId) => {
    const token = localStorage.getItem("rankbridge_token");

    if (!token) {
      alert("Please login to shortlist colleges.");
      window.location.href = "/login";
      return;
    }

    try {
      setShortlistLoading(collegeId);

      const alreadyShortlisted =
        shortlisted.includes(collegeId);

      if (alreadyShortlisted) {
        const response = await fetch(
          `${API_URL}/api/shortlist/${collegeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to remove college."
          );
        }

        setShortlisted((previous) =>
          previous.filter((id) => id !== collegeId)
        );
      } else {
        const response = await fetch(
          `${API_URL}/api/shortlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              collegeId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to shortlist college."
          );
        }

        setShortlisted((previous) => [
          ...previous,
          collegeId,
        ]);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setShortlistLoading(null);
    }
  };

  // ==============================
  // COMPARE
  // ==============================

  const toggleCompare = (collegeId) => {
    setCompareList((previous) => {
      if (previous.includes(collegeId)) {
        return previous.filter(
          (id) => id !== collegeId
        );
      }

      if (previous.length >= 3) {
        alert(
          "You can compare a maximum of 3 colleges."
        );

        return previous;
      }

      return [...previous, collegeId];
    });
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div style={styles.center}>
        <div className="results-loader"></div>

        <h2>Finding suitable colleges...</h2>

        <p>
          RankBridge is checking cutoff data for your rank.
        </p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div style={styles.center}>
        <div className="status-icon">!</div>

        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button
          style={styles.button}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.secondaryButton,
          }}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  // ==============================
  // MAIN PAGE
  // ==============================

  return (
    <div style={styles.page}>
      {/* Header */}

      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>RankBridge</h1>

          <p style={styles.tagline}>
            Your Rank. Your Options. Your Future.
          </p>
        </div>

        <button
          style={styles.predictAgain}
          onClick={() => {
            window.location.href = "/predictor";
          }}
        >
          Predict Again
        </button>
      </header>

      {/* Student Information */}

      {student && (
        <section style={styles.studentCard}>
          <div>
            <span style={styles.label}>EXAM</span>
            <strong>{student.exam}</strong>
          </div>

          <div>
            <span style={styles.label}>RANK</span>
            <strong>{student.rank}</strong>
          </div>

          <div>
            <span style={styles.label}>BRANCH</span>
            <strong>{student.branch}</strong>
          </div>

          <div>
            <span style={styles.label}>CATEGORY</span>
            <strong>{student.category}</strong>
          </div>

          <div>
            <span style={styles.label}>RESULTS</span>
            <strong>{colleges.length}</strong>
          </div>
        </section>
      )}

      {/* Search + Filters */}

      <section style={styles.controls}>
        <input
          type="text"
          placeholder="Search college or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={predictionFilter}
          onChange={(e) =>
            setPredictionFilter(e.target.value)
          }
          style={styles.select}
        >
          <option value="All">
            All Predictions
          </option>

          <option value="Safe">Safe</option>
          <option value="Likely">Likely</option>
          <option value="Moderate">Moderate</option>
          <option value="Reach">Reach</option>
          <option value="Unlikely">Unlikely</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          style={styles.select}
        >
          {collegeTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All"
                ? "All College Types"
                : type}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(e.target.value)
          }
          style={styles.select}
        >
          {locations.map((location) => (
            <option
              key={location}
              value={location}
            >
              {location === "All"
                ? "All Locations"
                : location}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          style={styles.clearButton}
        >
          Clear
        </button>
      </section>

      {/* Result Heading */}

      <div style={styles.resultHeading}>
        <div>
          <h2>College Matches</h2>

          <p style={styles.resultSubtitle}>
            Colleges matching your selected rank and preferences
          </p>
        </div>

        <span>
          Showing {filteredColleges.length} of{" "}
          {colleges.length}
        </span>
      </div>

      {/* Empty Results */}

      {filteredColleges.length === 0 ? (
        <div style={styles.empty}>
          <div className="empty-icon">⌕</div>

          <h3>No colleges found</h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            style={styles.button}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* College Grid */

        <div style={styles.grid}>
          {filteredColleges.map((item) => {
            const college = item.college;
            const collegeId = college?._id;

            return (
              <div
                key={item.cutoffId}
                style={styles.card}
              >
                {/* Card Header */}

                <div style={styles.cardTop}>
                  <span
                    style={{
                      ...styles.badge,
                      ...getPredictionStyle(
                        item.prediction
                      ),
                    }}
                  >
                    {item.prediction}
                  </span>

                  <span style={styles.match}>
                    {item.match}% Match
                  </span>
                </div>

                {/* College */}

                <h3 style={styles.collegeName}>
                  {college?.name}
                </h3>

                <p style={styles.location}>
                  📍 {college?.location}
                </p>

                {/* Rank Information */}

                <div style={styles.infoGrid}>
                  <div style={styles.infoGridItem}>
                    <span>Opening Rank</span>
                    <strong>
                      {item.openingRank}
                    </strong>
                  </div>

                  <div style={styles.infoGridItem}>
                    <span>Closing Rank</span>
                    <strong>
                      {item.closingRank}
                    </strong>
                  </div>

                  <div style={styles.infoGridItem}>
                    <span>Year</span>
                    <strong>{item.year}</strong>
                  </div>

                  <div style={styles.infoGridItem}>
                    <span>Round</span>
                    <strong>{item.round}</strong>
                  </div>
                </div>

                {/* College Details */}

                <div style={styles.details}>
                  <p>
                    <strong>Type:</strong>{" "}
                    {college?.type || "N/A"}
                  </p>

                  <p>
                    <strong>University:</strong>{" "}
                    {college?.university || "N/A"}
                  </p>

                  <p>
                    <strong>Fees:</strong>{" "}
                    {college?.fees || "N/A"}
                  </p>

                  <p>
                    <strong>Placement:</strong>{" "}
                    {college?.placement || "N/A"}
                  </p>
                </div>

                {/* Actions */}

                <div style={styles.actions}>
                  <button
                    style={{
                      ...styles.actionButton,
                      ...(shortlisted.includes(
                        collegeId
                      )
                        ? styles.activeButton
                        : {}),
                    }}
                    onClick={() =>
                      toggleShortlist(collegeId)
                    }
                    disabled={
                      shortlistLoading === collegeId
                    }
                  >
                    {shortlistLoading === collegeId
                      ? "Saving..."
                      : shortlisted.includes(collegeId)
                        ? "♥ Shortlisted"
                        : "♡ Shortlist"}
                  </button>

                  <button
                    style={{
                      ...styles.actionButton,
                      ...(compareList.includes(
                        collegeId
                      )
                        ? styles.activeButton
                        : {}),
                    }}
                    onClick={() =>
                      toggleCompare(collegeId)
                    }
                  >
                    {compareList.includes(collegeId)
                      ? "✓ Comparing"
                      : "Compare"}
                  </button>

                  <button
                    style={{
                      ...styles.actionButton,
                      ...styles.detailsButton,
                    }}
                    onClick={() =>
                      (window.location.href =
                        `/college/${collegeId}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Bar */}

      {compareList.length > 0 && (
        <div style={styles.compareBar}>
          <span>
            {compareList.length} college
            {compareList.length > 1
              ? "s"
              : ""}{" "}
            selected
          </span>

          <button
            style={styles.compareButton}
            onClick={() => {
              const selectedColleges =
                colleges.filter((item) =>
                  compareList.includes(
                    item.college?._id
                  )
                );

              localStorage.setItem(
                "rankbridge_compare",
                JSON.stringify(selectedColleges)
              );

              window.location.href = "/compare";
            }}
          >
            Compare Selected
          </button>
        </div>
      )}
    </div>
  );
}

// ==============================
// PREDICTION BADGE STYLES
// ==============================

function getPredictionStyle(prediction) {
  switch (prediction) {
    case "Safe":
      return styles.safe;

    case "Likely":
      return styles.likely;

    case "Moderate":
      return styles.moderate;

    case "Reach":
      return styles.reach;

    default:
      return styles.unlikely;
  }
}

// ==============================
// STYLES
// ==============================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    paddingBottom: "100px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    background: "#0A192F",
    color: "white",
    padding: "25px 7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
  },

  tagline: {
    margin: "5px 0 0",
    opacity: 0.8,
  },

  predictAgain: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "white",
    color: "#0A192F",
    cursor: "pointer",
    fontWeight: "700",
  },

  studentCard: {
    margin: "30px auto",
    width: "86%",
    maxWidth: "1100px",
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "20px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  label: {
    display: "block",
    fontSize: "11px",
    color: "#777",
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },

  controls: {
    width: "86%",
    maxWidth: "1100px",
    margin: "0 auto 30px",
    display: "grid",
    gridTemplateColumns:
      "minmax(220px, 1fr) repeat(3, minmax(140px, 180px)) auto",
    gap: "12px",
    alignItems: "center",
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #dbe3ee",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "14px",
    border: "1px solid #dbe3ee",
    borderRadius: "10px",
    background: "white",
    fontSize: "14px",
    cursor: "pointer",
  },

  clearButton: {
    padding: "14px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#e2e8f0",
    color: "#334155",
    fontWeight: "700",
    cursor: "pointer",
  },

  resultHeading: {
    width: "86%",
    maxWidth: "1100px",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  resultSubtitle: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  grid: {
    width: "86%",
    maxWidth: "1100px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "22px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
    transition: "transform 0.2s ease",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  badge: {
    padding: "7px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  safe: {
    background: "#dff7e8",
    color: "#18733b",
  },

  likely: {
    background: "#e1f3ff",
    color: "#12618a",
  },

  moderate: {
    background: "#fff3cd",
    color: "#856404",
  },

  reach: {
    background: "#ffe5cc",
    color: "#a04d00",
  },

  unlikely: {
    background: "#f8d7da",
    color: "#842029",
  },

  match: {
    fontWeight: "bold",
    color: "#0A192F",
  },

  collegeName: {
    fontSize: "20px",
    lineHeight: "1.35",
    margin: "0 0 6px",
    color: "#0A192F",
  },

  location: {
    color: "#666",
    margin: 0,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "20px",
  },

  infoGridItem: {
    background: "#f5f7fb",
    padding: "12px",
    borderRadius: "10px",
  },

  details: {
    marginTop: "18px",
    borderTop: "1px solid #eee",
    paddingTop: "12px",
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "20px",
  },

  actionButton: {
    padding: "11px",
    borderRadius: "9px",
    border: "1px solid #dbe3ee",
    background: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeButton: {
    background: "#0A192F",
    color: "white",
    borderColor: "#0A192F",
  },

  detailsButton: {
    gridColumn: "1 / -1",
    background: "#0A192F",
    color: "white",
    borderColor: "#0A192F",
  },

  empty: {
    width: "80%",
    maxWidth: "700px",
    margin: "40px auto",
    background: "white",
    padding: "50px",
    textAlign: "center",
    borderRadius: "18px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  button: {
    marginTop: "15px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#0A192F",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryButton: {
    background: "#e2e8f0",
    color: "#334155",
    marginLeft: "10px",
  },

  compareBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#0A192F",
    color: "white",
    padding: "15px 7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    zIndex: 10,
  },

  compareButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default CollegeResults;