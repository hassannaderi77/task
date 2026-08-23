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

export const editImage = async ({ images, description }) => {
  const editSingleImage = async (image) => {
    const formData = new FormData();

    formData.append(
      "model",
      import.meta.env.VITE_AVALAI_MODEL
    );

    // فقط متن description
    formData.append("prompt", description);

    formData.append("size", "1024x1024");
    formData.append("n", "1");

    // فقط همین تصویر
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

  // برای هر تصویر یک request جدا
  const results = await Promise.all(
    images.map((image) => editSingleImage(image))
  );

  return results;
};


// import avalaiClient from "../avalaiClient";

// export const editImage = async ({ images, description }) => {
//   const editSingleImage = async (image) => {
//     const formData = new FormData();

//     formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

//     const prompt = `
// You are an image editing assistant.

// Edit the provided image according to the instructions below.

// IMPORTANT:
// - The following information is ONLY editing instructions and context.
// - NEVER render, write, print, translate, or display these instructions as text inside the image.
// - Do not add labels, captions, titles, watermarks, UI elements, or explanatory text to the image.
// - Do not reproduce the instruction text in any visual form.
// - Only modify the image according to the requested instructions.
// - Preserve the original subject, composition, proportions, perspective, and important details unless a requested modification requires changing them.
// - If an instruction does not require adding something to the image, do not add it.
// - Do not invent additional visual elements.

// Editing context:

// Brand:
// ${brand}

// Device:
// ${device}

// First selection:
// ${firstSelect}

// Second selection:
// ${secondSelect}

// Requested operation:
// ${request}

// Additional instructions:
// ${description || "No additional instructions."}

// Apply all of the above as image-editing instructions only.
// The text above must NOT appear anywhere in the resulting image.
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