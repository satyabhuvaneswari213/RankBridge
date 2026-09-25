import { useEffect, useState } from "react";

const API = "'${import.meta.env.VITE_API_URL/api'";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("colleges");

  const [colleges, setColleges] = useState([]);
  const [cutoffs, setCutoffs] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("rankbridge_token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const [collegeResponse, cutoffResponse] =
        await Promise.all([
          fetch(`${API}/admin/colleges`, {
            headers,
          }),

          fetch(`${API}/admin/cutoffs`, {
            headers,
          }),
        ]);

      const collegeData = await collegeResponse.json();
      const cutoffData = await cutoffResponse.json();

      if (collegeData.success) {
        setColleges(collegeData.colleges);
      }

      if (cutoffData.success) {
        setCutoffs(cutoffData.cutoffs);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadData();
  }, []);

  const deleteCollege = async (id) => {
    const confirmed = window.confirm(
      "Delete this college and all related cutoffs?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/admin/colleges/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("College deleted successfully.");
        loadData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete college.");
    }
  };

  const deleteCutoff = async (id) => {
    const confirmed = window.confirm(
      "Delete this cutoff?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/admin/cutoffs/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Cutoff deleted successfully.");
        loadData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete cutoff.");
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}

      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>
            Rank<span>Bridge</span>
          </h1>

          <p style={styles.subtitle}>
            Administration Dashboard
          </p>
        </div>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem(
              "rankbridge_token"
            );

            localStorage.removeItem(
              "rankbridge_user"
            );

            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>


      {/* STATS */}

      <section style={styles.stats}>

        <div style={styles.statCard}>
          <h2>{colleges.length}</h2>
          <p>Total Colleges</p>
        </div>

        <div style={styles.statCard}>
          <h2>{cutoffs.length}</h2>
          <p>Total Cutoffs</p>
        </div>

        <div style={styles.statCard}>
          <h2>4</h2>
          <p>CET Exams</p>
        </div>

      </section>


      {/* TABS */}

      <div style={styles.tabs}>

        <button
          onClick={() => setActiveTab("colleges")}
          style={{
            ...styles.tab,
            ...(activeTab === "colleges"
              ? styles.activeTab
              : {}),
          }}
        >
          Colleges
        </button>

        <button
          onClick={() => setActiveTab("cutoffs")}
          style={{
            ...styles.tab,
            ...(activeTab === "cutoffs"
              ? styles.activeTab
              : {}),
          }}
        >
          Cutoffs
        </button>

      </div>


      {/* CONTENT */}

      {activeTab === "colleges" && (
        <section style={styles.section}>

          <div style={styles.sectionHeader}>
            <h2>College Management</h2>

            <button
              style={styles.primaryButton}
              onClick={() =>
                alert(
                  "College add form will be added next."
                )
              }
            >
              + Add College
            </button>
          </div>

          <div style={styles.tableContainer}>

            <table style={styles.table}>

              <thead>
                <tr>
                  <th>Code</th>
                  <th>College</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>University</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {colleges.map((college) => (
                  <tr key={college._id}>

                    <td>
                      {college.collegeCode}
                    </td>

                    <td>
                      <strong>
                        {college.name}
                      </strong>
                    </td>

                    <td>
                      {college.location}
                    </td>

                    <td>
                      {college.type}
                    </td>

                    <td>
                      {college.university}
                    </td>

                    <td>
                      ⭐ {college.rating}
                    </td>

                    <td>

                      <button
                        style={styles.deleteButton}
                        onClick={() =>
                          deleteCollege(
                            college._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>
      )}


      {activeTab === "cutoffs" && (
        <section style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2>Cutoff Management</h2>

            <button
              style={styles.primaryButton}
              onClick={() =>
                alert(
                  "Cutoff add form will be added next."
                )
              }
            >
              + Add Cutoff
            </button>

          </div>

          <div style={styles.tableContainer}>

            <table style={styles.table}>

              <thead>
                <tr>
                  <th>Exam</th>
                  <th>College</th>
                  <th>Year</th>
                  <th>Branch</th>
                  <th>Category</th>
                  <th>Opening</th>
                  <th>Closing</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {cutoffs.map((cutoff) => (
                  <tr key={cutoff._id}>

                    <td>
                      <strong>
                        {cutoff.exam}
                      </strong>
                    </td>

                    <td>
                      {cutoff.college?.name}
                    </td>

                    <td>
                      {cutoff.year}
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

                    <td>
                      {cutoff.closingRank}
                    </td>

                    <td>

                      <button
                        style={styles.deleteButton}
                        onClick={() =>
                          deleteCutoff(
                            cutoff._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>
      )}

    </div>
  );
}


const styles = {

  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    paddingBottom: "50px",
  },

  header: {
    background: "#0f172a",
    color: "white",
    padding: "25px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    fontSize: "30px",
  },

  subtitle: {
    margin: "5px 0 0",
    opacity: 0.7,
  },

  logoSpan: {},

  logout: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "30px 50px",
  },

  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  tabs: {
    display: "flex",
    gap: "10px",
    padding: "0 50px",
  },

  tab: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#e2e8f0",
  },

  activeTab: {
    background: "#2563eb",
    color: "white",
  },

  section: {
    margin: "25px 50px",
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  primaryButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  tableContainer: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

};

export default AdminDashboard;