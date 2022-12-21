import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calcAverageRating } from '../../helpers/functionsHelp';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const PostFeed = (props) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: { xs: 'block', sm: 'flex', md: 'flex' },
                border: '0.5px solid #262627',
                width: { xs: '100%', sm: '85%', md: '70%' },
                margin: {
                    xs: '2px 0',
                    sm: '10px auto',
                    md: '10px auto',
                },
                color: 'white',
                alignItems: 'center',
            }}
            onClick={() => navigate(`/profile/${props.hit.id}`)}
        >
            <img
                src={props.hit.avatar}
                alt=""
                width={'150px'}
                height={'150px'}
                className="avatarInFeed"
            />
            <Box sx={{ padding: 1, width: '60%', marginLeft: { xs: '20px' } }}>
                <Typography sx={{ fontSize: '1.5em' }}>
                    {props.hit.nick}
                </Typography>
                <Box
                    sx={{
                        display: { sm: 'block', md: 'flex' },
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography>{props.hit.description}</Typography>
                        <Typography>{props.hit.email}</Typography>
                        <Typography>{props.hit.posts.length} posts</Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                            }}
                        >
                            {calcAverageRating(props.hit.rating)}{' '}
                            <StarHalfIcon />
                        </Typography>
                        <Typography>
                            {props.hit.followers?.length} followers
                        </Typography>
                        <Typography>
                            {props.hit.follows?.length} follows
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PostFeed;
