import React from 'react'

const ProgressTracker = ({ progress }) => {
    return (
      <div className="w-full py-4">
        <h1 className="text-xl font-semibold mb-2 text-start">Completed Tasks</h1>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-full w-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-start mt-2 text-sm">
        You are <b>{(Number(progress) || 0).toFixed(1)}%</b> done with your tasks!
        </p>

      </div>
    );
  };

export default ProgressTracker