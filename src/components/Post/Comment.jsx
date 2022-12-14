import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const Comment = ({ comment }) => {
    return (
        <Box sx={{ color: 'white' }}>
            <img
                src={comment.avatar}
                alt=""
                width={'50px'}
                height={'50px'}
                style={{ borderRadius: '50%' }}
            />
            <Typography>{comment.date}</Typography>
            <Typography>{comment.nick}</Typography>
            <Typography>{comment.text}</Typography>
            <Button sx={{ fontSize: '10px', padding: 0 }}>delete</Button>
        </Box>
    );
};

export default Comment;
