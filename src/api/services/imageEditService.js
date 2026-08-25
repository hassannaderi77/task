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