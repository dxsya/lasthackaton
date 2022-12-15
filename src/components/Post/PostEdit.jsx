import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../fire';
import { useUsers } from '../../contexts/UsersContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

const PostEdit = () => {
    const [file, setFile] = useState('');
    const [uploadProgress, setUploadProgress] = useState(null);
    const { updateUser, users } = useUsers();
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const [editedPost, setEditedPost] = useState({});
    useEffect(() => {
        setEditedPost(userSession?.posts[id]);
    }, [userSession]);

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, 'posts/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);

                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.log('1');
                            break;
                        case 'storage/canceled':
                            console.log('2');
                            break;

                        case 'storage/unknown':
                            console.log('3');
                            break;
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setEditedPost((prev) => ({
                                ...prev,
                                image: downloadURL,
                            }));
                        }
                    );
                }
            );
        };

        file && uploadFile();
    }, [file]);

    const handleInp = (e) => {
        let obj = { ...editedPost, [e.target.name]: e.target.value };
        setEditedPost(obj);
    };

    function editPost(editedPost) {
        let posts = [...userSession.posts];
        posts.splice(id, 1, editedPost);
        userSession.posts = posts;
        updateUser(userSession.id, userSession);
    }
    return (
        <>
            <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        margin: '0 auto',
                        color: 'white',
                        display: 'flex',
                        paddingY: 2,
                    }}
                >
                    {editedPost ? (
                        <>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    border: '0.5px solid #262627',
                                    padding: 1,
                                    margin: 1,
                                }}
                            >
                                <img
                                    src={editedPost?.image}
                                    alt=""
                                    width={'300px'}
                                    height={'300px'}
                                />
                                <Typography>
                                    {editedPost?.description}
                                </Typography>
                                <Typography>{editedPost?.price}$</Typography>
                            </Box>
                            <TextField
                                type="text"
                                placeholder="price"
                                sx={{ background: 'white', m: 1 }}
                                onChange={handleInp}
                                name="price"
                                value={editedPost?.price || ``}
                            />
                            <TextField
                                type="text"
                                placeholder="descr"
                                sx={{ background: 'white', m: 1 }}
                                onChange={handleInp}
                                name="description"
                                value={editedPost?.description || ``}
                            />
                            <TextField
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                sx={{ background: 'white', m: 1 }}
                                name="image"
                            />
                            {uploadProgress < 100 && null ? (
                                <Button
                                    onClick={() => {
                                        editPost(editedPost);
                                    }}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        m: 1,
                                    }}
                                    disabled
                                >
                                    edit post
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        editPost(editedPost);
                                        navigate(`/profile/${userSession.id}`);
                                    }}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        m: 1,
                                    }}
                                >
                                    edit post
                                </Button>
                            )}
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
            </Box>
        </>
    );
};

export default PostEdit;
