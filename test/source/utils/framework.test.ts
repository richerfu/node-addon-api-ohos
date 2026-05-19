export const DEFAULT = 0;

type TestBody = () => void | Promise<any>;

type TestCase = {
  name: string;
  path: string[];
  body: TestBody;
};

type Registry = {
  path: string[];
  tests: TestCase[];
  assertionCalls: number;
  noAssertionTests: number;
};

function registry(): Registry {
  const g = globalThis as any;
  if (!g.__nodeAddonApiTestRegistry__) {
    g.__nodeAddonApiTestRegistry__ = {
      path: [],
      tests: [],
      assertionCalls: 0,
      noAssertionTests: 0,
    };
  }
  return g.__nodeAddonApiTestRegistry__ as Registry;
}

export function resetTestRegistry() {
  const reg = registry();
  reg.path = [];
  reg.tests = [];
  reg.assertionCalls = 0;
  reg.noAssertionTests = 0;
}

export function markAssertionCall() {
  registry().assertionCalls += 1;
}

export function describe(name: string, body: () => void) {
  const reg = registry();
  reg.path.push(name);
  try {
    body();
  } finally {
    reg.path.pop();
  }
}

export function it(name: string, _mode: number | TestBody, maybeBody?: TestBody) {
  const reg = registry();
  const body = (typeof _mode === "function" ? _mode : maybeBody) as TestBody;
  reg.tests.push({
    name,
    path: reg.path.slice(),
    body,
  });
}

export const test = it;

function text(value: any): string {
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  if (value && value.stack) {
    return String(value.stack);
  }
  if (value && value.message) {
    return String(value.message);
  }
  return String(value);
}

function stackPreview(error: any): string[] {
  return text(error)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .slice(0, 5);
}

export async function runRegisteredTests(suiteName: string) {
  const reg = registry();
  let pass = 0;
  let fail = 0;
  let error = 0;
  let skip = 0;
  const startedAt = Date.now();

  print(`[RUN] ${suiteName}`);
  for (const item of reg.tests) {
    const caseName = `${item.path.concat([item.name]).join(" > ")}`;
    const assertionsBefore = reg.assertionCalls;
    const caseStartedAt = Date.now();
    try {
      await Promise.resolve(item.body());
      const duration = Date.now() - caseStartedAt;
      if (reg.assertionCalls === assertionsBefore) {
        reg.noAssertionTests += 1;
      }
      pass += 1;
      print(`  [PASS] ${caseName} (${duration}ms)`);
    } catch (err) {
      const duration = Date.now() - caseStartedAt;
      fail += 1;
      print(`  [FAIL] ${caseName} (${duration}ms)`);
      for (const line of stackPreview(err)) {
        print(`         ${line}`);
      }
    }
  }

  const total = pass + fail + error + skip;
  const duration = Date.now() - startedAt;
  print(
    `[SUMMARY] suite=${suiteName} total=${total} pass=${pass} fail=${fail} error=${error} skip=${skip} duration=${duration}ms`,
  );

  return {
    suite: suiteName,
    status: fail === 0 && error === 0 && total > 0 ? "ok" : "fail",
    registered: total,
    executed: total,
    skipped: skip,
    total,
    pass,
    failure: fail,
    error,
    ignore: skip,
    assertions: reg.assertionCalls,
    noAssertTests: reg.noAssertionTests,
    issues: total === 0 ? ["no_callbacks"] : fail > 0 || error > 0 ? ["case_failures"] : [],
  };
}
