import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : {data : []},
    reducers : {
        addFeed : (state, action) => {
            state.data = action.payload.data
        },
        removeUserFromFeed : (state, action) =>  {
            state.data = state.data.filter((user) => user._id !== action.payload);
        },
        removeFeed : (state, action) => ({ data: [] }),
    }
})

export const{addFeed, removeUserFromFeed, removeFeed} = feedSlice.actions

export default feedSlice.reducer