import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import API from '../services/api';

import '../styles/auth.css';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        '/auth/login',
        formData
      );

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'role',
        response.data.role
      );

      alert('Login successful');

      navigate('/dashboard');

    } catch (error) {

      alert(
        error.response?.data ||
        'Login failed'
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

  <div className="auth-form-group">

    <label className="auth-label">
      Email
    </label>

    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      className="auth-input"
      value={formData.email}
      onChange={handleChange}
      required
    />

  </div>

  <div className="auth-form-group">

    <label className="auth-label">
      Password
    </label>

    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      className="auth-input"
      value={formData.password}
      onChange={handleChange}
      required
    />

  </div>

  <button className="auth-btn">

    Login

  </button>

</form>

        <div className="auth-link">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;