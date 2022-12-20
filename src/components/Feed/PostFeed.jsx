import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calcAverageRating } from '../../helpers/functionsHelp';
import StarHalfIcon from '@mui/icons-material/StarHalf';

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
            <Box sx={{ padding: 2, width: '60%' }}>
                <Typography sx={{ fontSize: '1.5em' }}>{user.nick}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>{user.description}</Typography>
                        <Typography>{user.email}</Typography>
                        <Typography>{user.posts.length} posts</Typography>
                    </Box>
                    <Box>
                        <Typography>
                            {calcAverageRating(user.rating)} <StarHalfIcon />
                        </Typography>
                        <Typography>
                            {user.followers?.length} followers
                        </Typography>
                        <Typography>{user.follows?.length} follows</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PostFeed;
