import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, onSnapshot, where, deleteDoc, doc} from "firebase/firestore";
import Navbar from "../components/Navbar";
import "./ToDoListPage.css";
import ProgressTracker from "../components/ProgressTracker";
import AddTaskButton from "../components/AddTaskButton";
import SearchBar from "../components/SearchBar";
import Task from "../components/task";
import UserContext from "../context/UserContext";


const ToDoListPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [progress, setProgress] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all"); 

  const filteredTasks = tasks.filter((task) => {
    const lowerTitle = task.title.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase().trim();
    const matchesSearchQuery =
      lowerTitle.includes(` ${lowerQuery}`) ||
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.endsWith(lowerQuery);

    // Filter tasks based on the selected filter option (All, Pending, Completed)
    const matchesFilter = filter === "all" || 
                          (filter === "completed" && task.completed) || 
                          (filter === "pending" && !task.completed) || 
                          (filter === "overdue" && new Date(task.dueDate.seconds * 1000) < new Date());

    return matchesSearchQuery && matchesFilter;  
  })


  const updateProgress = (taskList) => {
  let completedCount = 0;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].completed) {
      completedCount++;
    }
  } 
  let progressValue = ( completedCount / taskList.length ) * 100;
  setProgress(parseFloat(progressValue.toFixed(2))); 
}
  

  useEffect(() => {
    // Add a class to body when this component mounts
    document.body.classList.add("todo-page-body");

    // Remove class when component unmounts (cleanup)
    return () => {
      document.body.classList.remove("todo-page-body");
    };
  }, []);

    useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }

    // Fetch user name
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        if (!doc.empty) {
          setName(doc.docs[0].data().name);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user, loading, navigate]);

  // 🔥 Real-time listener for tasks
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
      updateProgress(taskList);
    });

    return () => unsubscribe(); 
  }, [user]);

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId)); 
      console.log("Task deleted:", taskId);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  


  return (
    <UserContext value={user}>
    <div className="w-screen flex justify-center gap-4">
      <Navbar  onFilterChange={handleFilterChange}></Navbar>
      <div className="w-15/16 max-w-[700px] mt-30 flex flex-col gap-3 ">
      <h1 className="font-medium text-4xl text-start ">{name}'s To Dos</h1>
      <ProgressTracker progress={progress} className=""></ProgressTracker>
        <div className="flex justify-between items-center">
        <SearchBar onSearch={setSearchQuery}></SearchBar>
        <AddTaskButton></AddTaskButton>
        </div>
        {filteredTasks.length === 0 ? (
              <p className="text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) =>(
            <Task
            key={task.id}
            taskName={task.title}
            dueDate={task.dueDate ? new Date(task.dueDate.seconds * 1000).toLocaleDateString() : "No due date"}
            description={task.description}
            task={task}
            onDelete={() => handleDelete(task.id)}
            />
          ))
        )}
      </div>
    </div>
    </UserContext>
  );
};

export default ToDoListPage;
