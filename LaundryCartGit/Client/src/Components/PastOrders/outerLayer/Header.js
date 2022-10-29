import "../outerLayer/Header.css";
import home from "../../../assets/home.svg";
import more from "../../../assets/more.svg";
import list from "../../../assets/list.svg";
import { UserState } from "../../context/UserProvider";
import userimg from "../../../assets/user.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = UserState();
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <div className="header_container">
        <div className="header_name">LAUNDRY</div>
        <div className="header_links">
          <div>Pricing</div>
          <div>Career</div>
          <div
            onClick={() => {
              setHide((hide) => {
                return !hide;
              });
            }}
            style={{
              display: "flex",
              cursor: "pointer",
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
      {hide ? (
        ""
      ) : (
        <div
          onClick={logout}
          style={{
            width: "150px",
            height: "50px",
            backgroundColor: "#5861AE",
            float: "right",
            marginRight: "20px",
            fontSize: "20px",
            fontWeight: 600,
            textAlign: "center",
            paddingTop: "10px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Log Out
        </div>
      )}
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
