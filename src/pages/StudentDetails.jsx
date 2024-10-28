import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { Button } from 'react-bootstrap';
import './StudentDetails.css'; // Import the custom CSS

function StudentDetails() {
  const { id } = useParams();
  const { students } = useStudent();
  const student = students.find((s) => s.id === parseInt(id));
  const navigate = useNavigate();

  if (!student) return <p>Student not found</p>;

  return (
    <div className="student-details-container">
      <h1>{student.name}</h1>
      <p className="student-detail">Email: {student.email}</p>
      <p className="student-detail">Class: {student.class}</p>
      <p className="student-detail">Age: {student.age}</p>
      <p className="student-detail">Phone: {student.phone}</p>
      <p className="student-detail">Address: {student.address}</p>
      
      {/* Back button */}
      <Button variant="secondary" className="back-button" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}

export default StudentDetails;
