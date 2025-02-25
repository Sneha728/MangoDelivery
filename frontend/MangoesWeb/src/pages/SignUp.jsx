import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userAuthStore from '../store/userAuthStore';
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const { signup, isSigningUp } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:pt-10 sm:pb-10 pt-5 pb-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 sm:p-8"
      >
        <h2 className="font-semibold sm:text-2xl text-xl text-orange-600 text-center mb-4 sm:mb-6">
          Create Account
        </h2>
        <div className="flex flex-col sm:space-y-4 space-y-2">
          <div className="flex flex-col">
            <label className="text-orange-600 font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="bg-gray-50 border border-orange-600 rounded-md sm:px-4 sm:py-2 px-3 py-2"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-orange-600 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="bg-gray-100 border border-orange-600 rounded-md sm:px-4 sm:py-2 px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-orange-600 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="bg-gray-100 border border-orange-600 rounded-md sm:px-4 sm:py-2 px-3 py-2 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-9 sm:top-10 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-orange-600 transition"
          disabled={isSigningUp}
        >
          Create Account
        </button>

        <p className="text-center text-orange-600 mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-orange-600 underline underline-offset-2 hover:text-orange-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
