import React, { useEffect, useState } from "react";
 import { useTasks } from "../../context/TaskContext";
import TaskCard from "./TaskCard";

const CompletedTasks = () => {
   const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Completed Tasks ✅</h2>

      {completedTasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks yet 😴</p>
      ) : (
        <div className="space-y-3">
          {completedTasks.map((task) => (
           <TaskCard key={task.id} task={task} />
           
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;