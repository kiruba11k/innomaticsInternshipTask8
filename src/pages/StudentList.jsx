import { useStudent } from '../context/StudentContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './StudentList.css'; // Import the CSS file for styling

function StudentList() {
  const { students, deleteStudent } = useStudent();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Classes for filtering
  const classes = [...new Set(students.map(student => student.class))];

  // Filtered and sorted students
  const filteredStudents = students
    .filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedClass === '' || student.class === selectedClass)
    )
    .sort((a, b) => {
      if (sortOrder === 'name') return a.name.localeCompare(b.name);
      if (sortOrder === 'class') return a.class.localeCompare(b.class);
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) deleteStudent(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="student-list-container">
      <h1 className="title">Student List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="form-select"
        >
          <option value="">All Classes</option>
          {classes.map((className, index) => (
            <option key={index} value={className}>{className}</option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="form-select"
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="class">Class</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id} className="student-row">
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.class}</td>
              <td>
                <Link to={`/students/${student.id}`} className="btn btn-info btn-sm me-2">View</Link>
                <Link to={`/edit-student/${student.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          className="btn btn-secondary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className="btn btn-secondary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentList;
