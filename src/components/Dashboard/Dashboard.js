import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import PieChart from "../Charts/PieChart";
import Filter from "../History/Filter";
import axios from "axios";

const Dashboard = () => {
  let navigate = useNavigate();

  const [expense, setexpense] = useState(0);
  const [income, setincome] = useState(0);

  const routeExpense = () => {
    navigate("/expense");
  };
  const routeIncome = () => {
    navigate("/income");
  };
  const routeTracker = () => {
    navigate("/tracker");
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    let user = sessionStorage.getItem("email");
    axios
      .get(`http://localhost:8001/expense?user=${user}`)
      .then((res) => {
        let expense = 0;
        res.data.forEach((e) => {
          expense += parseInt(e.amount);
        });
        setexpense(expense);
      })
      .catch((err) => {});
    axios
      .get(`http://localhost:8001/income?user=${user}`)
      .then((res) => {
        let income = 0;
        res.data.forEach((e) => {
          income += parseInt(e.amount);
        });
        setincome(income);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="conte1">
        <div className="con10">
          <div className="con12">
            <h2>Expense</h2>
            <h4>{expense} Euros</h4>
            <button onClick={routeExpense}>ADD EXPENSE</button>
          </div>
          <div className="con12">
            <h2>Income</h2>
            <h4>{income} Euros</h4>
            <button onClick={routeIncome}>ADD INCOME</button>
          </div>
        </div>

        <div className="con11">
          <PieChart />
          <button onClick={routeTracker} style={{ width: 60, height: 30 }}>
            more
          </button>
        </div>
      </div>
      <Filter />
    </div>
  );
};

export default Dashboard;
