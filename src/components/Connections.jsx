import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice";
import axios from "axios";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections", {
                withCredentials : true
            })
            console.log(res)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        fetchConnections()
    }, [])

    if(!connections)    return;

    if(connections.length === 0)   return <h1 className="text-center font-bold">No connections found.</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

            {connections.map((connection) =>{
                const {_id, firstName, lastName, profileURL, age, gender, about} = connection;

                return (
                    <div 
                        key={_id} 
                        className="flex m-4 p-4 rounded-lg bg-neutral w-1/2 mx-auto">
                        <div>
                            <img 
                                alt="photo" 
                                className="w-20 h-20 rounded-full"    
                                src={profileURL}
                            />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + ", " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections