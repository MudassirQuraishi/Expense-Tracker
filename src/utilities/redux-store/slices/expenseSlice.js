import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    allExpenses: [],
    organisedExpenses: [],
    topFiveExpenses: [],
};

const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        setExpenses(state, action) {
            const { allExpenses, organizedExpenses, topFiveExpenses } =
                action.payload;
            state.allExpenses = allExpenses;
            state.organisedExpenses = organizedExpenses;
            state.topFiveExpenses = topFiveExpenses;
        },
        addExpense(state, action) {
            const newExpense = action.payload;
            state.allExpenses.push(newExpense);
            if (state.topFiveExpenses.length < 5) {
                state.topFiveExpenses.unshift(newExpense);
            } else {
                state.topFiveExpenses.pop();
                state.topFiveExpenses.unshift(newExpense);
            }
            // Update organisedExpenses
            const category = newExpense.category || "Uncategorized";

            // Check if the category exists in organisedExpenses
            if (!state.organisedExpenses[category]) {
                // If not, create the category with the new expense
                state.organisedExpenses[category] = [newExpense];
            } else {
                // If the category exists, check the length and add the new expense
                if (state.organisedExpenses[category].length < 2) {
                    state.organisedExpenses[category].push(newExpense);
                }
            }
        },
        updateExpense(state, action) {
            const updatedExpense = action.payload;
            const index = state.allExpenses.findIndex((expense) => {
                return expense._id === updatedExpense._id;
            });
            if (index !== -1) {
                // Update in allExpenses
                state.allExpenses[index] = updatedExpense;

                // Update in topFiveExpenses
                const topFiveIndex = state.topFiveExpenses.findIndex(
                    (expense) => expense._id === updatedExpense._id
                );
                if (topFiveIndex !== -1) {
                    state.topFiveExpenses[topFiveIndex] = updatedExpense;
                }

                // Update in organisedExpenses
                state.organisedExpenses = updateInOrganisedExpenses(
                    state.organisedExpenses,
                    updatedExpense
                );
            }
        },
        deleteExpense(state, action) {
            const expenseIdToDelete = action.payload;
            state.allExpenses = state.allExpenses.filter(
                (expense) => expense.id !== expenseIdToDelete
            );

            // Remove from topFiveExpenses if present
            state.topFiveExpenses = state.topFiveExpenses.filter(
                (expense) => expense._id !== expenseIdToDelete
            );

            // Remove from organisedExpenses
            state.organisedExpenses = removeDeletedFromOrganisedExpenses(
                state.organisedExpenses,
                state.allExpenses,
                expenseIdToDelete
            );
        },
        clearState(state) {
            state.allExpenses = [];
            state.organisedExpenses = [];
            state.topFiveExpenses = [];
        },
    },
});

// Helper function to update organisedExpenses after an expense update
const updateInOrganisedExpenses = (organisedExpenses, updatedExpense) => {
    const updatedCategory = updatedExpense.category || "Uncategorized";

    // Find the category in organisedExpenses
    const updatedCategoryExpenses = organisedExpenses[updatedCategory] || [];

    // Find the index of the expense in the category
    const updatedIndex = updatedCategoryExpenses.findIndex(
        (expense) => expense._id === updatedExpense._id
    );

    // If found, update the expense; otherwise, do nothing
    if (updatedIndex !== -1) {
        organisedExpenses[updatedCategory][updatedIndex] = {
            ...updatedExpense,
            date: updatedExpense.date,
        };
    }

    return organisedExpenses;
};

const removeDeletedFromOrganisedExpenses = (
    organisedExpenses,
    allExpenses,
    expenseIdToDelete
) => {
    // Find the deleted expense in allExpenses
    const deletedExpense = allExpenses.find(
        (expense) => expense._id === expenseIdToDelete
    );

    if (deletedExpense) {
        // Get the category of the deleted expense
        const deletedCategory = deletedExpense.category || "Uncategorized";

        // Find the index of the deleted expense in the category
        const deletedIndex = organisedExpenses[deletedCategory].findIndex(
            (expense) => expense._id === expenseIdToDelete
        );

        // If found, remove the deleted expense from the category
        if (deletedIndex !== -1) {
            organisedExpenses[deletedCategory].splice(deletedIndex, 1);

            // If the category becomes empty after removing, delete the category
            if (organisedExpenses[deletedCategory].length === 0) {
                delete organisedExpenses[deletedCategory];
            }
        }
    }

    return organisedExpenses;
};

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
