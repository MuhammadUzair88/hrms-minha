import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useToggle } from "../../context/Toggle";

const data = [
  { name: "Pending", value: 1, color: "#D9D9D9" }, // gray-300
  { name: "Approved", value: 8, color: "#5ABAEB" }, // light blue
  { name: "Rejected", value: 1, color: "#00B172" }, // green
];

export default function EmployeeApplications() {
  const { isSidebarOpen } = useToggle();

  return (
    <div className="w-full min-h-[384px] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm font-sans">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800">
        Employee Application
      </h2>

      {/* Total */}
      <p className="text-sm text-gray-900 font-semibold mb-4">
        10 Total applications
      </p>

      {/* Content */}
      <div className="flex items-center gap-10 h-[250px]">
        {/* Legend */}
        <div className="space-y-2 text-sm text-gray-700">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.value} {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
