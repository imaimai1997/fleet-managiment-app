import React from "react";

const SignInForm = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-112px)] w-screen">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form className="flex flex-col w-80 text-left">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            className="bg-gray-200 px-4 py-2 mt-2 mb-4 border-solid border border-black rounded-xl"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            required
            className="bg-gray-200 px-4 py-2 my-2 border-solid border border-black rounded-xl"
          />
        </form>
        <button className="bg-primary-700 w-28 px-2 py-2 mt-6 rounded-3xl text-white">
          Sign In
        </button>
      </div>
    </>
  );
};

export default SignInForm;
