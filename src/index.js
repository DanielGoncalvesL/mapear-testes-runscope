import { getTestsInBucket } from "./functions/get_bucket_tests.js";
import { getBuckets } from "./functions/get_buckets.js";
import { getTestSteps } from "./functions/get_tests_steps.js";
import { getEnvironments } from "./functions/get_environments.js";
import { createXlsx } from "./functions/create_xlsx.js";

function replaceUrl(step, enviromentsValues) {
  let newUrl = step.url;
  for (let key in enviromentsValues) {
    newUrl = newUrl.replace(`{{${key}}}`, enviromentsValues[key]);
  }
  return newUrl;
}

async function main(apiKey, bucketsList) {
  const buckets = await getBuckets(bucketsList, apiKey);

  const scenariosList = await Promise.all(
    buckets.map(async (bucket) => {
      const key = bucket.key;
      const enviromentData = await getEnvironments(key, apiKey);
      const testsInBucket = await getTestsInBucket(key, apiKey);

      const tests = await Promise.all(
        testsInBucket.map(async (test) => {
          const testSteps = await getTestSteps(key, test, apiKey);
          const environmentName = testSteps.last_run.environment_name;

          const enviromentsValues = enviromentData.find(
            (enviroment) => enviroment.name === environmentName
          ).initial_variables;

          const steps = testSteps.steps
            .filter((step) => step.step_type === "request")
            .map((step) => {
              const url = replaceUrl(step, enviromentsValues);

              return {
                name: step.note,
                method: step.method,
                url,
              };
            });

          return {
            name: test.name,
            steps,
          };
        })
      );

      return {
        key,
        bucketName: bucket.name,
        tests,
      };
    })
  );
  createXlsx(scenariosList, bucketsList);
}

const apiKey = "70e6b819-dbe1-481e-81ea-f3f8bdd23242";
const bucketsList = [
  "Management - Data - Activities",
  "Management - Data - Auth  Api - Em construção",
  "Management - Data - Id Api",
  "Management - Data - Management Auth API",
  "Management - Data - Pagarme Scope Api",
  "Management - Data - Profile API",
  // 'Management - Data - Utilities'
];

main(apiKey, bucketsList).catch(console.error);
