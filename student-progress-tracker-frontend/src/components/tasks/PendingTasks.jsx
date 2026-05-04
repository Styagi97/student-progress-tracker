import React, { useEffect, useState } from "react";
 import TaskCard from "./TaskCard";
import { useTasks } from "../../context/TaskContext";

const PendingTasks = () => {
   const { tasks } = useTasks();

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING");

  return(
      <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Tasks ⏳</h2>

      {pendingTasks.length === 0 ? (
        <p className="text-gray-500">No pending tasks 🎉</p>
      ) : (
        <div className="space-y-3">
          {pendingTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );


};

export default PendingTasks;