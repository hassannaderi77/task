import apiClient from "../api/client";

export const userService = {
  getUsers: async () => {
    const response = await apiClient.get("/users");

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