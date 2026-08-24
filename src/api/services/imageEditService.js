import avalaiClient from "../avalaiClient";

/*
|--------------------------------------------------------------------------
| Auxiliary parameters
|--------------------------------------------------------------------------
| These values are ONLY contextual information.
| They must NEVER override the user's description.
|--------------------------------------------------------------------------
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
  const editSingleImage = async (image) => {
    /*
    |--------------------------------------------------------------------------
    | Prompt
    |--------------------------------------------------------------------------
    */

    const prompt = `
Edit the image according to the USER INSTRUCTION.

USER INSTRUCTION:
${description?.trim() || "No additional instructions were provided."}

APPLICATION PARAMETERS:
- Image type: ${brand || "Not specified"}
- Target: ${device || "Not specified"}
- Edit type: ${operationInstructions[firstSelect] || "Not specified"}
- Change intensity: ${intensityInstructions[secondSelect] || "Not specified"}
- Style: ${styleInstructions[request] || "Not specified"}

The USER INSTRUCTION has absolute priority over the application
parameters.

Use application parameters only when they directly support the
USER INSTRUCTION. Ignore any parameter that conflicts with,
contradicts, or adds an edit not requested by the user.

Make only the requested edits.

Preserve everything else in the original image, including the
existing objects, shapes, geometry, proportions, depth, perspective,
position, spatial relationships, camera view, and composition.

When modifying an existing object or surface, change only the
requested property while preserving its original shape, geometry,
depth, position, and perspective.

Do not add, remove, redesign, improve, or reinterpret anything
unless explicitly requested.

The final image should be the original image with only the
USER INSTRUCTION applied.
`;

    /*
    |--------------------------------------------------------------------------
    | FormData
    |--------------------------------------------------------------------------
    */

    const formData = new FormData();

    formData.append("model", import.meta.env.VITE_AVALAI_MODEL);

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

  console.log("AVALAI SUCCESS:", response.data);

  return {
    before: image,
    after: response.data?.data?.[0]?.url,
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
    images.map((image) => editSingleImage(image)),
  );

  return results;
};
