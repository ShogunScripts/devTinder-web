import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import UserCard from "./UserCard"

const Feed = () => {
    const feed = useSelector((state) => state.feed?.data || [])
    const dispatch = useDispatch()

    const getFeed = async () => {
        if (feed.length > 0) return
        try {
            const res = await axios.get(BASE_URL+"/feed", {withCredentials : true})
            dispatch(addFeed(res.data))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        getFeed();
    }, []);

    if(!feed) return;

    if(feed.length <= 0) return <h1 className="text-center font-bold">No new users found!</h1>

    return (
        feed?.length > 0 && (
            <div className="flex justify-center my-20">
                <UserCard user={feed[0]}/>
            </div>
        )
    )
}

export default Feed