import { createSlice } from "@reduxjs/toolkit";
const initialModeState = { darkMode: false };
const modeSlice = createSlice({
    name: "mode",
    initialState: initialModeState,
    reducers: {
        toggleMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});
export const toggleActions = modeSlice.actions;
export const selectDarkMode = (state) => state.mode.darkMode;
export default modeSlice;
