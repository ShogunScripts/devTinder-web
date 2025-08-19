import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userData = useSelector((store) => store.user)

    
    const fetchUser = async () => {
        if(userData || location.pathname === '/login')    return;

        try {
            const res = await axios.get(BASE_URL+"/profile/view", {
                withCredentials : true,
            })
            dispatch(addUser(res.data))
        } catch (err) {
            if(err.response?.status === 401){
                navigate("/login", { replace: true })
            }else {
                console.error(err);
            }
        }

    }

    
    useEffect(() => {
        fetchUser();
    }, [location.pathname])

    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body