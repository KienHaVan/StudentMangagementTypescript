import {createAsyncThunk} from '@reduxjs/toolkit';
import StudentAPI from '../../api/StudentAPI';
import {StudentType} from '../../types/data.types';

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
export const postNewStudent = createAsyncThunk(
  'student/postNewStudent',
  async (data: StudentType, {rejectWithValue}) => {
    try {
      await StudentAPI.postNewStudent(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
