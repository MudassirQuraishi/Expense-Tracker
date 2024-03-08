import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn: false,
    keepLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            if (action.payload.authToken) {
                state.authToken = action.payload.authToken;
                state.isLoggedIn = true;
                state.keepLoggedIn = action.payload.keepLoggedIn;
                if (!action.payload.keepLoggedIn) {
                    setTimeout(() => {
                        state.isLoggedIn = false;
                        state.keepLoggedIn = false;
                        state.authToken = null;
                    }, 3600000);
                }
            }
        },
        logout(state) {
            state.isLoggedIn = false;
            state.keepLoggedIn = false;
            state.authToken = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
