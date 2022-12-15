import { Box, Button, TextField, Typography } from '@mui/material';
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
        followers: [],
        follows: [],
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

    const navigate = useNavigate();
    return (
        <Box
            sx={{
                height: '100vh',
                backgroundColor: '#121212',
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    margin: '0 auto',
                    color: 'white',
                    display: 'flex',
                    pt: 5,
                }}
            >
                <Box sx={{ width: '30%' }}>
                    <Box
                        sx={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            border: '0.01rem solid #aeaeae',
                        }}
                    ></Box>
                </Box>
                <Box sx={{ width: '70%', margin: '2% auto' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                fontSize: '24px',
                                marginRight: '20px',
                            }}
                        >
                            {newUser.nick}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginY: '2%',
                            width: '70%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {' '}
                        <Typography>∞ posts</Typography>
                        <Typography>∞ followers</Typography>
                        <Typography>∞ follows</Typography>
                    </Box>
                    <Box>
                        <Typography>{newUser.description}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '2% auto',
                }}
            >
                <TextField
                    type="text"
                    name="nick"
                    onChange={handleInp}
                    placeholder="Nickname"
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: 'none',
                            },
                        },
                        margin: 1,
                    }}
                />
                <TextField
                    type="text"
                    name="avatar"
                    onChange={handleInp}
                    placeholder="Profile Picture"
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: 'none',
                            },
                        },
                        margin: 1,
                    }}
                />
                <TextField
                    type="text"
                    name="description"
                    onChange={handleInp}
                    placeholder="Profile description"
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: 'none',
                            },
                        },
                        margin: 1,
                    }}
                />
                <Button
                    onClick={() => {
                        createUser(newUser);
                        getUsers();
                        navigate('/');
                    }}
                    sx={{ color: 'black', backgroundColor: 'white', margin: 1 }}
                >
                    save
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
