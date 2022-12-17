import React, { createContext, useContext, useReducer } from 'react';
import { WISH } from '../helpers/consts';

const wishContext = createContext();
export function useWish() {
    return useContext(wishContext);
}

const WishContextProvider = ({ children }) => {
    const INIT_STATE = {
        wish: JSON.parse(localStorage.getItem('wish')),
    };

    function reducer(state = INIT_STATE, action) {
        switch (action.type) {
            case WISH.GET_WISH:
                return { ...state, wish: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getWish = () => {
        let wish = JSON.parse(localStorage.getItem('wish'));

        if (!wish) {
            localStorage.setItem('wish', JSON.stringify({ wishlist: [] }));
            wish = { wishlist: [] };
        }
        dispatch({
            type: WISH.GET_WISH,
            payload: wish,
        });
    };

    const addProductToWish = (product) => {
        let wish = JSON.parse(localStorage.getItem('wish'));

        if (!wish) {
            wish = { wishlist: [] };
        }

        let newProduct = {
            item: product,
        };

        let productToFind = wish.wishlist.filter(
            (elem) => elem.item.id === product.id
        );

        if (productToFind.length == 0) {
            wish.wishlist.push(newProduct);
        } else {
            wish.wishlist = wish.wishlist.filter(
                (elem) => elem.item.id !== product.id
            );
        }

        localStorage.setItem('wish', JSON.stringify(wish));
        dispatch({
            type: WISH.GET_WISH,
            payload: wish,
        });
    };

    function deleteWishProduct(id) {
        let wish = JSON.parse(localStorage.getItem('wish'));
        wish.wishlist = wish.wishlist.filter((elem) => elem.item.id !== id);
        localStorage.setItem('wish', JSON.stringify(wish));
        getWish();
        dispatch({
            type: WISH.GET_WISH,
            payload: wish,
        });
    }

    function checkProductInWish(id) {
        let wish = JSON.parse(localStorage.getItem('wish'));
        if (wish) {
            let newWish = wish.wishlist.filter((elem) => elem.item.id == id);
            return newWish.length > 0 ? true : false;
        } else {
            wish = {
                wishItem: [],
            };
        }
    }

    const values = {
        checkProductInWish,
        getWish,
        addProductToWish,
        wish: state.wish,
        deleteWishProduct,
    };
    return (
        <wishContext.Provider value={values}>{children}</wishContext.Provider>
    );
};

export default WishContextProvider;
