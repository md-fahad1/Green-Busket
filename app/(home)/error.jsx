"use client";

import React from "react";

export default function Error({ error, reset }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
