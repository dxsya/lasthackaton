import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddContentPage from '../pages/AddContentPage';
import AuthPage from '../pages/AuthPage';
import FeedPage from '../pages/FeedPage';
import PostDetailsPage from '../pages/PostDetailsPage';
import PostEditPage from '../pages/PostEditPage';
import ProfileCreatePage from '../pages/ProfileCreatePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import ProfilePage from '../pages/ProfilePage';

const MainRoutes = () => {
    const PUBLIC_ROUTES = [
        { link: '/', element: <FeedPage />, id: 1 },
        { link: '/auth', element: <AuthPage />, id: 2 },
        { link: '/profileEdit', element: <ProfileCreatePage />, id: 3 },
        { link: '/profile/:id', element: <ProfilePage />, id: 4 },
        { link: '/addContent/:id', element: <AddContentPage />, id: 5 },
        { link: '/profile/:id/post/:id', element: <PostDetailsPage />, id: 6 },
        {
            link: '/profile/:id/post/edit/:id',
            element: <PostEditPage />,
            id: 7,
        },
        {
            link: '/profile/:id/editProfile',
            element: <ProfileEditPage />,
            id: 7,
        },
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
            </Routes>
        </>
    );
};

export default MainRoutes;
