import {configureStore} from '@reduxjs/toolkit';
import studentReducer from './reducers/studentReducer';
import subjectReducer from './reducers/subjectReducer';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    subject: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
