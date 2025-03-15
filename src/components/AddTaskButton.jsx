import React, {useState} from 'react';
import AddTaskPopup from './AddTaskPopup';

const AddTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(!isOpen);
  }
 
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base md:text-lg lg:text-xl sm:w-auto sm:block hidden" onClick={onOpen}>
    Add Task
    </button>
    <button className='bg-blue-500 w-15/16 text-white fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg block sm:invisible' onClick={onOpen}>
      Add Task
    </button>
    {
      isOpen && (
        <AddTaskPopup onClose={onClose}></AddTaskPopup>
      )
    }
    </>
  );
};

export default AddTaskButton;