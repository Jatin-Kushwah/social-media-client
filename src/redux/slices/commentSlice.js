import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";

export const createComment = createAsyncThunk(
    "comment/createComment",
    async (body) => {
        try {
            const response = await axiosClient.post("/comment/create", body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const getComments = createAsyncThunk("comment/getComments", async () => {
    try {
        const response = await axiosClient.get("/");
        console.log(response);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
});

const commentSlice = createSlice({
    name: "commentSlice",
    initialState: {
        comments: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            });
    },
});

export default commentSlice.reducer;
