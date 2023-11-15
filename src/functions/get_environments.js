import axios from "axios";

export const getEnvironments = async (key, apiKey) => {
  const response = await axios.get(
    `https://api.runscope.com/buckets/${key}/environments`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.data;
};
