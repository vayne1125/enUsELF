import React, {createContext, useState, useRef, useEffect} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Card } from 'react-native-paper';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
            user,
            setUser,
            login: async(email, password, setMess, update) => {
                try {
                    await auth().signInWithEmailAndPassword(email, password)
                    .then(()=>{
                        if(update){
                            auth().currentUser.updatePassword(update)
                            .then(() => {setMess('success')})
                            .catch((error)=>{setMess(error.code)})
                        }
                        else setMess('success')   
                    })
                    .catch((error) => {setMess(error.code);})
                }
                catch(error){
                    setMess(error.code);
                    console.log(error);
                }
            },
            register: async(username, email, password, setMess) => {
                try {
                    await auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        //Once the user creation has happened successfully, we can add the currentUser into firestore
                        //with the appropriate details.
                        firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            name: username,
                            email: email,
                            createdAt: firestore.Timestamp.fromDate(new Date()),
                            userImg: '',
                        })
                        //ensure we catch any errors at this stage to advise us if something does go wrong
                        .catch(error => {
                            setMess(error.code);
                            console.log('Something went wrong with added user to firestore: ', error);
                        })
                        setMess('success');
                    })
                    //we need to catch the whole sign up process if it fails too.
                    .catch(error => {
                        setMess(error.code);
                        console.log('Something went wrong with sign up: ', error);
                    });
                }
                catch (error) {
                    setMess(error.code);
                    console.log(error);
                }
            },
            logout: async() => {
                try {
                    await auth().signOut();
                }
                catch (error) {
                    console.log('logout: ',error);
                }
            },
            forget: async(email, setMess1) => {
                try{
                    await auth().sendPasswordResetEmail(email)
                    .then(()=>{setMess1('success');})
                    .catch((error)=>{setMess1(error.code)});
                }
                catch(error){console.log(error.code)};
            }
        }}
            >{children}
        </AuthContext.Provider>
    );
};