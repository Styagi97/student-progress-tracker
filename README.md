![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-green?logo=springboot)
![Database](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Auth](https://img.shields.io/badge/Auth-JWT-red)

# 🚀 Student Progress Tracker

> A full-stack productivity & task management system with smart analytics, streak tracking, and backend-driven suggestions.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Secure session handling

### 📝 Task Management
- Create, update, delete tasks
- Track completed & pending tasks
- Due date support

### 📊 Smart Dashboard
- Daily completion rate
- Visual progress bar
- Task analytics

### 🔥 Streak System
- Tracks consecutive productive days
- Encourages consistency

### 🧠 Smart Suggestion Engine (Backend)
- Suggests next action based on:
  - Overdue tasks
  - Today’s tasks
  - Completion rate

### ⏰ Automation
- Weekly report scheduler (Spring Boot)
- Logs productivity insights

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Context API

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- JPA / Hibernate

---

### 📡 API Endpoints

### 🔐 Authentication APIs

➤ Register
POST /api/auth/register
➤ Login
POST /api/auth/login
➤ Logout
POST /api/auth/logout


### 📋 Task APIs
➤ Get All Tasks
GET /api/tasks/{userId}
➤ Create Task
POST /api/tasks
➤ Update Task
PUT /api/tasks/{id}
➤ Delete Task
DELETE /api/tasks/{id}


### 📊 Analytics APIs
➤ Today Tasks
GET /api/tasks/today/{userId}
➤ Pending Tasks
GET /api/tasks/pending/{userId}
➤ Overdue Tasks
GET /api/tasks/overdue/{userId}
➤ Completion Rate
GET /api/tasks/completion-rate/{userId}
➤ Smart Suggestion
GET /api/tasks/suggestion/{userId}

## 📁 Project Structure

```
student-progress-tracker/
│
├── student-progress-tracker-backend/
│   └── Spring Boot API
│
├── student-progress-tracker-frontend/
│   └── React App
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/Styagi97/student-progress-tracker
cd student-progress-tracker
```

---

## 🔧 Backend Setup

```
cd student-progress-tracker-backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## 💻 Frontend Setup

```
cd student-progress-tracker-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🌍 Environment Variables

Create a `.env` file inside **student-progress-tracker-frontend/**

```
VITE_API_URL=http://localhost:8080/api
```

---

## 📊 Smart Features

* 🧠 Backend-driven suggestion system
* 📅 Daily & Weekly analytics
* 🔥 Automatic streak calculation
* ⚠ Overdue detection based on due dates

---

## 🚀 Future Improvements

* 🔔 Task Reminder Notifications
* 📧 Email Weekly Reports
* 🌐 Deployment (Vercel + Render)
* 📱 Mobile Responsive UI Enhancements

---

## 👩‍💻 Author

**Shivani Tyagi**
 
