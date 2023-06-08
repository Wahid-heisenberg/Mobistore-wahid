import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
function Graph() {
  const data = [
    { name: "Janvier", profit: 400 },
    { name: "Février", profit: 555 },
    { name: "Mars", profit: 400 },
    { name: "Avril", profit: 11 },
    { name: "Mai", profit: 100 },
    { name: "Juin", profit: 550 },
    { name: "Juillet", profit: 150 },
    { name: "Aout", profit: 115 },
    { name: "Sept", profit: 301 },
    { name: "Oct", profit: 112 },
    { name: "Nov", profit: 118 },
    { name: "Déc", profit: 60 },
  ];
  return (
    <>
      <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
      >
        <Line type="monotone" dataKey="profit" stroke="#27A033" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
}

export default Graph;
