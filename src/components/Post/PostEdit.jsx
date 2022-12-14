import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../fire';
import { useUsers } from '../../contexts/UsersContextProvider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';

const PostEdit = () => {
    const [file, setFile] = useState('');
    const [uploadProgress, setUploadProgress] = useState(null);
    const { updateUser, users } = useUsers();
    const { user } = useAuth();
    const { id } = useParams();

    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const [editedPost, setEditedPost] = useState({});
    useEffect(() => {
        setEditedPost(userSession?.posts[id]);
    }, [userSession]);
    console.log(userSession, editedPost);

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
        <Box sx={{ backgroundColor: '#262627', minHeight: '100vh' }}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}
            >
                <TextField
                    type="text"
                    placeholder="price"
                    sx={{ background: 'white' }}
                    onChange={handleInp}
                    name="price"
                    value={editedPost?.price || ``}
                />
                <TextField
                    type="text"
                    placeholder="descr"
                    sx={{ background: 'white' }}
                    onChange={handleInp}
                    name="description"
                    value={editedPost?.description || ``}
                />
                <TextField
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    sx={{ background: 'white' }}
                    name="image"
                />
                <Button
                    onClick={() => {
                        editPost(editedPost);
                        console.log(editedPost);
                    }}
                >
                    edit post
                </Button>
            </Box>
        </Box>
    );
};

export default PostEdit;
