import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter as Router} from "react-router-dom"
import {AuthProviderWrapper} from "./context/auth.context";
import AppContextProvider from './context/appContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
    <AppContextProvider>
    <AuthProviderWrapper>
      <App /> 
    </AuthProviderWrapper>
    </AppContextProvider>
  </Router>
  </React.StrictMode>,
)
