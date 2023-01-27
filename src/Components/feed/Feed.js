import React, { useEffect } from "react";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import "./Feed.scss";
import userImage from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Feed() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const feedData = useSelector((state) => state.feedDataReducer.feedData);
    const src = feedData?.avatar?.url;

    useEffect(() => {
        dispatch(getFeedData());
    }, [dispatch]);

    return (
        <div className="Feed">
            <div className="container">
                <div className="left-part">
                    {feedData?.posts?.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            posts={feedData?.posts}
                        />
                    ))}
                </div>
                <div className="right-part">
                    <div className="my-info">
                        <div className="my-profile">
                            <div
                                className="avatar-name"
                                onClick={() =>
                                    navigate(`/profile/${feedData._id}`)
                                }
                            >
                                <div className="avatar">
                                    <img
                                        src={src ? src : userImage}
                                        alt="User Avatar"
                                    />
                                </div>
                                <h3 className="name">{feedData?.name}</h3>
                            </div>
                            <h5
                                className="switch"
                                onClick={() => navigate(`/login`)}
                            >
                                Switch
                            </h5>
                        </div>
                    </div>
                    <div className="suggestions-container">
                        <h3 className="title">Suggestions For You</h3>
                        <div className="suggestions">
                            {feedData?.suggestions?.map((user) => (
                                <Follower key={user._id} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;
