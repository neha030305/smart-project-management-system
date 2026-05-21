import NavbarComponent from '../components/NavbarComponent';
import '../styles/dashboard.css';
function Dashboard() {

  const role = localStorage.getItem('role');

  return (

    <div className="dashboard-container">

      <NavbarComponent />

      <div className="container py-5">

        {/* HERO SECTION */}

        <div className="dashboard-hero">

          <div>

            <h1 className="dashboard-title">
              Welcome to Smart Project MS
            </h1>

            <p className="dashboard-subtitle">

              Manage projects, tasks and teams
              efficiently with secure role-based access.

            </p>

            <span className="role-badge">

              {role}

            </span>

          </div>

        </div>

        {/* FEATURE CARDS */}

        <div className="row mt-5">

          <div className="col-md-4 mb-4">

            <div className="feature-card">

              <h3>Projects</h3>

              <p>

                Create and manage multiple
                projects with assigned managers.

              </p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="feature-card">

              <h3>Tasks</h3>

              <p>

                Assign tasks, track progress,
                and update task status.

              </p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="feature-card">

              <h3>Security</h3>

              <p>

                JWT Authentication with
                Role-Based Access Control.

              </p>

            </div>

          </div>

        </div>

        {/* QUICK STATS */}

        <div className="row mt-3">

          <div className="col-md-4 mb-4">

            <div className="stats-card">

              <h2>10+</h2>

              <p>Projects Managed</p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="stats-card">

              <h2>25+</h2>

              <p>Tasks Completed</p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="stats-card">

              <h2>100%</h2>

              <p>Secure APIs</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;