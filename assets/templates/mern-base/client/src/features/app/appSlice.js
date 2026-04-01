import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appName: '__PROJECT_NAME__',
  apiStatus: 'Checking API',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApiStatus(state, action) {
      state.apiStatus = action.payload;
    },
  },
});

export const { setApiStatus } = appSlice.actions;

export default appSlice.reducer;
