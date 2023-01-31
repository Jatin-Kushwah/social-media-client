import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import userImage from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import Comments from "../comments/Comments";
function Profile() {
    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector((state) => state.postReducer.userProfile);
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const feedData = useSelector((state) => state.feedDataReducer.feedData);
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState();
    const [openComments, setOpenComments] = useState(false);
    const [postId, setPostId] = useState("");
    const userImg = userProfile?.avatar?.url;

    useEffect(() => {
        dispatch(
            getUserProfile({
                userId: params.userId,
            })
        );
        setIsMyProfile(feedData?._id === params.userId);

        setIsFollowing(
            feedData?.followings?.find((item) => item._id === params.userId)
        );
    }, [myProfile, params.userId, feedData, dispatch]);

    const handleFollowUser = () => {
        dispatch(
            followAndUnfollowUser({
                userIdToFollow: params.userId,
            })
        );
    };

    return (
        <div className="Profile">
            <div className="profile-container">
                <div className="upper-part">
                    <div className="profile-card">
                        <div className="user-profile">
                            <img
                                className="user-img"
                                src={userImg ? userImg : userImage}
                                alt="User"
                            />
                            <div className="user-details">
                                <div className="user-name">
                                    <h2 className="name">
                                        {userProfile?.name}
                                    </h2>
                                    {isMyProfile && (
                                        <button
                                            className="edit-profile "
                                            onClick={() => {
                                                navigate("/updateProfile");
                                            }}
                                        >
                                            Edit profile
                                        </button>
                                    )}
                                    {!isMyProfile && (
                                        <button
                                            onClick={handleFollowUser}
                                            className={
                                                isFollowing
                                                    ? "following"
                                                    : "follow"
                                            }
                                        >
                                            {isFollowing
                                                ? "Following"
                                                : "Follow"}
                                        </button>
                                    )}
                                </div>
                                <div className="follower-info">
                                    <div className="posts">
                                        <h3> {userProfile?.posts?.length}</h3>
                                        <p>posts</p>
                                    </div>
                                    <div className="followers">
                                        <h3>
                                            {userProfile?.followers?.length}
                                        </h3>
                                        <p>followers</p>
                                    </div>
                                    <div className="followings">
                                        <h3>
                                            {userProfile?.followings?.length}
                                        </h3>
                                        <p>following</p>
                                    </div>
                                </div>
                                <p className="bio">{userProfile?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lower-part">
                    <div className="user-images">
                        {userProfile?.posts?.map((post) => (
                            <div
                                key={post._id}
                                className="image"
                                onClick={() => {
                                    setOpenComments(!openComments);
                                    setPostId(post);
                                }}
                            >
                                <div className="single-image">
                                    {post?.isVideo ? (
                                        <video
                                            style={{ objectFit: "cover" }}
                                            controls
                                            height={"100%"}
                                            width={"100%"}
                                            src={post?.image?.url}
                                        ></video>
                                    ) : (
                                        <img
                                            src={post?.image?.url}
                                            alt="user post"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        {openComments && (
                            <Comments
                                closeComments={() => setOpenComments(false)}
                                post={postId}
                                setOpenComments={setOpenComments}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
