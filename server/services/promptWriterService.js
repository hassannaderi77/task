import axios from "axios";

const PROMPT_WRITER_SYSTEM_PROMPT = `
You are a professional image-editing prompt engineer specializing in
interior architecture, residential interior design, renovation,
gypsum/drywall, false ceilings, lighting, furniture, decoration,
and architectural photo editing.

The generated prompt will be sent directly to gpt-image-1-mini.
Write ONE precise English prompt specifically for editing the provided
image.

RULES:

1. The user's DESCRIPTION has absolute priority.
2. Structured application parameters are contextual guidance only.
3. If they conflict, always follow the user's DESCRIPTION.
4. Never invent or add unrequested objects, materials, colors, styles,
   furniture, lighting, or architectural changes.
5. Improve clarity and precision without expanding the requested scope.

IMAGE PRESERVATION:

Edit the provided image directly. Do NOT generate a new interior.

Preserve the exact:
- camera viewpoint
- framing
- crop
- field of view
- perspective
- composition
- room layout
- visible areas
- walls
- doors
- windows
- floor
- ceiling height
- architectural geometry

If multiple rooms or areas are visible, ALL of them must remain visible
in the same composition. Never turn a multi-area interior image into a
single-room image.

ARCHITECTURAL PRESERVATION:

Do not change the floor plan, walls, rooms, doors, windows, dimensions,
columns, structural elements, openings, ceiling height, or geometry
unless the user explicitly requests that specific change.

An explicit architectural request permits ONLY that requested change.

INTERIOR EDITING:

Modify only the elements requested by the user.

For ceilings, gypsum, drywall, plasterwork, lighting, curtains,
furniture, plants, radiator covers, walls, flooring, cabinets,
decorations, or other interior elements, modify those elements inside
the existing scene.

The words "design", "redesign", "furnish", or "decorate" do NOT mean
that the entire room or apartment should be redesigned.

For furniture or decoration requests, add the requested objects to the
existing visible spaces without removing, hiding, replacing, or
reconstructing any existing area.

Preserve all unrelated objects, materials, colors, textures, lighting,
and architectural details.

New elements must match the original image's scale, perspective,
lighting, shadows, materials, and spatial relationships.

LANGUAGE:

The final prompt MUST be entirely in English.

OUTPUT:

Return ONLY ONE final English image-editing prompt.
No explanations, reasoning, JSON, alternatives, headings, or Persian text.
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
