# 💻 Student Progress Tracker Frontend

Frontend for the **Student Progress Tracker** application built using **React + Vite** with a modern, responsive, and user-friendly interface.

---

# 🚀 Features

- 🔐 JWT Authentication UI
- 🛡 Protected Routes
- ✅ Task Management (CRUD Operations)
- 📊 Dashboard Analytics
- 🔥 Productivity Streak Tracking
- 🔔 Toast Notifications
- 📱 Fully Responsive Design
- 🧾 Form Validation using Formik & Yup

---

# 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Context API
- Formik
- Yup
- React Hot Toast

---

# 📦 Packages Used

## Install Main Dependencies

```bash
npm install react-router-dom axios react-hot-toast formik yup
```

## Install Tailwind CSS Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

# 📁 Folder Structure

```bash
src/
│
├── components/     # Reusable UI components
├── pages/          # Application pages
├── context/        # Global state management
├── services/       # API service functions
├── routes/         # Protected & Public routes
├── layouts/        # Layout components
├── utils/          # Utility/helper functions
└── App.jsx
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

---

# ⚙️ Frontend Setup

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Start Development Server

```bash
npm run dev
```

---

# ✅ Form Validations

The application uses **Formik** and **Yup** for form handling and validation.

### Included Validations

- Required field validation
- Email format validation
- Password validation
- Task description length validation
- User-friendly error messages

---

# 🔗 Frontend Running URL

```bash
http://localhost:5173
```

---

# 📌 Important Notes

- Make sure the backend server is running before starting the frontend.
- Ensure the API URL in the `.env` file matches your backend URL.
- Task description validation is implemented based on backend/database limits.

---

# 📄 License

This project is created for learning and educational purposes.