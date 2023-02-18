
import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({

    name:'template',
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state, ) => {
            state.counter += 1;
        },
    }
});

export const { increment } = uiSlice.actions;