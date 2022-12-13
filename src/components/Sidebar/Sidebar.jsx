import { Box, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useUsers } from '../../contexts/UsersContextProvider';

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
    useEffect(() => {
        getUsers();
    }, [users]);
    const navigate = useNavigate();
    function checkSession(users) {
        return users.filter((item) => item.email == user.email);
    }

    return (
        <Box
            sx={{
                width: '20%',
                backgroundColor: 'black',
                color: 'white',
                minHeight: 'max-content',

                borderRight: '0.5px solid #aeaeae',
            }}
        >
            <List>
                {navigations.map((item, index) => (
                    <Typography key={index} onClick={() => navigate(item.link)}>
                        {item.name}
                    </Typography>
                ))}
            </List>
            <Typography
                onClick={() =>
                    navigate(`/addContent/${checkSession(users)[0].id}`)
                }
            >
                создать
            </Typography>
            <Typography
                onClick={() => {
                    if (users.length) {
                        navigate(`/profile/${checkSession(users)[0].id}`);
                    }
                }}
            >
                профиль
            </Typography>
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
    );
};

export default Sidebar;
