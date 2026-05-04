// Protects routes from unauthorized access
// Redirects to login if user is not authenticated

import { Navigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useTasks();

  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;