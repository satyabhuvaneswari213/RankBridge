import { useState } from "react";

const API_URL = "${import.meta.env.VITE_API_URL}";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/signup`,
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
          data.message || "Signup failed."
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

      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

    } catch (err) {
      setError(
        err.message ||
          "Unable to create account."
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
            START YOUR JOURNEY
          </div>

          <h1>
            Discover.
            <br />
            Compare.
            <br />
            <span>Choose Better.</span>
          </h1>

          <p>
            Create your RankBridge account and
            keep your college research organized
            in one place.
          </p>

          <div className="auth-brand-points">

            <div>
              <span>✓</span>
              Save your shortlisted colleges
            </div>

            <div>
              <span>✓</span>
              Compare college options
            </div>

            <div>
              <span>✓</span>
              Access your dashboard anytime
            </div>

          </div>

        </div>

        <div className="auth-brand-footer">
          Your Rank. Your Options. Your Future.
        </div>

      </section>


      {/* Signup section */}

      <section className="auth-form-section">

        <div className="auth-mobile-logo">
          🎓 Rank<span>Bridge</span>
        </div>

        <div className="auth-card">

          <div className="auth-heading">

            <div className="auth-icon">
              +
            </div>

            <h2>
              Create your account
            </h2>

            <p>
              Start organizing your college search
              with RankBridge.
            </p>

          </div>


          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}


          {success && (
            <div className="auth-success">
              <span>✓</span>
              {success}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="auth-field">

              <label htmlFor="signup-name">
                Full Name
              </label>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  A
                </span>

                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>

            </div>


            {/* Email */}

            <div className="auth-field">

              <label htmlFor="signup-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="signup-email"
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

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  *
                </span>

                <input
                  id="signup-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

              <small className="password-help">
                Use at least 6 characters.
              </small>

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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          {/* Login */}

          <div className="auth-switch">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/login";
              }}
            >
              Login
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

export default Signup;