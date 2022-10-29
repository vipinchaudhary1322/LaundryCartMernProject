import "../LandingPage/LandingPage.css";
import search from "../../../assets/search.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Product/Product";
import success from "../../../assets/success.svg";
import Header from "../outerLayer/Header";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { UserState } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import SmallFooter from "../../Authentication/Footer/smallFooter";

const LandingPage = () => {
  const [location, setLocation] = useState();

  const images={0:"../../../assets/shirt.jpg"}

  const storeLocations = {
    JayaNagar: {
      location: "jaya Nagar",
      city: "banglore",
      phone: 9902845678,
      address: "10th main road,Jaya nagar",
    },
    JPNagar: {
      location: "JP Nagar",
      city: "banglore",
      phone: 9426467890,
      address: "12th main road,JP nagar",
    },
    IndraNagar: {
      location: "Indra Nagar",
      city: "banglore",
      phone: 9034578276,
      address: "19th main road,Indra nagar",
    },
    MGRoad: {
      location: "MG Road",
      city: "banglore",
      phone: 9534789378,
      address: "11th main road,MG Road",
    },
  };

  const { user } = UserState();
  const navigate = useNavigate();
  const totalOrderInitial = {
    Shirts: {},
    Tshirts: {},
    Trousers: {},
    Jeans: {},
    Joggers: {},
    Boxers: {},
  };
  const [products, setProducts] = useState([]);
  const [totalOrder, setTotalOrder] = useState(totalOrderInitial);
  const getProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isopenmodal,
    onOpen: onopenmodal,
    onClose: onclosemodal,
  } = useDisclosure();

  /////////Find Final Price and Quantity//////
  let FinalPrice = 0;
  let FinalQuantity = 0;
  for (const item of Object.keys(totalOrder)) {
    if (totalOrder[item].quantity > 0) {
      let singleProductPrice =
        totalOrder[item].quantity * totalOrder[item].totalPrice;
      FinalPrice += singleProductPrice;
      FinalQuantity += parseInt(totalOrder[item].quantity);
    }
  }

  const handleConfirm = async () => {
    const order = {
      userId: user.userid,
      totalQuantity: FinalQuantity,
      totalPrice: FinalPrice + 90,
      storeLocation: location,
      PhoneNo: storeLocations[location].phone,
      city: storeLocations[location].city,
      Address: storeLocations[location].address,
      ...totalOrder,
    };
    const order1 = await axios.post("/api/products/createOrder", order);
    if (order1) {
      onopenmodal();
    }
  };

  const handleCancel = () => {};
  console.log(totalOrder);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="landingpage_container" style={{ float: "right" }}>
        <div className="landingpage-header">
          <h2 className="heading">Create order</h2>
          <div className="searchbar-container">
            <img src={search} alt="search" />
            <input className="searchbar" type="text" />
          </div>
        </div>
        <div className="products_container">
          <header className="product_header">
            <div>Product Types</div>
            <div>Quantity</div>
            <div>Wash Type</div>
            <div>Price</div>
          </header>
          {products.map((item,index) => {
            return (
              <Product
                totalOrder={totalOrder}
                setTotalOrder={setTotalOrder}
                key={item._id}
                item={item}
                imgs={images[0]}
              />
            );
          })}
        </div>
        <div className="order_btn">
          <button onClick={handleCancel} className="cancel_btn">
            Cancel
          </button>
          <button onClick={onOpen} className="proceed_btn">
            Proceed
          </button>
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
          <DrawerOverlay />
          <DrawerContent style={{ padding: "0px" }}>
            <DrawerCloseButton className="drawer_closebtn" />
            <DrawerHeader className="drawer_header">Summary</DrawerHeader>
            <DrawerBody style={{ padding: "0px" }} className="drawer_body">
              <div className="store_details">
                <div className="store_selector">
                  <select
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    required="true"
                  >
                    <option value="store location">Store Location</option>
                    <option value="JPNagar">JP Nagar</option>
                    <option value="JayaNagar">Jaya Nagar</option>
                    <option value="MGRoad">MG Road</option>
                    <option value="IndraNagar">Indra Nagar</option>
                  </select>
                </div>
                <div className="store_address">
                  <p>
                    <strong>Store Address</strong>
                  </p>
                  <p>{location ? storeLocations[location].address : "--"}</p>
                </div>
                <div>
                  <p>
                    <strong>Phone Number:</strong>
                  </p>
                  <p>{location ? storeLocations[location].phone : "--"}</p>
                </div>
              </div>
              <div className="summary_order_container">
                <div className="summary_heading">
                  <h2>Order details</h2>
                </div>
                {Object.keys(totalOrder).map((item) => {
                  if (totalOrder[item].quantity > 0) {
                    return (
                      <div
                        style={{ display: "flex" }}
                        className="summary_orderdetails"
                      >
                        <h1>{totalOrder[item].name}</h1>
                        <p>{totalOrder[item].washtype}</p>

                        <div className="summary_price">
                          <h3 className="summary_price_calculator">
                            {totalOrder[item].quantity} x{" "}
                            {totalOrder[item].totalPrice} ={" "}
                          </h3>
                          <h3 className="summary_totalPrice">
                            {totalOrder[item].totalPrice *
                              totalOrder[item].quantity}
                          </h3>
                        </div>
                      </div>
                    );
                  }
                })}
                <div className="summary_subtotal">
                  <div className="summary_pricediv">
                    <p
                      style={{
                        fontSize: "17px",
                        marginRight: "30px",
                        fontWeight: 400,
                      }}
                      className="summary_priceparticulars"
                    >
                      Subtotal:
                    </p>
                    <h3
                      style={{ fontSize: "18px", fontWeight: 400 }}
                      className="summary_mainPrice"
                    >
                      {FinalPrice}
                    </h3>
                  </div>
                  <hr className="horizontal_line"></hr>
                  <div
                    style={{
                      paddingLeft: "620px",
                      height: "50px",
                      paddingTop: "15px",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    <h2>Pickup Charges : 90</h2>
                  </div>
                </div>
                {/* <div className="summary_pickupcharges">
                  <div
                    style={{ marginRight: "0px" }}
                    className="summary_pricediv pickup"
                  >
                   <p
                      style={{ marginLeft: "200px", fontWeight: 500 }}
                      className="summary_priceparticulars"
                    >
                      pickup charges:
                    </p>
                    <h3
                      className="summary_mainPrice"
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      Pickup Charges: 90
                    </h3>
                  </div>
                  <hr className="horizontal_line"></hr>
                </div> */}
                <div className="summary_totalprice">
                  <div className="summary_pricediv total">
                    <h2 className="summary_maintotal_heading">Total:</h2>
                    <h2 className="summary_maintotal_value">
                      <span>Rs</span> {FinalPrice + 90}{" "}
                    </h2>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="address_container">
                <h1>Address</h1>
                <div className="address_home">
                  <h1>Home</h1>
                  <p>#223, 10th road, Jp Nagar, Bangalore</p>
                </div>
              </div>
              <div>
                <button onClick={handleConfirm} className="confirmbtn">
                  Confirm
                </button>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <Modal onClose={onclosemodal} size={"sm"} isOpen={isopenmodal}>
        <ModalOverlay />
        <ModalContent>
          <div className="success_container">
            <img
              style={{ width: "100px", height: "100px" }}
              src={success}
              alt="successfull"
            />
            <div className="order_success_msg">
              <p>Your order is successfully Placed.</p>
            </div>
            <div className="track_order_msg">
              <p>You can track the delivery in the "Orders" section.</p>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/orders");
                }}
                className="goto_order_btn"
              >
                Go To Orders
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <SmallFooter/>
    </>
  );
};

export default LandingPage;
