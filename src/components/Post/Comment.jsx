import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const Comment = ({ comment, id, post, userSession }) => {
    const { user } = useAuth();
    const { users, updateUser } = useUsers();
    const { post_id } = useParams();
    const userAuthorized = users.find(
        (oneUser) => oneUser.email === user.email
    );
    const [updatedUser, setUpdatedUser] = useState({ ...userSession });
    const navigate = useNavigate();
    function deleteComment(id) {
        post.comments.splice(id, 1);
        userSession.posts.splice(post_id, post);
        setUpdatedUser(userSession);
        updateUser(userSession.id, updatedUser);
    }
    return (
        <Box sx={{ color: 'white' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: 1,
                    justifyContent: 'space-between',
                }}
            >
                <img
                    src={comment.avatar}
                    alt=""
                    width={'40px'}
                    height={'40px'}
                    style={{ borderRadius: '50%' }}
                    onClick={() => navigate(`/profile/${comment.id}`)}
                />
                <Box sx={{ paddingX: 2, borderRight: '1px solid #262627' }}>
                    <Typography sx={{ fontSize: '15px' }}>
                        {comment.nick}
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: 'gray' }}>
                        {comment.date}
                    </Typography>
                </Box>
                <Typography sx={{ pl: 2, width: '50%' }}>
                    {comment.text}
                </Typography>
            </Box>

            {userAuthorized.nick == comment.nick ? (
                <Button
                    sx={{ fontSize: '10px', padding: 0 }}
                    onClick={() => deleteComment(id)}
                >
                    delete
                </Button>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default Comment;
