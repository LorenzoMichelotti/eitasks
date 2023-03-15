"use client";
import ITask from "@/lib/models/Task";
import ITaskList from "@/lib/models/Task";

export default function TaskCard({
  task,
  openTaskDetails,
}: {
  task: ITaskList;
  openTaskDetails: (task: ITask) => void;
}) {
  return (
    <button
      onClick={() => openTaskDetails(task)}
      className="w-full flex flex-col text-left border-t-2 dark:border-gray-700 p-4"
    >
      <h1 className="font-semibold">{task.title}</h1>
      <p className="text-gray-500 text-sm">
        criado em{" "}
        {new Date(task.created_at).toLocaleDateString("pt-br", {
          day: "numeric",
          year: "numeric",
          month: "long",
        })}
      </p>
      {task.description && (
        <p className="mt-2">
          {task.description.length > 75
            ? task.description.slice(0, 75) + "..."
            : task.description}
        </p>
      )}
      <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-2 mt-2 rounded-full">
        <div
          style={{ width: task?.progress + "%" }}
          className={`absolute top-0 left-0 h-full rounded-full 
          ${
            task.progress == 100
              ? "bg-lime-400"
              : task.progress > 75
              ? "bg-blue-400"
              : task.progress > 40
              ? "bg-yellow-400"
              : task.progress > 20
              ? "bg-orange-400"
              : "bg-pink-400"
          }`}
        ></div>
      </div>
    </button>
  );
}
