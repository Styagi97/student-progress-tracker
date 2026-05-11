import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTasks } from "../context/TaskContext";

const Register = () => {
  const { registerUser } = useTasks();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[a-z]/, "Must contain lowercase")
        .matches(/[A-Z]/, "Must contain uppercase")
        .matches(/[0-9]/, "Must contain number")
        .matches(/[@$!%*?&]/, "Must contain special character")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        await registerUser(values);
        toast.success("Registered Successfully ✅");

        navigate("/");
      } catch (err) {
        console.error(err.response?.data || err.message);

        toast.error(err.response?.data?.error || "Registration failed ❌");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-700">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account 🚀
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-6">
          <input
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />
          <p className="text-red-300 text-sm">{formik.errors.username}</p>

          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />
          <p className="text-red-300 text-sm">{formik.errors.email}</p>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />
         {formik.touched.password && formik.errors.password && (
           <p className="text-red-300 text-sm">{formik.errors.password}</p>
         )}

          <button
            className="w-full bg-white text-indigo-700 py-2 rounded-lg font-semibold"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-center text-white/70 mt-5">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
