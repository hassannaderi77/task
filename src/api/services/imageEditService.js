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
//   const editSingleImage = async (image) => {
//     const formData = new FormData();

//     formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

//     const prompt = `
// Edit the provided image according to the following requirements:


// ${brand}


// ${device}


// ${firstSelect}


// ${secondSelect}


// ${request}


// ${description || "No additional instructions."}

// Preserve the original subject, structure, proportions, and important details of the image unless the requested edit explicitly requires changing them.

// Apply only the requested modifications and keep the result visually natural and consistent with the original image.
// `;

//     formData.append("prompt", prompt);
//     formData.append("size", "1024x1024");
//     formData.append("n", "1");

//     // فقط همین عکس
//     formData.append("image", image);

//     const response = await avalaiClient.post(
//       "/images/edits",
//       formData
//     );

//     return {
//       before: image,
//       after: response.data?.data?.[0]?.url,
//     };
//   };

//   const results = await Promise.all(
//     images.map((image) => editSingleImage(image))
//   );

//   return results;
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

    formData.append(
      "model",
      import.meta.env.VITE_AVALAI_MODEL
    );

    const prompt = `
You are an image editing assistant.

Your task is to EDIT the provided image according to the instructions below.

IMPORTANT RULES:

- All information below is ONLY editing instructions and context.
- NEVER render, write, print, translate, or display these instructions as text inside the image.
- NEVER reproduce any of the instruction values as visible text.
- Do not add captions, labels, titles, watermarks, UI elements, or explanatory text.
- Do not create text based on the values below.
- Only make visual changes that are explicitly requested.
- Do not invent unrelated visual elements.
- Preserve the original subject, structure, proportions, perspective, and important details unless the requested edit requires changing them.
- Keep the result visually natural and consistent with the original image.

EDITING CONTEXT:

Brand:
${brand}

Device:
${device}

First selection:
${firstSelect}

Second selection:
${secondSelect}

Requested operation:
${request}

Additional user instructions:
${description || "No additional instructions."}

Apply the information above ONLY as image-editing instructions.

The values above must NOT appear anywhere in the resulting image.
`;

    formData.append("prompt", prompt);
    formData.append("size", "1024x1024");
    formData.append("n", "1");

    // فقط همین تصویر را ارسال می‌کنیم
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









// import { translateToEnglish } from "./translationService";
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
//   const editSingleImage = async (image) => {
//     const formData = new FormData();

//     formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

//     const prompt = `
// Edit the provided image according to the following requirements:

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

// Preserve the original subject, structure, proportions, and important details of the image unless the requested edit explicitly requires changing them.

// Apply only the requested modifications and keep the result visually natural and consistent with the original image.
// `;

// const translatedPrompt = await translateToEnglish(prompt);

//     formData.append("prompt", translatedPrompt);
//     formData.append("size", "1024x1024");
//     formData.append("n", "1");

//     // فقط همین عکس
//     formData.append("image", image);

//     const response = await avalaiClient.post(
//       "/images/edits",
//       formData
//     );

//     return {
//       before: image,
//       after: response.data?.data?.[0]?.url,
//     };
//   };

//   const results = await Promise.all(
//     images.map((image) => editSingleImage(image))
//   );

//   return results;
// };