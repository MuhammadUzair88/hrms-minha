import { useToggle } from "../../context/Toggle";

const projects = [
  {
    id: "01",
    name: "Home Decore Range",
    popularity: 80,
    status: "Pending",
    statusColor: "bg-slate-900",
    barColor: "bg-slate-900",
  },
  {
    id: "02",
    name: "Disney Princess Dress",
    popularity: 100,
    status: "Completed",
    statusColor: "bg-emerald-500",
    barColor: "bg-emerald-500",
  },
  {
    id: "04",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "05",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "06",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "07",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "07",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "07",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
];

export default function ProjectListCard() {
  const { isSidebarOpen } = useToggle();

  return (
    <div className="flex-1 min-w-[320px] h-[384px] bg-white rounded-2xl border border-gray-200 px-4 py-5 font-sans shadow-sm flex flex-col">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-sm font-medium text-gray-500 px-2 mb-1">
        <div className="w-10">#</div>
        <div>Name</div>
        <div>Popularity</div>
        <div>Complete</div>
      </div>

      <div className="border-t border-gray-200 mb-1" />

      {/* Scrollable Table Body */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-4 items-center text-sm text-slate-900 px-2 py-2 gap-3"
          >
            {/* ID */}
            <div className=" font-medium text-sm">{project.id}</div>

            {/* Name */}
            <div className="text-[12px] font-medium">{project.name}</div>

            {/* Popularity Bar */}
            <div className="flex items-center">
              <div className="w-full max-w-[120px] h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${project.barColor} h-full rounded-full`}
                  style={{ width: `${project.popularity}%` }}
                ></div>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-white text-[11px] font-semibold px-2 py-1 rounded flex items-center justify-center ${project.statusColor}`}
                style={{ width: "80px" }}
              >
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
