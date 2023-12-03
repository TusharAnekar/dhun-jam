import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useRestoBarContext } from "../contexts/resto-bar-context";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = () => {
  const {
    restoBar: { updatedAmount },
  } = useRestoBarContext();

  const data = {
    labels: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "",
        data: Object.values(updatedAmount),
        backgroundColor: "#F0C3F1",
        color: "red",
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export { Chart };
