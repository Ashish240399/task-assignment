import axios from "axios";

export const updateTask = async (
  taskId: string,
  taskKey: string,
  taskValue: string
) => {
  try {
    const task = await axios.put(
      `http://localhost:8080/updateTaskStatus/${taskId}`,
      {
        taskKey: taskKey,
        taskValue: taskValue,
      }
    );
    return task.data;
  } catch (err: any) {
    return err.response.data;
  }
};
