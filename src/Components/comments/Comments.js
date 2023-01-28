import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Comments.scss";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../redux/slices/commentSlice";

function Comments({ closeComments, post, posts, darkMode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const comments = useSelector((state) => state.commentReducer.comments);

    // useEffect(() => {
    //     dispatch(getComments());
    // }, [dispatch]);

    const handlePostLikes = () => {
        dispatch(
            likeAndUnlikePost({
                postId: post._id,
            })
        );
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment) {
            dispatch(
                createComment({
                    postId: post._id,
                    content: comment,
                })
            );
            console.log(comment);
            setComment("");
        }
    };

    return (
        <div className={darkMode ? "Comments dark-mode" : "Comments"}>
            <div className="blank" onClick={closeComments}></div>
            <div className="comment-container">
                <div className="close-icon" onClick={closeComments}>
                    <RxCross2 />
                </div>
                <div className="image-section">
                    <img src={post?.image?.url} alt="Post" />
                </div>
                <div className="comment-section">
                    <div className="top">
                        <div
                            className="left"
                            onClick={() =>
                                navigate(`/profile/${post.owner._id}`)
                            }
                        >
                            <Avatar src={post.owner?.avatar?.url} />
                            <h3 className="heading-name">
                                {post?.owner?.name}
                            </h3>
                        </div>

                        <div className="right">
                            <BsThreeDots />
                        </div>
                    </div>
                    <div className="comment-box">
                        <div className="caption-container">
                            <Avatar src={post.owner?.avatar?.url} />
                            <h3
                                className="heading-name"
                                onClick={() =>
                                    navigate(`/profile/${post.owner._id}`)
                                }
                            >
                                {post?.owner?.name}
                            </h3>
                            <p className="caption">{post.caption}</p>
                        </div>
                        <div className="comments">
                            {posts?.map((post) => (
                                <div key={post._id}>
                                    <Avatar src={post.owner?.avatar?.url} />
                                    <p>{post.comments}</p>
                                </div>
                            ))}
                            {comment}
                        </div>
                    </div>
                    <div className="like-comment-time">
                        <div className="like-comment">
                            {post.isLiked ? (
                                <AiFillHeart
                                    className="icon liked"
                                    onClick={handlePostLikes}
                                />
                            ) : (
                                <AiOutlineHeart
                                    className="icon"
                                    onClick={handlePostLikes}
                                />
                            )}
                            <div className="comment">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Comment"
                                    className="_ab6-"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path
                                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="likesCount">{`${post.likesCount} likes`}</h3>
                        <h3 className="time"> {post?.timeAgo}</h3>
                    </div>

                    <div className="comment-input">
                        <form onSubmit={handleSubmitComment}>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;
