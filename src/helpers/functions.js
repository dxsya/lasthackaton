export function getProductCountInCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart.posts.length : 0;
}

export const calcSubPrice = (post) => +post.count * post.item.price;

export const calcTotalPrice = (posts) => {
    return posts.reduce((acc, curr) => {
        return acc + curr.subPrice;
    }, 0);
};
export const calcAverageRating = (rating) => {
    let avg = rating.reduce((acc, curr) => {
        return acc + +curr.rating;
    }, 0);
    if (rating.length == 0) {
        return 0;
    } else {
        return avg / rating.length;
    }
};
