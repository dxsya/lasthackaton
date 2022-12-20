import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { useUsers } from '../contexts/UsersContextProvider';
import AddContentPage from '../pages/AddContentPage';
import AuthPage from '../pages/AuthPage';
import CartPage from '../pages/CartPage';
import FeedPage from '../pages/FeedPage';
import PaymentPage from '../pages/PaymentPage';
import PostDetailsPage from '../pages/PostDetailsPage';
import PostEditPage from '../pages/PostEditPage';
import ProfileCreatePage from '../pages/ProfileCreatePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import ProfilePage from '../pages/ProfilePage';
import WishPage from '../pages/WishPage';

const MainRoutes = () => {
    const { users } = useUsers();
    const { user } = useAuth();
    const userSession = users.find((oneUser) => oneUser.email === user.email);
    const PRIVATE_ROUTES = [
        { link: '/addContent/:id', element: <AddContentPage />, id: 5 },
        {
            link: '/profile/:id/post/edit/:id',
            element: <PostEditPage />,
            id: 7,
        },
        {
            link: '/profile/:id/editProfile',
            element: <ProfileEditPage />,
            id: 8,
        },
    ];
    const PUBLIC_ROUTES = [
        { link: '/', element: <FeedPage />, id: 1 },
        { link: '/auth', element: <AuthPage />, id: 2 },
        { link: '/profileCreate', element: <ProfileCreatePage />, id: 3 },
        { link: '/profile/:id', element: <ProfilePage />, id: 4 },
        {
            link: '/profile/:id/post/:post_id',
            element: <PostDetailsPage />,
            id: 6,
        },
        {
            link: '*',
            element: <h1>not found oage</h1>,
            id: 7,
        },

        {
            link: '/wish',
            element: <WishPage />,
            id: 9,
        },
        {
            link: '/cart',
            element: <CartPage />,
            id: 10,
        },
        { link: '/payment', element: <PaymentPage />, id: 11 },
    ];
    return (
        <>
            <Routes>
                {PUBLIC_ROUTES.map((item) => (
                    <Route
                        path={item.link}
                        element={item.element}
                        key={item.id}
                    />
                ))}

                {user
                    ? PRIVATE_ROUTES.map((item) => (
                          <Route
                              key={item.id}
                              path={item.link}
                              element={
                                  user?.email === userSession?.email ? (
                                      item.element
                                  ) : (
                                      <Navigate replace to="*" />
                                  )
                              }
                          />
                      ))
                    : null}
            </Routes>
        </>
    );
};

export default MainRoutes;
