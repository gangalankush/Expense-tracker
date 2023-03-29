import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const [name, namechange] = useState("");
  const [id, idchange] = useState("");
  const [password, passwordchange] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const regobj = { name, id, password };

    fetch("http://localhost:8001/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => {
        if (res.status === 500) {
          toast.error("Failed: " + "User already exists with provided info");
        }
        if (res.status === 201) {
          toast.success("Registered successfully");
          namechange("");
          idchange("");
          passwordchange("");
        }
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  };
  return (
    <div className={"loginContainer"}>
      <ToastContainer />
      <div className={"loginContainerv2"}>
        <h1>Create your account</h1>
        <div className={"inputContainer"}>
          <label>NAME</label>
          <input
            name="name"
            onChange={(e) => namechange(e.target.value)}
            placeholder="enter your name"
            type="text"
          />
        </div>
        <div className={"inputContainer"}>
          <label>EMAIL</label>
          <input
            name="id"
            onChange={(e) => idchange(e.target.value)}
            placeholder="enter your email"
            type="email"
          />
        </div>

        <div className={"inputContainer"}>
          <label>PASSWORD</label>
          <input
            name="password"
            onChange={(e) => passwordchange(e.target.value)}
            placeholder="enter your password"
            type="password"
          />
        </div>

        <div className={"footerContainer"}>
          <div>
            Already Signed Up? <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="">Forgot Password?</Link>
          </div>
        </div>

        <button onClick={handlesubmit} className={"loginBTN"}>
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Registration;
