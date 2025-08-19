import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [isLoginForm, setLoginForm] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", 
                {emailId,password}, 
                {withCredentials:true}
            )

            dispatch(addUser(res.data))
            return navigate('/')
        } catch (err) {
            setError(err.response?.data || "Something went wrong!")
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL+"/signup",
                {firstName, lastName, emailId, password},
                {withCredentials : true}
            )
            dispatch(addUser(res.data));
            return navigate('/profile/edit')
        } catch (err) {
            
        }
    }

    return(
        <div className="flex justify-center my-5">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                  <h2 className="flex justify-center card-title">
                    {isLoginForm ? "Login" : "Signup"}
                  </h2>
                    {!isLoginForm && (
                        <>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input 
                                        type="text" 
                                        value = {firstName}
                                        className="input" 
                                        placeholder="First Name" 
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input 
                                        type="text" 
                                        value = {lastName}
                                        className="input" 
                                        placeholder="Last Name" 
                                        onChange = {(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                        </>
                    )}
                  <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input 
                            type="text" 
                            value = {emailId}
                            className="input" 
                            placeholder="mail@site.com" 
                            onChange = {(e) => setEmailId(e.target.value)}
                        />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input 
                            type="password"
                            value={password} 
                            className="input" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                  </div>
                  <p className="text-red-700">{error}</p>
                  <div className="card-actions justify-center my-3">
                    <button className="btn" 
                        onClick={isLoginForm? handleLogin : handleSignup}>
                        {isLoginForm ? "Login" : "Signup"}
                    </button>
                  </div>

                  <p className="flex justify-center cursor-pointer" onClick={() => setLoginForm((value) => !value)}>
                    {isLoginForm
                        ? "New User? Signup Here"
                        : "Existing User? Login Here"}
                  </p>
                </div>
            </div>
        </div>
    )
}

export default Login;