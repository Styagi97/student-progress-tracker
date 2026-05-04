import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTasks } from "../context/TaskContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useTasks();
  const[loading,setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),

    onSubmit: async (values) => {
              setLoading(true);

      try {
        await loginUser(values);

        toast.success("Login successful 🎉");

        navigate("/dashboard");
      } catch (err) {
    toast.error(err.response?.data?.error || "Something went wrong ❌");  
    }finally{
      setLoading(false);
    }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Card */}
      <div
        className="w-full max-w-md p-8 rounded-2xl 
                      bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Title */}

        <h2 className="text-3xl font-bold text-center text-gray-800 ">
          Welcome Back 👋
        </h2>

        <p className="text-center text-white/70 mt-2 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                         placeholder-white/70 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-300 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                         placeholder-white/70 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-white/40"
            />

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold 
                       bg-white text-indigo-700 hover:bg-gray-100 
                       transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/70 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
