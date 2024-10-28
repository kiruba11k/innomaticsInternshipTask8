import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './EditStudent.css'; 

function EditStudent() {
  const { students, updateStudent } = useStudent();
  const { id } = useParams();
  const navigate = useNavigate();

  const studentToEdit = students.find((student) => student.id === parseInt(id));
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, age, class: studentClass, address, phone } = student;
    if (!name || !email || !age || !studentClass || !address || !phone) {
      return 'All fields are required.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return 'Please enter a valid email address.';
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) return 'Phone number must be in XXX-XXX-XXXX format.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    const studentWithId = { ...student, id: parseInt(id) };
    updateStudent(studentWithId.id, studentWithId);
    navigate('/students');
  };

  return (
    <Container className="edit-student-container">
      <h1 className="text-center animate__animated animate__fadeInDown">Edit Student</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="shadow-lg p-4">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="input-3d"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="input-3d"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={student.age}
                onChange={handleChange}
                className="input-3d"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                name="class"
                value={student.class}
                onChange={handleChange}
                className="input-3d"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            className="input-3d"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            className="input-3d"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="submit-btn w-100 mt-3">
          Update Student
        </Button>
      </Form>
    </Container>
  );
}

export default EditStudent;
