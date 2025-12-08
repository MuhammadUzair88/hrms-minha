import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HexOutline = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M9 4.5L19 4.5L24 14L19 23.5L9 23.5L4 14L9 4.5Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HexFilled = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M9 4.5L19 4.5L24 14L19 23.5L9 23.5L4 14L9 4.5Z"
      fill="#0EA5E9"
      stroke="#0EA5E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 14L13.8 16.5L17 11.5"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TaskCard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: "01", title: "Create wireframes", done: false },
    { id: "02", title: "User flows", done: false },
    { id: "03", title: "Empathy mapping", done: true },
    { id: "04", title: "Dashboard design", done: true },
    { id: "05", title: "Card sorting", done: false },
    { id: "06", title: "User research", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="w-full min-h-[384px] bg-white rounded-xl border border-zinc-400/20 p-6 flex flex-col gap-6">
      <h2 className="text-xl font-medium font-inter">
        My Tasks{" "}
        <span className="font-normal">
          ({tasks.filter((t) => t.done).length}/{tasks.length})
        </span>
      </h2>
      {/* Scrollable Task List */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-base font-medium font-geist">
                {task.id}
              </span>

              <span
                className={`text-base font-medium font-inter ${
                  task.done ? "opacity-90 line-through" : ""
                }`}
              >
                {task.title}
              </span>
            </div>

            <button
              onClick={() => toggleTask(task.id)}
              className="w-7 h-7 flex items-center justify-center"
            >
              {task.done ? <HexFilled /> : <HexOutline />}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => navigate("/task-management")}
          className=" w-48  bg-sky-500 text-white rounded-lg py-3 font-semibold font-inter border border-zinc-400/20"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
