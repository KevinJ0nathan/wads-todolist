import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditTaskPopup = ({ task, onClose }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate.seconds * 1000).toISOString().split('T')[0] : '');

    useEffect(() => {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setDueDate(task.dueDate ? new Date(task.dueDate.seconds * 1000).toISOString().split('T')[0] : '');
    }, [task]);

    /* function to update task in Firestore */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskRef = doc(db, 'tasks', task.id);
            await updateDoc(taskRef, {
                title: title,
                description: description,
                dueDate: dueDate ? new Date(dueDate) : null,
            });
            onClose();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center text-start backdrop-blur-sm bg-black/50 z-50" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-15/16 max-w-[800px]" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-5'>
                    <h2 className="text-xl font-semibold text-black">Edit Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={(e) => setTitle(e.target.value.toUpperCase())}
                            value={title}
                            placeholder="Enter title"
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            value={description}
                            className="border p-2 rounded w-full"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            onChange={(e) => setDueDate(e.target.value)}
                            value={dueDate}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditTaskPopup;
