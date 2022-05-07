/**
 * This TodoSlice reducer is a demo implementation of redux with middleware redux-thunk using @redux/toolkit.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypoGraphyData } from '@/src/lib/reduxToolkit/types/typoGraphy';

const initialState: TypoGraphyData = {
    fontSize: 'medium',
    language: 'english',
};
// `createSlice` will infer the state type from the `initialState` argument
export const typoGraphySlice = createSlice({
    name: 'typoGraphy',
    initialState,
    reducers: {
        // To declare the contents of `actions.payload` use the PayloadAction type.
        updateFontSize: (state, action: PayloadAction<any>) => {
            state.fontSize = action.payload;
            return state;
        },
        updateLanguage: (state, action: PayloadAction<any>) => {
            state.language = action.payload;
            return state;
        },
    },
});

export const { updateFontSize, updateLanguage } = typoGraphySlice.actions;

export default typoGraphySlice.reducer;
