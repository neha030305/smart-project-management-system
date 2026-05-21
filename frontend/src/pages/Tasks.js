import { useEffect, useState } from 'react';

import API from '../services/api';

import NavbarComponent from '../components/NavbarComponent';

import '../styles/tasks.css';

function Tasks() {

  const role = localStorage.getItem('role');

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    assignedUserId: '',
    projectId: ''
  });

  const fetchTasks = async () => {

    try {

      const response = await API.get('/tasks');

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post('/tasks', formData);

      alert('Task created successfully');

      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        assignedUserId: '',
        projectId: ''
      });

      fetchTasks();

    } catch (error) {

      alert(error.response?.data || 'Failed');
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/tasks/${id}/status?status=${status}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      alert('Task deleted');

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="tasks-page">

      <NavbarComponent />

      <div className="container py-5">

        <div className="tasks-header">

          <h1>Task Management</h1>

          <p>
            Track, manage and update project tasks.
          </p>

        </div>

        {/* CREATE TASK */}

        {(role === 'MANAGER'
        || role === 'ADMIN') && (

          <div className="task-form-card">

            <h3>Create New Task</h3>

            <form onSubmit={createTask}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Task Title</label>

                  <input
                    type="text"
                    name="title"
                    className="task-input"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Assigned User ID</label>

                  <input
                    type="text"
                    name="assignedUserId"
                    className="task-input"
                    value={formData.assignedUserId || ''}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="mb-3">

                <label>Description</label>

                <textarea
                  name="description"
                  className="task-input textarea"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <div className="row">

                <div className="col-md-4 mb-3">

                  <label>Status</label>

                  <select
                    name="status"
                    className="task-input"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">
                      IN PROGRESS
                    </option>
                    <option value="COMPLETED">
                      COMPLETED
                    </option>
                  </select>

                </div>

                <div className="col-md-4 mb-3">

                  <label>Priority</label>

                  <select
                    name="priority"
                    className="task-input"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>

                </div>

                <div className="col-md-4 mb-3">

                  <label>Project ID</label>

                  <input
                    type="text"
                    name="projectId"
                    className="task-input"
                    value={formData.projectId || ''}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <button className="create-task-btn">

                Create Task

              </button>

            </form>

          </div>

        )}

        {/* TASK TABLE */}

        <div className="tasks-table-card">

          <table className="tasks-table">

            <thead>

              <tr>

                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned User</th>
                <th>Project</th>
                <th>Update Status</th>

                {role === 'ADMIN' && (
                  <th>Delete</th>
                )}

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task.id}>

                  <td>{task.id}</td>

                  <td>{task.title}</td>

                  <td>

                    <span className={`status-badge ${task.status}`}>

                      {task.status}

                    </span>

                  </td>

                  <td>

                    <span className={`priority-badge ${task.priority}`}>

                      {task.priority}

                    </span>

                  </td>

                  <td>
                    {task.assignedUser?.name}
                  </td>

                  <td>
                    {task.project?.title}
                  </td>

                  <td>

                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(
                          task.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="TODO">TODO</option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="COMPLETED">
                        COMPLETED
                      </option>

                    </select>

                  </td>

                  {role === 'ADMIN' && (

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTask(task.id)
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

export default Tasks;