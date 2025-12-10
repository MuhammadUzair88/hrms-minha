import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useToggle } from "../../context/Toggle";
import DateRangePicker from "../DateRangePicker";
import DateRangeSelector from "../DateRangePicker";

// Sample data
const data = [
  { month: "Oct 2021", high: 6, low: 4 },
  { month: "Nov 2021", high: 8, low: 6 },
  { month: "Dec 2021", high: 5, low: 4 },
  { month: "Jan 2022", high: 9, low: 7 },
  { month: "Feb 2022", high: 8, low: 8 },
  { month: "Mar 2022", high: 7, low: 6 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 shadow-md px-4 py-3 rounded text-sm">
        <p className="text-emerald-600 font-semibold">
          {payload[0].value} Employee
        </p>
        <p className="text-sky-500 font-semibold">
          {payload[1].value} Employee
        </p>
      </div>
    );
  }
  return null;
};

export default function EmployeePerformanceChart() {
  const { isSidebarOpen } = useToggle();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="flex-1 w-full  min-h-[384px] bg-white rounded-[20px] border border-gray-200 p-4 md:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Employee Performance
        </h2>
      </div>

      {/* Legend + Date Picker */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span>High Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
            <span>Low Performance</span>
          </div>
        </div>

        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Responsive Chart */}
      <div className="w-full h-[240px] sm:h-[260px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              stroke="#f3f4f6"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
              domain={[0, 12]}
              axisLine={false}
              tickLine={false}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="high"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#10B981" }}
              activeDot={{ r: 5, fill: "#10B981" }}
            />

            <Line
              type="monotone"
              dataKey="low"
              stroke="#0EA5E9"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#0EA5E9" }}
              activeDot={{ r: 5, fill: "#0EA5E9" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
