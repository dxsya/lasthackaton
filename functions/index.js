// const functions = require("firebase-functions");
// const algoliasearch = require("algoliasearch");
import * as functions from 'firebase-functions';

import algoliasearch from 'algoliasearch';

const env = functions.config();

const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex('users');

export const onAuthorCreated = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, ctx) => {
        return index.saveObject({
            objectID: snap.id,
            ...snap.data(),
        });
    });

export const onAuthorDeleted = functions.firestore
    .document('users/{userId}')

    .onDelete((snap, ctx) => {
        return index.deleteObject(snap.id);
    });

export const onAuthorUpdate = functions.firestore
    .document('users/{userId}')

    .onUpdate((change) => {
        const newData = change.after.data();
        newData.objectID = change.after.id;
        return index.saveObject(newData);
    });
