import React from "react";
import "./RegisterContent.css";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registercontent = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  // const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);

    if (
      !name ||
      !email ||
      !password ||
      !confirmpassword ||
      !state ||
      !address ||
      !pincode ||
      !phoneno ||
      !district
    ) {
      toast({
        title: "Please fill all Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Password Do Not Match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
        state,
        address,
        pincode,
        district,
        phoneno,
      });

      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
      navigate("/");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="signupcontainer">
        <div className="signupcontainer-left">
          <h1 className="signup-maincontainer-laundryheading">
            Laundry Service
          </h1>
          <p className="signup-maincontainer-laundrydescription">
            Doorstep Wash & Dryclean Service
          </p>
          <p className="signup-maincontainer-alreadyhaveaccount">
            Already Have Account
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="signup-maincontainer-registerbutton"
          >
            Sign In
          </button>
        </div>
        <div className="signupcontainer-right">
          <p className="signup-maincontainer-registerheading">REGISTER</p>
          <div className="register-input">
            <div className="register-input-width50">
              <label class="custom-field two">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="errorname"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={phoneno}
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                  type="number"
                  placeholder="Phone No"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="errorphone"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  type="text"
                  placeholder="State"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="errorstate"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  type="text"
                  placeholder="Address"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="erroraddress"></p>
            </div>
            <div className="register-input-width50">
              <label class="custom-field two">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="erroremail"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <br></br>
              <label class="custom-field two">
                <input
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                  placeholder="Confirm password"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="errorpassword"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  type="text"
                  placeholder="District"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>
              <br></br>
              <p id="errordistrict"></p>
              <br></br>

              <label class="custom-field two">
                <input
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                  type="number"
                  placeholder="Pincode"
                  style={{ fontSize: "18px", color: "#77838F" }}
                />
              </label>

              {/* <br></br>
              <p id="errorpincode"></p> */}
            </div>
          </div>
          <p className="register-agree">
            <p style={{ textDecoration: "underline", fontSize: "18px" }}>
              <input type="checkbox" className="register-checkbox"></input>I
              agree to Terms & Condition receiving marketing and promotional
              materials.
            </p>
          </p>

          {/* <p id="signup-error">
                {error
                  ? "Please Enter all the details and agree our terms and conditions before registering"
                  : ""}
              </p> */}

          <Button
            style={{
              backgroundColor: "#5861AE",
              marginLeft: "400px",
              marginBottom: "10px",
              fontSize: "larger",
              fontWeight: 700,
            }}
            isLoading={loading}
            onClick={submitHandler}
            className="registerbtn"
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Registercontent;
