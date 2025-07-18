"use client";

import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const colors = [
  "#04BFDA",
  "#2FB261",
  "#F39159",
  "#4C5F87",
  "#A927F9",
  "#2FB261",
  "#F54F29",
  "#D72631",
];

// Your custom label function (same as before)
const topProductLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, fill, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {value}
      </text>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
    </g>
  );
};

const TopProduct = () => {
  const [duration, setDuration] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setDuration(event.target.value);
    // Add filtering or API refetch by duration if needed
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/category-with-product-count`
        );

        // Convert productCount strings to numbers and sort descending
        const sortedCategories = res.data
          .map((cat) => ({
            ...cat,
            productCount: Number(cat.productCount),
          }))
          .sort((a, b) => b.productCount - a.productCount)
          .slice(0, 8);

        // Map categories to chart data format (name, value)
        setData(
          sortedCategories.map((category) => ({
            name: category.name,
            value: category.productCount,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="bg-white dark:bg-dark-bg border dark:border-[#3d47514d] rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-1 border-b dark:border-b-[#3d47514d]">
        <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
          Top Product
        </h3>
        <FormControl sx={{ m: 1 }} size="small">
          <Select
            id="duration-select"
            value={duration}
            onChange={handleChange}
            sx={{
              ".MuiSvgIcon-root": {
                fill: "white !important",
              },
              color: "white",
              "& .MuiSelect-select": {
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 0.5,
                paddingBottom: 0.5,
              },
              backgroundColor: "var(--dash-primary, #04BFDA)",
              borderRadius: "0.5rem",
            }}
            displayEmpty
          >
            <MenuItem value="">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Chart */}
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label={topProductLabel}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend wrapperStyle={{ paddingBottom: "20px" }} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProduct;
