import {createSlice} from '@reduxjs/toolkit';
import {StudentState} from '../../types/data.types';
import {getListStudent} from '../thunks/StudentThunk';

const initialState: StudentState = {
  loading: false,
  refreshinng: false,
  endList: false,
  StudentList: [],
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
  },
});

export const {resetStudentList, setRefreshing, setLoading, setEndList} =
  StudentSlice.actions;
export default StudentSlice.reducer;
