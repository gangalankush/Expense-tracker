import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Speech from "./components/Speech/Speech";
import HeaderBeforeLogin from "./components/Header/HeaderBeforeLogin";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [user, setuser] = useState("");

  useEffect(() => {
    console.log("location.pathname", location.pathname);
    if (location.pathname === "/") {
      let data = sessionStorage.getItem("email");
      if (data !== null && data !== "" && data !== undefined) {
        setuser(data);
      } else {
        setuser("");
      }
    } else if (location.pathname === "/login") {
      setuser("");
    } else {
      let data = sessionStorage.getItem("email");
      if (data !== null && data !== "" && data !== undefined) {
        setuser(data);
      } else {
        setuser("");
      }
    }
  }, [location.pathname]);

  return (
    <div>
      <div>{user !== "" ? <Header /> : <HeaderBeforeLogin />}</div>
      <div>
        <Speech />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
