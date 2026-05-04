import React, { useState } from "react";
 import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
const AddTask = ({ fetchTasks }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { addTask,user } = useTasks();
  const createTask = async () => {
    if (!title.trim()) {
      toast.error("Please enter task title");

      return;
    }
    const loadingToast = toast.loading("Creating task...");

    setLoading(true);

    try {
       await addTask({
        title,
        description,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      toast.success("Task created!", { id: loadingToast });
      setTitle("");
      setDescription("");
      navigate("/tracker/all");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task ❌", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create New Task 🚀
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Add tasks and stay productive
        </p>

        {/* Title */}
        <label className="text-sm font-medium text-gray-600">Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter task title..."
          className="w-full mt-1 mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Description */}
        <label className="text-sm font-medium text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task details..."
          rows={4}
          className="w-full mt-1 mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button */}
        <button
          onClick={createTask}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
