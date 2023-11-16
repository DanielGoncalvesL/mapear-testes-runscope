import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

export const createXlsx = (scenariosList, buckets) => {
  const workbook = XLSX.utils.book_new();

  for (const bucket of buckets) {
    const bucketScenarios = scenariosList.filter(
      (scenario) => scenario.bucketName === bucket
    );

    const flattenedBucketScenarios = bucketScenarios.flatMap((scenario) =>
      scenario.tests.flatMap((test) =>
        test.steps.map((step) => ({
          key: scenario.key,
          bucketName: scenario.bucketName,
          testName: test.name,
          stepName: step.name,
          stepMethod: step.method,
          stepUrl: step.url,
        }))
      )
    );

    if (flattenedBucketScenarios.length > 0) {
      const headerMapping = {
        "key": "Chave",
        "bucketName": "Bucket",
        "testName": "Teste",
        "stepName": "Step",
        "stepMethod": "Método",
        "stepUrl": "URL"
      };
      
      const dataWithMappedHeaders = flattenedBucketScenarios.map(item => {
        let mappedItem = {};
        for (let key in item) {
          if (headerMapping[key]) {
            mappedItem[headerMapping[key]] = item[key];
          }
        }
        return mappedItem;
      });
      
      const worksheet = XLSX.utils.json_to_sheet(dataWithMappedHeaders);

      XLSX.utils.book_append_sheet(workbook, worksheet, bucket.substring(0,31));
    }
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const pathToSaveXlsx = path.resolve(
    __dirname,
    "..",
    "..",
    "reports",
    "Analise-RunScope-Auth.xlsx"
  );

  XLSX.writeFile(workbook, pathToSaveXlsx);
};
