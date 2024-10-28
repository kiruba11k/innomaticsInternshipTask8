import React from 'react';
import { useStudent } from '../context/StudentContext'; 
import LineChart from '../components/LineChart'; 
import BarChart from '../components/BarChart'; 
import PieChart from '../components/PieChart'; 
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  const { students } = useStudent();

  // Calculate total students
  const totalStudents = students.length;

  // Calculate students per class
  const studentsPerClass = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1; 
    return acc;
  }, {});

  const classLabels = Object.keys(studentsPerClass);
  const classData = Object.values(studentsPerClass);

  // Optional: Prepare data for line chart (e.g., by age)
  const ageData = students.map(student => student.age);
  const ageLabels = students.map(student => student.name);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="student-summary">
        <h2 className="summary-text">Total Students: {totalStudents}</h2>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h2 className="chart-title">Student Age Distribution</h2>
          <LineChart labels={ageLabels} data={ageData} />
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Students Per Class</h2>
          <BarChart labels={classLabels} data={classData} />
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Students Per Class (Pie Chart)</h2>
          <PieChart labels={classLabels} data={classData} />
        </div>
      </div>

      <div className="additional-content">
        <div className="grid-container">
          <div className="notifications">
            <h2>Recent Notifications</h2>
            <ul>
              <li>New student added to 10th Grade.</li>
              <li>Reminder: Parent-Teacher meeting on Friday.</li>
              <li>Class schedule updated for 11th Grade.</li>
            </ul>
          </div>

          <div className="activity-log">
            <h2>User Activity Log</h2>
            <ul>
              <li>User John Doe viewed the profile of Jane Smith.</li>
              <li>User Admin added a new student to the database.</li>
              <li>User Mary Jane updated her profile.</li>
            </ul>
          </div>

          <div className="class-performance">
            <h2>Class Performance Overview</h2>
            <ul>
              <li>10th Grade: Average Score - 85%</li>
              <li>11th Grade: Average Score - 78%</li>
              <li>12th Grade: Average Score - 90%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
