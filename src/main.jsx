import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

import { UserContextProvider } from './utilities/context/UserContext.jsx'
import { ExpenseContextProvider } from './utilities/context/ExpenseContext.jsx'
import store from './utilities/store/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <UserContextProvider>
            <ExpenseContextProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ExpenseContextProvider>
        </UserContextProvider>

    </React.StrictMode>,
)
