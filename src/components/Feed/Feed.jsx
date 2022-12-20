import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useUsers } from '../../contexts/UsersContextProvider';
import PostFeed from './PostFeed';
import CircularProgress from '@mui/material/CircularProgress';

const Feed = () => {
    const { users, usersPagination } = useUsers();
    users.filter((user) => user.email !== undefined);
    useEffect(() => {
        usersPagination();
    }, []);
    return (
        <>
            {users ? (
                <Box
                    sx={{
                        backgroundColor: '#121212',
                        minHeight: '100vh',
                    }}
                >
                    <Box sx={{ width: '90%', margin: '0 auto', paddingY: 4 }}>
                        {users.map((user, index) => {
                            if (user.email == undefined) {
                                return null;
                            } else {
                                return <PostFeed key={index} user={user} />;
                            }
                        })}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress
                        sx={{
                            color: 'white',
                            position: 'absolute',
                            top: '45%',
                            left: '60%',
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default Feed;
