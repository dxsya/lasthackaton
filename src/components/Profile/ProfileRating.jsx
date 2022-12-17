import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { useUsers } from '../../contexts/UsersContextProvider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { calcAverageRating } from '../../helpers/functions';
import { Typography } from '@mui/material';

export default function ProfileRating() {
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
        updateUser(id, userRating);
    };

    function checkRating() {
        let obj = userSession?.rating?.filter(
            (item) => item.user == userAuthorized.nick
        );
        return obj.length;
    }
    let checkRatingUser = checkRating();
    return (
        <Box sx={{ backgroundColor: 'white', width: '40%', display: 'flex' }}>
            <Stack spacing={1}>
                {checkRatingUser == 0 ? (
                    <Rating
                        sx={{ margin: '0 auto' }}
                        name="half-rating"
                        defaultValue={calcAverageRating(userSession?.rating)}
                        precision={0.1}
                        onChange={(e) => handleRating(e)}
                    />
                ) : (
                    <Rating
                        sx={{ margin: '0 auto' }}
                        name="half-rating"
                        defaultValue={calcAverageRating(userSession?.rating)}
                        precision={0.1}
                        onChange={(e) => handleRating(e)}
                        readOnly
                    />
                )}
            </Stack>
            <Typography sx={{ color: 'black' }}>
                {calcAverageRating(userSession?.rating)}☆
            </Typography>
        </Box>
    );
}
