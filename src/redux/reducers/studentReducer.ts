import {createSlice} from '@reduxjs/toolkit';
import {StudentState} from '../../types/data.types';
import {
  getListStudent,
  postNewStudent,
  updateCurrentStudent,
} from '../thunks/StudentThunk';
import {StudentType} from './../../types/data.types';

const initialState: StudentState = {
  loading: false,
  refreshinng: false,
  endList: false,
  StudentList: [],
  enrolledSubjects: [],
};

export const StudentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    resetStudentList: state => {
      state.StudentList = [];
    },
    setRefreshing: (state, action) => {
      state.refreshinng = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEndList: (state, action) => {
      state.endList = action.payload;
    },
    enrollASubject: (state, action) => {
      state.enrolledSubjects = [...state.enrolledSubjects, action.payload];
    },
    unenrollASubject: (state, action) => {
      state.enrolledSubjects = [...state.enrolledSubjects].filter(
        item => item.id !== action.payload.id,
      );
    },
    initSubjectsBeforeUpdate: (state, action) => {
      state.enrolledSubjects = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getListStudent.pending, () => {
        console.log('Pending: get student list');
      })
      .addCase(getListStudent.fulfilled, (state, action) => {
        console.log('Successful: get student list');
        state.StudentList = [...state.StudentList, ...action.payload];
        if (action.payload.length === 0) {
          state.endList = true;
          state.loading = false;
        }
        state.loading = false;
        state.refreshinng = false;
      })
      .addCase(getListStudent.rejected, (state, action) => {
        state.loading = false;
        console.log('Fail: get student list', action.payload as string);
      });
    builder
      .addCase(postNewStudent.pending, () => {
        console.log('Pending: Post new student');
      })
      .addCase(postNewStudent.fulfilled, (state, action) => {
        console.log('Successful: Post new student');
        console.log('New Student', action.payload as StudentType);
      })
      .addCase(postNewStudent.rejected, (state, action) => {
        console.log('Fail: Post new student', action.payload as string);
      });
    builder
      .addCase(updateCurrentStudent.pending, () => {
        console.log('Pending: Update current student');
      })
      .addCase(updateCurrentStudent.fulfilled, (state, action) => {
        console.log('Successful: Update current student');
        console.log('Data updated: ', action.payload);
      })
      .addCase(updateCurrentStudent.rejected, (state, action) => {
        console.log('Fail: Update current student', action.payload as string);
      });
  },
});

export const {
  resetStudentList,
  setRefreshing,
  setLoading,
  setEndList,
  enrollASubject,
  unenrollASubject,
  initSubjectsBeforeUpdate,
} = StudentSlice.actions;
export default StudentSlice.reducer;
