import React, {useState} from 'react'
import { Pencil } from 'lucide-react';
import EditTaskPopup from './EditTaskPopup';

const EditButton = ({task}) => {
    const [isOpen, setIsOpen] = useState(false)
  
    const onOpen = () => {
      setIsOpen(true);
    }
   
    const onClose = () => {
      setIsOpen(false)
    }

  return (
  <>
      <button 
            onClick={(e) => { e.stopPropagation(); onOpen(); }} 
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2"
          >
            <Pencil size={16} />
          </button>
    {
      isOpen && (
        <EditTaskPopup onClose={onClose} task={task}></EditTaskPopup>
      )
    }
  </>
  )
}

export default EditButton