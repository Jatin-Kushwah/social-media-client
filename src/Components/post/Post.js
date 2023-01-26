import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePostLikes = () => {
        dispatch(
            likeAndUnlikePost({
                postId: post._id,
            })
        );
    };

    return (
        <div className="Post">
            <div className="heading">
                <div
                    className="left"
                    onClick={() => navigate(`/profile/${post.owner._id}`)}
                >
                    <Avatar src={post.owner?.avatar?.url} />
                    <h3 className="heading-name">{post?.owner?.name}</h3>
                    <h3 className="time-ago">• {post?.timeAgo}</h3>
                </div>

                <div className="right">
                    <BsThreeDots />
                </div>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="Post" />
            </div>
            <div className="footer">
                <div className="likes-comments">
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
                <div className="caption-container">
                    <h3
                        className="heading-name"
                        onClick={() => navigate(`/profile/${post.owner._id}`)}
                    >
                        {post?.owner?.name}
                    </h3>
                    <p className="caption">{post.caption}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
