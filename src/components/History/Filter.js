import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../db.json";

import "./History.css";
import { useNavigate } from "react-router-dom";
import { auto } from "@popperjs/core";

const Filter = () => {
  const [record, setRecord] = useState([]);
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

  return (
    <div>
      <div className="table-container mb-5">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Note</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.map((rec) => (
              <tr>
                <td>{rec.amount}</td>
                <td>{rec.category}</td>
                <td>{rec.notes}</td>
                <td>{rec.date}</td>
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

export default Filter;
