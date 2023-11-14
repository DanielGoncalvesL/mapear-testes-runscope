import axios from 'axios';

const testsInBucketRequest = async (bucket, apiKey, count) => {
  const url = count ? bucket.tests_url+`?count=${count}` : bucket.tests_url

  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return response.data.data;
}

export const getTestsInBucket = async (bucket, apiKey) => {
  let count = 0
  let testsInBucket

  do {
    count += 10

    testsInBucket = await testsInBucketRequest(bucket, apiKey, count)
  } while (testsInBucket.length === count);

    return testsInBucket
}
