import {createSlice} from '@reduxjs/toolkit';
import {getListStudent} from '../thunks/StudentThunk';

export interface StudentType {
  age: number;
  avatar: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export interface StudentState {
  loading: boolean;
  StudentList: StudentType[];
}

const initialState: StudentState = {
  loading: false,
  StudentList: [],
};

export const StudentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    resetStudentList: state => {
      state.StudentList = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getListStudent.pending, state => {
        state.loading = true;
        console.log('Pending: get student list');
        console.log(state.StudentList);
      })
      .addCase(getListStudent.fulfilled, (state, action) => {
        console.log('Successful: get student list');
        state.StudentList = action.payload;
        console.log(state.StudentList);
        state.loading = false;
      })
      .addCase(getListStudent.rejected, (state, action) => {
        state.loading = false;
        console.log('Fail: get student list', action.payload as string);
      });
  },
});

export const {resetStudentList} = StudentSlice.actions;
export default StudentSlice.reducer;
