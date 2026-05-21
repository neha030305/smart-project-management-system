import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';

function App() {

  const isAuthenticated = localStorage.getItem('token');

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
{/* 
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        /> */}
        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

        <Route
          path="/tasks"
          element={
            isAuthenticated
              ? <Tasks />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/projects"
          element={
            isAuthenticated
              ? <Projects />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;