import { Box } from '@mui/material';
import React from 'react';

const PostFeed = ({ post }) => {
    return (
        <Box>
            <img src={post.image} alt="" width={'400px'} />
        </Box>
    );
};

export default PostFeed;
