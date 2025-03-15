import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteTaskButton = ({ task, onDelete }) => {
  console.log("DeleteTaskButton received task:", task);
  console.log("DeleteTaskButton received onDelete:", onDelete);

  return (
    <button 
      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
      onClick={(e) => {
        e.stopPropagation(); 
        if (onDelete) {
          console.log(`Deleting task with ID: ${task.id}`); // Debug log
          onDelete(task.id); // Ensure task.id is passed correctly
        } else {
          console.error("onDelete function is missing!");
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteTaskButton;
