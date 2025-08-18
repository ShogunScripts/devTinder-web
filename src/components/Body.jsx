import { Outlet, useNavigate } from "react-router-dom";
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
    const userData = useSelector((store) => store.user)

    // const [loading, setLoading] = useState(true);

    
    const fetchUser = async () => {
        // if (userData && Object.keys(userData).length > 0) {  //if userdata is present in store, dont make the following fetch API call
        //   setLoading(false);
        //   return;
        // }

        if(userData)    return;

        try {
            const res = await axios.get(BASE_URL+"/profile/view", {
                withCredentials : true,
            })
            dispatch(addUser(res.data))
            // setLoading(false);
        } catch (err) {
            if(err.response?.status === 401){
                navigate("/login", { replace: true })
            }else {
                console.error(err);
            }
            // setLoading(false);
        }

    }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body