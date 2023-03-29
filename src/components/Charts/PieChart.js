import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import data from '../../db.json';
import "chart.js/auto";

const PieChart = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const filterr = ()=>{
        const filteredIncome = data.expense.filter((item) => item.category === categoryFilter || categoryFilter === "");
        return {
           labels: '',
            datasets: [
            {
                label: "Spent",
                data: filteredIncome.map((data) => data.amount),
                backgroundColor: [
                "rgba(75,192,192,1)",
                "#CC97C1",
                "#FADAE2",
                "#BEB4D6",
                "#C1D4E3",
                ],
                borderWidth: 0,
            },
          ],
        };
    }
      
     
        return (
          <div>
          
          
            <Pie style={{width:290,height:290}} data={filterr()} />
          </div>
        );
}

export default PieChart
