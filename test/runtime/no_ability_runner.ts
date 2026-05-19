import { resetTestRegistry, runRegisteredTests } from "../source/utils/framework.test";

function emitResultMarker(result: any) {
  const issuesText =
    result.issues && Array.isArray(result.issues) && result.issues.length > 0
      ? result.issues.join(",")
      : "none";
  print(
    "__OHOS_SPLIT_RESULT__" +
      ` suite=${result.suite}` +
      ` status=${result.status}` +
      ` registered=${result.registered}` +
      ` executed=${result.executed}` +
      ` skipped=${result.skipped}` +
      ` total=${result.total}` +
      ` pass=${result.pass}` +
      ` failure=${result.failure}` +
      ` error=${result.error}` +
      ` ignore=${result.ignore}` +
      ` assertions=${result.assertions}` +
      ` no_assert_tests=${result.noAssertTests}` +
      ` napi_calls=0` +
      ` strict=false` +
      ` issues=${issuesText}`,
  );
}

function toText(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (value.message) {
    return String(value.message);
  }
  return String(value);
}

export function runSplitSuite(suiteName: string, suite: any, _tmpDir: string = "/tmp") {
  print(`__OHOS_SPLIT_START__ suite=${suiteName}`);
  resetTestRegistry();

  try {
    suite();
  } catch (err) {
    emitResultMarker({
      suite: suiteName,
      status: "fail",
      registered: 0,
      executed: 0,
      skipped: 0,
      total: 0,
      pass: 0,
      failure: 0,
      error: 1,
      ignore: 0,
      assertions: 0,
      noAssertTests: 0,
      issues: ["setup_error", toText(err).replace(/\s+/g, "_")],
    });
    return;
  }

  runRegisteredTests(suiteName)
    .then((result) => emitResultMarker(result))
    .catch((err) => {
      emitResultMarker({
        suite: suiteName,
        status: "fail",
        registered: 0,
        executed: 0,
        skipped: 0,
        total: 0,
        pass: 0,
        failure: 0,
        error: 1,
        ignore: 0,
        assertions: 0,
        noAssertTests: 0,
        issues: ["runner_error", toText(err).replace(/\s+/g, "_")],
      });
    });
}
