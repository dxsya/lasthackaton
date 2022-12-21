import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../../contexts/UsersContextProvider';
import PostFeed from './PostFeed';
import PostFeedForSort from './PostFeedForSort';

import CircularProgress from '@mui/material/CircularProgress';
import {
    Configure,
    Hits,
    Pagination,
    SearchBox,
} from 'react-instantsearch-dom';
import { MenuItem, Select } from '@mui/material';

const Feed = () => {
    const { users, usersSort } = useUsers();
    const [sort, setSort] = useState('');
    useEffect(() => {
        usersSort(sort);
    }, [sort]);
    users.filter((user) => user.email !== undefined);
    return (
        <Box>
            {users ? (
                <Box
                    sx={{
                        backgroundColor: '#121212',
                        minHeight: '100vh',
                    }}
                >
                    <Box sx={{ width: '90%', margin: '0 auto', paddingY: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: { md: '70%', xs: '100%', xm: '85%' },
                                justifyContent: 'space-between',
                                flexDirection: 'row-reverse',
                                margin: '0 auto',
                            }}
                            className="searchAndFilter"
                        >
                            <Select
                                onChange={(e) => setSort(e.target.value)}
                                value={sort}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'white',
                                    height: '42px',
                                    width: '150px',
                                }}
                            >
                                <MenuItem
                                    sx={{ color: 'black' }}
                                    value={'posts'}
                                >
                                    posts
                                </MenuItem>
                                <MenuItem
                                    sx={{ color: 'black' }}
                                    value={'followers'}
                                >
                                    followers
                                </MenuItem>
                                <MenuItem
                                    sx={{ color: 'black' }}
                                    value={'follows'}
                                >
                                    follows
                                </MenuItem>
                            </Select>
                            <SearchBox
                                translations={{
                                    placeholder: 'search for users',
                                }}
                            />
                        </Box>
                        <Configure hitsPerPage={3} />

                        {sort == '' ? (
                            <Hits id="hit" hitComponent={PostFeed} />
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        width: '90%',
                                        margin: '0 auto',
                                        paddingY: 4,
                                    }}
                                >
                                    {users.map((user, index) => {
                                        if (user.email == undefined) {
                                            return null;
                                        } else {
                                            return (
                                                <PostFeedForSort
                                                    key={index}
                                                    user={user}
                                                />
                                            );
                                        }
                                    })}
                                </Box>
                            </>
                        )}
                        <Pagination
                            className="pagination"
                            defaultRefinement={2}
                        />
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress
                        sx={{
                            color: 'white',
                            position: 'absolute',
                            top: '45%',
                            left: '60%',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Feed;
