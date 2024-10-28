import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './RegisterStudent.css'; // Import the CSS file

function RegisterStudent() {
  const { addStudent } = useStudent();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, age, class: studentClass, address, phone } = student;
    
    if (!name || !email || !age || !studentClass || !address || !phone) {
      return 'All fields are required.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      return 'Phone number must be 10 digits.';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    addStudent({ ...student, id: Date.now() });
    navigate('/students');
  };

  return (
    <Form onSubmit={handleSubmit} className="register-student-form">
      <h1 className="form-title">Register Student</h1>
      {error && <Alert variant="danger">{error}</Alert>}
  
      <div className="form-row">
        <Form.Group className="form-group mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
        <Form.Group className="form-group mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
      </div>
  
      <div className="form-row">
        <Form.Group className="form-group mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
        <Form.Group className="form-group mb-3">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            name="class"
            value={student.class}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
      </div>
  
      <div className="form-row">
        <Form.Group className="form-group mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
        <Form.Group className="form-group mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </Form.Group>
      </div>
  
      <Button type="submit" variant="primary" className="submit-button">Register</Button>
    </Form>
  );
  
}

export default RegisterStudent;
