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
  generatedPrompt
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
  formData.append("generatedPrompt", generatedPrompt || "");

  const response = await apiClient.post("/history", formData);

  return response.data;
};

export const getHistory = async (userId) => {
  const response = await apiClient.get(`/history/${userId}`);

  return response.data;
};

export const deleteHistory = async (historyId, userId) => {
  const response = await apiClient.delete(
    `/history/${historyId}`,
    {
      data: {
        userId,
      },
    }
  );

  return response.data;
};