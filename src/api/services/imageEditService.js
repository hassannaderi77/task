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
Edit the provided images according to these requirements:

First option: ${firstSelect}

Second option: ${secondSelect}

Device: ${device}

Request: ${request}

Brand: ${brand}

Additional instructions:
${description || "No additional instructions."}

Preserve the original subject, structure, and important details of each image unless the request explicitly requires changing them.
`;

  formData.append("prompt", prompt);

  formData.append("size", "1024x1024");

  formData.append("n", "1");

  // تمام تصاویر را در یک request ارسال می‌کنیم
  images.forEach((image) => {
    formData.append("image", image);
  });

  // لاگ قبل از ارسال
  console.log("🚀 Sending image edit request");

  console.log({
    endpoint: "/images/edits",
    model: import.meta.env.VITE_AVALAI_MODEL,
    imageCount: images.length,
    imageNames: images.map((image) => image.name),
    prompt,
  });

  // API request
  const response = await avalaiClient.post(
    "/images/edits",
    formData
  );

  // لاگ پاسخ
  console.log("✅ Image edit response received", response.data);

  return response.data;
};