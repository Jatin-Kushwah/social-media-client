import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
            <div
                className="heading"
                onClick={() => navigate(`/profile/${post.owner._id}`)}
            >
                <Avatar src={post.owner?.avatar?.url} />
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="Post" />
            </div>
            <div className="footer">
                <div className="likes" onClick={handlePostLikes}>
                    {post.isLiked ? (
                        <AiFillHeart className="icon liked" />
                    ) : (
                        <AiOutlineHeart className="icon" />
                    )}
                    <h4>{`${post.likesCount} Likes`}</h4>
                </div>

                <div className="caption">{post.caption}</div>
                <h6 className="time-ago">{post?.timeAgo} </h6>
            </div>
        </div>
    );
}

export default Post;
