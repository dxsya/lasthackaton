import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const Post = ({ post, index }) => {
    const { id } = useParams();
    const { user } = useAuth();
    const { userInfo, getUserInfo, updateUser } = useUsers();
    useEffect(() => {
        getUserInfo(id);
    }, []);

    function deletePost(index) {
        let newUser = { ...userInfo };
        newUser.posts.splice(index, 1);
        updateUser(id, newUser);
    }

    const navigate = useNavigate();
    return (
        <Box sx={{ margin: 1.5, display: 'flex', flexDirection: 'column' }}>
            <img
                src={post.image}
                width={250}
                height={250}
                onClick={() => navigate(`/profile/${id}/post/${index}`)}
            />
            {/* <Typography>{post.description}</Typography> */}
            {userInfo.email == user.email ? (
                <>
                    <Button onClick={() => deletePost(index)}>delete</Button>
                    <Button onClick={() => navigate(`post/edit/${index}`)}>
                        edit
                    </Button>
                </>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default Post;
