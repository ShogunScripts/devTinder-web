import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
    const [firstName, setFirstName] = useState("")    //state variables
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [about, setAbout] = useState("")
    const dispatch = useDispatch()
    
    return(
        <div className="flex justify-center my-20">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                  <h2 className="card-title flex justify-center">Edit Profile</h2>
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
                            value={lastName} 
                            className="input" 
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </fieldset>
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
                  <div>
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
                  <div>
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
                  <div className="card-actions justify-center my-3">
                    <button className="btn">
                        Save Profile
                    </button>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile