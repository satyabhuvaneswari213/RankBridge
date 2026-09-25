import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowRight,
  Search,
  Target,
  Building2,
  BarChart3,
  Trophy,
  CheckCircle2
} from "lucide-react";

function Home() {

  return (
    <div className="app">

      <Navbar />

      {/* HERO */}

      <section className="hero" id="home">

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <Target size={16} />
              Smart College Discovery
            </div>

            <h1>
              Your Rank.
              <br />
              <span>Your Options.</span>
              <br />
              Your Future.
            </h1>

            <p>
              Discover colleges that match your CET rank,
              preferred branch and location — all in one place.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => {
                  window.location.href = "/predictor";
                }}
              >
                Check My Rank
                <ArrowRight size={18} />
              </button>

              <button
                className="secondary-btn"
                onClick={() => {
                  document.querySelector(".cet-section")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Explore Colleges
              </button>
            </div>


            <div className="hero-trust">

              <div>
                <CheckCircle2 size={16} />
                Rank-based results
              </div>

              <div>
                <CheckCircle2 size={16} />
                Multiple CET exams
              </div>

              <div>
                <CheckCircle2 size={16} />
                College comparison
              </div>

            </div>

          </div>


          {/* RIGHT SIDE CARD */}

          <div className="hero-visual">

            <div className="prediction-card">

              <div className="prediction-header">

                <div>
                  <p>YOUR PROFILE</p>
                  <h3>College Matches</h3>
                </div>

                <div className="target-icon">
                  <Target size={22} />
                </div>

              </div>


              <div className="rank-box">

                <div>
                  <span>Your Rank</span>
                  <strong>2,540</strong>
                </div>

                <div>
                  <span>Exam</span>
                  <strong>ECET</strong>
                </div>

              </div>


              <p className="match-title">
                Recommended for you
              </p>


              <div className="college-card">

                <div className="college-icon">
                  <Building2 size={20} />
                </div>

                <div>
                  <h4>Engineering College</h4>
                  <p>Andhra Pradesh</p>
                </div>

                <span className="good">
                  Good
                </span>

              </div>


              <div className="college-card">

                <div className="college-icon">
                  <Building2 size={20} />
                </div>

                <div>
                  <h4>Technology Institute</h4>
                  <p>Andhra Pradesh</p>
                </div>

                <span className="fair">
                  Fair
                </span>

              </div>


              <button
                className="view-results"
                onClick={() => {
                  window.location.href = "/predictor";
                }}
              >
                View all matches
                <ArrowRight size={15} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* CET EXAMS */}

      <section className="cet-section">

        <div className="section-heading">

          <span>FIND YOUR PATH</span>

          <h2>
            One platform.
            <br />
            <strong>Multiple entrance exams.</strong>
          </h2>

          <p>
            Select your entrance exam and discover
            colleges based on your rank.
          </p>

        </div>


        <div className="cet-grid">

          <div className="cet-card"
            onClick={() => {
              window.location.href = "/predictor?exam=EAMCET";
            }}>
            <b>E</b>
            <div>
              <h3>EAMCET</h3>
              <p>Engineering admissions</p>
            </div>
            <ArrowRight size={18} />
          </div>


          <div className="cet-card"
            onClick={() => {
              window.location.href = "/predictor?exam=ECET";
            }}>
            <b>EC</b>
            <div>
              <h3>ECET</h3>
              <p>Diploma admissions</p>
            </div>
            <ArrowRight size={18} />
          </div>


          <div className="cet-card"
            onClick={() => {
              window.location.href = "/predictor?exam=PGECET";
            }} >
            <b>P</b>
            <div>
              <h3>PGCET</h3>
              <p>Postgraduate admissions</p>
            </div>
            <ArrowRight size={18} />
          </div>


          <div className="cet-card" onClick={() => {
            window.location.href = "/predictor?exam=POLYCET";
          }}>
            <b>PC</b>
            <div>
              <h3>POLYCET</h3>
              <p>Diploma admissions</p>
            </div>
            <ArrowRight size={18} />
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="how-section" id="how-it-works">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            From rank to
            <strong> right college.</strong>
          </h2>

          <p>
            RankBridge simplifies your college search
            into four simple steps.
          </p>

        </div>


        <div className="steps-container">

          <div className="step">
            <div className="step-number">01</div>
            <Search />
            <h3>Enter Your Rank</h3>
            <p>Select your CET exam and enter your rank.</p>
          </div>


          <div className="step">
            <div className="step-number">02</div>
            <Target />
            <h3>Set Preferences</h3>
            <p>Select branch, location and preferences.</p>
          </div>


          <div className="step">
            <div className="step-number">03</div>
            <BarChart3 />
            <h3>Get Matches</h3>
            <p>See colleges matched to your profile.</p>
          </div>


          <div className="step">
            <div className="step-number">04</div>
            <Trophy />
            <h3>Compare & Choose</h3>
            <p>Compare colleges and create your shortlist.</p>
          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section" id="features">

        <div className="features-container">

          <div>

            <span>WHY RANKBRIDGE?</span>

            <h2>
              Make your college
              <strong> decision smarter.</strong>
            </h2>

            <p>
              Stop searching through hundreds of websites.
              RankBridge brings important college information
              together in one place.
            </p>

            <div className="feature-list">

              <div>
                <CheckCircle2 />
                Reliable cutoff-based matching
              </div>

              <div>
                <CheckCircle2 />
                Previous cutoff insights
              </div>

              <div>
                <CheckCircle2 />
                Detailed college information
              </div>

              <div>
                <CheckCircle2 />
                Compare and shortlist colleges
              </div>

            </div>

            <button
              className="primary-btn"
              onClick={() => {
                window.location.href = "/predictor";
              }}
            >
              Explore RankBridge
              <ArrowRight size={18} />
            </button>
          </div>


          <div className="dashboard-card">

            <p>YOUR MATCH SCORE</p>

            <h3>87%</h3>

            <div className="match-bar">
              <div></div>
            </div>

            <p>College Match Overview</p>

            <div className="stat">
              <span>Good Chance</span>
              <strong>72%</strong>
            </div>

            <div className="stat">
              <span>Fair Chance</span>
              <strong>54%</strong>
            </div>

            <div className="stat">
              <span>Low Chance</span>
              <strong>31%</strong>
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="cta-section" id="about">

        <div className="cta-box">

          <div className="emoji">
            🎓
          </div>

          <h2>
            Your rank is just
            <br />
            the beginning.
          </h2>

          <p>
            Let RankBridge help you discover where
            your rank can take you.
          </p>

          <button
            className="primary-btn"
            onClick={() => {
              window.location.href = "/predictor";
            }}
          >
            Start Exploring
            <ArrowRight size={18} />
          </button>
        </div>

      </section>


      <Footer />

    </div>
  );
}

export default Home;