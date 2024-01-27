import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:8080/login", {
      email: email,
      password: password,
    });

    console.log(response.data); // Log the response data
    return response.data; // Return the response data
  } catch (error: any) {
    console.error("Error:", error.response);
    return error.response.data; // Re-throw the error if you want to handle it further
  }
};
