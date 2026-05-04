import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tracker from "./components/tasks/Tracker";
import ProtectedRoute from "./Utills/ProtectedRoute";
import { useState, useEffect } from "react";
import AddTask from "./components/tasks/AddTask";
import EditTask from "./components/tasks/EditTask";
import CompletedTasks from "./components/tasks/CompletedTasks";
import PendingTasks from "./components/tasks/PendingTasks";
import AllTasks from "./components/tasks/AllTasks";
import ProtectedLayout from "./Utills/ProtectedLayout";

import { useIdleLogout } from "./components/logout/useIdleLogout";
import SessionExpiredModal from "./components/logout/SessionExpiredModal";

import { Toaster } from "react-hot-toast";

function App() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  // ✅ sync with HTML root
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
 const { expired, setExpired } = useIdleLogout();
  return (
    <>
<Toaster position="top-right" 
 toastOptions={{
    style: {
      zIndex: 9999,
    },}}
    reverseOrder={false} />
      <SessionExpiredModal open={expired} setOpen={setExpired} />
      <Routes>
        <Route path="/" element={<Login />} />
<Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout dark={dark} setDark={setDark}>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        <Route
          path="/tracker"
          element={
            <ProtectedLayout dark={dark} setDark={setDark}>
              <Tracker />
            </ProtectedLayout>
          }
        />

        <Route
          path="/tracker/all"
          element={
            <ProtectedLayout dark={dark} setDark={setDark}>
              <AllTasks />
            </ProtectedLayout>
          }
        />
        <Route
          path="/tracker/add"
          element={
            <ProtectedLayout dark={dark} setDark={setDark} >
              <AddTask />
            </ProtectedLayout>
          }
        />
        <Route
          path="/tracker/pending"
          element={
            <ProtectedLayout dark={dark} setDark={setDark}>
              <PendingTasks />
            </ProtectedLayout>
          }
        />

        <Route
          path="/tracker/completed"
          element={
            <ProtectedLayout dark={dark} setDark={setDark}>
              <CompletedTasks />
            </ProtectedLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
