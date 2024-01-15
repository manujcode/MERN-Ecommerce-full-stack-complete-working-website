import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsyc } from "../authSlice";
import { Navigate } from "react-router-dom";



function LogOut () {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(signOutAsyc());
    })
    const user =useSelector(selectLoggedInUser);


    return (
        <>
        {!user && <Navigate to='/login'replace={true} ></Navigate>}
        </>

      );
}

export default LogOut ;