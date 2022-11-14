import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, } from 'react-router-dom';

const UserRoutes = () => {
    const { user } = useSelector((state) => state.authReducer);

    return (user.userType === "user") ? (
        <Outlet to='/dashboard' />
    ) : (
        <Navigate to='/' />
    )
}
export default UserRoutes