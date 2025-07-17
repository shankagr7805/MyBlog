import React,{useState , useEffect} from 'react'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({children, authentication}) {
    const navigate = useNavigate() 
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //& To make it easier:-

        //& if(authStatus == true) {
        //&     navigate("/")
        //& } else if(authStatus == false) {
        //&     navigate("/login")
        //& }

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
return loader ? <h1>Loading...</h1> : <>{children}</> ;
}
