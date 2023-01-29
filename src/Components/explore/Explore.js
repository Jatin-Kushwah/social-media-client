import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreData } from "../../redux/slices/exploreSlice";
import userImage from "../../assets/user.png";
import "./Explore.scss";
import Comments from "../comments/Comments";

function Explore() {
    const dispatch = useDispatch();
    const [openComments, setOpenComments] = useState({});
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
                        <div key={post._id} className="single-post">
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
                            {openComments[post._id] && (
                                <Comments
                                    closeComments={() =>
                                        setOpenComments({
                                            ...openComments,
                                            [post._id]: false,
                                        })
                                    }
                                    post={post}
                                    setOpenComments={setOpenComments}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Explore;