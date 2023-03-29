import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Income = (props) => {
  const location = useLocation();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));

  useEffect(() => {
    if (location?.state?.type === "edit") {
      setAmount(location?.state?.data?.amount);
      setCategory(location?.state?.data?.category);
      setNotes(location?.state?.data?.notes);
      setDate(location?.state?.data?.date);
    } else {
      if (location?.state?.amount === undefined) {
        setAmount("");
        setCategory("");
      } else {
        setAmount(location.state.amount);
        setCategory(location.state.category);
      }
    }
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    var user = sessionStorage.getItem("email");
    if (location?.state?.type === "edit") {
      const regobj = { amount, category, notes, date, user };
      axios
        .put(
          `http://localhost:8001/income/${location?.state?.data?.id}`,
          regobj
        )
        .then((res) => {
          toast.success("Updated Successully");
          navigate(-1);
        })
        .catch((err) => {});
    } else {
      const regobj = { amount, category, notes, date, user };

      axios
        .post(`http://localhost:8001/income`, regobj)
        .then((res) => {
          toast.success("Added successfully");
          setAmount("");
          setCategory("");
          setNotes("");
          navigate(-1);
        })
        .catch((err) => {});
    }
  };

  let navigate = useNavigate();
  const routeDashboard = () => {
    navigate("/");
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <ToastContainer />
      <form id="check" className="container">
        <div className="card">
          <div className="card-header">
            <h1>Add Income</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Amount<span className="errmsg">*</span>
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Category<span className="errmsg">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                  >
                    <option value=" ">Select a category</option>
                    <option value="Salary">Salary</option>
                    <option value="Blocked Amount">Blocked Amount</option>
                    
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Notes<span className="errmsg">*</span>
                  </label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    date<span className="errmsg">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handlesubmit}
            >
              Save
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={routeDashboard}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Income;
