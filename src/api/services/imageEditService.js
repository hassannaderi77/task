import avalaiClient from "../avalaiClient";
import apiClient from "../client";

/*
|--------------------------------------------------------------------------
| Auxiliary parameters
|--------------------------------------------------------------------------
|
| These values are ONLY contextual information.
| They must NEVER override the user's description.
|
| NOTE:
| Prompt generation is now handled by the backend
| using the Prompt Writer model.
|
*/

const operationInstructions = {
  background_remove: "The UI selected background removal.",
  background_change: "The UI selected background change.",
  object_remove: "The UI selected object removal.",
  object_add: "The UI selected object addition.",
};

const intensityInstructions = {
  minimal: "The UI selected minimal change intensity.",
  moderate: "The UI selected moderate change intensity.",
  strong: "The UI selected strong change intensity.",
  creative: "The UI selected creative change intensity.",
};

const styleInstructions = {
  natural: "The UI selected a natural result style.",
  professional: "The UI selected a professional result style.",
  creative: "The UI selected a creative result style.",
};

/*
|--------------------------------------------------------------------------
| Edit Image
|--------------------------------------------------------------------------
*/

export const editImage = async ({
  images,
  description,
  firstSelect,
  secondSelect,
  device,
  brand,
  request,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Generate prompt ONCE
  |--------------------------------------------------------------------------
  |
  | The prompt does not depend on the individual image.
  | Therefore, when multiple images are selected, we only call
  | the Prompt Writer once.
  |
  */

  const promptResponse = await apiClient.post("/prompt-writer", {
    firstSelect,
    secondSelect,
    device,
    request,
    brand,
    description,
  });

  const prompt = promptResponse.data?.prompt;

  if (!prompt) {
    throw new Error("Prompt writer returned an empty prompt.");
  }

  console.log(
    "\n========== PROMPT SENT TO IMAGE MODEL =========="
  );
  console.log(prompt);
  console.log(
    "=================================================\n"
  );

  /*
  |--------------------------------------------------------------------------
  | Edit a single image
  |--------------------------------------------------------------------------
  */

  const editSingleImage = async (image) => {
    /*
    |--------------------------------------------------------------------------
    | FormData
    |--------------------------------------------------------------------------
    */

    const formData = new FormData();

    formData.append(
      "model",
      import.meta.env.VITE_AVALAI_MODEL
    );

    formData.append("prompt", prompt);

    formData.append("size", "1024x1024");

    formData.append("n", "1");

    formData.append("image", image);

    /*
    |--------------------------------------------------------------------------
    | API Request
    |--------------------------------------------------------------------------
    */

    try {
      const response = await avalaiClient.post(
        "/images/edits",
        formData
      );

      console.log(
        "AVALAI SUCCESS:",
        response.data
      );

      return {
        before: image,
        after: response.data?.data?.[0]?.url,
        generatedPrompt: prompt
      };
    } catch (error) {
      console.error(
        "AVALAI ERROR STATUS:",
        error.response?.status
      );

      console.error(
        "AVALAI ERROR DATA:",
        error.response?.data
      );

      console.error(
        "AVALAI ERROR HEADERS:",
        error.response?.headers
      );

      throw error;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | One API request per image
  |--------------------------------------------------------------------------
  */

  const results = await Promise.all(
    images.map((image) =>
      editSingleImage(image)
    )
  );

  return results;
};


// import avalaiClient from "../avalaiClient";

// export const editImage = async ({
//   images,
//   description,
//   firstSelect,
//   secondSelect,
//   device,
//   brand,
//   request,
// }) => {
//   /*
//   |--------------------------------------------------------------------------
//   | Direct prompt
//   |--------------------------------------------------------------------------
//   |
//   | برای تست Prompt Writer کاملاً حذف شده.
//   | اطلاعات فرم + توضیحات کاربر مستقیماً برای مدل Image Edit ارسال می‌شوند.
//   |
//   */

//   const prompt = `
// You are editing the provided interior architecture image.

// IMPORTANT:
// Edit the existing image only. Do NOT generate a completely new room, house, or interior.

// IMAGE AND ARCHITECTURE PRESERVATION:
// - Keep the exact camera angle and viewpoint.
// - Keep the exact camera position.
// - Keep the exact framing and crop.
// - Keep the exact perspective and field of view.
// - Keep the exact composition.
// - Keep the existing floor plan and room layout unchanged.
// - Keep all existing rooms and visible areas in the same positions.
// - Do NOT move, resize, remove, or reconstruct walls.
// - Do NOT move or change doors, windows, columns, openings, stairs, or other architectural structures.
// - Do NOT change the dimensions or proportions of the room.
// - Do NOT change the ceiling height unless explicitly requested.
// - Do NOT change the camera perspective to make the result look more attractive.
// - Do NOT crop, zoom, rotate, or reframe the image.

// INTERIOR DESIGN EDITING:
// - Modify only the elements explicitly requested by the user.
// - Preserve every unrelated element of the original image.
// - Do not redesign the entire interior unless the user explicitly asks for a complete redesign.
// - Do not add furniture, decorations, plants, materials, colors, or architectural elements that were not requested.
// - Do not remove existing objects unless the user explicitly asks for their removal.
// - Keep existing furniture and objects in their original positions unless the user requests otherwise.

// GYPSUM / FALSE CEILING / KNAUF:
// - If the user requests a gypsum, drywall, or false ceiling design, build it inside the existing ceiling structure.
// - Do not change the room dimensions or ceiling height unless explicitly requested.
// - Keep the existing walls, doors, windows, and room boundaries unchanged.
// - Make the new ceiling physically consistent with the existing architecture.
// - Maintain realistic perspective, scale, depth, shadows, and lighting.
// - The ceiling design must follow the actual geometry and perspective of the photographed room.
// - Do not create impossible architectural structures or unrealistic ceiling geometry.

// LIGHTING:
// - If lighting is requested, add or modify lighting only where requested.
// - Make lighting physically realistic.
// - Match the existing perspective and room geometry.
// - Preserve unrelated existing light sources unless the user asks to change them.
// - Do not dramatically change the overall exposure or atmosphere unless requested.

// WALLS AND SURFACES:
// - If the user requests a wall color or surface change, modify only the requested wall or surface.
// - Preserve the wall's exact shape, boundaries, perspective, doors, windows, outlets, switches, and architectural details.
// - Do not change the geometry of the wall.
// - Keep the new material or color realistic and consistent with the existing lighting.

// PERSPECTIVE AND REALISM:
// - All new elements must match the original image's perspective, scale, depth, lighting, shadows, reflections, and spatial relationships.
// - New architectural elements must look physically built into the existing space.
// - Avoid distorted walls, ceilings, furniture, windows, doors, or architectural lines.
// - Avoid changing the visual identity of the original room beyond the requested edits.

// MULTIPLE AREAS:
// - If multiple rooms, areas, or spaces are visible in the image, keep ALL of them visible.
// - Do not turn the image into a single-room composition.
// - Do not hide or remove visible areas to make editing easier.

// USER INFORMATION:

// Image type:
// ${brand || "Not specified"}

// Target:
// ${device || "Not specified"}

// Edit type:
// ${firstSelect || "Not specified"}

// Change intensity:
// ${secondSelect || "Not specified"}

// Result style:
// ${request || "Not specified"}

// USER REQUEST:
// ${description?.trim() || "No additional description provided."}

// FINAL INSTRUCTION:
// Follow the user's request precisely.
// The user's request has the highest priority.
// Make only the requested changes.
// Preserve everything else exactly as much as possible.
// Do not change the camera angle, perspective, framing, crop, room layout, floor plan, or architectural geometry unless the user explicitly requests such a change.
// `;

//   /*
//   |--------------------------------------------------------------------------
//   | Edit single image
//   |--------------------------------------------------------------------------
//   */

//   const editSingleImage = async (image) => {
//     const formData = new FormData();

//     formData.append(
//       "model",
//       import.meta.env.VITE_AVALAI_MODEL
//     );

//     formData.append("prompt", prompt);

//     formData.append("size", "1024x1024");

//     formData.append("n", "1");

//     formData.append("image", image);

//     try {
//       console.log(
//         "Sending image directly to AvalAI:",
//         image.name
//       );

//       const response = await avalaiClient.post(
//         "/images/edits",
//         formData
//       );

//       console.log(
//         "AVALAI SUCCESS:",
//         response.data
//       );

//       const afterUrl =
//         response.data?.data?.[0]?.url;

//       if (!afterUrl) {
//         throw new Error(
//           "Image edit API returned no image URL."
//         );
//       }

//       return {
//         before: image,
//         after: afterUrl,

//         // فعلاً همین Direct Prompt داخل History ذخیره می‌شود
//         generatedPrompt: prompt,
//       };
//     } catch (error) {
//       console.error(
//         "AVALAI ERROR STATUS:",
//         error.response?.status
//       );

//       console.error(
//         "AVALAI ERROR DATA:",
//         error.response?.data
//       );

//       console.error(
//         "AVALAI ERROR HEADERS:",
//         error.response?.headers
//       );

//       console.error(
//         "AVALAI ERROR MESSAGE:",
//         error.message
//       );

//       throw error;
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | One request per image
//   |--------------------------------------------------------------------------
//   */

//   const results = await Promise.all(
//     images.map((image) =>
//       editSingleImage(image)
//     )
//   );

//   return results;
// };