import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreData } from "../../redux/slices/exploreSlice";
import userImage from "../../assets/user.png";
import "./Explore.scss";
import Comments from "../comments/Comments";

function Explore() {
    const dispatch = useDispatch();
    const [openComments, setOpenComments] = useState(false);
    const [postId, setPostId] = useState("");
    const exploreData = useSelector(
        (state) => state.exploreReducer.exploreData
    );

    useEffect(() => {
        dispatch(getExploreData());
    }, [dispatch]);

    return (
        <div className="Explore">
            <div className="explore-container">
                <div className="posts">
                    {exploreData?.posts?.map((post) => (
                        <div
                            key={post._id}
                            className="single-post"
                            onClick={() => setPostId(post)}
                        >
                            <img
                                src={
                                    post?.image?.url
                                        ? post?.image?.url
                                        : userImage
                                }
                                alt="post"
                                onClick={() =>
                                    setOpenComments({
                                        ...openComments,
                                        [post._id]: !openComments[post._id],
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            {openComments[postId._id] && (
                <Comments
                    closeComments={() =>
                        setOpenComments({
                            ...openComments,
                            [postId._id]: false,
                        })
                    }
                    post={postId}
                    setOpenComments={setOpenComments}
                />
            )}
        </div>
    );
}

export default Explore;
