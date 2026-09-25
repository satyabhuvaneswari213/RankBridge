import { useState } from "react";

const API_URL = "${import.meta.env.VITE_API_URL}";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      localStorage.setItem(
        "rankbridge_token",
        data.token
      );

      localStorage.setItem(
        "rankbridge_user",
        JSON.stringify(data.user)
      );

      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Left branding panel */}

      <section className="auth-brand-panel">

        <a href="/" className="auth-brand-logo">
          🎓 Rank<span>Bridge</span>
        </a>

        <div className="auth-brand-content">

          <div className="auth-brand-badge">
            COLLEGE DISCOVERY PLATFORM
          </div>

          <h1>
            Your Rank.
            <br />
            Your Options.
            <br />
            <span>Your Future.</span>
          </h1>

          <p>
            Find colleges that match your entrance
            exam rank and make your college search
            easier.
          </p>

          <div className="auth-brand-points">

            <div>
              <span>✓</span>
              Rank-based college matching
            </div>

            <div>
              <span>✓</span>
              Multiple entrance exams
            </div>

            <div>
              <span>✓</span>
              Save and compare colleges
            </div>

          </div>

        </div>

        <div className="auth-brand-footer">
          Your Rank. Your Options. Your Future.
        </div>

      </section>


      {/* Login section */}

      <section className="auth-form-section">

        <div className="auth-mobile-logo">
          🎓 Rank<span>Bridge</span>
        </div>

        <div className="auth-card">

          <div className="auth-heading">

            <div className="auth-icon">
              →
            </div>

            <h2>
              Welcome back
            </h2>

            <p>
              Login to access your RankBridge dashboard.
            </p>

          </div>


          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div className="auth-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

            </div>


            {/* Password */}

            <div className="auth-field">

              <div className="password-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

              </div>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  *
                </span>

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span>→</span>
                </>
              )}
            </button>

          </form>


          {/* Signup */}

          <div className="auth-switch">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/signup";
              }}
            >
              Create Account
            </button>

          </div>


          {/* Home */}

          <button
            type="button"
            className="auth-home-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Home
          </button>

        </div>

      </section>

    </div>
  );
}

export default Login;