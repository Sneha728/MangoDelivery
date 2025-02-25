import React, { useState } from 'react';
import { Link } from "react-router-dom";
import userAuthStore from '../store/userAuthStore';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center px-4 sm:pt-10 sm:pb-10 pt-5 pb-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-4 sm:p-8 relative"
      >
        <h2 className="font-semibold text-2xl text-orange-600 text-center mb-6">
          Login
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-orange-600 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="bg-gray-100 border border-orange-600 rounded-md px-4 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-orange-600 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="bg-gray-100 border border-orange-600 rounded-md px-4 py-2 pr-10"
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
          disabled={isLoggingIn}
        >
          Login
        </button>

        <p className="text-center text-orange-600 mt-4">
          Dont have an account?{' '}
          <Link
            to="/signup"
            className="text-orange-600 underline underline-offset-2 hover:text-orange-600"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
