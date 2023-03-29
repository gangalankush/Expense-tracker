import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../db.json";

import "./History.css";
import { useNavigate } from "react-router-dom";
import { auto } from "@popperjs/core";

const History = () => {
  const [record, setRecord] = useState([]);
  const [record1, setRecord1] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    let user = sessionStorage.getItem("email");
    axios
      .get(`http://localhost:8001/expense?user=${user}`)
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => {});
    axios
      .get(`http://localhost:8001/income?user=${user}`)
      .then((res) => {
        setRecord1(res.data);
      })
      .catch((err) => {});
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8001/expense/${id}`)
      .then((res) => {
        getdata();
      })
      .catch((err) => {});
  };

  const handleUpdate = (val) => {
    navigate("/expense", { state: { type: "edit", data: val } });
  };

  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredIncome = record.filter(
    (item) => item.category === categoryFilter || categoryFilter === ""
  );

  const filteredIncome1 = record1.filter(
    (item) => item.category === categoryFilter || categoryFilter === ""
  );

  return (
    <div>
      <div className="col-lg-6">
        <div className="form-group">
          <label>
            Category<span className="errmsg">*</span>
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-control"
            style={{ width: 220 }}
          >
            <option value=" ">Select a category</option>
            <option value="food">Food</option>
            <option value="groceries">Groceries</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Note</th>
              <th>Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncome.map((rec) => (
              <tr>
                <td>{rec.amount}</td>
                <td>{rec.category}</td>
                <td>{rec.notes}</td>
                <td>{rec.date}</td>
                <td>{"Expense"}</td>
                <td>
                  <button onClick={() => handleUpdate(rec)}>Update</button>
                  <button onClick={() => handleDelete(rec.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredIncome1.map((rec) => (
              <tr>
                <td>{rec.amount}</td>
                <td>{rec.category}</td>
                <td>{rec.notes}</td>
                <td>{rec.date}</td>
                <td>{"Income"}</td>
                <td>
                  <button onClick={() => handleUpdate(rec)}>Update</button>
                  <button onClick={() => handleDelete(rec.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
