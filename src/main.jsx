import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';


import store, { persistor } from './utilities/redux-store/store.js'





ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Profiler id="appProfiler" >
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </Profiler>


    </React.StrictMode >
)
