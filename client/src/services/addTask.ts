import axios from "axios";

export const addTask = async ({
  title,
  created_by,
  assigned_to,
  expires_at,
}: {
  title: string;
  created_by: string;
  assigned_to: string;
  expires_at: string;
}) => {
  try {
    const task = await axios.post("http://localhost:8080/addTask", {
      title,
      created_by,
      expires_at,
      assigned_to,
    });
    return task.data;
  } catch (error: any) {
    return error.response.data;
  }
};
