import React, { createContext, useContext, useReducer } from 'react';
import { CART } from '../helpers/consts';
import {
    calcSubPrice,
    calcTotalPrice,
    getProductCountInCart,
} from '../helpers/functionsHelp';

const cartContext = createContext();
export function useCart() {
    return useContext(cartContext);
}
const INIT_STATE = {
    cart: JSON.parse(localStorage.getItem('cart')),
    cartLength: getProductCountInCart(),
};

function reducer(state = INIT_STATE, action) {
    switch (action.type) {
        case CART.GET_CART:
            return { ...state, cart: action.payload };
        case CART.GET_CART_LENGTH:
            return { ...state, cartLength: action.payload };
        default:
            return state;
    }
}

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if (!cart) {
            localStorage.setItem(
                'cart',
                JSON.stringify({ posts: [], totalPrice: 0 })
            );
            cart = { posts: [], totalPrice: 0 };
        }
        dispatch({
            type: CART.GET_CART,
            payload: cart,
        });
    };
    const addProductToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if (!cart) {
            cart = {
                posts: [],
                totalPrice: 0,
            };
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: +product.price,
        };

        let productToFind = cart.posts.filter(
            (elem) => elem.item.id === product.id
        );
        if (productToFind.length == 0) {
            cart.posts.push(newProduct);
        } else {
            cart.posts = cart.posts.filter(
                (elem) => elem.item.id !== product.id
            );
        }

        cart.totalPrice = calcTotalPrice(cart.posts);
        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch({
            type: CART.GET_CART,
            payload: cart,
        });
    };

    function deleteCartProduct(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.posts = cart.posts.filter((elem) => elem.item.id !== id);
        cart.totalPrice = calcTotalPrice(cart.posts);
        localStorage.setItem('cart', JSON.stringify(cart));
        getCart();

        dispatch({
            type: CART.GET_CART_LENGTH,
            payload: cart,
        });
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            let newCart = cart.posts.filter((elem) => elem.item.id == id);
            return newCart.length > 0 ? true : false;
        } else {
            cart = {
                product: [],
                totalPrice: 0,
            };
        }
    }

    const values = {
        checkProductInCart,
        getCart,
        addProductToCart,
        cart: state.cart,
        deleteCartProduct,
    };
    return (
        <cartContext.Provider value={values}>{children}</cartContext.Provider>
    );
};

export default CartContextProvider;
