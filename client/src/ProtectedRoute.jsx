import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const uid= document.getElementById("uid");
    
    const myUid=2255;
    // console.log(uid);

        if(myUid!=uid.value){ 
            // const err= document.getElementsByClassName("error").setAttribute("id","errorPop");
            // console.log(err);   
            return <Navigate to='/' /> ;
        }
        return <Outlet />
    
    
            // return <Navigate to='/' /> ;
}


