import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTasks } from "../../context/TaskContext";

const AddTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { addTask, user } = useTasks();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required("Task title is required")
        .max(100, "Title cannot exceed 100 characters"),

      description: Yup.string()
        .trim()
        .required("Description is required")
        .max(255, "Description cannot exceed 255 characters"),
    }),

    onSubmit: async (values) => {
      const loadingToast = toast.loading("Creating task...");
      setLoading(true);

      try {
        await addTask({
          title: values.title,
          description: values.description,
          userId: user.id,
        });

        toast.success("Task created!", { id: loadingToast });

        formik.resetForm();

        navigate("/tracker/all");
      } catch (error) {
        console.error("Error creating task:", error);

        toast.error("Failed to create task ❌", {
          id: loadingToast,
        });
      } finally {
        setLoading(false);
      }
    },
  });

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

        <form onSubmit={formik.handleSubmit}>

          {/* Title */}
          <label className="text-sm font-medium text-gray-600">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter task title..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1 mb-4">
              {formik.errors.title}
            </p>
          )}

          {/* Description */}
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter task details..."
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {formik.touched.description &&
            formik.errors.description && (
              <p className="text-red-500 text-sm mt-1 mb-4">
                {formik.errors.description}
              </p>
            )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "+ Add Task"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTask;