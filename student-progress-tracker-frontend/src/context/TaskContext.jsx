// Global state management for user + tasks
// Manages authentication (login/logout) and task CRUD operations

import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // =========================
  // 🧠 SMART SUGGESTION ENGINE
  // =========================
  useEffect(() => {
    if (!user?.id) return;

    API.get(`/tasks/suggestion/${user.id}`)
      .then((data) => setSuggestion(data.data))
      .catch((err) => console.error("Suggestion error", err));
  }, [user, tasks]);

  // Login user and store token + user data in localStorage
  const loginUser = async (credentials) => {
    try {
      const res = await API.post("/auth/login", credentials);

      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      localStorage.setItem("refreshToken", userData.refreshToken);

      setUser(userData);

      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Clears session and resets state
  const logoutUser = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await API.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local storage anyway

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setTasks([]);
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await API.post("/auth/register", data);

      return res.data;
    } catch (error) {
      console.error("❌ Register error:", error.response || error);
      throw error;
    }
  };

  // Fetch tasks for logged-in user
  const fetchTasks = async (uid = user?.id) => {
    setLoading(true);
    try {
      const res = await API.get(`/tasks/${uid}`);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Task fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (data) => {
    try {
      const res = await API.post("/tasks", data);
      const newTask = res.data;
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error("Add failed:", error);
      throw error;
    }
  };

  const updateTask = async (updatedTask) => {
    if (typeof updatedTask !== "object" || !updatedTask.id) {
      console.error("❌ Invalid task object:", updatedTask);
      return;
    }
    try {
      const res = await API.put(`/tasks/${updatedTask.id}`, updatedTask);

      const savedTask = res.data;

      setTasks((prev) =>
        prev.map((t) => (t.id === savedTask.id ? savedTask : t)),
      );
      toast.success("Task updated successfully 🎉");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed ❌");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTasks(user.id);
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        user,
        setUser,
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        loginUser,
        logoutUser,
        registerUser,
        suggestion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
