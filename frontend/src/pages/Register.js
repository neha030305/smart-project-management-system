import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import API from '../services/api';

import '../styles/auth.css';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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

      await API.post(
        '/auth/register',
        formData
      );

      alert('Registration successful');

      navigate('/login');

    } catch (error) {

      alert(
        error.response?.data ||
        'Registration failed'
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

  <div className="auth-form-group">

    <label className="auth-label">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      placeholder="Enter your full name"
      className="auth-input"
      value={formData.name}
      onChange={handleChange}
      required
    />

  </div>

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
      placeholder="Create password"
      className="form-control auth-input"
      value={formData.password}
      onChange={handleChange}
      required
    />

  </div>

  <button className="auth-btn">

    Register

  </button>

</form>

        <div className="auth-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;