import axios from "axios";

export const getTestSteps = async (key, test, apiKey) => {
  const response = await axios.get(
    `https://api.runscope.com/buckets/${key}/tests/${test.id}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.data;
};
