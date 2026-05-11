![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-green?logo=springboot)
![Database](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Auth](https://img.shields.io/badge/Auth-JWT-red)

# 🚀 Student Progress Tracker

> A full-stack productivity and task management system with smart analytics, streak tracking, and backend-driven suggestions.

---

# ✨ Key Highlights

- 🔐 JWT-based Authentication System
- 📝 Full Task Management (CRUD Operations)
- 📊 Smart Analytics Dashboard
- 🔥 Daily Productivity Streak Tracking
- 🧠 Intelligent Suggestion Engine
- ⏰ Weekly Productivity Reports using Spring Scheduler
- 📱 Responsive User Interface

---

# 🛠 Tech Stack

## 💻 Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Context API
- Formik
- Yup
- React Router DOM
- React Hot Toast

## ⚙️ Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Lombok
- Maven

## 🗄 Database
- MySQL

---

# 📸 Screenshots

## 🔐 Login Page
![Login](./assets/login.png)

## 📝 Register Page
![Register](./assets/register.png)

## 📊 Dashboard
![Dashboard](./assets/dashboard.png)

## 📋 All Tasks
![All Tasks](./assets/all-tasks.png)

## ⏳ Pending Tasks
![Pending Tasks](./assets/pending-tasks.png)

## ✅ Completed Tasks
![Completed Tasks](./assets/completed-tasks.png)

## ➕ Add Task
![Add Task](./assets/add-task.png)

---

# ✨ Features

## 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Secure Protected Routes
- Session Management

## 📝 Task Management
- Create Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed
- Due Date Management

## 📊 Smart Dashboard
- Daily Completion Rate
- Productivity Analytics
- Progress Tracking
- Task Statistics

## 🔥 Streak System
- Tracks Consecutive Productive Days
- Encourages Daily Consistency

## 🧠 Smart Suggestion Engine
Backend-driven suggestions based on:
- Overdue Tasks
- Pending Tasks
- Today's Tasks
- Completion Rate

## ⏰ Automation
- Weekly Productivity Reports
- Scheduled Background Tasks using Spring Scheduler

---

# 📡 API Endpoints

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/logout` | Logout User |

---

## 📋 Task APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/{userId}` | Get All Tasks |
| POST | `/api/tasks` | Create Task |
| PUT | `/api/tasks/{id}` | Update Task |
| DELETE | `/api/tasks/{id}` | Delete Task |

---

## 📊 Analytics APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/today/{userId}` | Get Today's Tasks |
| GET | `/api/tasks/pending/{userId}` | Get Pending Tasks |
| GET | `/api/tasks/overdue/{userId}` | Get Overdue Tasks |
| GET | `/api/tasks/completion-rate/{userId}` | Get Completion Rate |
| GET | `/api/tasks/suggestion/{userId}` | Get Smart Suggestion |

---

# 📁 Project Structure

```bash
student-progress-tracker/
│
├── student-progress-tracker-backend/
│   └── Spring Boot Backend
│
├── student-progress-tracker-frontend/
│   └── React Frontend
│
└── README.md
```

---

# 📋 Prerequisites

Before running this project, make sure the following software is installed:

```bash
- Node.js
- npm
- Java 21+
- Maven
- MySQL
- Git
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Styagi97/student-progress-tracker.git
cd student-progress-tracker
```

---

# 🔧 Backend Setup

```bash
cd student-progress-tracker-backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

📌 Backend database setup and configuration details are available inside:

```bash
student-progress-tracker-backend/README.md
```

---

# 💻 Frontend Setup

```bash
cd student-progress-tracker-frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌍 Environment Variables

Create a `.env` file inside:

```bash
student-progress-tracker-frontend/
```

Add the following variable:

```env
VITE_API_URL=http://localhost:8080/api
```

---

# 📊 Smart Features

- 🧠 Backend-driven Suggestion System
- 📅 Daily & Weekly Productivity Analytics
- 🔥 Automatic Streak Calculation
- ⚠️ Overdue Task Detection
- 📈 Productivity Tracking Dashboard

---

# 🚀 Future Improvements

- 🔔 Task Reminder Notifications
- 📧 Email-based Weekly Reports
- 🌐 Deployment using Vercel & Render
- 📱 Enhanced Mobile Responsiveness
- 🌙 Dark Mode Support

---

# 👩‍💻 Author

**Shivani Tyagi**

---

# 📄 License

This project is created for learning and educational purposes.
