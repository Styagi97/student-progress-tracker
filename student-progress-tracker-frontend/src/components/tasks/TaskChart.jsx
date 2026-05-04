import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TaskChart = ({ tasks }) => {
  const [dark] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  const [activeIndex, setActiveIndex] = useState(null);
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 text-center">No data for Chart📊</p>;
  }
  const data = [
    {
      name: "COMPLETED",
      value: tasks.filter((t) => t.status === "COMPLETED").length,
    },
    {
      name: "IN_PROGRESS",
      value: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      name: "PENDING",
      value: tasks.filter((t) => t.status === "PENDING").length,
    },

  ];

  const COLORS = dark
   ? ["#4ade80", "#3b82f6" ,"#fbbf24"] 
   : ["#22c55e", "#2563eb","#f59e0b"];
   const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
 
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="flex justify-center">
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={110}
          label={renderLabel}
          isAnimationActive={true}
          animationDuration={800}
          onMouseDownCapture={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
              style={{
                transform: activeIndex === index ? "scale(1.1)" : "scale(1)",
                transformOrigin: "center",
                transition: "0.3s",
              }}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TaskChart;
