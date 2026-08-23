import apiClient from "../client";

export const createHistory = async ({
  userId,
  beforeImage,
  afterImage,
  firstSelect,
  secondSelect,
  device,
  request,
  brand,
  description,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("beforeImage", beforeImage);
  formData.append("afterImage", afterImage);

  formData.append("firstSelect", firstSelect);
  formData.append("secondSelect", secondSelect);
  formData.append("device", device);
  formData.append("request", request);
  formData.append("brand", brand);
  formData.append("description", description || "");

  const response = await apiClient.post("/history", formData);

  return response.data;
};

export const getHistory = async (userId) => {
  const response = await apiClient.get(`/history/${userId}`);

  return response.data;
};