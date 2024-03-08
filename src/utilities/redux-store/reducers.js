import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import expenseSlice from "./slices/expenseSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
});

export default rootReducer;
