import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comment from './Comment';

const PostDetails = () => {
    const { users, updateUser } = useUsers();
    const { id, post_id } = useParams();
    const { user } = useAuth();
    const userSession = users.find((oneUser) => oneUser.id === id);
    const userAuthorized = users.find(
        (oneUser) => oneUser.email === user.email
    );
    const post = userSession?.posts[post_id];
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [comment, setComment] = useState({
        text: '',
        nick: userAuthorized?.nick,
        date: date,
        avatar: userAuthorized?.avatar,
        id: userAuthorized?.id,
    });
    useEffect(() => {
        setComment({
            ...comment,
            nick: userAuthorized?.nick,
            avatar: userAuthorized?.avatar,
            id: userAuthorized?.id,
        });
    }, [userAuthorized]);
    const handleInp = (e) => {
        setDate(
            new Date().toLocaleTimeString() +
                ' ' +
                new Date().toLocaleDateString()
        );
        let obj = {
            ...comment,
            [e.target.name]: e.target.value,
            nick: userAuthorized.nick,
            date: date,
        };

        setComment(obj);
    };
    function checkLike(post) {
        let slice = 0;
        post?.likes.filter((like, index) => {
            if (like == userAuthorized.nick) {
                if (index == 0) {
                    slice = -1;
                } else {
                    slice = index;
                }
            }
        });
        return slice;
    }
    function setLike() {
        if (user.email == undefined) {
            return;
        }
        if (checkLike(post) == 0) {
            post.likes.push(userAuthorized.nick);
        } else {
            let splice = checkLike(post);
            post.likes.splice(splice, 1);
        }
        userSession.posts[post_id] = post;
        updateUser(userSession.id, userSession);
    }
    function addComment(comment) {
        post.comments.push(comment);
        userSession.posts[id] = post;
        updateUser(userSession.id, userSession);
    }

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
                                justifyContent: 'space-around',
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
                                    onClick={() =>
                                        navigate(`/profile/${userSession?.id}`)
                                    }
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
                                    <Comment
                                        key={index}
                                        comment={comment}
                                        id={index}
                                        post={post}
                                        userSession={userSession}
                                    />
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    padding: '10px',
                                    borderBottom: '0.5px solid #262627',
                                    display: 'flex',
                                }}
                            >
                                <FavoriteBorderIcon onClick={() => setLike()} />
                                <Typography sx={{ marginRight: '15px' }}>
                                    {post.likes.length}
                                </Typography>
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
                                        width: '65%',
                                    }}
                                />
                                <Button
                                    sx={{
                                        fontSize: '11px',
                                        color: 'white',
                                        width: '35%',
                                    }}
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
