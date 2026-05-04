import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";

const Navbar = ({ onProfileClick, dark, setDark }) => {
const { user } = useTasks();
  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow w-full">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div
        onClick={onProfileClick}
        className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer text-white font-semibold relative"
      >
        {user?.username?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

export default Navbar;
