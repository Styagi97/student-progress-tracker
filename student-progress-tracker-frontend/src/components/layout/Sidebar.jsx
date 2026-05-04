import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ListTodo,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ tasks = [] }) => {
  const [openTracker, setOpenTracker] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const linkBase =
    "relative flex items-center gap-3 p-3 rounded mb-2 transition-all duration-300";

  const activeStyle =
  "bg-blue-500/20 text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-blue-400 before:rounded-r-md before:transition-all before:duration-300";

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen z-50
  ${collapsed ? "w-20" : "w-64"}
  bg-gradient-to-b from-blue-900 to-blue-950 text-white
   p-4 flex flex-col 
  transition-[width] duration-300 ease-in-out `}
    >
      <button
        onClick={() => {
          setCollapsed(!collapsed);
          if (!collapsed) setOpenTracker(false);
        }}
        className="mb-6 p-2 bg-blue-800 rounded hover:bg-blue-700 transition-all duration-300"
      >
        <Menu
          size={18}
          className={`transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 📊 Dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? activeStyle : "hover:bg-blue-800 text-gray-300"
          } ${collapsed ? "justify-center" : ""}`
        }
      >
        <LayoutDashboard size={18} />
        <span
          className={`transition-all duration-200 
        ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
        >
          Dashboard
        </span>
      </NavLink>

      {/* 📌 Tracker Dropdown */}
      <div
        className={`${linkBase} cursor-pointer hover:bg-blue-800 text-gray-300
                    ${collapsed ? "justify-center" : "justify-between"}
        `}
        onClick={() => !collapsed && setOpenTracker(!openTracker)}
      >
        <div className="flex items-center gap-3">
          <ListTodo size={18} />
          <span
            className={`transition-all duration-200 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Tracker
          </span>
        </div>

        {!collapsed && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              openTracker ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      <div
        className={`ml-6 overflow-hidden transition-all duration-300
         ${openTracker ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {[
          { to: "/tracker/add", label: "Add Task" },
          { to: "/tracker/all", label: "All Tasks" },
          { to: "/tracker/pending", label: "Pending" },
          { to: "/tracker/completed", label: "Completed" },
        ].map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            className={({ isActive }) =>
              `relative block p-2 rounded-lg text-sm transition-all duration-300 ${
                isActive
                  ? "text-white before:absolute before:left-0 before:top-1 before:h-6 before:w-1 before:bg-blue-400 before:rounded-r-md"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* 🔥 Task Count Badge */}
      {!collapsed && (
        <div className="mt-6 text-sm bg-blue-800 p-3 rounded-lg text-center  transition-all duration-300">
          Total Tasks: <span className="font-bold">{tasks.length}</span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto text-center text-sm opacity-70">
        {!collapsed && "App Footer"}
      </div>
    </div>
  );
};

export default Sidebar;
