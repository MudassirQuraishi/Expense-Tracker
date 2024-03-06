import { useContext, } from 'react';
import { UserContext } from '../context/UserContext'
import { ExpenseContext } from '../context/ExpenseContext';
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
export const useExpenseHook = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error("useExpenseContext must be used within a Expense Provider");
    }
    return context;
}
