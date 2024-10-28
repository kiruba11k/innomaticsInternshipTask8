import { createSlice } from '@reduxjs/toolkit';
import studentsData from '../../data/students.json';

export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: studentsData,
    searchQuery: '',
    currentPage: 1,
    studentsPerPage: 10,
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      state.students[index] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, setSearchQuery, setCurrentPage } = studentsSlice.actions;
export default studentsSlice.reducer;
