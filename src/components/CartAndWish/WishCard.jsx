import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useUsers } from '../../contexts/UsersContextProvider';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWish } from '../../contexts/WishContextProvider';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useCart } from '../../contexts/CartContextProvider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const WishCard = ({ wish, getAuthor }) => {
    const { getUsers, users } = useUsers();

    const { addProductToWish, checkProductInWish } = useWish();
    const { addProductToCart, checkProductInCart } = useCart();
    const author = users.find((oneUser) => oneUser.id == wish.id.slice(0, 20));
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box sx={{ margin: 0 }}>
            <Box
                sx={{
                    margin: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'white',
                    border: '0.5px solid #262627',
                    borderRadius: '12px',
                    padding: 1,
                }}
            >
                <img
                    src={wish.image}
                    width={260}
                    height={260}
                    onClick={() =>
                        navigate(
                            `/profile/${wish.id.slice(
                                0,
                                20
                            )}/post/${wish.id.slice(21, 22)}`
                        )
                    }
                />
                <Typography>Artist: {author?.nick}</Typography>
                <Typography>Price: {wish.price}$</Typography>
                <Box sx={{ display: 'flex' }}>
                    <FavoriteBorderIcon />
                    <Typography>{wish.likes.length}</Typography>
                    <VisibilityOutlinedIcon sx={{ ml: 1.5 }} />
                    <Typography sx={{ mr: 1.5 }}>{wish.views}</Typography>
                    {checkProductInWish(wish.id) ? (
                        <BookmarkIcon
                            onClick={() => {
                                addProductToWish(wish);
                            }}
                        />
                    ) : (
                        <BookmarkBorderIcon
                            onClick={() => {
                                addProductToWish(wish);
                            }}
                        />
                    )}
                    {checkProductInCart(wish.id) ? (
                        <ShoppingCartIcon
                            sx={{ ml: 1 }}
                            onClick={() => {
                                addProductToCart(wish);
                            }}
                        />
                    ) : (
                        <ShoppingCartOutlinedIcon
                            sx={{ ml: 1 }}
                            onClick={() => {
                                addProductToCart(wish);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default WishCard;
