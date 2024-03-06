/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext({
    allExpenses: [],
    organisedExpenses: [],
    topFiveExpenses: [],
})

export const ExpenseContextProvider = ({ children }) => {
    const [isDataFetched, setIsDatFetched] = useState(false)
    const [allExpenses, setAllExpenses] = useState([]);
    const [organisedExpenses, setOrganisedExpenses] = useState([]);
    const [topFiveExpenses, setTopFiveExpenses] = useState([]);
    const token = localStorage.getItem('auth-token')
    useEffect(() => {
        const fetchData = async () => {
            if (!isDataFetched) {
                const response = await axios.get('http://localhost:8080/api/get-expenses',
                    {
                        headers: { Authorization: token }
                    }
                )
                setTopFiveExpenses(response.data.expenseData)
                setOrganisedExpenses(response.data.organizedExpenses)
                setAllExpenses(response.data.allExpenses)
            }
            setIsDatFetched(true)
        }
        fetchData()

    }, [token, isDataFetched])
    const contextValue = {
        allExpenses: allExpenses,
        organisedExpenses: organisedExpenses,
        topFiveExpenses: topFiveExpenses,
    }
    return <ExpenseContext.Provider value={contextValue}>
        {children}
    </ExpenseContext.Provider>
}