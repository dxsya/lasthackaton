import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comment from './Comment';

const PostDetails = () => {
    const { users, updateUser } = useUsers();
    const { user } = useAuth();
    const { id } = useParams();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const post = userSession?.posts[id];

    const [date, setDate] = useState('');

    const [comment, setComment] = useState({
        text: '',
        nick: userSession?.nick,
        date: date,
        avatar: userSession?.avatar,
    });
    const handleInp = (e) => {
        setDate(
            new Date().toLocaleTimeString() +
                ' ' +
                new Date().toLocaleDateString()
        );
        let obj = {
            ...comment,
            [e.target.name]: e.target.value,
            nick: userSession.nick,
            date: date,
        };

        setComment(obj);
    };

    function addComment(comment) {
        post.comments.push(comment);
        userSession.posts[id] = post;
        updateUser(userSession.id, userSession);
    }
    console.log(post);
    return (
        <Box
            sx={{
                width: '100%',
                height: '92vh',
                backgroundColor: '#121212',
                paddingTop: 8,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    border: '0.5px solid #aeaeae',
                    width: '70%',
                    height: '90%',
                    margin: ' auto',
                }}
            >
                {userSession ? (
                    <>
                        <Box
                            sx={{
                                width: '55%',
                                backgroundImage: `url(${post.image})`,
                                height: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                borderRight: '0.5px solid #aeaeae',
                            }}
                        ></Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45%',
                                color: 'white',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '10%',
                                    padding: '5px',
                                    borderBottom: '0.5px solid #262627',
                                }}
                            >
                                <img
                                    src={userSession?.avatar}
                                    alt="avatar"
                                    width={'50px'}
                                    height={'50px'}
                                    style={{ borderRadius: '50%' }}
                                />
                                <Typography sx={{ marginLeft: '10px' }}>
                                    {userSession?.nick}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: '10px',
                                    borderBottom: '0.5px solid #262627',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '11px', lineHeight: 1.2 }}
                                >
                                    {post.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '0.5px solid #262627',
                                    height: '330px',
                                    overflow: 'scroll',
                                }}
                            >
                                {post.comments?.map((comment, index) => (
                                    <Comment key={index} comment={comment} />
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    padding: '10px',
                                    borderBottom: '0.5px solid #262627',
                                }}
                            >
                                <FavoriteBorderIcon />
                                <BookmarkBorderIcon />
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <TextField
                                    onChange={handleInp}
                                    name="text"
                                    placeholder="Kомментарий..."
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            color: 'white',
                                        },
                                        '& label.Mui-focused': {
                                            color: 'white',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    sx={{ fontSize: '11px', color: 'white' }}
                                    onClick={() => addComment(comment)}
                                >
                                    Опубликовать
                                </Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress
                            sx={{
                                color: 'white',
                                position: 'absolute',
                                top: '46%',
                                left: '57%',
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PostDetails;
