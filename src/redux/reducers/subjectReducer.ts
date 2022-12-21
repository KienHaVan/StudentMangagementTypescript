import {createSlice} from '@reduxjs/toolkit';
import {SubjectState, SubjectType} from '../../types/data.types';
import {getListSubject, postNewSubject} from '../thunks/SubjectThunk';

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
        console.log('Pending: get subject list');
      })
      .addCase(getListSubject.fulfilled, (state, action) => {
        console.log('Successful: get subject list');
        state.SubjectList = action.payload;
        state.refreshing = false;
      })
      .addCase(getListSubject.rejected, (state, action) => {
        console.log('Fail: get subject list', action.payload as string);
      });
    builder
      .addCase(postNewSubject.pending, () => {
        console.log('Pending: Post new subject');
      })
      .addCase(postNewSubject.fulfilled, (state, action) => {
        console.log('Successful: Post new subject');
        console.log('New subject', action.payload as SubjectType);
      })
      .addCase(postNewSubject.rejected, (state, action) => {
        console.log('Fail: Post new subject', action.payload as string);
      });
  },
});

export const {resetSubjectList, setRefreshing} = SubjectSlice.actions;
export default SubjectSlice.reducer;