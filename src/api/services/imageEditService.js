import avalaiClient from "../avalaiClient";

export const editImage = async ({
  images,
  firstSelect,
  secondSelect,
  device,
  request,
  brand,
  description,
}) => {
  const formData = new FormData();

  formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

  const prompt = `
Edit the provided image according to these requirements:

First option: ${firstSelect}

Second option: ${secondSelect}

Device: ${device}

Request: ${request}

Brand: ${brand}

Additional instructions: ${description || "No additional instructions."}

Preserve the original subject and important details unless the request explicitly requires changing them.
`;

  formData.append("prompt", prompt);
  formData.append("size", "1024x1024");

  //  یک عکس برای تست
  formData.append("image", images[0]);

  // لاگ قبل از ارسال درخواست
  console.log("🚀 Sending image edit request", {
    endpoint: "/images/edits",
    model: import.meta.env.VITE_AVALAI_MODEL,
    imageCount: images.length,
    imageName: images[0]?.name,
    prompt,
  });

  // تنها درخواست API
  const response = await avalaiClient.post("/images/edits", formData);

  // لاگ پاسخ API
  console.log("✅ Image edit response received", response.data);

  return response.data;
};