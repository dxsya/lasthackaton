import algoliasearch from 'algoliasearch';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import Feed from '../components/Feed/Feed';

const searchClient = algoliasearch(
    'L58OKVTC8P',
    '5eed8e161889ee81af4ed97aabbe3e09'
);

const FeedPage = () => {
    return (
        <div>
            <InstantSearch indexName="users" searchClient={searchClient}>
                <Feed />
            </InstantSearch>
        </div>
    );
};

export default FeedPage;
