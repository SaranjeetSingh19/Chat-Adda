import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();


const lineChartOptions = {
  responsive: "true",
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      beginAtZero: "true",
      grid: {
        display: false,
      },
    },
  },
};


const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: "#dadada",
        borderColor: "2px solid black",
      },
      //   {
      //   data: [100,20,3,14,43,61,9],
      //   label: "Revenue",
      //   fill: true,
      //   backgroundColor: "#DEA0DB",
      //   borderColor: "purple"

      // },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};



const dognutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,

    },
    title: {
      display: false
    }
  },
  cutout: 100
}


const DognutChart = ({value = [], labels = []}) => {

  const data = {
    labels,
    datasets: [
      {
        data: value,
        
        // fill: true,
        backgroundColor: ["skyblue", "pink"],
        borderColor: ["2px solid black", "purple"],
        offset: 20
      },
       
    ],
  };

  return  <Doughnut 
  style={{zIndex: 10}}
  data={data} options={dognutChartOptions} />
};

export { LineChart, DognutChart };
