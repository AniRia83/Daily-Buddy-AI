import { useEffect, useState } from "react";
import { analyzeMood } from "../services/api";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function MoodGraph() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    async function load() {
      const result = await analyzeMood();
      setMoods(result.weekly_moods);
    }
    load();
  }, []);

  const data = {
    labels: moods.map((m) => m.date),
    datasets: [
      {
        label: "Mood Score",
        data: moods.map((m) => m.score),
      },
    ],
  };

  return (
    <div>
      <h2>Mood Trend</h2>
      <Line data={data} />
    </div>
  );
}
