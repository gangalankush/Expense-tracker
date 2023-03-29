import { useState } from "react";
import { Bar } from "react-chartjs-2";
import data from '../../db.json';
import "chart.js/auto";

const Horizontal = () => {
    const option={
        indexAxis:'y',
        elements:{
          bar:{
            borderWidth:1,
            // width:"70%",
            // height:"90%"
          }
        },
        responsive:true,
        plugins:{
          // legend:{
          //   position:'left'
          // },
          title:{
            display:true,
            // text:' chart'
          }
        }
      }
      const [userData, setUserData] = useState({
        labels: data.expense.map((data) => data.date),
        datasets: [
          {
            label: "Spent",
            data: data.expense.map((data) => data.amount),
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
      });
      
     
        return (
          <div>
            <Bar options={option} style={{width:600,height:550}}  data={userData} />
          </div>
        );
}

export default Horizontal