import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import HomePage from './pages/HomePage';
import './App.css';
import RegisterForm from './pages/RegisterForm';
import ToDoListPage from './pages/ToDoListPage';
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/todolist" element={<ToDoListPage></ToDoListPage>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
