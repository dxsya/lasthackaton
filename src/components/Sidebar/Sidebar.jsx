import { Box, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useUsers } from '../../contexts/UsersContextProvider';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Sidebar = () => {
    const { handleLogout, user } = useAuth();
    const { getUsers, users } = useUsers();

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);
    const userAuthorized = users.find(
        (oneUser) => oneUser.email === user.email
    );
    return (
        <Box
            sx={{
                width: { xs: '10%' },
                paddingLeft: { xs: 4, xm: 1, md: 1 },
                paddingRight: { xs: 1, xm: 3, md: 3 },
                backgroundColor: 'black',
                color: 'white',
                minHeight: 'max-content',
                borderRight: '0.5px solid #aeaeae',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ position: 'fixed' }}>
                <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
                    <img
                        src="https://i.pinimg.com/564x/8a/dd/1b/8add1bd9b6e562d6d9bc0777c584e2dd.jpg"
                        alt=""
                        width={'35px'}
                    />
                </Box>
                <Box
                    onClick={() => navigate(`/`)}
                    sx={{ display: 'flex', mt: 5 }}
                >
                    <HomeIcon />
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'block' },
                        }}
                    >
                        Feed
                    </Typography>
                </Box>

                {user.email != undefined ? (
                    <Box sx={{}}>
                        <Box
                            onClick={() =>
                                navigate(`/addContent/${userAuthorized?.id}`)
                            }
                            sx={{ display: 'flex', mt: 5 }}
                        >
                            <AddBoxOutlinedIcon />
                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block',
                                    },
                                }}
                            >
                                Content
                            </Typography>
                        </Box>
                        <Box
                            onClick={() => {
                                if (users.length) {
                                    navigate(`/profile/${userAuthorized?.id}`);
                                }
                            }}
                            sx={{ display: 'flex', mt: 5 }}
                        >
                            <AccountCircleOutlinedIcon />
                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block',
                                    },
                                }}
                            >
                                Profile
                            </Typography>
                        </Box>

                        <Box
                            sx={{ display: 'flex', mt: 5 }}
                            onClick={() => navigate('/cart')}
                        >
                            <ShoppingCartTwoToneIcon />
                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block',
                                    },
                                }}
                            >
                                {' '}
                                Cart
                            </Typography>
                        </Box>
                        <Box
                            sx={{ display: 'flex', mt: 5 }}
                            onClick={() => navigate('/wish')}
                        >
                            <BookmarkTwoToneIcon />
                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block',
                                    },
                                }}
                            >
                                Saves
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <></>
                )}
                <Box>
                    {user ? (
                        <Box
                            onClick={handleLogout}
                            sx={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                                mt: 5,
                            }}
                        >
                            <LogoutOutlinedIcon sx={{ color: 'white' }} />
                        </Box>
                    ) : (
                        <Link to="/auth">
                            <Box
                                // onClick={}
                                sx={{
                                    cursor: 'pointer',
                                    width: '24px',
                                    height: '24px',
                                    mt: 5,
                                }}
                            >
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: 'white' }}
                                />
                            </Box>
                        </Link>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
