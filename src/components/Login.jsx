import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("putofputin@gmail.com")
    const [password, setPassword] = useState("Putin@123")
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

    return(
        <div className="flex justify-center my-20">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                  <h2 className="card-title">Login</h2>
                  <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID?</legend>
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
                        <legend className="fieldset-legend">Password?</legend>
                        <input 
                            type="text"
                            value={password} 
                            className="input" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                  </div>
                  <p className="text-red-700">{error}</p>
                  <div className="card-actions justify-center my-3">
                    <button className="btn" onClick={handleLogin}>
                        Login
                    </button>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Login;