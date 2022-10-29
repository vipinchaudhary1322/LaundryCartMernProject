import React, { useState } from "react";
import "./SignContent.css";
import lock from "../../../assets/lock.svg";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserProvider";
const Signincontent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, setUser } = UserState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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

    try {
      const { data } = await axios.post("/api/login", { email, password });
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      setLoading(false);
      navigate("/orders");
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
      <div className="signin-maincontainer">
        <div className="signin-maincontainer-left">
          <h1 className="signin-maincontainer-laundryheading">
            Laundry Service
          </h1>
          <p className="signin-maincontainer-laundrydescription">
            Doorstep Wash & Dryclean Service
          </p>
          <p className="signin-maincontainer-donthaveanaccount">
            Don't Have An Account?
          </p>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="signin-maincontainer-registerbutton"
          >
            Register
          </button>
        </div>
        <div className="signin-maincontainer-right">
          <p className="signin-maincontainer-signinheading">SIGN IN</p>
          <form className="signin-form">
            <label class="custom-field two">
              <input
                style={{ fontSize: "18px", color: "#77838F" }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Email"
              />
              {/* <span class="placeholder">Phone/Email</span> */}
            </label>
            <p></p>
            <br></br>
            <br></br>
            <label style={{ display: "flex" }} class="custom-field two">
              <input
                style={{ fontSize: "18px", color: "#77838F" }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={show ? "text" : "password"}
                placeholder="Password"
              />
              {/* <span class="placeholder">Password</span> */}
              <img
                className="lock"
                src={lock}
                alt="show-pass"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShow((show) => {
                    return !show;
                  });
                }}
              />
            </label>

            <p
              style={{ fontSize: "17px", fontWeight: 500 }}
              className="signin-forgot-password"
            >
              Forget Password?
            </p>
            {/* <p className="signin-error">{error ? "Invalid Details" : ""}</p> */}
            <Button
              colorScheme={"#4552C1"}
              isLoading={loading}
              className="sigin-button"
              onClick={submitHandler}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signincontent;
