import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContextProvider';
import UsersContextProvider from './contexts/UsersContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <UsersContextProvider>
                <App />
            </UsersContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
