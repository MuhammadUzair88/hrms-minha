import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useState } from "react";
import { useToggle } from "../../context/Toggle";
import DateRangePicker from "./../DateRangePicker";

const data = [
  { month: "Jan", onTime: 30, late: 15, absent: 8 },
  { month: "Feb", onTime: 34, late: 12, absent: 20 },
  { month: "Mar", onTime: 38, late: 10, absent: 30 },
  { month: "Apr", onTime: 32, late: 25, absent: 35 },
  { month: "May", onTime: 28, late: 30, absent: 45 },
  { month: "Jun", onTime: 45, late: 18, absent: 32 },
  { month: "Jul", onTime: 50, late: 15, absent: 30 },
  { month: "Aug", onTime: 46, late: 10, absent: 31 },
  { month: "Sep", onTime: 43, late: 5, absent: 33 },
  { month: "Oct", onTime: 80, late: 20, absent: 50 },
  { month: "Nov", onTime: 60, late: 15, absent: 45 },
  { month: "Dec", onTime: 50, late: 10, absent: 40 },
];

export default function AttendanceChart() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // default range: today → today
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { isSidebarOpen } = useToggle();

  return (
    <div className="flex-[2] min-w-[500px] h-[384px] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>

        <div className="flex items-center gap-6">
          {/* Custom Legend */}
          <div className="flex gap-4 text-sm font-medium">
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#248cd8]"></span>
              On Time
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#00b172]"></span>
              Late
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#ee2400]"></span>
              Absent
            </span>
          </div>
        </div>
        <DateRangePicker
          range={dateRange}
          onToggle={() => setShowDatePicker((prev) => !prev)}
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, ""]}
            labelStyle={{ fontWeight: "bold", color: "#000" }}
            contentStyle={{
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Area fills */}
          <Area
            type="monotone"
            dataKey="onTime"
            stroke={false}
            fill="rgba(36, 140, 216, 0.1)"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="late"
            stroke={false}
            fill="rgba(0, 177, 114, 0.1)"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="absent"
            stroke={false}
            fill="rgba(238, 36, 0, 0.1)"
            activeDot={false}
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="onTime"
            stroke="#248cd8"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#248cd8" }}
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#00b172"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#00b172" }}
          />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#ee2400"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#ee2400" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
