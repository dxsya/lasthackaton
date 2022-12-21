import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import { calcTotalPrice } from '../../helpers/functionsHelp';
import WishCard from './WishCard';
import { useAuth } from '../../contexts/AuthContextProvider';

const Cart = () => {
    const { getCart, cart } = useCart();
    const { users, getUsers, updateUser } = useUsers();
    const { user } = useAuth();
    useEffect(() => {
        getCart();
        getUsers();
    }, []);
    const navigate = useNavigate();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    let ourCart = cart?.posts.map((item) => item.item);

    function buyCart(users, cart) {
        let userBuys = { ...userSession };
        let buys = [];
        let fromWhoBuy = [];
        let cartIDs = [];
        for (let user of users) {
            for (let oneCart of cart) {
                if (user.id == oneCart.id.slice(0, 20)) {
                    fromWhoBuy.push(user);
                    cartIDs.push(oneCart.id.slice(21, 22));
                }
            }
        }
        for (let i in fromWhoBuy) {
            let fromWhoBuyUser = { ...fromWhoBuy[i] };
            buys.push({ ...fromWhoBuy[i].posts[cartIDs[i]] });
            let post = { ...fromWhoBuy[i].posts[cartIDs[i]], price: 'sold' };
            fromWhoBuyUser.posts[cartIDs[i]] = post;
            updateUser(fromWhoBuy[i].id, fromWhoBuyUser);
        }
        let oldBuys = userBuys.buys;
        let allBuys = oldBuys.concat(buys);
        userBuys.buys = allBuys;
        updateUser(userSession.id, userBuys);
        localStorage.removeItem('cart');
    }
    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        width: '85%',
                        display: 'flex',
                        margin: '0 auto',
                        overflow: 'scroll',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    {ourCart?.map((oneWish, index) => (
                        <WishCard key={index} wish={oneWish} />
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    width: '80%',
                    border: '5px double white',
                    borderRadius: '10px',
                    margin: '0 auto',
                    marginY: '5%',
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography sx={{ color: 'white' }}>
                    Total Price: {calcTotalPrice(ourCart)}$
                </Typography>

                <Button
                    sx={{
                        color: 'black',
                        backgroundColor: 'white',
                        transition: '100s',
                    }}
                    onClick={() => {
                        navigate('/payment');
                        buyCart(users, ourCart);
                    }}
                >
                    Buy for one click
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
