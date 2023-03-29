import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";

function Speech() {
  const navigate = useNavigate();

  function handleNavigate(page) {
    if (page === "dashboard") {
      navigate(`/`);
    } else {
      navigate(`/${page}`);
    }
  }

  function handleExpense(amount, category) {
    let send_data = { amount, category };
    navigate("/expense", { state: send_data });
  }

  useEffect(() => {
    alanBtn({
      key: "858bf2b6e18afaff49ee2059edbc615d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "test") {
          console.log("Welcome to the world");
        } else if (commandData.command === "navigate") {
          handleNavigate(commandData.page);
        } else if (commandData.command === "expense") {
          handleExpense(commandData.amount, commandData.category);
        } else if (commandData.command === "save") {
          navigate("/expense", { state: "submit" });
        }
      },
    });
  }, []);
  return <div></div>;
}

export default Speech;
