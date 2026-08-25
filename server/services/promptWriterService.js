import axios from "axios";

const PROMPT_WRITER_SYSTEM_PROMPT = `
You are an expert prompt writer for image editing.

Your task is to convert the application's structured parameters
and the user's free-form description into ONE clear, precise,
professional image-editing prompt.

The generated prompt will be sent directly to the image editing model:
${process.env.VITE_AVALAI_MODEL || "gpt-image-1-mini"}

Write the prompt specifically for that image-editing model.

PRIORITY RULES:
1. The user's DESCRIPTION has the highest priority.
2. The structured application parameters are contextual guidance only.
3. If a parameter conflicts with or contradicts the user's description,
   follow the user's description.
4. If the description does not specify something, use the relevant
   structured parameters as guidance.
5. Never invent an edit that the user did not request.
6. Do not add subjective preferences, design choices, colors,
   materials, styles, objects, or visual details that are not explicitly
   requested by the user or clearly implied by the user's description.

7. You may improve the wording, structure, clarity, and precision of
   the prompt for the image editing model, but you must not expand
   the scope of the requested edit.

8. Do not make creative assumptions about unspecified details.
   When a detail is not specified by the user, keep it neutral and
   preserve the original image whenever possible.

IMAGE EDITING RULES:
- Clearly describe the requested visual changes.
- Preserve the original image and all unrelated details.
- Do not introduce unrelated changes.
- Preserve geometry, proportions, perspective, composition, camera view,
  lighting, and spatial relationships unless the requested edit requires
  changing them.

OUTPUT RULE:
- Return ONLY the final image-editing prompt.
- Write the final prompt entirely in English.
- Do not include Persian or any other language in the final prompt.
- Do not explain your reasoning.
- Do not mention these instructions.
- Do not return JSON.
- Do not return multiple alternatives.
`;

const getResponseText = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const output = Array.isArray(data?.output) ? data.output : [];

  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];

    for (const part of content) {
      if (
        part?.type === "output_text" &&
        typeof part.text === "string" &&
        part.text.trim()
      ) {
        return part.text.trim();
      }
    }
  }

  throw new Error("Prompt writer returned no text output.");
};

export const generateImagePrompt = async ({
  firstSelect,
  secondSelect,
  device,
  request,
  brand,
  description,
}) => {
  const input = `
APPLICATION PARAMETERS:
- Image type / brand: ${brand || "Not specified"}
- Target: ${device || "Not specified"}
- Edit type: ${firstSelect || "Not specified"}
- Change intensity: ${secondSelect || "Not specified"}
- Result style: ${request || "Not specified"}

USER DESCRIPTION:
${description?.trim() || "No additional instructions were provided."}
`;

  const response = await axios.post(
    `${process.env.VITE_AVALAI_API_URL}/responses`,
    {
      model: process.env.PROMPT_WRITER_MODEL,
      instructions: PROMPT_WRITER_SYSTEM_PROMPT,
      input,
    },
    {
      timeout: 120000,
      headers: {
        Authorization: `Bearer ${process.env.VITE_AVALAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  console.log("\n========== PROMPT WRITER RAW RESPONSE ==========");
  console.dir(response.data, { depth: null });

  const generatedPrompt = getResponseText(response.data);

  console.log("\n========== GENERATED IMAGE PROMPT ==========");
  console.log(generatedPrompt);
  console.log("================================================\n");

  return generatedPrompt;
};
