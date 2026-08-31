// 


import axios from "axios";

const PROMPT_WRITER_SYSTEM_PROMPT = `
You are a professional image-editing prompt engineer specializing in:

- residential interior design
- interior architecture
- gypsum and drywall
- false ceilings
- ceiling design
- wall design
- lighting
- furniture
- decoration
- renovation
- architectural photo editing

Your job is to convert the user's request and the application's contextual
parameters into ONE precise English prompt for an image-editing model.

The final prompt will be sent directly to an image editing model together
with the original image.

The original image is the source of truth.

USER PRIORITY:

1. The user's description has the highest priority.
2. Application parameters are only contextual information.
3. Never contradict the user's description.
4. Never invent unnecessary objects, materials, colors, furniture, lighting,
   decorations, architectural elements, or design changes.
5. Do not expand the scope of the user's request.
6. If the user requests a specific modification, perform ONLY that modification
   unless another change is absolutely necessary to make the requested
   modification visually coherent.

IMAGE PRESERVATION:

Edit the provided image directly.

Do NOT recreate the room from scratch.

Preserve exactly:

- camera position
- camera angle
- viewpoint
- framing
- crop
- field of view
- perspective
- image composition
- room layout
- visible areas
- spatial relationships
- architectural proportions

If multiple rooms, spaces, walls, corridors, or areas are visible,
keep ALL of them visible.

Do not crop, zoom, rotate, or recompose the image.

ARCHITECTURAL PRESERVATION:

Unless the user explicitly requests otherwise, NEVER change:

- floor plan
- room dimensions
- wall positions
- wall locations
- doors
- windows
- columns
- beams
- openings
- floor
- ceiling height
- structural elements
- room connections
- architectural geometry

An explicit architectural request allows ONLY the requested architectural
modification.

For example:

If the user requests a gypsum ceiling design, modify the ceiling design
without changing the room dimensions, walls, doors, windows, camera angle,
or floor plan.

If the user requests a wall design, modify only the requested wall.

If the user requests lighting, modify only the lighting.

If the user requests furniture, add or modify only the requested furniture
while preserving the existing room and architecture.

INTERIOR DESIGN PRESERVATION:

Preserve all unrelated elements.

Do not unnecessarily:

- remove furniture
- add furniture
- replace furniture
- change flooring
- change wall colors
- change ceiling height
- change windows
- change doors
- change lighting
- redesign the entire room
- redesign the entire apartment

Only modify what the user requested.

REALISM:

All modifications must look physically realistic and naturally integrated
into the original photograph.

New or modified elements must respect:

- original perspective
- scale
- depth
- lighting direction
- shadows
- reflections
- material properties
- existing geometry
- camera viewpoint

The result should look like a real photograph of the same place after the
requested modification.

GYPSUM / FALSE CEILING / KNAUF:

When the request involves gypsum, drywall, Knauf, false ceilings,
ceiling decoration, or ceiling lighting:

- preserve the existing ceiling height
- preserve the existing room proportions
- preserve walls and openings
- preserve the original camera viewpoint
- modify only the requested ceiling elements
- ensure the construction looks physically realistic
- maintain realistic thickness, edges, joints, recesses, and shadows
- integrate lighting realistically when requested

Do not turn a normal room into a completely different architectural space.

DESCRIPTION:

The user's description is the actual requested change.

Do not reinterpret vague words as permission to redesign the whole space.

OUTPUT:

Return ONLY ONE final English image-editing prompt.

Do not return:

- explanations
- reasoning
- JSON
- markdown
- alternatives
- headings
- Persian text
`;

// ---------------------------------------------------------
// Extract text from Chat Completions response
// ---------------------------------------------------------

const getResponseText = (data) => {
  const content =
    data?.choices?.[0]?.message?.content;

  if (
    typeof content === "string" &&
    content.trim()
  ) {
    return content.trim();
  }

  throw new Error(
    "Prompt writer returned no text output."
  );
};

// ---------------------------------------------------------
// Generate image prompt
// ---------------------------------------------------------

export const generateImagePrompt = async ({
  firstSelect,
  secondSelect,
  device,
  request,
  brand,
  description,
}) => {
  const apiUrl = process.env.VITE_AVALAI_API_URL;
  const apiKey = process.env.VITE_AVALAI_API_KEY;
  const model = process.env.PROMPT_WRITER_MODEL;

  // -------------------------------------------------------
  // Environment check
  // -------------------------------------------------------

  console.log("\n==============================================");
  console.log("🧠 PROMPT WRITER CONFIG");
  console.log("==============================================");

  console.log(
    "API URL:",
    apiUrl
  );

  console.log(
    "MODEL:",
    model
  );

  console.log(
    "API KEY:",
    apiKey ? "SET" : "NOT SET"
  );

  console.log(
    "==============================================\n"
  );

  if (!apiUrl) {
    throw new Error(
      "VITE_AVALAI_API_URL is not defined."
    );
  }

  if (!apiKey) {
    throw new Error(
      "VITE_AVALAI_API_KEY is not defined."
    );
  }

  if (!model) {
    throw new Error(
      "PROMPT_WRITER_MODEL is not defined."
    );
  }

  // -------------------------------------------------------
  // User input
  // -------------------------------------------------------

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

  // -------------------------------------------------------
  // URL
  // -------------------------------------------------------

  const url =
    `${apiUrl.replace(/\/$/, "")}/chat/completions`;

  // -------------------------------------------------------
  // Messages
  // -------------------------------------------------------

  const messages = [
    {
      role: "system",
      content: PROMPT_WRITER_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: input,
    },
  ];

  // -------------------------------------------------------
  // Debug
  // -------------------------------------------------------

  console.log("\n==============================================");
  console.log("🧠 PROMPT WRITER REQUEST");
  console.log("==============================================");

  console.log(
    "URL:",
    url
  );

  console.log(
    "MODEL:",
    model
  );

  console.log(
    "MESSAGES COUNT:",
    messages.length
  );

  console.log(
    "MESSAGES:",
    JSON.stringify(messages, null, 2)
  );

  console.log(
    "==============================================\n"
  );

  // -------------------------------------------------------
  // Request
  // -------------------------------------------------------

  try {
    const response = await axios.post(
      url,
      {
        model: model,
        messages: messages,
      },
      {
        timeout: 300000,

        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // -----------------------------------------------------
    // Raw response
    // -----------------------------------------------------

    console.log(
      "\n=============================================="
    );

    console.log(
      "✅ PROMPT WRITER RESPONSE"
    );

    console.log(
      "=============================================="
    );

    console.dir(
      response.data,
      {
        depth: null,
      }
    );

    // -----------------------------------------------------
    // Extract generated prompt
    // -----------------------------------------------------

    const generatedPrompt =
      getResponseText(response.data);

    console.log(
      "\n=============================================="
    );

    console.log(
      "📝 GENERATED IMAGE PROMPT"
    );

    console.log(
      "=============================================="
    );

    console.log(
      generatedPrompt
    );

    console.log(
      "==============================================\n"
    );

    return generatedPrompt;

  } catch (error) {

    console.error(
      "\n=============================================="
    );

    console.error(
      "❌ PROMPT WRITER FAILED"
    );

    console.error(
      "=============================================="
    );

    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "DATA:"
    );

    console.dir(
      error.response?.data,
      {
        depth: null,
      }
    );

    console.error(
      "MESSAGE:",
      error.message
    );

    console.error(
      "CODE:",
      error.code
    );

    console.error(
      "URL:",
      error.config?.url
    );

    console.error(
      "MODEL:",
      model
    );

    console.error(
      "==============================================\n"
    );

    throw error;
  }
};

