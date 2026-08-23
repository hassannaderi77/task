import axios from "axios";

export const translateToEnglish = async (text) => {
  const response = await axios.get(
    "https://api.mymemory.translated.net/get",
    {
      params: {
        q: text,
        langpair: "fa|en",
      },
    }
  );

  return response.data.responseData.translatedText;
};