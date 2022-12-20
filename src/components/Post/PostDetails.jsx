import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comment from './Comment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../contexts/CartContextProvider';
import { useWish } from '../../contexts/WishContextProvider';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const PostDetails = () => {
    const { users, updateUser } = useUsers();
    const { id, post_id } = useParams();
    const { user } = useAuth();
    const { addProductToCart, checkProductInCart } = useCart();
    const { addProductToWish, checkProductInWish } = useWish();
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

    const views = post?.views;
    const refId = useRef(null);

    async function addOneView() {
        // console.log(views);
        // let postObj = { ...userSession?.posts[post_id], views: views + 1 };
        // setPostView((prev) => ({
        //     ...userSession.posts[post_id],
        //     ...prev,
        //     views: views + 1,
        // }));
        // if (refId) {
        let userObj = { ...userSession };
        userObj.posts?.splice(post_id, 1, {
            ...userSession?.posts[post_id],
            views: views + 1,
        });
        refId.current = userObj;
        // console.log(userObj);
        // setUserNewView(userObj);
        // setTimeout(() => {

        // });
        // }s

        // console.log(postObj);
        // console.log(postView);
    }
    // useEffect(() => {
    //     if (userNewView) {
    //         console.log(userNewView);
    //         updateUser(id, userNewView);
    //     }
    // }, [userNewView]);

    useEffect(() => {
        return () => {
            addOneView().then(() => {
                updateUser(id, refId.current);
            });
        };
    }, []);

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
    const postForCart = { ...post, id: `${id}_${post_id}` };
    console.log(postForCart);
    return (
        <Box
            sx={{
                width: '100%',
                height: '92vh',
                backgroundColor: '#121212',
                paddingTop: 8,
            }}
        >
            <Typography
                sx={{
                    color: 'white',
                    ml: '15%',
                    mb: 1,
                    fontSize: '20px',
                }}
            >
                Price: {post?.price}$
            </Typography>

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
                                backgroundImage: `url(${post?.image})`,
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
                                    fontSize: '8px',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '12px', lineHeight: 1.2 }}
                                >
                                    {post?.description}
                                </Typography>
                                {post?.date}
                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '0.5px solid #262627',
                                    height: '330px',
                                    overflow: 'scroll',
                                }}
                            >
                                {post?.comments?.map((comment, index) => (
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
                                    {post?.likes?.length}
                                </Typography>
                                <VisibilityOutlinedIcon />
                                <Typography sx={{ marginRight: '15px' }}>
                                    {post?.views}
                                </Typography>
                                {checkProductInWish(postForCart.id) ? (
                                    <BookmarkIcon
                                        onClick={() => {
                                            addProductToWish(postForCart);
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorderIcon
                                        onClick={() => {
                                            addProductToWish(postForCart);
                                        }}
                                    />
                                )}
                                {postForCart.price == 'sold' ? (
                                    <RemoveShoppingCartIcon sx={{ ml: 1 }} />
                                ) : (
                                    <>
                                        {checkProductInCart(postForCart.id) ? (
                                            <ShoppingCartIcon
                                                sx={{ ml: 1 }}
                                                onClick={() => {
                                                    addProductToCart(
                                                        postForCart
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <ShoppingCartOutlinedIcon
                                                sx={{ ml: 1 }}
                                                onClick={() => {
                                                    addProductToCart(
                                                        postForCart
                                                    );
                                                }}
                                            />
                                        )}
                                    </>
                                )}
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
