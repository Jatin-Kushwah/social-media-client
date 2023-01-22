import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { axiosClient } from "../../Utils/axiosClient";

function Navbar() {
    const navigate = useNavigate();
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

    const handleLogout = async () => {
        try {
            await axiosClient.post("/auth/logout");
            removeItem(KEY_ACCESS_TOKEN);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="Navbar">
            <div className="container">
                <h2
                    className="banner hover-link "
                    onClick={() => navigate("/")}
                >
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate(`/profile/${myProfile?._id}`)}
                    >
                        <Avatar src={myProfile?.avatar?.url} />
                    </div>
                    <div className="logout hover-link" onClick={handleLogout}>
                        <MdOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
