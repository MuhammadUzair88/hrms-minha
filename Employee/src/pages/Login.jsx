import React from "react";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Logo + Background */}
      <div
        className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-cover bg-center h-screen bg-[#09182B]"
        style={{
          backgroundImage: "url('/authbg.png')",
        }}
      >
        <div className="text-center">
          <img src="/auth.png" alt="MinhaTech Logo" className="mx-auto mb-4" />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-16 bg-white">
        <div className="w-full max-w-[400px]">
          <h2 className="text-2xl font-bold text-zinc-800 mb-2">
            Hello Again!
          </h2>
          <p className="text-md text-zinc-600 mb-8 font-semibold">
            Welcome Back
          </p>

          {/* Email Field */}
          <div className="mb-4 flex items-center border border-zinc-300 rounded-full px-5 py-4">
            <Mail className="text-zinc-500 mr-3" size={20} />
            <input
              type="email"
              placeholder="namrasajjadd26@gmail.com"
              className="w-full bg-transparent focus:outline-none font-semibold text-zinc-800"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 flex items-center border border-zinc-300 rounded-full px-5 py-4">
            <Lock className="text-zinc-500 mr-3" size={20} />
            <input
              type="password"
              placeholder="Minhatech243"
              className="w-full bg-transparent focus:outline-none font-semibold text-zinc-800"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#0B1B2B] text-white font-bold py-4 rounded-full hover:bg-[#116da1] transition-all text-lg">
            Login
          </button>

          {/* Links
          <div className="flex flex-col  items-center space-x-6 mt-6 text-sm text-zinc-500 font-semibold">
            <button className="hover:underline">Registration</button>
            <button className="hover:underline">Forgot Password</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
