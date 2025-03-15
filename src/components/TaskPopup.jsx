import React from 'react';
import { X } from 'lucide-react';

const TaskPopup = ({ taskName, dueDate, description, onClose }) => {
  const getPriorityColor = () => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return 'bg-red-500'; // High Priority
    if (diffInDays <= 3) return 'bg-orange-500'; // Medium Priority
    return 'bg-green-500'; // Low Priority
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center text-start backdrop-blur-sm bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-15/16 max-w-[800px]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black break-words w-full">{taskName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className='flex flex-col gap-3 mt-4'>
        <p className="text-gray-700"><strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Priority:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-white ${getPriorityColor()}`}>
            {Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
          </span>
        </p>
        <p className="text-gray-700  break-words"><strong>Description:</strong> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
