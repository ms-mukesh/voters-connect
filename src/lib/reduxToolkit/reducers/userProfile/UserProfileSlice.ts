/**
 * This TodoSlice reducer is a demo implementation of redux with middleware redux-thunk using @redux/toolkit.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {userData} from '@/src/lib/reduxToolkit/types/userProfile';

const initialState: userData = {
  userData: null,
  loading: false,
};
// `createSlice` will infer the state type from the `initialState` argument
export const userProfileSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // To declare the contents of `actions.payload` use the PayloadAction type.
    addUserProfileData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      return state;
    },
  },
});

export const {addUserProfileData} = userProfileSlice.actions;

export default userProfileSlice.reducer;
