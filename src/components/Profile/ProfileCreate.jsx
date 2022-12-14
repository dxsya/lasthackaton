import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const Profile = () => {
    const { getUsers, createUser } = useUsers();
    useEffect(() => {
        getUsers();
    }, []);

    const { user } = useAuth();
    const [newUser, setNewUser] = useState({
        nick: '',
        avatar: '',
        description: '',
        followers: 0,
        follows: 0,
        posts: [],
        rating: [],
        email: '',
    });

    const handleInp = (e) => {
        let updateUser = {
            ...newUser,
            [e.target.name]: e.target.value,
            email: user.email,
        };
        setNewUser(updateUser);
    };

    function refreshPage() {
        window.location.reload();
    }
    const navigate = useNavigate();
    return (
        <div>
            <TextField
                type="text"
                name="nick"
                onChange={handleInp}
                placeholder="addnick"
            />
            <TextField
                type="text"
                name="avatar"
                onChange={handleInp}
                placeholder="addavatar"
            />
            <TextField
                type="text"
                name="description"
                onChange={handleInp}
                placeholder="adddescr"
            />
            <Button
                onClick={() => {
                    createUser(newUser);
                    navigate('/');
                }}
            >
                edit
            </Button>
        </div>
    );
};

export default Profile;
