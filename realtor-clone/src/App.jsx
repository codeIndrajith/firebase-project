import React from "react"
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
