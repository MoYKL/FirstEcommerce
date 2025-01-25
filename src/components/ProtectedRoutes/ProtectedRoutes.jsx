
import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoutes(props) {
    if(localStorage.getItem("userToken")){
        return props.children;
    }else{
        return <Navigate to="/login"></Navigate>

    }
}
