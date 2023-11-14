import { getTestsInBucket } from './get_tests_in_bucket.js'
import { getBuckets } from './get_buckets.js'

const apiKey = '70e6b819-dbe1-481e-81ea-f3f8bdd23242'

const bucketsList = [
  'Management - Data - Activities', 
  // 'Management - Data - Auth Api - Em construção',
  // 'Management - Data - Id Api',
  // 'Management - Data - Management Auth API',
  // 'Management - Data - Pagarme Scope Api',
  // 'Management - Data - Profile API',
  // 'Management - Data - Scope Api',
  // 'Management - Data - Utilities'
]

const main = async () => {
  let scenariosList = [{}]
  
  const buckets = await getBuckets(bucketsList, apiKey)
  
  buckets.map(async (bucket) => {
    const key = bucket.key
    const bucketName = bucket.name

    const testsInBucket = await getTestsInBucket(bucket, apiKey)

    const testsName = []

    testsInBucket.map((test) => {
      console.log("🚀 ~ file: index.js:31 ~ testsInBucket.map ~ test:", test.name)
    })
  })
}

main().then()
