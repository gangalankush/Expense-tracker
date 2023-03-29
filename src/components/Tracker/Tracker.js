import PieChart from "../Charts/PieChart";
import Horizontal from "../Charts/Horizontal";
// import "bootstrap/dist/css/bootstrap.min.css";
import './Tracker.css'
import OptionChart from "../Charts/OptionChart";
import ApexCharts from 'apexcharts'

const Tracker = () => {
  
    return(
        <div className="con">
            <div className="conte">
                <div className="con1">
                  <div className="con2">
                    <h2>Expense</h2>
                  </div>
                  <div className="con2">
                    <h2>Income</h2>
                  </div>
                </div>
                <div className="con1">
                    <OptionChart />
                </div>
            </div>
            <div className="conte">
                <div className="con1">
                    <PieChart />
                </div>
                <div className="con1">
                    <Horizontal />
                </div>
            </div>
        </div>
    )
}

export default Tracker

