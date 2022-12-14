import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const ProfileEdit = () => {
    const { users, updateUser } = useUsers();
    const { user } = useAuth();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const [updatedUser, setUpdatedUser] = useState({ userSession });
    useEffect(() => {
        setUpdatedUser(userSession);
    }, [userSession]);
    const handleInp = (e) => {
        let obj = { ...updatedUser, [e.target.name]: e.target.value };
        setUpdatedUser(obj);
    };
    console.log(updatedUser);
    return (
        <Box sx={{ height: '100vh' }}>
            <TextField
                value={updatedUser?.nick || ''}
                type="text"
                name="nick"
                onChange={handleInp}
                placeholder="change nickname"
            />
            <TextField
                value={updatedUser?.avatar || ''}
                type="text"
                name="avatar"
                onChange={handleInp}
                placeholder="change avatar"
            />
            <TextField
                value={updatedUser?.description || ''}
                type="text"
                name="description"
                onChange={handleInp}
                placeholder="change description"
            />
            <Button
                onClick={() => {
                    updateUser(userSession.id, updatedUser);
                }}
            >
                edit
            </Button>
        </Box>
    );
};

export default ProfileEdit;
