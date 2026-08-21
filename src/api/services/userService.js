import apiClient from "../client";

export const getUsers = async () => {
  const response = await apiClient.get("/users");

  return response.data;
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);

  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await apiClient.patch(`/users/${userId}`, userData);

  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);

  return response.data;
};