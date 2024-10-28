import { createContext, useState, useContext, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/students.json') // Use the local JSON file path
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => console.error('Failed to fetch students:', error));
  }, []);

  const addStudent = (student) => setStudents([...students, student]);

  const updateStudent = (id, updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? updatedStudent : student))
    );
  };

  const deleteStudent = (id) =>
    setStudents(students.filter((student) => student.id !== id));

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent, loading }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
