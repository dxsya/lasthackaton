import { Box, ratingClasses, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostFeed = ({ user }) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                border: '0.5px solid #262627',
                width: ' 70%',
                margin: '15px auto',
                color: 'white',
            }}
            onClick={() => navigate(`/profile/${user.id}`)}
        >
            <img src={user.avatar} alt="" width={'150px'} />
            <Box sx={{ padding: 2 }}>
                <Typography sx={{ fontSize: '1.5em' }}>{user.nick}</Typography>
                <Typography>{user.description}</Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.posts.length} posts</Typography>
                <Typography>{user.rating?.length} rating</Typography>
            </Box>
        </Box>
    );
};

export default PostFeed;
