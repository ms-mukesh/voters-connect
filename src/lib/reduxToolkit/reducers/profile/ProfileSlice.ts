/**
 * This TodoSlice reducer is a demo implementation of redux with middleware redux-thunk using @redux/toolkit.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UserProfileData} from '@/src/lib/reduxToolkit/types/profile';

const initialState: UserProfileData = {
  data: null,
  loading: false,
};
// `createSlice` will infer the state type from the `initialState` argument
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // To declare the contents of `actions.payload` use the PayloadAction type.
    addProfile: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      return state;
    },
  },
});

export const {addProfile} = profileSlice.actions;

export default profileSlice.reducer;
