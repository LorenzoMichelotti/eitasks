import Response from "@/lib/models/Response";
import ITask from "@/lib/models/Task";
import ITaskList from "@/lib/models/Task";
import supabase from "@/lib/supabaseClient";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TiInputChecked,
  TiPencil,
  TiPlus,
  TiTick,
  TiTickOutline,
  TiTrash,
} from "react-icons/ti";

async function toggleTaskCompletion(taskId: number, completed: boolean) {
  let { data, error, count } = await supabase
    .from("tasks")
    .update({
      completed: completed,
    })
    .eq("id", taskId);
  if (error) return console.log(error);
  return console.log(data);
}

export default function TaskDetails({
  parentTask,
  isOpen,
  setIsOpen,
}: {
  parentTask?: ITask;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [subtasks, setSubtasks] = useState<
    Response<{ tasks: ITask[]; count: number }>
  >({ errors: [], success: true, model: { count: 0, tasks: [] } });

  async function getChildTasks(parentTaskId: number, from: number, to: number) {
    let { data, error, count } = await supabase
      .from("tasks")
      .select("*", {
        count: "exact",
      })
      .eq("parentTaskId", parentTaskId)
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) {
      setSubtasks((prev) => ({
        success: false,
        model: prev?.model,
        errors: ["Error loading task details"],
      }));
      return {
        tasks: [],
        errors: ["Error loading task details"],
        count,
      };
    }
    setSubtasks({
      success: true,
      model: { tasks: data as ITaskList[], count: count ?? 0 },
      errors: [],
    });
    return { tasks: data as ITaskList[], count, errors: [] };
  }

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  function toggleTaskComplete(task: ITask) {
    console.log("toggle");
    setSubtasks((prev) => {
      const newTasks = prev.model;
      const updatedTask = newTasks?.tasks.find((t) => t.id === task.id);
      if (!updatedTask) return { ...prev };
      updatedTask.completed = !updatedTask?.completed;
      toggleTaskCompletion(task.id, updatedTask.completed);
      return { ...prev, model: newTasks };
    });
  }

  useEffect(() => {
    if (parentTask) setIsOpen(true);
  }, [parentTask]);

  useEffect(() => {
    if (isOpen && parentTask) getChildTasks(parentTask.id, 0, 12);
  }, [isOpen, parentTask]);

  if (isOpen && parentTask)
    return (
      <div>
        <div
          onClick={toggleIsOpen}
          className="bg-black/50 w-full h-full fixed top-0 left-0 transition-all"
        ></div>
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full sm:w-2/3 lg:w-1/3 min-h-56 max-h-[700px] p-8 sm:pt-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg border-2 border-gray-300 dark:border-gray-700">
          <div className="flex justify-end w-full">
            {/* <button className="p-1 ml-auto hover:bg-gray-200 rounded-full">
              <TiPencil className="rotate-45" />
            </button> */}
            <button
              onClick={toggleIsOpen}
              className="p-1 ml-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <TiPlus className="rotate-45" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{parentTask.title}</h2>
            <p className="text-sm text-gray-500 mt-2">
              Criado em{" "}
              {new Date(parentTask.created_at).toLocaleDateString("pt-br", {
                day: "numeric",
                year: "numeric",
                month: "long",
              })}
            </p>
            <p className="mt-4">{parentTask.description}</p>
          </div>
          <ul className="space-y-1 w-full max-h-96 mt-4 overflow-auto">
            {subtasks?.model?.tasks.map((task: ITaskList) => {
              return (
                <li
                  className="w-full flex hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                  key={task?.id}
                >
                  <button
                    onClick={() => toggleTaskComplete(task)}
                    className="w-full text-left py-1 px-2 flex items-center"
                  >
                    <div className="flex w-6 h-6 items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
                      {task.completed && (
                        <TiTick className="w-full h-full text-lime-600" />
                      )}
                    </div>
                    <span className="ml-4 w-full">{task.title}</span>
                  </button>
                  {/* <button className="px-2 text-gray-500 hover:text-black">
                    <TiTrash />
                  </button> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  else return null;
}
