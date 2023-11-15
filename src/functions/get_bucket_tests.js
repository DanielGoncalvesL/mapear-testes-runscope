import axios from "axios";

const testsInBucketRequest = async (key, apiKey, count) => {
  const testUrl = `https://api.runscope.com/buckets/${key}/tests`;

  const url = count ? testUrl + `?count=${count}` : testUrl;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response.data.data;
};

export const getTestsInBucket = async (key, apiKey) => {
  let count = 0;
  let testsInBucket;

  do {
    count += 10;

    testsInBucket = await testsInBucketRequest(key, apiKey, count);
  } while (testsInBucket.length === count);

  return testsInBucket;
};
