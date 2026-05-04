import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";

const ProfileDialog = ({ open, onClose }) => {
   const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useTasks();

  useEffect(() => {
    if (open) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [open]);
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  if (!open) return null;

  return (
    <>
      {/* click outside overlay (transparent) */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* dropdown */}
      <div
        className={`absolute right-4 top-14 w-72 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4 z-50
        transform transition-all duration-200 origin-top-right
        ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Profile</h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded"
        >
          logout
        </button>
      </div>
    </>
  );
};

export default ProfileDialog;
