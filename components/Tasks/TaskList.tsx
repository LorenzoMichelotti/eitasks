"use client";
import ITask from "@/lib/models/Task";
import ITaskList from "@/lib/models/Task";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskDetails from "./TaskDetails";

export default function TaskList({
  data,
}: {
  data: { tasks: ITask[]; count: number };
}) {
  const [activeTask, setActiveTask] = useState<ITask | undefined>(undefined);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  function openTaskDetails(task: ITask) {
    setActiveTask(task);
    setIsDetailsOpen(true);
  }
  return (
    <>
      <ul className="mx-4 mb-24 sm:mx-auto space-y-4 max-w-[564px]">
        {data.tasks.map((task: ITaskList) => {
          return (
            <li className="w-full" key={task?.id}>
              <TaskCard openTaskDetails={openTaskDetails} task={task} />
            </li>
          );
        })}
      </ul>
      <TaskDetails
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        parentTask={activeTask}
      ></TaskDetails>
    </>
  );
}
