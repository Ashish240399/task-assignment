import axios from "axios";

export const getAllAdmins = async () => {
  try {
    const admins = await axios.get("http://localhost:8080/getAllAdmin");
    return admins.data;
  } catch (error: any) {
    return error.response.data;
  }
};
