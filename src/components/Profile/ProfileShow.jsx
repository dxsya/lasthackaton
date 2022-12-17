import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../contexts/UsersContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContextProvider';
import Post from '../Post/Post';
import Followers from './Followers';
import Follows from './Follows';
import ProfileRating from './ProfileRating';
import { calcAverageRating } from '../../helpers/functions';

const ProfileShow = () => {
    const { userInfo, getUserInfo, users, getUsers, updateUser } = useUsers();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        getUserInfo(id);
    }, [id]);
    const userSession = users.find((oneUser) => oneUser.id === id);
    const userAuthorized = users.find(
        (oneUser) => oneUser.email === user.email
    );
    const [userToFollow, setUserToFollow] = useState({ ...userSession });
    const [userWhoFollow, setUserWhoFollow] = useState({ ...userAuthorized });
    useEffect(() => {
        setUserToFollow(userSession);
        setUserWhoFollow(userAuthorized);
    }, [userSession, userAuthorized]);
    //? FOLLOWS
    function setFollow() {
        const follower = {
            nick: userAuthorized.nick,
            avatar: userAuthorized.avatar,
            id: userAuthorized.id,
        };
        const whosFollower = {
            nick: userSession.nick,
            avatar: userSession.avatar,
            id: userSession.id,
        };
        if (userAuthorized.email == undefined) {
            return;
        }
        if (checkFollow() == 0) {
            userSession.followers.push(follower);
            userAuthorized.follows.push(whosFollower);
            setUserToFollow(userSession);
            setUserWhoFollow(userAuthorized);
        } else {
            let splice = checkFollow();
            userSession.followers.splice(splice, 1);
            userAuthorized.follows.splice(splice, 1);
            setUserToFollow(userSession);
            setUserWhoFollow(userAuthorized);
        }

        updateUser(userSession.id, userToFollow);
        updateUser(userAuthorized.id, userWhoFollow);
    }

    function checkFollow() {
        let splice = 0;
        userSession?.followers?.filter((follower, index) => {
            if (follower.nick == userAuthorized.nick) {
                if (index == 0) {
                    splice = -1;
                } else {
                    splice = index;
                }
            }
        });
        return splice;
    }
    //? FOLLOWS
    return (
        <Box sx={{ backgroundColor: '#121212', height: '100vh' }}>
            {userInfo ? (
                <>
                    <Box
                        sx={{
                            width: '60%',
                            margin: '0 auto',
                            color: 'white',
                            display: 'flex',
                            pt: 5,
                        }}
                    >
                        <Box sx={{ width: '30%' }}>
                            <img
                                src={userInfo.avatar}
                                alt=""
                                width={'150px'}
                                height={'150px'}
                                style={{
                                    borderRadius: '50%',
                                    border: '0.01rem solid #aeaeae',
                                }}
                            />
                        </Box>
                        <Box sx={{ width: '70%', margin: '2% auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        marginRight: '20px',
                                    }}
                                >
                                    {userInfo.nick}
                                </Typography>
                                {user.email == userInfo.email ? (
                                    <Button
                                        sx={{
                                            color: 'white',
                                            border: '1px solid #aeaeae',
                                            fontSize: '13px',
                                            paddingX: 5,
                                            height: '30px',
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/profile/${id}/editProfile`
                                            )
                                        }
                                    >
                                        editprofile
                                    </Button>
                                ) : (
                                    <>
                                        {checkFollow() == 0 ? (
                                            <>
                                                {' '}
                                                <Button
                                                    sx={{
                                                        color: 'white',
                                                        border: '1px solid #aeaeae',
                                                        fontSize: '12px',
                                                        paddingX: 4,
                                                        height: '30px',
                                                    }}
                                                    onClick={() => setFollow()}
                                                >
                                                    follow
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    sx={{
                                                        color: 'white',
                                                        border: '1px solid #aeaeae',
                                                        fontSize: '12px',
                                                        paddingX: 4,
                                                        height: '30px',
                                                    }}
                                                    onClick={() => setFollow()}
                                                >
                                                    unfollow
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    marginY: '2%',
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>
                                    {userInfo.posts.length} posts
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ marginRight: '4px' }}>
                                        {userSession?.followers?.length}
                                    </Typography>
                                    <Followers followers={userInfo.followers} />
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ marginRight: '4px' }}>
                                        {userSession?.follows?.length}
                                    </Typography>
                                    <Follows follows={userInfo.follows} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography>{userInfo.description}</Typography>
                                <ProfileRating
                                    userAuthorized={userAuthorized}
                                    userSession={userSession}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: '80%',
                            margin: '0 auto',
                            marginTop: 5,
                            color: 'white',
                            pt: 5,
                            borderTop: '0.01em solid #aeaeae',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}
                    >
                        {userInfo.posts.map((post, index) => (
                            <Post key={index} post={post} index={index} />
                        ))}
                    </Box>
                </>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress
                        sx={{
                            color: 'white',
                            position: 'absolute',
                            top: '45%',
                            left: '60%',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProfileShow;
