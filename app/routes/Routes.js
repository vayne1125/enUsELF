import React, { useContext, useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AutoProvider';

import Home from '../nav/Home';
import Launcher from '../launcher/Launcher';
import Unverified from '../launcher/Unverified';

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const [home, setHome] = useState(false);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(()=>{
        if( user && user.emailVerified){
            setHome(true)
        }
    }, [user]);

    

    if (initializing) return null;

    return (
        <NavigationContainer>
            { user? (home? <Home /> : <Unverified/>) : <Launcher /> }
        </NavigationContainer>
     );
};

export default Routes;