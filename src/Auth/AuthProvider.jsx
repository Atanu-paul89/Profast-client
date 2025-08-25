import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register USer// 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user //
    const signinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //sign in with Google // 
    const signinGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    //SIgn Out user // 
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    //Reset password // 
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // 🔹 Update user profile (displayName, photoURL)
    const updateUserProfile = (profileData) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, profileData)
                .then(() => {
                    // update local user state also
                    setUser({
                        ...auth.currentUser,
                        ...profileData
                    });
                });
        }
        return Promise.reject("No user is logged in");
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    //values // 
    const authInfo = {
        user,
        loading,
        createUser,
        signinUser,
        logOut,
        signinGoogle,
        resetPass,
        updateUserProfile,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;