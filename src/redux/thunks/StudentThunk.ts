import {createAsyncThunk} from '@reduxjs/toolkit';
import StudentAPI from '../../api/FetchApiStudent';

export const getListStudent = createAsyncThunk(
  'student/getListStudent',
  async (currentPage: number, {rejectWithValue}) => {
    try {
      const data = await StudentAPI.getListStudent(currentPage);
      const studentList = await data.data;
      return studentList;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
