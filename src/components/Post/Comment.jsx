import { Box } from '@mui/material';
import React from 'react';

const Comment = ({ comment }) => {
    return (
        <Box sx={{ color: 'white' }}>
            {comment.text}
            <img src={comment.avatar} alt="" />
        </Box>
    );
};

export default Comment;
