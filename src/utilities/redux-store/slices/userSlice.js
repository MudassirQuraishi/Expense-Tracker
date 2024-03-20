import { createSlice } from "@reduxjs/toolkit";
const initialUserState = {
    email: "",
    username: "",
    fullname: "",
    profilePhoto: "",
    isPremium: false,
    isPremiumEligible: false,
    totalExpense: 0,
};
const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        updateUser(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.profilePhoto = action.payload.profilePhoto;
            state.isPremium = action.payload.isPremium;
            state.isPremiumEligible = action.payload.isPremiumEligible;
            state.totalExpense = action.payload.totalExpense;
        },
        updateTotalExpense(state, action) {
            state.totalExpense = action.payload.totalExpense;
            state.isPremiumEligible = action.payload.isPremiumEligible;
        },
        updateToPremium(state) {
            state.isPremium = true;
        },
        updateUserDetails(state, action) {
            state.fullname = action.payload.fullname;
            state.username = action.payload.username;
            state.phoneNumber = action.payload.phoneNumber;
            state.profilePhoto = action.payload.profilePhoto;
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice;
