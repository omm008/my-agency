import React from "react";
const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-brand-black text-white">
    <h1 className="text-6xl font-bold">404</h1>
    <p className="mt-4 text-xl text-gray-400">Page Not Found</p>
    <a href="/" className="mt-6 text-brand-blue underline">
      Go to Home
    </a>
  </div>
);

export default NotFound;
