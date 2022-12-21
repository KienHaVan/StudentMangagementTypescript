import {createAsyncThunk} from '@reduxjs/toolkit';
import SubjectAPI from '../../api/SubjectAPI';
import {StudentType, SubjectType} from '../../types/data.types';
export const getListSubject = createAsyncThunk(
  'subject/getListSubject',
  async (_, {rejectWithValue}) => {
    try {
      const data = await SubjectAPI.getListSubject();
      const subjectList = await data.data;
      return subjectList;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const postNewSubject = createAsyncThunk(
  'subject/postNewSubject',
  async (data: SubjectType, {rejectWithValue}) => {
    try {
      await SubjectAPI.postNewSubject(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateStudentEnrolled = createAsyncThunk(
  'subject/updateStudentEnrolled',
  async (
    {id, studentList}: {id: string; studentList: StudentType[]},
    {rejectWithValue},
  ) => {
    try {
      await SubjectAPI.updateStudentEnrolled(id, studentList);
      return studentList;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateCurrentSubject = createAsyncThunk(
  'subject/updateCurrentSubject',
  async ({id, data}: {id: string; data: SubjectType}, {rejectWithValue}) => {
    try {
      await SubjectAPI.updateCurrentSubject(id, data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
