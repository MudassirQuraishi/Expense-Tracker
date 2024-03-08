import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialAuthState = {
    isLoggedIn: false,
    keepLoggedIn: false,
    authToken: localStorage.getItem("authToken") || null,
};
const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            if (action.payload.authToken) {
                state.authToken = action.payload.authToken;
                state.isLoggedIn = true;
            }
            if (action.payload.keepLoggedIn) {
                state.keepLoggedIn = true;
            }
        },
        logout(state) {
            state.isLoggedIn = false;
            state.keepLoggedIn = false;
            state.authToken = null;
        },
    },
});
const store = configureStore({
    reducer: { auth: authSlice.reducer },
});
export const authActions = authSlice.actions;

export default store;
