import {createAsyncThunk} from '@reduxjs/toolkit';
import SubjectAPI from '../../api/SubjectAPI';
import {SubjectType} from '../../types/data.types';
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
