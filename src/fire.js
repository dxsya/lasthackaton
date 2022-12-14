import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    // apiKey: 'AIzaSyAAXE5BR1-yTQYtYREA1XCCJ5c22UFKEt4',
    // authDomain: 'lasthackaton.firebaseapp.com',
    // projectId: 'lasthackaton',
    // storageBucket: 'lasthackaton.appspot.com',
    // messagingSenderId: '850163723543',
    // appId: '1:850163723543:web:99d6a65106896205265b52',

    apiKey: 'AIzaSyC2-25TIXDGROLmNw4UPcnxg84pb0f4LKk',
    authDomain: 'gram-54ed0.firebaseapp.com',
    projectId: 'gram-54ed0',
    storageBucket: 'gram-54ed0.appspot.com',
    messagingSenderId: '1074976652686',
    appId: '1:1074976652686:web:dc87f5f2bca4ca7cd0b8df',
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
export const db = getFirestore(fire);
export const storage = getStorage();
