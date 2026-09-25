import { useEffect, useState } from "react";

const API_URL = "${import.meta.env.VITE_API_URL}";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("rankbridge_token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile."
          );
        }

        return data;
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error(error);

        // Remove invalid authentication
        localStorage.removeItem("rankbridge_token");
        localStorage.removeItem("rankbridge_user");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("rankbridge_token");
    localStorage.removeItem("rankbridge_user");

    window.location.href = "/";
  };

  const goToPredictor = () => {
    window.location.href = "/predictor";
  };

  const goToCollege = (collegeId) => {
    window.location.href = `/college/${collegeId}`;
  };

  const goToCompare = () => {
    const colleges = user?.shortlistedColleges || [];

    if (colleges.length < 2) {
      alert(
        "Shortlist at least 2 colleges to compare them."
      );
      return;
    }

    const compareData = colleges
      .slice(0, 3)
      .map((college) => ({
        college: college,
      }));

    localStorage.setItem(
      "rankbridge_compare",
      JSON.stringify(compareData)
    );

    window.location.href = "/compare";
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="dashboard-loading">

        <div className="dashboard-spinner"></div>

        <h2>Loading your dashboard...</h2>

        <p>
          Getting your RankBridge profile ready.
        </p>

      </div>
    );
  }

  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!user) {
    return (
      <div className="dashboard-login-page">

        <div className="dashboard-login-card">

          <div className="dashboard-login-icon">
            🔐
          </div>

          <h2>Login Required</h2>

          <p>
            Please login to access your RankBridge
            dashboard and shortlisted colleges.
          </p>

          <button
            className="dashboard-primary-button"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Go to Login →
          </button>

          <button
            className="dashboard-secondary-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Home
          </button>

        </div>

      </div>
    );
  }

  const shortlisted =
    user.shortlistedColleges || [];

  const firstName =
    user.name?.split(" ")[0] || "Student";

  return (
    <div className="dashboard-page">

      {/* =================================
          NAVBAR
      ================================= */}

      <header className="dashboard-navbar">

        <a
          href="/"
          className="dashboard-logo"
        >
          🎓 Rank<span>Bridge</span>
        </a>

        <div className="dashboard-nav-actions">

          <button
            onClick={goToPredictor}
            className="dashboard-nav-button"
          >
            Find Colleges
          </button>

          <button
            onClick={handleLogout}
            className="dashboard-logout"
          >
            Logout
          </button>

        </div>

      </header>


      {/* =================================
          MAIN
      ================================= */}

      <main className="dashboard-main">

        {/* Welcome */}

        <section className="dashboard-welcome">

          <div>

            <span className="dashboard-badge">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back, {firstName}! 👋
            </h1>

            <p>
              Keep track of your college options,
              compare choices and find colleges
              that match your rank.
            </p>

          </div>

          <div className="dashboard-user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

        </section>


        {/* =================================
            STATISTICS
        ================================= */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ❤️
            </div>

            <div>
              <span>
                Shortlisted
              </span>

              <strong>
                {shortlisted.length}
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              🏫
            </div>

            <div>
              <span>
                Saved Options
              </span>

              <strong>
                {shortlisted.length}
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ⚖️
            </div>

            <div>
              <span>
                Compare Slots
              </span>

              <strong>
                {Math.min(
                  shortlisted.length,
                  3
                )}
                /3
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              🎯
            </div>

            <div>
              <span>
                Profile
              </span>

              <strong>
                Active
              </strong>
            </div>

          </div>

        </section>


        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>
                Quick Actions
              </h2>

              <p>
                Continue your college search.
              </p>
            </div>

          </div>


          <div className="dashboard-actions-grid">

            <button
              className="dashboard-action-card"
              onClick={goToPredictor}
            >

              <div className="action-icon blue">
                🎯
              </div>

              <div>
                <h3>
                  Find My Colleges
                </h3>

                <p>
                  Enter your rank and discover
                  suitable colleges.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            <button
              className="dashboard-action-card"
              onClick={goToCompare}
            >

              <div className="action-icon purple">
                ⚖️
              </div>

              <div>
                <h3>
                  Compare Colleges
                </h3>

                <p>
                  Compare your shortlisted options
                  side by side.
                </p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* =================================
            SHORTLISTED COLLEGES
        ================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>
                Your Shortlisted Colleges
              </h2>

              <p>
                Colleges you've saved for later.
              </p>
            </div>

            {shortlisted.length > 0 && (
              <span className="dashboard-count">
                {shortlisted.length} saved
              </span>
            )}

          </div>


          {shortlisted.length === 0 ? (

            /* Empty state */

            <div className="dashboard-empty">

              <div className="empty-college-icon">
                🏫
              </div>

              <h3>
                No colleges shortlisted yet
              </h3>

              <p>
                Start exploring colleges and save
                the ones you'd like to consider.
              </p>

              <button
                className="dashboard-primary-button"
                onClick={goToPredictor}
              >
                Find Colleges →
              </button>

            </div>

          ) : (

            /* College cards */

            <div className="shortlisted-grid">

              {shortlisted.map((college) => (

                <div
                  key={college._id}
                  className="shortlisted-card"
                >

                  <div className="shortlisted-card-top">

                    <div className="college-avatar">
                      {college.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <span className="saved-badge">
                      ♥ Saved
                    </span>

                  </div>


                  <h3>
                    {college.name}
                  </h3>

                  <p className="college-location">
                    📍 {college.location}
                  </p>


                  <div className="college-mini-info">

                    <div>
                      <span>
                        Type
                      </span>

                      <strong>
                        {college.type ||
                          "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        University
                      </span>

                      <strong>
                        {college.university ||
                          "N/A"}
                      </strong>
                    </div>

                  </div>


                  <button
                    className="view-college-button"
                    onClick={() =>
                      goToCollege(
                        college._id
                      )
                    }
                  >
                    View College
                    <span>→</span>
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =================================
            PROFILE
        ================================= */}

        <section className="dashboard-profile">

          <div className="profile-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">

            <span>
              YOUR ACCOUNT
            </span>

            <h3>
              {user.name}
            </h3>

            <p>
              {user.email}
            </p>

          </div>

          <div className="profile-status">
            <span></span>
            Account Active
          </div>

        </section>


      </main>

    </div>
  );
}

export default Dashboard;