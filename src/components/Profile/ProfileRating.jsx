import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { useUsers } from '../../contexts/UsersContextProvider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { calcAverageRating } from '../../helpers/functionsHelp';
import { Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import StarHalfIcon from '@mui/icons-material/StarHalf';
export default function ProfileRating() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { updateUser, users, getUsers, getUserInfo } = useUsers();
    const { user } = useAuth();
    const { id } = useParams();
    React.useEffect(() => {
        getUsers();
    }, []);
    React.useEffect(() => {
        getUserInfo(id);
    }, [id]);
    const userSession = users.find((oneUser) => oneUser.id === id);
    const userAuthorized = users.find(
        (oneUser) => oneUser.email === user.email
    );

    const [userRating, setUserRating] = React.useState({});
    const handleRating = (e) => {
        let newRating = { user: userAuthorized.nick, rating: e.target.value };
        let obj = { ...userSession };
        obj.rating.push(newRating);
        setUserRating(obj);
    };
    const handleClick = () => {
        updateUser(id, userRating);
    };
    function checkRating() {
        let obj = userSession?.rating?.filter(
            (item) => item.user == userAuthorized.nick
        );
        return obj.length;
    }
    let checkRatingUser = checkRating();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 240,
        bgcolor: 'white',
        border: '2px solid #aeaeae',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Box onClick={handleOpen} sx={{ display: 'flex', mt: 1 }}>
                <Typography sx={{ mr: '5px' }}>
                    {calcAverageRating(userSession?.rating)}
                </Typography>
                <StarHalfIcon />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 2, fontWeight: 600 }}>
                        RATE AUTHOR
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            display: 'flex',
                        }}
                    >
                        {' '}
                        <Stack spacing={1}>
                            {checkRatingUser == 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Rating
                                        sx={{ margin: '0 auto' }}
                                        name="size-large"
                                        defaultValue={
                                            calcAverageRating(
                                                userSession?.rating
                                            ) || 0
                                        }
                                        precision={0.1}
                                        onChange={(e) => handleRating(e)}
                                    />
                                    <Button
                                        onClick={() => handleClick()}
                                        sx={{
                                            color: 'black',
                                            border: '0.5x solid #262627',
                                            ml: 2,
                                        }}
                                    >
                                        rate
                                    </Button>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Rating
                                        sx={{ margin: '0 auto' }}
                                        name="half-rating"
                                        defaultValue={
                                            calcAverageRating(
                                                userSession?.rating
                                            ) || 0
                                        }
                                        precision={0.1}
                                        readOnly
                                    />
                                    <Button
                                        sx={{
                                            color: 'black',
                                            border: '0.5px solid #262627',
                                            ml: 2,
                                        }}
                                        onClick={() => {
                                            handleClick();
                                            handleClose();
                                        }}
                                    >
                                        rate
                                    </Button>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
