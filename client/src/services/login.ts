import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const result = await axios.post(process.env.BASE_URL || "", {
      email: email,
      password: password,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
