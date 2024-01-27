import axios from "axios";

export async function updateTask(
  taskId: number,
  taskKey: string,
  taskValue: string
) {
  try {
    const task = await axios.put(
      "http://localhost:8080/updateTaskStatus/" + taskId,
      {
        taskKey: taskKey,
        taskValue: taskValue,
      }
    );
    return task.data;
  } catch (error: any) {
    return error.response.data;
  }
}
