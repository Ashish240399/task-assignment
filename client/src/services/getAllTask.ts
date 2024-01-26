import axios from "axios";

export const getAllTask = async ({
  status,
  search,
  created_by,
  assigned_to,
}: {
  status: string | undefined;
  search: string | undefined;
  created_by: string | undefined;
  assigned_to: string | undefined;
}) => {
  try {
    let url = "http://localhost:8080/getAllTasks?";
    if (status) {
      url += "status=" + status;
    }
    if (created_by) {
      url += "createdBy=" + created_by;
    }
    if (assigned_to) {
      url += "assignedTo=" + assigned_to;
    }
    if (search) {
      url += "search=" + search;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log("Error: ", error);
    return error.response.data;
  }
};
