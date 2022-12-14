import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fire from '../fire';

const authContext = createContext();
export const useAuth = () => {
    return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [hasAccount, setHasAccount] = useState('');

    const navigate = useNavigate();
    const handleRegister = () => {
        setErrorMsg('');
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                navigate('/profileCreate');
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                        setErrorMsg('Email already in use or invalid');
                        break;
                    case 'auth/weak-password':
                        setErrorMsg('Weak password');
                        break;
                }
            });
    };

    const handleLogin = () => {
        setErrorMsg('');
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigate('/'))
            .catch((err) => {
                switch (err.code) {
                    case 'auth/user-disabled':
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        setErrorMsg('Invalid mail or password');
                        break;
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser('');
            }
        });
    };
    useEffect(() => {
        authListener();
    }, []);

    const forgetPassword = () => {
        fire.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset mail sent');
            })
            .catch(() => {
                alert('Invalid mail or user not found');
            });
    };

    const values = {
        email,
        password,
        user,

        errorMsg,
        hasAccount,

        setPassword,
        setEmail,
        setHasAccount,

        handleLogin,
        handleLogout,
        handleRegister,
        forgetPassword,
    };
    return (
        <authContext.Provider value={values}>{children}</authContext.Provider>
    );
};

export default AuthContextProvider;
