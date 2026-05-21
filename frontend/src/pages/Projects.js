import { useEffect, useState } from 'react';

import API from '../services/api';

import NavbarComponent from '../components/NavbarComponent';

import '../styles/projects.css';

function Projects() {

  const role = localStorage.getItem('role');

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    managerId: ''
  });

  const fetchProjects = async () => {

    try {

      const response = await API.get('/projects');

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createProject = async (e) => {

    e.preventDefault();

    try {

      await API.post('/projects', formData);

      alert('Project created successfully');

      setFormData({
        title: '',
        description: '',
        managerId: ''
      });

      fetchProjects();

    } catch (error) {

      alert(error.response?.data || 'Failed');
    }
  };

  const deleteProject = async (id) => {

    try {

      await API.delete(`/projects/${id}`);

      alert('Project deleted');

      fetchProjects();

    } catch (error) {

      alert(error.response?.data || 'Delete failed');
    }
  };

  return (

    <div className="projects-page">

      <NavbarComponent />

      <div className="container py-5">

        {/* HEADER */}

        <div className="projects-header">

          <h1>Project Management</h1>

          <p>

            Manage projects and assign managers
            efficiently.

          </p>

        </div>

        {/* CREATE PROJECT */}

        {(role === 'MANAGER'
        || role === 'ADMIN') && (

          <div className="project-form-card">

            <h3>Create New Project</h3>

            <form onSubmit={createProject}>

              <div className="mb-3">

                <label>Project Title</label>

                <input
                  type="text"
                  name="title"
                  className="project-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Description</label>

                <textarea
                  name="description"
                  className="project-input textarea"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label>Manager ID</label>

                <input
                  type="text"
                  name="managerId"
                  className="project-input"
                  value={formData.managerId || ''}
                  onChange={handleChange}
                  required
                />

              </div>

              <button className="create-project-btn">

                Create Project

              </button>

            </form>

          </div>

        )}

        {/* PROJECT TABLE */}

        <div className="projects-table-card">

          <table className="projects-table">

            <thead>

              <tr>

                <th>ID</th>
                <th>Project Title</th>
                <th>Description</th>
                <th>Manager</th>

                {role === 'ADMIN' && (
                  <th>Delete</th>
                )}

              </tr>

            </thead>

            <tbody>

              {projects.map((project) => (

                <tr key={project.id}>

                  <td>{project.id}</td>

                  <td>{project.title}</td>

                  <td>{project.description}</td>

                  <td>

                    <span className="manager-badge">

                      {project.manager?.name}

                    </span>

                  </td>

                  {role === 'ADMIN' && (

                    <td>

                      <button
                        className="delete-project-btn"
                        onClick={() =>
                          deleteProject(project.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Projects;