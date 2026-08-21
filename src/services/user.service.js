import axios from "axios";

export const userService = {
  getUsers: async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  },
};

// import apiClient from "../api/client";

// export const userService = {
//   getUsers: async () => {
//     const response = await apiClient.get("/users");

//     return response.data;
//   },
// };