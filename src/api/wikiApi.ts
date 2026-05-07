import axios from "axios";

export const searchWiki = async (searchTerm: string) => {
  const response = await axios.get(
    "https://en.wikipedia.org/w/api.php",
    {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: searchTerm,
      },
    }
  );

  return response.data;
};