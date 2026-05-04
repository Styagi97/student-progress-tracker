import React, { useEffect, useState } from "react";
 import TaskCard from "./TaskCard"; 
import { useTasks } from "../../context/TaskContext";

const Tracker = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("ALL");

  //Counters
  const total = tasks.length;
  const completed = tasks.filter(t=> t.status === "COMPLETED").length;
  const pending = tasks.filter(t =>t.status === "PENDING").length;

  //Progress
  const progress = total === 0 ?0 : (completed/total)*100;

const filteredTasks = tasks.filter(task => {
  if(filter === "PENDING") return task.status === "PENDING";
  if(filter === "COMPLETED") return task.status === "COMPLETED";
  return true;
});

 
  return (
        <div className="p-6">
          {/* 🔥 Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
       {/* 🔥 Counters */}
      <div className="flex gap-3 mb-4">
        <div className="bg-blue-100 px-3 py-1 rounded">All: {total}</div>
        <div className="bg-yellow-100 px-3 py-1 rounded">Pending: {pending}</div>
        <div className="bg-green-100 px-3 py-1 rounded">Done: {completed}</div>
      </div>

      {/* 🔥 Filters */}
      <div className="flex gap-3 mb-4">
        {["ALL", "PENDING", "COMPLETED"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 rounded-full ${
              filter === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
          {/* Tasks */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
   );
};

export default Tracker;
