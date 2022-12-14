import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../fire';
import { useUsers } from '../../contexts/UsersContextProvider';
import { useParams } from 'react-router-dom';

const AddContent = () => {
    const [file, setFile] = useState('');
    const [uploadProgress, setUploadProgress] = useState(null);
    const [post, setPost] = useState({
        description: '',
        price: 0,
        image: '',
        likes: [],
        comments: [],
        views: 0,
    });
    const { userInfo, getUserInfo, updateUser } = useUsers();
    const { id } = useParams();
    useEffect(() => {
        getUserInfo(id);
    }, []);
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
                            setPost((prev) => ({
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
        let obj = { ...post, [e.target.name]: e.target.value };
        setPost(obj);
    };
    // const [updatedUser, setUpdatedUser] = useState({ ...userInfo });

    function addPost(newPost) {
        let user = { ...userInfo };
        user.posts.push(newPost);
        // setUpdatedUser(user);
        updateUser(id, user);
    }
    return (
        <Box
            sx={{
                backgroundColor: '#262627',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                    height: '100%',
                    margin: 'auto',
                    justifyContent: 'center',
                }}
            >
                <TextField
                    type="number"
                    placeholder="price"
                    sx={{
                        background: 'white',
                        width: '60%',
                        margin: '2% auto',
                    }}
                    onChange={handleInp}
                    name="price"
                />
                <TextField
                    type="text"
                    placeholder="descr"
                    sx={{
                        background: 'white',
                        width: '60%',
                        margin: '2% auto',
                    }}
                    onChange={handleInp}
                    name="description"
                />
                <TextField
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    sx={{
                        background: 'white',
                        width: '60%',
                        margin: '2% auto',
                    }}
                    name="image"
                />
                <Button onClick={() => addPost(post)}>add post</Button>
            </Box>
        </Box>
    );
};

export default AddContent;
