import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import PostFeed from './PostFeed';

const Feed = () => {
    const { users } = useUsers();
    const allPosts = [];
    const allPostsForShow = [];
    users.map((item) => allPosts.push(item.posts));
    function getAllPosts(posts) {
        for (let post of posts) {
            for (let onePost of post) {
                allPostsForShow.push(onePost);
            }
        }
    }
    getAllPosts(allPosts);
    console.log(allPostsForShow);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {allPostsForShow.map((post, index) => (
                <PostFeed key={index} post={post} />
            ))}
        </Box>
    );
};

export default Feed;
