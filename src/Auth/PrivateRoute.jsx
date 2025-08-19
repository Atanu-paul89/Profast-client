import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();

    if(loading){
        return <span className="text-green-200 loading loading-dots loading-lg"></span>
    }

    if(!user){
        <Navigate to="/auth/signin"></Navigate>
    }
    return children;
};

export default PrivateRoute;