import axios from 'axios';

export const getBuckets = async (bucketsList, apiKey) => {
  const response = await axios({
    method: 'GET',
    url: 'https://api.runscope.com/buckets',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })

  let buckets = response.data.data

  return buckets.filter(bucket => bucketsList.includes(bucket.name));
}