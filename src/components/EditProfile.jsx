import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import UserCard from "./UserCard"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import axios from "axios"

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName)    //state variables
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [profileURL, setProfileURL] = useState(user.profileURL)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch()

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL+"/profile/edit",
                {firstName, lastName, profileURL, age, gender, about},
                {withCredentials : true}
            )
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (err) {
            setError(err.message)
        }
    }

    
    return(
        <>
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                  <h2 className="card-title flex justify-center">Edit Profile</h2>
                  <div className="flex justify-center">
                    <div className="flex mr-5">
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
                    <div className="flex mr-5">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input 
                                type="text"
                                value={lastName} 
                                className="input" 
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>
                    </div>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About</legend>
                        <input 
                            type="text"
                            value={about} 
                            className="input" 
                            placeholder="About"
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </fieldset>
                  </div>
                  <div className="flex justify-center">
                    <div className="mr-5">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input 
                                type="text"
                                value={age} 
                                className="input" 
                                placeholder="Age"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="mr-5">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input 
                                type="text"
                                value={gender} 
                                className="input" 
                                placeholder="Age"
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </fieldset>
                    </div>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Profile Photo</legend>
                        <input 
                            type="text"
                            value={profileURL} 
                            className="input" 
                            placeholder="Photo URL"
                            onChange={(e) => setProfileURL(e.target.value)}
                        />
                    </fieldset>
                  </div>
                  <p className="text-red-700">{error}</p>
                  <div className="card-actions justify-center my-3">
                    <button className="btn btn-soft btn-success" onClick={saveProfile}>
                        Save Profile
                    </button>
                  </div>
                </div>
            </div>
            </div>
            <div className="my-10">
                <UserCard  user={{firstName, lastName, age, gender, about, profileURL}}/>
            </div>
        </div>
        {showToast && <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved successfully.</span>
            </div>
        </div>}
        </>
        
    )
}

export default EditProfile