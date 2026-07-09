"use client";

import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hangar Hub Control</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Open Checkout
      </button>

      {/* FIXED POSITIONING OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Checkout Confirmation</h2>
            <p className="mb-6 text-gray-600">Proceed with telemetry synchronization?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}