import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTasks } from "../../context/TaskContext";

const SessionExpiredModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
const { logoutUser } = useTasks();
  useEffect(() => {
    if (!open) return;
  }, [open]);
  if (!open) return null;

  const handleLogin = () => {
    logoutUser();
    setOpen(false); 
toast.error("Session expired");
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-3 text-red-500">
          Session Expired ⏳
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Your session has expired due to inactivity.
          Please login again.
        </p>

       <button
  onClick={handleLogin}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
>
  Go to Login
</button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;