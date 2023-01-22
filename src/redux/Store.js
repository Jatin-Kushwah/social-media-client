import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postReducer from "./slices/postSlice";
import feedDataReducer from "./slices/feedSlice";
import commentReducer from "./slices/commentSlice";

export default configureStore({
    reducer: {
        appConfigReducer,
        postReducer,
        feedDataReducer,
        commentReducer,
    },
});
