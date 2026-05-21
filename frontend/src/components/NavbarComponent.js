import { Link, useNavigate } from 'react-router-dom';

import '../styles/navbar.css';

function NavbarComponent() {

  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  const logout = () => {

    localStorage.clear();

    navigate('/login');
  };

  return (

    <nav className="custom-navbar">

      <div className="navbar-left">

        <Link
          className="navbar-logo"
          to="/dashboard"
        >
          SmartProjectMS
        </Link>

      </div>

      <div className="navbar-center">

        <Link
          className="navbar-link"
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="navbar-link"
          to="/tasks"
        >
          Tasks
        </Link>

        {(role === 'MANAGER'
        || role === 'ADMIN') && (

          <Link
            className="navbar-link"
            to="/projects"
          >
            Projects
          </Link>

        )}

      </div>

      <div className="navbar-right">

        <span className="navbar-role">

          {role}

        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default NavbarComponent;