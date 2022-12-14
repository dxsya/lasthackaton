import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../contexts/UsersContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContextProvider';
import Post from '../Post/Post';

const ProfileShow = () => {
    const { userInfo, getUserInfo } = useUsers();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        getUserInfo(id);
    }, [id]);
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
                                    <Button
                                        sx={{
                                            color: 'white',
                                            border: '1px solid #aeaeae',
                                            fontSize: '12px',
                                            paddingX: 4,
                                            height: '30px',
                                        }}
                                    >
                                        follow
                                    </Button>
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
                                <Typography>
                                    {userInfo.followers} followers
                                </Typography>
                                <Typography>
                                    {userInfo.follows} follows
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>{userInfo.description}</Typography>
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
