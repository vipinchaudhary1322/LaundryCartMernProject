import "../Product/Product.css";
import shirt from "../../../assets/tshirt.jpg";
import { useEffect, useState } from "react";

import washingMachine from "../../../assets/washing-machine.svg";
import ironImg from "../../../assets/ironing.svg";
import dryImg from "../../../assets/towel.svg";
import bleachImg from "../../../assets/bleach.svg";
import washingMachineSelect from "../../../assets/washing-machine-select.svg";
import ironImgSelect from "../../../assets/iron-select.svg";
import bleachImgSelect from "../../../assets/bleach-select.svg";

const Product = ({ item, totalOrder, setTotalOrder }) => {
  const [wash, setWash] = useState(false);
  const [iron, setIron] = useState(false);
  const [dry, setDry] = useState(false);
  const [bleach, setBleach] = useState(false);
  const [quantity, setQuantity] = useState(0);

  /////total price///////////////
  let totalPrice = 0;
  if (wash) {
    totalPrice += 10;
  }
  if (iron) {
    totalPrice += 15;
  }
  if (dry) {
    totalPrice += 10;
  }
  if (bleach) {
    totalPrice += 30;
  }
  ////////wash Type////////////////
  let services = "";
  if (wash) {
    services += "wash,";
  }
  if (iron) {
    services += "iron,";
  }
  if (dry) {
    services += "dry,";
  }
  if (bleach) {
    services += "bleach,";
  }

  /////////washtype select//////////////////
  const selectWashTypes = (e) => {
    if (e.target.name === "wash") {
      setWash((wash) => {
        return !wash;
      });
    } else if (e.target.name === "iron") {
      setIron((iron) => {
        return !iron;
      });
    } else if (e.target.name === "dry") {
      setDry((dry) => {
        return !dry;
      });
    } else {
      setBleach((bleach) => {
        return !bleach;
      });
    }
  };

  /////////////handle Reset////////////
  const handleReset = () => {
    setQuantity(0);
    setWash(false);
    setDry(false);
    setIron(false);
    setBleach(false);
  };

  ////////////order///////////////////

  totalOrder[item.name] = {
    name: item.name,
    washtype: services,
    quantity: quantity,
    totalPrice: totalPrice,
  };

  // totalOrder[item.name] = {
  //   name: item.name,
  //   washtype: services,
  //   quantity: quantity,
  //   totalPrice: totalPrice,
  // };

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <>
      <div className="product_container" style={{ display: "flex" }}>
        <div className="product_detail">
          <img className="product_image" src={item.image} alt="shirt" />
          <div className="product_description">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </div>
        <div className="product_quantity">
          <input
            style={{ textAlign: "center" }}
            value={quantity}
            onChange={(e) => {
              setQuantity(() => {
                return e.target.value;
              });
            }}
            type={"number"}
          />
        </div>
        <div className="singleproduct_services">
          <img
            name="wash"
            alt="wash"
            className="services wash"
            onClick={(e) => {
              selectWashTypes(e);
            }}
            src={wash ? washingMachineSelect : washingMachine}
          ></img>
          <img
            name="iron"
            alt="iron"
            className="services iron"
            onClick={(e) => {
              selectWashTypes(e);
            }}
            src={iron ? ironImgSelect : ironImg}
          ></img>
          <img
            name="dry"
            alt="dry"
            onClick={(e) => {
              selectWashTypes(e);
            }}
            className="services dry"
            src={dryImg}
            style={{ backgroundColor: `${dry ? "#5861AE" : ""}` }}
          ></img>

          <img
            name="bleach"
            alt="bleach"
            onClick={(e) => {
              selectWashTypes(e);
            }}
            className="services bleech"
            src={bleach ? bleachImgSelect : bleachImg}
          ></img>
        </div>
        <div className="product_price">
          {quantity === 0 ? (
            "--"
          ) : (
            <p className="product_price_calc">
              {quantity}X{totalPrice}= <strong>{quantity * totalPrice}</strong>
            </p>
          )}
        </div>
        <button onClick={handleReset} className="reset">
          Reset
        </button>
      </div>
    </>
  );
};

export default Product;
