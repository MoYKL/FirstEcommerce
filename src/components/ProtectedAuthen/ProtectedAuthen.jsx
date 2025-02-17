import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedAuthen(props) {
    if (localStorage.getItem("userToken")){
        return <Navigate to="/"></Navigate>
    }else{
        return props.children
    }
}
