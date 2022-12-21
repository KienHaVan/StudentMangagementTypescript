import {createSlice} from '@reduxjs/toolkit';
import {SubjectState} from '../../types/data.types';
import {getListSubject} from '../thunks/SubjectThunk';

const initialState: SubjectState = {
  refreshing: false,
  SubjectList: [],
};
export const SubjectSlice = createSlice({
  name: 'Subject',
  initialState,
  reducers: {
    resetSubjectList: state => {
      state.SubjectList = [];
    },
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getListSubject.pending, () => {
        console.log('Pending: get student list');
      })
      .addCase(getListSubject.fulfilled, (state, action) => {
        console.log('Successful: get student list');
        state.SubjectList = action.payload;
        state.refreshing = false;
      })
      .addCase(getListSubject.rejected, (state, action) => {
        console.log('Fail: get student list', action.payload as string);
      });
  },
});

export const {resetSubjectList, setRefreshing} = SubjectSlice.actions;
export default SubjectSlice.reducer;
