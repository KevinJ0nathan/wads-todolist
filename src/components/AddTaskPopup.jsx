import React, { useState } from 'react';
import { X } from 'lucide-react';
import { db, auth} from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const AddTaskPopup = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    /* function to add new task to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'tasks'), {
                userId: auth.currentUser.uid,
                title: title,
                description: description,
                completed: false,
                created: Timestamp.now(),
                dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null, 
            });
            onClose();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center text-start backdrop-blur-sm bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-15/16 max-w-[800px]">
                <div className='flex justify-between items-center mb-5'>
                <h2 className="text-xl font-semibold text-black">Add a Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value.toUpperCase())}
                        value={title}
                        placeholder="Enter title"
                        className="border p-2 rounded"
                        required
                    />
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        value={description}
                        className="border p-2 rounded"
                        required
                    ></textarea>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        className="border p-2 rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Done</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPopup;
