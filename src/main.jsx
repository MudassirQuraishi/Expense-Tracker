import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { UserContextProvider } from './utilities/context/UserContext.jsx'
import { ExpenseContextProvider } from './utilities/context/ExpenseContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContextProvider>
            <ExpenseContextProvider>
                <App />
            </ExpenseContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
)
