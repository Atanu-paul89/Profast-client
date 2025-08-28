import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updatePassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosSecure from '../hooks/useAxiosSecure';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

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

    // sign in with Google // 
    const signinGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // SIgn Out user // 
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // Reset password // 
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // Update the password from profile //
    const updateUserPassword = (newPassword) => {
        if (auth.currentUser) {
            return updatePassword(auth.currentUser, newPassword);
        }
        return Promise.reject("No user is logged in");
    };

    // Update user profile
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

    // Save users data to DB //
    const saveUserToDB = async (userData) => {
        try {
            const res = await axiosSecure.post('/users', userData);
            return res.data;
        } catch (err) {
            console.error("Error saving user to DB", err);
        }
    };


    // watching the user // 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    // values // 
    const authInfo = {
        user,
        loading,
        createUser,
        signinUser,
        logOut,
        signinGoogle,
        updateUserPassword,
        resetPass,
        updateUserProfile,
        saveUserToDB,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;