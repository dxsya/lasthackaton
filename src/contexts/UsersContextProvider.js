import React, { createContext, useContext, useReducer } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    where,
    query,
    orderBy,
    startAt,
} from 'firebase/firestore';
import fire, { db } from '../fire';
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

    async function usersSort(value) {
        const data = await getDocs(usersCollectionRef);
        let readyData = data.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }));
        if (value == 'follows') {
            readyData.sort((a, b) => a.follows?.length - b.follows?.length);
            dispatch({
                type: ACTIONS.GET_USERS,
                payload: readyData,
            });
            console.log(readyData);
        } else if (value == 'followers') {
            dispatch({
                type: ACTIONS.GET_USERS,
                payload: readyData.sort(
                    (a, b) => a.followers?.length - b.followers?.length
                ),
            });
            console.log(
                readyData.sort(
                    (a, b) => a.followers?.length - b.followers?.length
                )
            );
        } else if (value == 'posts') {
            dispatch({
                type: ACTIONS.GET_USERS,
                payload: readyData.sort(
                    (a, b) => a.posts?.length - b.posts?.length
                ),
            });
            console.log(
                readyData.sort((a, b) => a.posts?.length - b.posts?.length)
            );
        }
    }

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
        const userDocRef = doc(db, 'users', id);
        await updateDoc(userDocRef, updatedUser);
        getUsers();
    }

    async function deleteUser(id) {
        const userDocRef = doc(db, 'users', id);
        await deleteDoc(userDocRef);
        getUsers();
    }

    const values = {
        createUser,
        getUsers,
        users: state.users,
        getUserInfo,
        userInfo: state.userInfo,
        updateUser,
        usersSort,
        deleteUser,
    };
    return (
        <usersContext.Provider value={values}>{children}</usersContext.Provider>
    );
};

export default UsersContextProvider;
