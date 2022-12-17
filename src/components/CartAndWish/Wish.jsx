import React, { useEffect } from 'react';
import { useWish } from '../../contexts/WishContextProvider';
const Wish = () => {
    const { getWish, wish } = useWish();
    useEffect(() => {
        getWish();
    }, []);
    
    return <div>wish</div>;
};

export default Wish;
