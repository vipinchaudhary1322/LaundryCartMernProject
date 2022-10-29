import "../outerLayer/Header.css";
import home from "../../../assets/home.svg";
import more from "../../../assets/more.svg";
import list from "../../../assets/list.svg";
import { UserState } from "../../context/UserProvider";
import userimg from "../../../assets/user.png";

const Header = () => {
  const { user } = UserState();
  return (
    <>
      <div className="header_container">
        <div className="header_name">LAUNDRY</div>
        <div className="header_links">
          <div>Pricing</div>
          <div>Career</div>
          <div
            style={{
              display: "flex",

              color: "white",
              fontWeight: "600",
            }}
            className="user_name"
          >
            {user ? user.name : "User Name"}
            <img src={userimg} alt="" style={{ marginLeft: "10px" }} />
          </div>
        </div>
      </div>
      <div className="sidebar_container">
        <img src={home} alt="home" />
        <div>
          <img src={list} alt="list" />
        </div>

        <img src={more} alt="more" />
      </div>
    </>
  );
};

export default Header;
