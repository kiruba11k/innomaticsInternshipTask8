import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentProvider from './context/StudentContext';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import RegisterStudent from './pages/RegisterStudent';
import EditStudent from './pages/EditStudent'; 
import Navbar from './components/Navbar';
import LineChart from './components/LineChart'; 

function App() {
  return (
    <StudentProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/register" element={<RegisterStudent />} />
            <Route path="/edit-student/:id" element={<EditStudent />} /> 
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
