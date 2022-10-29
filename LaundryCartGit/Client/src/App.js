import "./App.css";
import Register from "./Components/Authentication/Register/Register";
import Signin from "./Components/Authentication/SignIn/SignIn";
//import RegisterFullPage from "./Components/Authentication/RegisterFullPage";
//import SignInFullpage from "./Components/Authentication/SignInFullpage";
import LandingPage from "./Components/CreateOrders/LandingPage/LandingPage";
import PastOrders from "./Components/PastOrders/OrdersLandingPage/OrdersLandingPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      {/* <PastOrders /> */}
      {/* <Signin /> */}
      {/* <Register /> */}

      {/* <SignInFullpage /> */}
      <Routes>
        <Route path={"/"} element={<Signin />} exact></Route>
        <Route path={"/register"} element={<Register />} exact></Route>
        <Route path={"/orders"} element={<PastOrders />} exact></Route>
        <Route path={"/createOder"} element={<LandingPage />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
