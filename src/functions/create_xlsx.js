import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

export const createXlsx = (scenariosList) => {
  const flattenedScenariosList = scenariosList.flatMap((scenario) =>
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

  const worksheet = XLSX.utils.json_to_sheet(flattenedScenariosList, {
    header: [
      "key",
      "bucketName",
      "testName",
      "stepName",
      "stepMethod",
      "stepUrl",
    ],
    skipHeader: true,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Scenarios");

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
