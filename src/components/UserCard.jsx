import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const getResizedImage = (url, width, height) => {
  if (!url.includes("/upload/")) return url; 
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill/`
  );
};

const UserCard = ({user}) => {
    if (!user) return null;
    
    const {_id, firstName, lastName, age, gender, profileURL, about, skills} = user
    const resizedURL = getResizedImage(profileURL, 300, 400);
    const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},   //2nd parameter in post call is data we want to send, here we dont have any thus empty object
                { withCredentials : true}
            );
            dispatch(removeUserFromFeed(userId))
        } catch (err) {
            console.error("ERROR:", err)
        }
    }
    
    return(
        <div className="card card-side bg-neutral shadow-sm w-[600px] h-[400px]">
            <figure className="w-[300px] h-[400px] overflow-hidden">
                <img
                    src={resizedURL}
                    alt="UserPhoto"
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body w-[300px] h-[400px] flex flex-col justify-between">
                <div className="card-body flex flex-col">
                    <h2 className="card-title truncate">
                        {firstName + " " + lastName}
                    </h2>
                    <p className="text-sm line-clamp-3">{about}</p>
                    {age && gender && <p>{age+", "+gender}</p>}
                    <p>{"Skills : "+skills}</p>
                    <div className="card-actions justify-center mt-auto mb-2 space-x-2">
                        <button className="btn btn-soft btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                        <button className="btn btn-soft btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard