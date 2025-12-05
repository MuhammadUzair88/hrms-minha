import React, { useState } from "react";
import Button from "../../components/Button";
import { Clock, Plus } from "lucide-react";
import DesignCard from "../../components/TaskManager/DesignCard";
import { useToggle } from "../../context/Toggle";
import ToggleButton from "../../components/ToggleButton";

const initialTasks = {
  pending: [
    {
      id: 1,
      category: "DESIGN SYSTEM",
      title: "Hero section",
      description:
        "Create a design system for a hero section in 2 different variants.",
      statusColor: "#22C55E",
      buttonLabel: "Start",
    },
    {
      id: 2,
      category: "TYPOGRAPHY",
      title: "Typography change",
      description:
        "Modify typography and styling of text placed on 6 screens of the website.",
      statusColor: "#3B82F6",
      buttonLabel: "Start",
    },
  ],
  inprogress: [
    {
      id: 3,
      category: "DEVELOPMENT",
      title: "Implement design screens",
      description:
        "Our designers created 6 screens for a website that needs to be implemented by our dev team.",
      statusColor: "#EF4444",
      buttonLabel: "Resume",
    },
  ],
  done: [
    {
      id: 4,
      category: "DEVELOPMENT",
      title: "Fix bugs in the CSS code",
      description:
        "Fix small bugs that are essential to prepare for the next release.",
      statusColor: "#EC4899",
    },
    {
      id: 5,
      category: "TYPOGRAPHY",
      title: "Proofread final text",
      description:
        "The text provided by marketing department needs to be proofread.",
      statusColor: "#3B82F6",
    },
  ],
};

const TaskStatus = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const { toggleSidebar, isSidebarOpen } = useToggle();

  const handleAction = (taskId, columnType, action) => {
    let newTasks = { ...tasks };
    const taskIndex = newTasks[columnType].findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;
    const task = newTasks[columnType][taskIndex];

    // Remove from current column
    newTasks[columnType].splice(taskIndex, 1);

    if (action === "Delete") {
      // Do nothing
    } else if (action === "Pending") {
      newTasks.pending.push({ ...task, buttonLabel: "Start" });
    } else if (action === "Complete") {
      newTasks.done.push({ ...task, buttonLabel: undefined });
    }

    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) return;
    const task = {
      id: Date.now(),
      category: "CUSTOM",
      title: newTask.title,
      description: newTask.description,
      statusColor: "#22C55E",
      buttonLabel: "Start",
    };
    setTasks({ ...tasks, pending: [...tasks.pending, task] });
    setNewTask({ title: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton checked={isSidebarOpen} onChange={toggleSidebar} />
          <h1 className="text-[#09182B]">Task Management</h1>
        </div>
      </div>

      <div className="py-6 px-10">
        <div className="bg-[#FCFCFC] h-screen w-full rounded-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-medium text-2xl">Board</h1>
            <Button icon={Clock} label={"00h 00m 05s"} />
          </div>

          <div className="flex items-start gap-7 h-full">
            {/* Pending Column */}
            <div className="flex flex-col min-h-screen bg-[#EEF2F5] gap-4 p-4 rounded-2xl flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Pending</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {tasks.pending.map((task) => (
                <DesignCard
                  key={task.id}
                  columnType="pending"
                  {...task}
                  onAction={(action) =>
                    handleAction(task.id, "pending", action)
                  }
                />
              ))}
            </div>

            {/* In Progress Column */}
            <div className="flex flex-col min-h-screen bg-[#EEF2F5] gap-4 p-4 rounded-2xl flex-1">
              <h2 className="font-semibold text-lg mb-2">In Progress</h2>
              {tasks.inprogress.map((task) => (
                <DesignCard
                  key={task.id}
                  columnType="inprogress"
                  {...task}
                  onAction={(action) =>
                    handleAction(task.id, "inprogress", action)
                  }
                />
              ))}
            </div>

            {/* Done Column */}
            <div className="flex flex-col min-h-screen bg-[#EEF2F5] gap-4 p-4 rounded-2xl flex-1">
              <h2 className="font-semibold text-lg mb-2">Done</h2>
              {tasks.done.map((task) => (
                <DesignCard
                  key={task.id}
                  columnType="done"
                  {...task}
                  onAction={(action) => handleAction(task.id, "done", action)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full border rounded-md p-2 mb-3"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full border rounded-md p-2 mb-3"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
