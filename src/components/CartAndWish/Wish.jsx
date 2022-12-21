import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useWish } from '../../contexts/WishContextProvider';
import WishCard from './WishCard';
const Wish = () => {
    const { getWish, wish } = useWish();
    useEffect(() => {
        getWish();
    }, []);

    let ourWish = wish?.wishlist?.map((item) => item.item);
    return (
        <Box
            sx={{
                backgroundColor: '#121212',
                padding: 2,
                height: '96vh',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {ourWish?.map((oneWish, index) => (
                <WishCard key={index} wish={oneWish} />
            ))}
        </Box>
    );
};

export default Wish;
