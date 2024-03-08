import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import { UserContextProvider } from './utilities/context/UserContext.jsx'

import store, { persistor } from './utilities/redux-store/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <UserContextProvider>

                    <App />

                </UserContextProvider>
            </PersistGate>
        </Provider>

    </React.StrictMode >
)
