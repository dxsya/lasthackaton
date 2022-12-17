import { Box, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useUsers } from '../../contexts/UsersContextProvider';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const navigations = [
    {
        link: '/',
        name: 'главная',
    },
    {
        link: '/',
        name: 'поиск',
    },
    {
        link: '/',
        name: 'интересное',
    },
    // {
    //     link: '/addContent',
    //     name: 'создать',
    // },
];

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
                width: '18%',
                backgroundColor: 'black',
                color: 'white',
                minHeight: 'max-content',
                borderRight: '0.5px solid #aeaeae',
            }}
        >
            <Box sx={{ position: 'fixed' }}>
                <List sx={{}}>
                    {navigations.map((item, index) => (
                        <Typography
                            key={index}
                            onClick={() => navigate(item.link)}
                        >
                            {item.name}
                        </Typography>
                    ))}
                </List>

                {user.email != undefined ? (
                    <>
                        <Typography
                            onClick={() =>
                                navigate(`/addContent/${userAuthorized?.id}`)
                            }
                        >
                            создать
                        </Typography>
                        <Typography
                            onClick={() => {
                                if (users.length) {
                                    navigate(`/profile/${userAuthorized?.id}`);
                                }
                            }}
                        >
                            профиль
                        </Typography>
                        <ShoppingCartTwoToneIcon
                            onClick={() => navigate('/cart')}
                        />
                        <BookmarkTwoToneIcon
                            onClick={() => navigate('/wish')}
                        />
                    </>
                ) : (
                    <></>
                )}
                <ListItem
                    sx={{
                        padding: {
                            xs: '0 2px',
                            sm: '0 4px',
                            md: '0 8px',
                            lg: '0 12px',
                            xl: '0 14px',
                        },
                    }}
                >
                    {user ? (
                        <Box
                            onClick={handleLogout}
                            sx={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
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
                                }}
                            >
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: 'white' }}
                                />
                            </Box>
                        </Link>
                    )}
                </ListItem>
            </Box>
        </Box>
    );
};

export default Sidebar;
