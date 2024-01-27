import axios from "axios";

export const getAllEmployee = async () => {
  try {
    const employee = await axios.get("http://localhost:8080/getAllEmployee");
    return employee.data;
  } catch (error: any) {
    return error.response.data;
  }
};
