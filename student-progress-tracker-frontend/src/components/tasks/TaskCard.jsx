import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "./EditTask";


const TaskCard = ({ task }) => {
   const { deleteTask, updateTask } = useTasks();
  const [open, setOpen] = useState(false);

  const markDone = () => {
    updateTask({
      ...task,
      status: "COMPLETED",
    });
  };

  const undoTask = () => {
    updateTask({
      ...task,
      status: "PENDING",
    });
  };
  return (
    <>
      <div
        className={`p-4 rounded-2xl shadow-md flex justify-between items-center w-full transition-all
  ${
    task.status === "COMPLETED" 
    ? "bg-green-50 opacity-80"
     : "bg-white"
    }`}
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3
            className={`font-semibold ${
              task.status === "COMPLETED" 
              ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>

          <p className="text-sm text-gray-500">
            {task.description}
            </p>

         {/* Time Info */}
<p className="text-xs text-gray-400">
  {task.updatedAt &&
  task.createdAt !== task.updatedAt ? (
    <>
      ✏️ Updated:
      {" "}
      {new Date(task.updatedAt).toLocaleDateString()}
      {" at "}
      {new Date(task.updatedAt).toLocaleTimeString()}
    </>
  ) : (
    <>
      🕒 Created:
      {" "}
      {new Date(task.createdAt).toLocaleDateString()}
      {" at "}
      {new Date(task.createdAt).toLocaleTimeString()}
    </>
  )}
</p>

            {/* Status Badge */}
    {task.status && (
  <span
    className={`px-2 py-1 text-xs rounded  flex it gap-1 w-fit ${
      task.status === "COMPLETED"
        ? "bg-green-700 text-white"
        : "bg-yellow-500 text-white"
    }`}
  >
  {task.status === "COMPLETED" 
  ? "✔ Completed" 
  : "⏳ Pending"}
  </span>
)}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-2">
          {task.status == "COMPLETED" ? (
            <>
              {/* Undo */}
              <button
                onClick={undoTask}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
              >
                ↩
              </button>
              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                ✖
              </button>
            </>
          ) : (
            <>
              {/* Complete */}
              <button
                onClick={markDone}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                ✔
              </button>

              <button
                onClick={() => setOpen(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                📝
              </button>
              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                ✖
              </button>
            </>
          )}
        </div>
      </div>
      <EditTaskModal 
      open={open} 
      setOpen={setOpen} 
      task={task}
       />

    </>
  );
};
export default TaskCard;
