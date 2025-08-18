import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL+"/review/request/"+status+"/"+_id,
                {},
                {withCredentials : true}
            )
            dispatch(removeRequest(_id))
        } catch (err) {
            console.error("ERROR:", err)
        }
    }


    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials : true,
            })

            dispatch(addRequests(res.data.data))
        } catch (err) {
            console.error("Error fetching requests:", err)
        }
    }

    useEffect(()=>{
        fetchRequests();
    }, [])

    if(!requests)    return;

    if(requests.length === 0)   return <h1 className="flex justify-center my-10">No request found.</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

            {requests.map((request) =>{
                const {_id, firstName, lastName, profileURL, age, gender, about} = request.fromUserId;

                return (
                    <div 
                        key={_id}
                        className="flex justify-between items-center m-4 p-4 rounded-lg bg-neutral w-1/2 mx-auto"
                    >
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
                        <div>
                            <button className="btn btn-soft btn-primary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            <button className="btn btn-soft btn-secondary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;