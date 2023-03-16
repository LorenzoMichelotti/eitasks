import TaskList from "@/components/Tasks/TaskList";
import Response from "@/lib/models/Response";
import ITask from "@/lib/models/Task";
import ITaskList from "@/lib/models/Task";
import supabase from "@/lib/supabaseClient";

async function getParentTasks(
  from: number,
  to: number
): Promise<Response<{ tasks: ITask[]; count: number }>> {
  let { data, error, count } = await supabase
    .from("tasks")
    .select("*", {
      count: "exact",
    })
    .is("parentTaskId", null)
    .range(from, to);
  if (error)
    return {
      model: {
        tasks: [],
        count: 0,
      },
      errors: [],
      success: false,
    };
  return {
    model: { tasks: data as ITaskList[], count: count ?? 0 },
    errors: [],
    success: true,
  };
}
async function getTasks() {
  return await getParentTasks(0, 12);
}

export default async function Home() {
  const data = await getTasks();
  if (data.model && data.errors.length <= 0)
    return <TaskList data={data.model}></TaskList>;
  else
    return (
      <div>
        <h1>Tasks</h1>
        <p>No tasks have been found.</p>
        <div>
          {data.errors.map((err, k) => (
            <p key={k}>{err}</p>
          ))}
        </div>
      </div>
    );
}
