// import avalaiClient from "../avalaiClient";

// export const editImage = async ({
//   images,
//   firstSelect,
//   secondSelect,
//   device,
//   request,
//   brand,
//   description,
// }) => {
//   const formData = new FormData();

//   formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

//   const prompt = `
// Edit the provided image(s) according to the following requirements:

// Image type:
// ${brand}

// Primary editing target:
// ${device}

// Editing operation:
// ${firstSelect}

// Change intensity:
// ${secondSelect}

// Editing style:
// ${request}

// Additional instructions:
// ${description || "No additional instructions."}
// `;

//   formData.append("prompt", prompt);

//   formData.append("size", "1024x1024");

//   formData.append("n", "1");

//   // تمام تصاویر را در یک request ارسال می‌کنیم
//   images.forEach((image) => {
//     formData.append("image", image);
//   });

//   // لاگ قبل از ارسال
//   console.log(" Sending image edit request");

//   console.log({
//     endpoint: "/images/edits",
//     model: import.meta.env.VITE_AVALAI_MODEL,
//     imageCount: images.length,
//     imageNames: images.map((image) => image.name),
//     prompt,
//   });

//   // API request
//   const response = await avalaiClient.post(
//     "/images/edits",
//     formData
//   );

//   // لاگ پاسخ
//   console.log(" Image edit response received", response.data);

//   return response.data;
// };

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
  const editSingleImage = async (image) => {
    const formData = new FormData();

    formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

    const prompt = `
Edit the provided image according to the following requirements:

Image type:
${brand}

Primary editing target:
${device}

Editing operation:
${firstSelect}

Change intensity:
${secondSelect}

Editing style:
${request}

Additional instructions:
${description || "No additional instructions."}

Preserve the original subject, structure, proportions, and important details of the image unless the requested edit explicitly requires changing them.

Apply only the requested modifications and keep the result visually natural and consistent with the original image.
`;

    formData.append("prompt", prompt);
    formData.append("size", "1024x1024");
    formData.append("n", "1");

    // فقط همین عکس
    formData.append("image", image);

    const response = await avalaiClient.post(
      "/images/edits",
      formData
    );

    return {
      before: image,
      after: response.data?.data?.[0]?.url,
    };
  };

  const results = await Promise.all(
    images.map((image) => editSingleImage(image))
  );

  return results;
};