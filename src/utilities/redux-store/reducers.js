import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import expenseSlice from "./slices/expenseSlice";
import modeSlice from "./slices/modeSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    mode: modeSlice.reducer,
    user: userSlice.reducer,
});

export default rootReducer;
