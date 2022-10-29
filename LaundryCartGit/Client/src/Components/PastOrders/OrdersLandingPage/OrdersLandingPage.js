import React, { useEffect, useState } from "react";
import Header from "../outerLayer/Header";
import search from "../../../assets/search.svg";
import axios from "axios";
import Order from "../Order/Order";
import "../OrdersLandingPage/OrdersLandingPage.css";
import { UserState } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import SmallFooter from "../../Authentication/Footer/smallFooter";

const PastOrders = () => {
  var { user } = UserState();

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  /////////get orders////////////////

  useEffect(() => {
    // setUserId(user.useid);
    getOrders();
  }, []);

  const getOrders = async () => {
    console.log("hello");
    const { data } = await axios.get("/api/orders", {
      params: { id: user.userid },
    });

    setOrders(data);
  };

  return (
    <>
      {orders.length !== 0 ? (
        <div>
          <Header />
          <div className="landingpage_container" style={{ float: "right" }}>
            <div className="landingpage-header">
              <h2 className="heading">Create order</h2>
              <button
                onClick={() => {
                  navigate("/createOder");
                }}
                className="create-btn"
              >
                Create
              </button>
              <div className="searchbar-container">
                <img src={search} alt="search" />
                <input className="searchbar" type="text" />
              </div>
            </div>
            {/* className="products_container" className="product_header" */}
            <div>
              <header className="product_headers">
                <div>Order Id</div>
                <div>Date & Time</div>
                <div>Store Location</div>
                <div>Phone No.</div>
                <div>Total Items</div>
                <div>Price</div>
                <div>Status</div>
                <div>View</div>
              </header>
              {orders.map((item) => {
                return <Order getOrders={getOrders} item={item} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div
            style={{
              marginTop: "300px",

              textAlign: "center",
            }}
          >
            <p style={{ color: "#222B45", fontSize: "14px", fontWeight: 500 }}>
              No Orders Available
            </p>
            <button
              onClick={() => {
                navigate("/createOder");
              }}
              className="create-btn-alone"
            >
              Create
            </button>
          </div>
          <SmallFooter/>
        </>
      )}
    </>
  );
};

export default PastOrders;
