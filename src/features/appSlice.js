import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    removeUserInfo: (state) => {
      state.user = null;
    }
  },
});

export const { removeUserInfo, setUserInfo } = appSlice.actions;

export const selectUser = (state) => state.app.user;



export default appSlice.reducer;
