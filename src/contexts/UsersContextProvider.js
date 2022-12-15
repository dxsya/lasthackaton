import React, { createContext, useContext, useReducer } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../fire';
import { ACTIONS } from '../helpers/consts';

const usersContext = createContext();
export const useUsers = () => {
    return useContext(usersContext);
};

const INIT_STATE = {
    users: [],
    userInfo: null,
};

function reducer(state = INIT_STATE, action) {
    switch (action.type) {
        case ACTIONS.GET_USERS:
            return { ...state, users: action.payload };
        case ACTIONS.GET_USER_INFO:
            return { ...state, userInfo: action.payload };
    }
}

const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const usersCollectionRef = collection(db, 'users');

    async function getUsers() {
        const data = await getDocs(usersCollectionRef);

        dispatch({
            type: ACTIONS.GET_USERS,
            payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
    }

    async function createUser(user) {
        await addDoc(usersCollectionRef, user);
    }

    async function getUserInfo(id) {
        const userDocRef = doc(db, 'users', id);
        const userInfo = await getDoc(userDocRef);

        dispatch({
            type: ACTIONS.GET_USER_INFO,
            payload: userInfo.data(),
        });
    }

    async function updateUser(id, updatedUser) {
        console.log(id, updatedUser);
        const userDocRef = doc(db, 'users', id);
        await updateDoc(userDocRef, updatedUser);
        getUsers();
    }

    const values = {
        createUser,
        getUsers,
        users: state.users,
        getUserInfo,
        userInfo: state.userInfo,
        updateUser,
    };
    return (
        <usersContext.Provider value={values}>{children}</usersContext.Provider>
    );
};

export default UsersContextProvider;
