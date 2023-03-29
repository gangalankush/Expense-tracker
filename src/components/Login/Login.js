import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [id, changeid] = useState("");
  const [password, changepassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8001/users/" + id)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid email");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("email", id);
              navigate("/");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (id === "" || id === null) {
      result = false;
      toast.warning("Please Enter your email.");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter your password.");
    }
    return result;
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className={"loginContainerv2"}>
        <h1>Welcome back</h1>

        <div className={"inputContainer"}>
          <label>EMAIL</label>
          <input
            onChange={(e) => changeid(e.target.value)}
            placeholder="enter your email"
            type="email"
          />
        </div>

        <div className={"inputContainer"}>
          <label>PASSWORD</label>
          <input
            onChange={(e) => changepassword(e.target.value)}
            placeholder="enter your password"
            type="password"
          />
        </div>

        <div className={"forgetmeContainer"}>
          <div>
            Remember Me <input type="checkbox" />
          </div>
          <div>
            <Link to="/account/forgotpassowrd">Forgot password?</Link>
          </div>
        </div>

        <button onClick={handleLogin} className={"loginBTN"}>
          LOGIN
        </button>

        <span className={"notreg"}>
          Not registered yet?{" "}
          <Link className={"singupBTN"} to="/register">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
