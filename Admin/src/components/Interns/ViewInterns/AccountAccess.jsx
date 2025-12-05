// AccountAccess.jsx
import React from "react";

const AccountAccess = ({ access }) => {
  // Fallback for missing access object
  if (!access) {
    return (
      <div className="text-gray-500 mt-6">
        No account access details available.
      </div>
    );
  }

  // Simulated credentials (in real apps, don't expose passwords like this)
  const credentials = {
    email: "muzna.ahmad16@gmail.com",
    name: "Muzna Ahmad",
    password: "123456",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-10">
      <div className="flex flex-col gap-1.5">
        <label className="text-[15px] font-medium text-zinc-400">
          Email Address
        </label>
        <div className="text-[16px] font-light text-zinc-900">
          {credentials.email}
        </div>
        <div className="w-full h-px bg-zinc-400/30" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[15px] font-medium text-zinc-400">Name</label>
        <div className="text-[16px] font-light text-zinc-900">
          {credentials.name}
        </div>
        <div className="w-full h-px bg-zinc-400/30" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[15px] font-medium text-zinc-400">
          Password
        </label>
        <div className="text-[16px] font-light text-zinc-900">
          {credentials.password}
        </div>
        <div className="w-full h-px bg-zinc-400/30" />
      </div>
    </div>
  );
};

export default AccountAccess;
