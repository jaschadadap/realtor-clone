import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PrivateRoute() {
  const {loggedIn, checkingStatus} = useAuthStatus()
  if (checkingStatus) {
    return <Spinner />
  }
  console.log(loggedIn)
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
