# Smart Project Management System

A full-stack Project Management System built using Spring Boot, React.js, and PostgreSQL with JWT Authentication and Role-Based Access Control (RBAC).

---

# Features

## Authentication & Security
- User Registration & Login
- JWT Authentication
- Password Hashing using BCrypt
- Role-Based Access Control (ADMIN, MANAGER, USER)

---

## Project Management
- Create Projects
- View Projects
- Delete Projects (ADMIN only)
- Assign Managers to Projects

---

## Task Management
- Create Tasks
- View Tasks
- Update Task Status
- Delete Tasks (ADMIN only)
- Assign Tasks to Users

---

## Frontend Features
- Modern Responsive UI
- Protected Routes
- Role-Based UI Visibility
- Dashboard Interface
- Error Handling

---

# Tech Stack

## Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Hibernate / JPA
- PostgreSQL
- Maven

## Frontend
- React.js
- Axios
- React Router
- CSS

---

# Roles & Permissions

| Feature | USER | MANAGER | ADMIN |
|---|---|---|---|
| View Projects | ✅ | ✅ | ✅ |
| Create Projects | ❌ | ✅ | ✅ |
| Delete Projects | ❌ | ❌ | ✅ |
| View Tasks | ✅ | ✅ | ✅ |
| Create Tasks | ❌ | ✅ | ✅ |
| Update Task Status | ✅ | ✅ | ✅ |
| Delete Tasks | ❌ | ❌ | ✅ |

---

# Project Structure

```text
smart-project-management-system/
│
├── frontend/
│
├── smartprojectms/
│
└── README.md
