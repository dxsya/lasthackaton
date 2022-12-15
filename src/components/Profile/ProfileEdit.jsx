import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const ProfileEdit = () => {
    const { users, updateUser } = useUsers();
    const { user } = useAuth();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const [updatedUser, setUpdatedUser] = useState({ ...userSession });
    useEffect(() => {
        setUpdatedUser(userSession);
    }, [userSession]);
    const handleInp = (e) => {
        let obj = { ...updatedUser, [e.target.name]: e.target.value };
        setUpdatedUser(obj);
    };
    const navigate = useNavigate();
    return (
        <Box sx={{ height: '100vh', backgroundColor: '#121212' }}>
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
                    <img
                        src={updatedUser?.avatar}
                        alt=""
                        width={'150px'}
                        height={'150px'}
                        style={{
                            borderRadius: '50%',
                            border: '0.01rem solid #aeaeae',
                        }}
                    />
                </Box>
                <Box sx={{ width: '70%', margin: '2% auto' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                fontSize: '24px',
                                marginRight: '20px',
                            }}
                        >
                            {updatedUser?.nick}
                        </Typography>
                        {user.email == updatedUser?.email ? (
                            <Button
                                sx={{
                                    color: 'white',
                                    border: '1px solid #aeaeae',
                                    fontSize: '13px',
                                    paddingX: 5,
                                    height: '30px',
                                }}
                            >
                                editprofile
                            </Button>
                        ) : (
                            <Button
                                sx={{
                                    color: 'white',
                                    border: '1px solid #aeaeae',
                                    fontSize: '12px',
                                    paddingX: 4,
                                    height: '30px',
                                }}
                            >
                                follow
                            </Button>
                        )}
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
                        <Typography>{updatedUser?.description}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                    margin: 'auto',
                    marginY: '4%',
                }}
            >
                <TextField
                    value={updatedUser?.nick || ''}
                    type="text"
                    name="nick"
                    onChange={handleInp}
                    placeholder="change nickname"
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
                    value={updatedUser?.avatar || ''}
                    type="text"
                    name="avatar"
                    onChange={handleInp}
                    placeholder="change avatar"
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
                    value={updatedUser?.description || ''}
                    type="text"
                    name="description"
                    onChange={handleInp}
                    placeholder="change description"
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
                        updateUser(userSession.id, updatedUser);
                        navigate(`/profile/${userSession.id}`);
                    }}
                    sx={{ color: 'black', backgroundColor: 'white', margin: 1 }}
                >
                    edit
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileEdit;
